import { AdapterInitOptions, Messenger, MessengerAdapter } from ".";
import { adapterFactory } from "./adapters";

/**
 * Singleton adapter for the Event Store Broker.
 */
export class BrokerAdapter {
  private static _messengerAdapter?: MessengerAdapter;

  constructor() {
    throw "Singleton cannot be instantiated";
  }

  static init(options: AdapterInitOptions): void {
    this._messengerAdapter = adapterFactory(Messenger.Redis, options);
  }

  static get(): MessengerAdapter {
    if (this._messengerAdapter) {
      return this._messengerAdapter;
    }

    throw "Broker cannot be used before initialization";
  }
}
