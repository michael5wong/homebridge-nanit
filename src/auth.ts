import { Log, errorMessage } from './log';
import { NanitApiError, refreshTokens } from './nanitApi';
import { TokenStore } from './tokenStore';

/** Consecutive rejected refreshes before giving up until restart. */
const MAX_REJECTIONS = 3;

const FIX_HINT = 'To fix: run "npx nanit-auth", put the new refreshToken in your Homebridge config, and restart Homebridge.';

/**
 * Owns the access token. Never logs in with a password: that triggers an MFA
 * SMS, so a bad token must be fixed by hand with the nanit-auth CLI.
 */
export class NanitAuth {
  private accessToken?: string;
  private refreshToken?: string;
  private rejections = 0;

  constructor(
    private readonly email: string,
    private readonly configToken: string | undefined,
    private readonly store: TokenStore,
    private readonly log: Log,
  ) {}

  get authenticated(): boolean {
    return this.accessToken !== undefined;
  }

  /** True once Nanit has rejected our tokens too many times in a row. */
  get disabled(): boolean {
    return this.rejections >= MAX_REJECTIONS;
  }

  get token(): string {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Nanit');
    }
    return this.accessToken;
  }

  get hasRefreshToken(): boolean {
    return this.candidates().length > 0;
  }

  /**
   * Get a fresh access token, trying the latest rotated refresh token first,
   * then the stored one, then the one from config. Only failures where Nanit
   * rejected the token count toward disabling auth; network errors and 5xx
   * responses are retried on the next attempt.
   */
  async refresh(): Promise<void> {
    if (this.disabled) {
      throw new Error('Nanit authentication is disabled after repeated failures');
    }

    let rejected = true;
    for (const [source, token] of this.candidates()) {
      try {
        const tokens = await refreshTokens(token);
        this.accessToken = tokens.access_token;
        this.refreshToken = tokens.refresh_token;
        this.store.save(this.email, tokens.refresh_token);
        this.rejections = 0;
        this.log.debug('Access token refreshed');
        return;
      } catch (error) {
        rejected &&= error instanceof NanitApiError && error.status < 500;
        this.log.warn(`Refreshing with the ${source} refresh token failed: ${errorMessage(error)}`);
      }
    }

    if (!rejected) {
      throw new Error('Could not reach Nanit to refresh the access token; will retry');
    }
    this.rejections++;
    if (this.disabled) {
      this.log.error(`Nanit rejected the refresh token ${this.rejections} times in a row; giving up until Homebridge restarts.`);
    } else {
      this.log.error(`Nanit rejected the refresh token (attempt ${this.rejections}/${MAX_REJECTIONS}).`);
    }
    this.log.error(FIX_HINT);
    throw new Error('Nanit refresh token is invalid or expired');
  }

  /** Distinct, non-empty refresh tokens in the order they should be tried. */
  private candidates(): Array<[source: string, token: string]> {
    const all: Array<[string, string | undefined]> = [
      ['current', this.refreshToken],
      ['stored', this.store.load(this.email)],
      ['config', this.configToken],
    ];
    const seen = new Set<string>();
    return all.filter((entry): entry is [string, string] => {
      const token = entry[1];
      if (!token || seen.has(token)) {
        return false;
      }
      seen.add(token);
      return true;
    });
  }
}
