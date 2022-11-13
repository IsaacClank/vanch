import { Messenger } from ".";
import { adapterFactory, AdapterInitOptions } from "./factory";
import { RedisAdapter } from "./redis";

jest.mock("./redis");

const RedisAdapterMock = RedisAdapter as unknown as jest.Mock;

describe("getAdapter()", () => {
  beforeEach(() => {
    RedisAdapterMock.mockClear();
  });

  test("when encounter invalid Messenger variation, throw error", () => {
    expect(() => adapterFactory("" as any)).toThrow(
      "Unexpected Messenger variation"
    );
  });

  test.each([undefined, { host: "string", port: 0 }])(
    "for Redis, returns correct adapter instance",
    (expectedInitOptions?: AdapterInitOptions) => {
      const actualAdapter = adapterFactory(
        Messenger.Redis,
        expectedInitOptions
      );

      expect(actualAdapter).toBeInstanceOf(RedisAdapter);
      expect(RedisAdapterMock).toHaveBeenCalledWith(
        expectedInitOptions?.host,
        expectedInitOptions?.port
      );
    }
  );
});
