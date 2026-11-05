import { Logger } from 'homebridge';

export type Log = Pick<Logger, 'debug' | 'info' | 'warn' | 'error'>;

/** A logger that tags every line with `[prefix]`, e.g. the camera name. */
export function withPrefix(log: Log, prefix: string): Log {
  const tag = `[${prefix}]`;
  return {
    debug: (message, ...params) => log.debug(`${tag} ${message}`, ...params),
    info: (message, ...params) => log.info(`${tag} ${message}`, ...params),
    warn: (message, ...params) => log.warn(`${tag} ${message}`, ...params),
    error: (message, ...params) => log.error(`${tag} ${message}`, ...params),
  };
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
