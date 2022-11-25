import { MessengerAdapter, Messenger } from ".";
import { RedisAdapter } from "./redis";

export interface AdapterInitOptions {
  host?: string;
  port?: number;
}

/**
 * Factory function to create an appropriate adapter for a given messenger.
 */
export function adapterFactory(
  messenger: Messenger,
  adapterInitOptions?: AdapterInitOptions
): MessengerAdapter {
  let adapter;

  switch (messenger) {
    case Messenger.Redis:
      adapter = new RedisAdapter(
        adapterInitOptions?.host,
        adapterInitOptions?.port
      );
      break;

    default:
      throw "Unexpected Messenger variation";
  }

  return adapter;
}
