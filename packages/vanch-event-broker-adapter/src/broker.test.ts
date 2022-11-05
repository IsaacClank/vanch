import { Broker } from "./broker";

describe("Broker.get()", () => {
  test("when uninitialized, throw error", () => {
    expect(() => Broker.get()).toThrow("Broker cannot be used before initialization");
  });

  test("when initialized, return the singleton instance", () => {
    Broker.init("host", 0);
    expect(Broker.get()).toBeTruthy();
  });
});
