import Redis from "ioredis";
import { MessengerAdapter, MessengerListener } from ".";

const DEFAUT_HOST = "127.0.0.1";
const DEFAUT_PORT = 6379;

export class RedisAdapter implements MessengerAdapter {
  private _redis: Redis;

  constructor(host?: string, port?: number) {
    this._redis = new Redis(port ?? DEFAUT_PORT, host ?? DEFAUT_HOST);
  }

  async publish(channel: string, message: object): Promise<void> {
    console.log(`Posting message to: ${channel}`);

    try {
      const receiversCount = await this._redis.publish(
        channel,
        JSON.stringify(message)
      );

      if (!receiversCount) {
        console.log(`Message did not have any receiver`);
      }
    } catch (error) {
      console.log(`Failed to publish message: ${error}`);
      throw error;
    }
  }

  async subscribe(channel: string, listener: MessengerListener): Promise<void> {
    const callListenerIfReceiveMessageFromChannel = (
      unknownChannel: string,
      message: string
    ) => {
      if (unknownChannel === channel) {
        listener(JSON.parse(message));
      }
    };

    this._redis.subscribe(channel);
    this._redis.on("message", callListenerIfReceiveMessageFromChannel);
  }

  async unsubscribe(channel: string): Promise<void> {
    await this._redis.unsubscribe(channel);
  }

  async disconnect(): Promise<void> {
    await this._redis.quit();
  }
}
