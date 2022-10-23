# Vanch Microservice Communication Specification

This document contains the interface design for communication between the Event-Store and other architectural entities (Business Services, State Archive, ...).

## Context

The Vanch project implements a microservices architecture, and with this fact, inherits many characteristics of the well-established pattern. Among these inherited traits is the need to solve many problems that comes with multi-service transactions. Specifically, how do we process a transaction or query that requires the participation of multiple services?

From a logical achitectural perspective, to solve the above problems requires the existence of two additional components:

- The Event Store: for orchestrating trasactions that span multiple services.
- The State Archive: for storing a read-only replica of the entire solution states, this allows for efficient handling of multi-service queries.

These two components are derived from common concepts found in microservice-related pattern, in particular:

- Command Query Responsibility Segegration (CQRS).
- Event-Sourcing.

Additionally, all of this will work within the context of Saga. The inclusion of the Event Store and the State Archive requires thoughtful consideration in designing the external interface to handle communication to and from the Event Store.

## Command

This part describes the communication interface from a Business Service to the Event Store.

```typescript
/**
 * Communicates a command from a Business Service to the Event Store.
 */
interface VanchCommand {
  /**
   * What should be done. 
   */
  command: string;
  
  /**
   * Indicates which message channel the result should be sent to
   */
  responseChannel: string;
  
  /**
   * Additional data.
   */
  payload: any;
}
```
