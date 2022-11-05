import { adapterFactory, MessengerAdapter, Messenger } from "./adapters";

/**
 * Singleton client for the Event Store Broker.
 */
export class Broker {
  private static _instance?: Broker;

  private _adapter?: MessengerAdapter;

  private constructor() {
    this._adapter = adapterFactory(Messenger.Redis);
  }

  static init(host: string, port: number): void {
    this._instance = new Broker();
  }

  static get() {
    if (this._instance) {
      return this._instance;
    }

    throw "Broker cannot be used before initialization";
  }
}
