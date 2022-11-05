export * from "./factory";

/**
 * Adapter interface to the underlying messenger.
 */
export interface IMessengerAdapter {}

/**
 * Supported Messenger technologies.
 */
export enum Messenger {
  Redis,
}
