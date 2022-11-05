import Redis from "ioredis";
import { IMessengerAdapter } from ".";

const DEFAUT_HOST = "127.0.0.1";
const DEFAUT_PORT = 6379;

export class RedisAdapter implements IMessengerAdapter {
  private _redis: Redis;

  constructor(host?: string, port?: number) {
    this._redis = new Redis(port ?? DEFAUT_PORT, host ?? DEFAUT_HOST);
  }

  async publish(channel: string, message: unknown): Promise<void> {
    console.log(`Posting message to: ${channel}`);

    try {
      const receiversCount = await this._redis.publish(channel, JSON.stringify(message));

      if (!receiversCount) {
        console.log(`Message did not have any receiver`);
      }
    } catch (error) {
      console.log(`Failed to publish message: ${error}`);
      throw error;
    }
  }
}
