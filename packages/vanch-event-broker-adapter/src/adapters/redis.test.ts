import Redis from "ioredis";
import { RedisAdapter } from "./redis";

interface RedisInstanceMock {
  publish: jest.Mock;
  subscribe: jest.Mock;
  on: jest.Mock;
  quit: jest.Mock;
}

jest.mock("ioredis");

const RedisMock: jest.Mock = Redis as unknown as jest.Mock;

describe("RedisAdapter.constructor", () => {
  test("can be called without parameters", () => {
    expect(new RedisAdapter()).toBeTruthy();
  });

  test("can be called with host and port", () => {
    expect(new RedisAdapter("", 1)).toBeTruthy();
  });
});

describe("RedisAdapter.publish()", () => {
  let adapter: RedisAdapter;
  let redisInstanceMock: RedisInstanceMock;
  let logSpy = jest.spyOn(console, "log");

  beforeEach(() => {
    RedisMock.mockClear();
    logSpy.mockClear();
  });

  beforeEach(() => {
    adapter = new RedisAdapter();
    redisInstanceMock = RedisMock.mock.instances[0];
  });

  test("should call redis client corretly", async () => {
    const expectedChannel = "Channel";
    redisInstanceMock.publish.mockResolvedValue(1);

    await adapter.publish(expectedChannel, {});

    expect(redisInstanceMock.publish).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      `Posting message to: ${expectedChannel}`
    );
  });

  test("when message has no receivers, log correctly", async () => {
    redisInstanceMock.publish.mockResolvedValue(0);

    await adapter.publish("channel", {});

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenLastCalledWith(
      "Message did not have any receiver"
    );
  });

  test("when ecounter error, log and re-throw", async () => {
    const expectedError = "Some error";
    redisInstanceMock.publish.mockRejectedValue(expectedError);

    try {
      await adapter.publish("channel", {});
    } catch (actualError) {
      expect(actualError).toBe(expectedError);
    }

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenLastCalledWith(
      `Failed to publish message: ${expectedError}`
    );
  });
});

describe("RedisAdapter.subscribe()", () => {
  let adapter: RedisAdapter;
  let redisInstanceMock: RedisInstanceMock;

  beforeEach(() => {
    RedisMock.mockClear();
  });

  beforeEach(() => {
    adapter = new RedisAdapter();
    redisInstanceMock = RedisMock.mock.instances[0];
  });

  test("attempts to subscribe to a given channel", () => {
    const expectedChannel = "test";
    const expectedListener = jest.fn();

    redisInstanceMock.on.mockImplementation(() => {
      const mockCallbackHandler = (channel: string, message: string) => {
        if (channel === expectedChannel) {
          expectedListener(JSON.parse(message));
        }
      };

      mockCallbackHandler(expectedChannel, JSON.stringify({}));
    });

    adapter.subscribe(expectedChannel, expectedListener);

    expect(redisInstanceMock.subscribe).toHaveBeenCalledWith(expectedChannel);
    expect(redisInstanceMock.on).toHaveBeenCalled();
    expect(expectedListener).toHaveBeenCalled();
  });
});

describe("RedisAdapter.disconnect()", () => {
  let adapter: RedisAdapter;
  let redisInstanceMock: RedisInstanceMock;

  beforeEach(() => {
    RedisMock.mockClear();

    adapter = new RedisAdapter();
    redisInstanceMock = RedisMock.mock.instances[0];
  });

  test("should disconnect client", async () => {
    adapter.disconnect().then(() => {
      expect(redisInstanceMock.quit).toHaveBeenCalledTimes(1);
    });
  });

  test("when failing to disconnect client, throw error", () => {
    redisInstanceMock.quit.mockImplementation((callback) => {
      callback("Error message");
    });

    adapter.disconnect().catch((err) => {
      expect(err).toBe("Error message");
      expect(redisInstanceMock.quit).toHaveBeenCalledTimes(1);
    });
  });
});
