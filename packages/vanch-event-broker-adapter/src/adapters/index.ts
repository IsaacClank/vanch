export * from "./factory";

/**
 * Adapter interface to the underlying messenger.
 */
export interface IMessengerAdapter {
  publish(channel: string, message: unknown): Promise<void>;
}

/**
 * Supported Messenger technologies.
 */
export enum Messenger {
  Redis,
}
