import { BrokerAdapter } from "./broker";
import { adapterFactory } from "./adapters";

jest.mock("./adapters", () => ({
  ...jest.requireActual("./adapters"),
  adapterFactory: jest.fn(),
}));

describe("Broker", () => {
  let adapterFactoryMock = adapterFactory as jest.Mock;

  test("cannot be constructed", () => {
    expect(() => new BrokerAdapter()).toThrow(
      "Singleton cannot be instantiated"
    );
  });

  test("get(), when uninitialized, throw error", () => {
    expect(() => BrokerAdapter.get()).toThrow(
      "Broker cannot be used before initialization"
    );
  });

  test("get() when initialized, return the singleton instance", () => {
    adapterFactoryMock.mockReturnValue({});

    BrokerAdapter.init({ host: "host", port: 100 });

    expect(adapterFactoryMock).toHaveBeenCalledTimes(1);
    expect(BrokerAdapter.get()).toBeTruthy();
  });
});
