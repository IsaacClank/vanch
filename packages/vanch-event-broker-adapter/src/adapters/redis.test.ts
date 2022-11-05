import Redis from "ioredis";
import { RedisAdapter } from "./redis";

jest.mock("ioredis");

describe("RedisAdapter.constructor", () => {
  test("can be called without parameters", () => {
    expect(new RedisAdapter()).toBeTruthy();
  });

  test("can be called with host and port", () => {
    expect(new RedisAdapter("", 1)).toBeTruthy();
  });
});

interface RedisInstanceMock {
  publish: jest.Mock;
  subscribe: jest.Mock;
  on: jest.Mock;
}

const RedisMock: jest.Mock = Redis as unknown as jest.Mock;

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

    await adapter.publish(expectedChannel, "message");

    expect(redisInstanceMock.publish).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(`Posting message to: ${expectedChannel}`);
  });

  test("when message has no receivers, log correctly", async () => {
    redisInstanceMock.publish.mockResolvedValue(0);

    await adapter.publish("channel", "message");

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenLastCalledWith("Message did not have any receiver");
  });

  test("when ecounter error, log and re-throw", async () => {
    const expectedError = "Some error";
    redisInstanceMock.publish.mockRejectedValue(expectedError);

    try {
      await adapter.publish("channel", "message");
    } catch (actualError) {
      expect(actualError).toBe(expectedError);
    }

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenLastCalledWith(`Failed to publish message: ${expectedError}`);
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

    redisInstanceMock.on.mockImplementation((_event: unknown, listener) => {
      listener(expectedChannel);
    });

    adapter.subscribe(expectedChannel, expectedListener);

    expect(redisInstanceMock.subscribe).toHaveBeenCalledWith(expectedChannel);
    expect(redisInstanceMock.on).toHaveBeenCalled();
    expect(expectedListener).toHaveBeenCalled();
  });
});
