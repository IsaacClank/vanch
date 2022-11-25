# Vanch event store broker adapter

## External design

```typescript
interface AdapterInitOptions {
  host?: string,
  port?: number,
}

interface BrokerAdapter {
  static init(options: AdapterInitOptions): void;
  static get(): MessageAdapter;
}

interface MessengerAdapter {
  publish(channel: string, message: unknown): Promise<void>;
  subscribe(channel: string, listener: MessengerListener): Promise<void>;
  unsubscribe(channel: string): Promise<void>;
  disconnect(): Promise<void>;
}
```

## Detailed design

This package contains two main modules:

- `broker`
- `adapters`

### `adapters`

This module defines a list of supported Messengers technology, as well as providing a common adapter interface to access their functionalities. Additionally, it also exposes a factory function for instantiating an adapter to a specific Messenger.

#### `adapters/index.ts`

```typescript
/**
 * List of supported messenger brokers.
 */
enum Messenger {
  Redis
}

/*
 * Common interface for concrete adapters implementation.
 */
interface MessengerAdapter {
  publish(channel: string, message: unknown): Promise<void>;

  subscribe(channel: string, callback: (message: unknown) => void): Promise<void>;

  unsubscribe(channel: string): Promise<void>;

  disconnect(): Promise<void>
}
```

#### `adapters/factory.ts`

```typescript
/**
 * Defines the list of common options for constructing concrete adapters.
 */
interface AdapterInitOptions {
  host?: string;
  port?: string;
}

/**
 * Can be implemented as a simple switch-case on the `messenger` argument
 * and construct the specific concrete adapter class with the data passed in `options`
 */
function adapterFactory(messenger: Messenger, options: AdapterInitOptions): MessengerAdapter {}
```

### `broker`

This module exposes a singleton class for initializing and providing access to a single concrete messenger adapter.

```typescript
class BrokerAdapter {
  static init(options: AdapterInitOptions): void;
  static get(): MessengerAdapter;
}
```
