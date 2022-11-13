import { adapterFactory, MessengerAdapter, Messenger } from "./adapters";

/**
 * Singleton client for the Event Store Broker.
 */
export class Broker {
  private static _instance?: Broker;

  private _adapter?: MessengerAdapter;

  private constructor(host?: string, port?: number) {
    this._adapter = adapterFactory(Messenger.Redis, { host, port });
  }

  static init(host?: string, port?: number): void {
    this._instance = new Broker(host, port);
  }

  static get() {
    if (this._instance) {
      return this._instance;
    }

    throw "Broker cannot be used before initialization";
  }
}
