import Redis from "ioredis";
import { RedisAdapter } from "./redis";

jest.mock("ioredis");

describe("RedisAdapter", () => {
  const RedisMock = Redis as unknown as jest.Mock;

  let adapter: RedisAdapter;

  let redisInstance: {
    publish: jest.Mock;
    subscribe: jest.Mock;
    on: jest.Mock;
    quit: jest.Mock;
    unsubscribe: jest.Mock;
  };

  test.each([
    [undefined, undefined],
    ["localhost", 1234],
  ])("can be created", (host, port) => {
    const expectedHost = host ?? "127.0.0.1";
    const expectedPort = port ?? 6379;

    expect(new RedisAdapter(host, port)).toBeTruthy();
    expect(RedisMock).toHaveBeenCalledWith(expectedPort, expectedHost);
  });

  beforeEach(() => {
    RedisMock.mockClear();

    adapter = new RedisAdapter();
    redisInstance = RedisMock.mock.instances[0];
  });

  describe("RedisAdapter.publish()", () => {
    let logSpy = jest.spyOn(console, "log");

    test("a message to a channel", async () => {
      redisInstance.publish.mockResolvedValue(1);

      const expectedChannel = "Channel";
      const expectedMessage = { name: "Isaac" };

      await adapter.publish(expectedChannel, expectedMessage);

      expect(redisInstance.publish).toHaveBeenCalledWith(
        expectedChannel,
        JSON.stringify(expectedMessage)
      );

      expect(logSpy).toHaveBeenCalledWith(
        `Posting message to: ${expectedChannel}`
      );
    });

    test("a message with no receiver", async () => {
      redisInstance.publish.mockResolvedValue(0);
      await adapter.publish("channel", {});
      expect(logSpy).toHaveBeenLastCalledWith(
        "Message did not have any receiver"
      );
    });

    test("throws when failed to send message", async () => {
      const expectedError = "Some error";
      redisInstance.publish.mockRejectedValue(expectedError);

      try {
        await adapter.publish("channel", {});
      } catch (actualError) {
        expect(actualError).toBe(expectedError);
        expect(logSpy).toHaveBeenLastCalledWith(
          `Failed to publish message: ${expectedError}`
        );
      }
    });
  });

  test("RedisAdapter.subscribe()", () => {
    const expectedChannel = "test";
    const expectedListener = jest.fn();

    redisInstance.on.mockImplementation(() => {
      const mockCallbackHandler = (channel: string, message: string) => {
        if (channel === expectedChannel) {
          expectedListener(JSON.parse(message));
        }
      };

      mockCallbackHandler(expectedChannel, JSON.stringify({}));
    });

    adapter.subscribe(expectedChannel, expectedListener);

    expect(redisInstance.subscribe).toHaveBeenCalledWith(expectedChannel);
    expect(redisInstance.on).toHaveBeenCalled();
    expect(expectedListener).toHaveBeenCalled();
  });

  test("RedisAdapter.unsubscribe()", async () => {
    await adapter.unsubscribe("some-channel");
    expect(redisInstance.unsubscribe).toHaveBeenCalledTimes(1);
  });

  test("RedisAdapter.disconnect()", async () => {
    await adapter.disconnect();
    expect(redisInstance.quit).toHaveBeenCalledTimes(1);
  });
});
