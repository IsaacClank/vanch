import { Messenger } from ".";
import { adapterFactory } from "./factory";
import { RedisAdapter } from "./redis";

describe("adapterFactory()", () => {
  test("when encounter invalid Messenger variation, throw error", () => {
    expect(() => adapterFactory("" as any)).toThrow("Unexpected Messenger variation");
  });

  test("for Redis, returns correct adapter instance", () => {
    expect(adapterFactory(Messenger.Redis)).toBeInstanceOf(RedisAdapter);
  });
});
