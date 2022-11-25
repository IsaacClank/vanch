import { Messenger } from ".";
import { adapterFactory, AdapterInitOptions } from "./factory";
import { RedisAdapter } from "./redis";

jest.mock("./redis");

const RedisAdapterMock = RedisAdapter as unknown as jest.Mock;

describe("adapterFactory()", () => {
  beforeEach(() => {
    RedisAdapterMock.mockClear();
  });

  test("throw invalid-messenger error", () => {
    expect(() => adapterFactory("" as any)).toThrow(
      "Unexpected Messenger variation"
    );
  });

  test.each([undefined, { host: "string", port: 0 }])(
    "returns Redis adapter instance",
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
