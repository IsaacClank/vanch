# Programming guideline

This document provides guidelines for various aspects of the development process.

## Git/GitHub

### Branch naming convention

```sh
{issue}-banch-name
```

## Typescript

### Avoid using default export in modules

```typescript
// DONT
export default function() {};

// DO
export function foo(): void {}
```

### Use {module}/index.ts to clearly define the interface of a module

```typescript
// --- DONT
// ...in adapters.ts
export class Factory {}

export interface MessengerAdapter {}

export class RedisAdapter implements MessengerAdapter {}

// --- DO

// ... in adapters/factory.ts
export class Factory {}

// ... in adapters/redis.ts
export class RedisAdapter implements MessengerAdapter {}

// ... in adapters/index.ts
export * from './factory';
export * from './redis';
export interface MessengerAdapter {}

```

### Naming convention

| Construct                 | Case       | Requirement       | Example                              |
| ------------------------- | ---------- | ----------------- | ------------------------------------ |
| Modules                   | kebab-case | Noun              | adapters, factory, util              |
| Class/Interface/Type/Enum | PascalCase | Noun              |                                      |
| Method/Function           | camelCase  | Verb or assertion | publish, subscribe, isConnected, ... |
| variables/class fields    | camelCase  | Noun              |                                      |
| private class fields      | _camelCase | Noun              | _someField                           |
