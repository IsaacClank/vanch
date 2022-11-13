export * from "./factory";

/**
 * Supported Messenger technologies.
 */
export enum Messenger {
  Redis,
}

/**
 * Adapter interface to the underlying messenger.
 */
export interface MessengerAdapter {
  publish(channel: string, message: unknown): Promise<void>;

  subscribe(channel: string, listener: MessengerListener): Promise<void>;

  disconnect(): Promise<void>;
}

export type MessengerListener = (message: unknown) => void;
