# Vanch event broker client

## External design

```typescript
/**
 * Singleton client for Event-Store-Broker
 */
class BrokerAdapter {
  /**
   * Connect to the underlying messenger, initialize the client.
   */
  static init(host: string, port: number): void;

  /**
   * Get the singleton instance.
   */
  static get(): BrokerSingleTon;
}
```

## Detailed design
