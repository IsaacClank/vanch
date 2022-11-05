import { IMessengerAdapter, Messenger } from ".";
import { RedisAdapter } from "./redis";

/**
 * Factory function to create an appropriate adapter for a given messenger.
 */
export function adapterFactory(messenger: Messenger): IMessengerAdapter {
  let adapter;

  switch (messenger) {
    case Messenger.Redis:
      adapter = new RedisAdapter();
      break;

    default:
      throw "Unexpected Messenger variation";
  }

  return adapter;
}
