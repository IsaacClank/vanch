import Redis from "ioredis";
import { IMessengerAdapter } from ".";

export class RedisAdapter implements IMessengerAdapter {
  private _redis: Redis;

  constructor(host: string, port: number) {
    this._redis = new Redis(port, host);
  }

  async subscribe(channel: string): Promise<unknown> {
    return this._redis.subscribe(channel).then((msg) => JSON.parse(msg as string));
  }

  async publish(channel: string, msg: unknown) {
    return this._redis.publish(channel, JSON.stringify(msg));
  }
}
