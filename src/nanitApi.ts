// Thin client for the parts of Nanit's REST API this plugin uses.

const API_BASE = 'https://api.nanit.com';
const TIMEOUT_MS = 15_000;

export interface NanitTokens {
  access_token: string;
  refresh_token: string;
}

export interface NanitBaby {
  uid: string;
  name: string;
  first_name?: string;
  camera_uid?: string;
  camera?: NanitCameraInfo;
}

export interface NanitCameraInfo {
  uid: string;
  temperature?: number;
  humidity?: number;
}

/** The API answered, but not with a 2xx. */
export class NanitApiError extends Error {
  constructor(readonly status: number, body: string) {
    super(`Nanit API returned ${status}${body ? `: ${body}` : ''}`);
  }
}

export function babyName(baby: NanitBaby): string {
  return baby.name || baby.first_name || 'Nanit Camera';
}

function request(path: string, options: { body?: unknown; accessToken?: string } = {}): Promise<Response> {
  const headers: Record<string, string> = { 'nanit-api-version': '1' };
  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (options.accessToken) {
    headers.Authorization = options.accessToken;
  }
  return fetch(`${API_BASE}${path}`, {
    method: options.body === undefined ? 'GET' : 'POST',
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

async function json<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new NanitApiError(response.status, await response.text());
  }
  return await response.json() as T;
}

/** Exchange a refresh token for new tokens. Nanit refresh tokens are single-use. */
export async function refreshTokens(refreshToken: string): Promise<NanitTokens> {
  return json(await request('/tokens/refresh', { body: { refresh_token: refreshToken } }));
}

export async function getBabies(accessToken: string): Promise<NanitBaby[]> {
  const { babies } = await json<{ babies: NanitBaby[] }>(await request('/babies', { accessToken }));
  return babies;
}

export type LoginResult =
  | { kind: 'ok'; refreshToken?: string }
  | { kind: 'mfa_required'; mfaToken: string; phoneSuffix?: string }
  | { kind: 'rate_limited' }
  | { kind: 'failed'; error: NanitApiError };

export interface LoginRequest {
  email: string;
  password: string;
  mfa_token?: string;
  mfa_code?: string;
}

export async function login(credentials: LoginRequest): Promise<LoginResult> {
  const response = await request('/login', { body: credentials });
  if (response.ok) {
    const { refresh_token } = await response.json() as Partial<NanitTokens>;
    return { kind: 'ok', refreshToken: refresh_token };
  }
  if (response.status === 429) {
    return { kind: 'rate_limited' };
  }
  if (response.status === 482) {
    const { mfa_token, phone_suffix } = await response.json() as { mfa_token: string; phone_suffix?: string };
    return { kind: 'mfa_required', mfaToken: mfa_token, phoneSuffix: phone_suffix };
  }
  return { kind: 'failed', error: new NanitApiError(response.status, await response.text()) };
}
