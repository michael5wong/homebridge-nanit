// Minimal typings for the parts of node-media-server v4 this plugin uses.

declare module 'node-media-server' {
  namespace NodeMediaServer {
    interface Session {
      streamPath: string;
      /** Ends the session's socket. */
      close(): void;
    }
  }

  class NodeMediaServer {
    constructor(config: Record<string, unknown>);
    on(event: 'postPublish' | 'donePublish', listener: (session: NodeMediaServer.Session) => void): void;
    run(): void;
  }

  export = NodeMediaServer;
}

declare module 'node-media-server/src/core/logger.js' {
  const logger: { level: 'trace' | 'debug' | 'info' | 'warn' | 'error' };
  export = logger;
}
