import * as fs from 'fs';
import * as path from 'path';
import { Log } from './log';

/**
 * Persists the latest (rotated) refresh token per account, in a plugin-owned
 * file under the Homebridge storage directory.
 */
export class TokenStore {
  constructor(private readonly file: string, private readonly log: Log) {}

  load(email: string): string | undefined {
    const token = this.read()[email];
    return typeof token === 'string' && token.length > 0 ? token : undefined;
  }

  /** Non-fatal on failure: the session keeps working, but the token won't survive a restart. */
  save(email: string, token: string): void {
    try {
      const store = { ...this.read(), [email]: token };
      fs.mkdirSync(path.dirname(this.file), { recursive: true, mode: 0o700 });
      const tmp = `${this.file}.${process.pid}.tmp`;
      fs.writeFileSync(tmp, JSON.stringify(store, null, 2), { mode: 0o600 });
      fs.renameSync(tmp, this.file);
    } catch (error) {
      this.log.error(`Failed to persist refresh token to ${this.file}:`, error);
    }
  }

  private read(): Record<string, unknown> {
    try {
      const parsed: unknown = JSON.parse(fs.readFileSync(this.file, 'utf8'));
      return parsed && typeof parsed === 'object' ? parsed as Record<string, unknown> : {};
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        this.log.warn(`Could not read token store at ${this.file}:`, error);
      }
      return {};
    }
  }
}
