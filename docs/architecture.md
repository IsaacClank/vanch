# Architecture

---

## 1. Logical perspective

```mermaid
flowchart TD
  bs("Business Services (BS)")
  sa("State Archive (SA)")
  es("Event Store (ES)")

  bs ---> sa
  sa ---> es
  bs ---> es
```

## 2. Process perspective

```mermaid
flowchart TD
  subgraph bs ["Business Services (BS)"]
    direction LR

    bsService(Service N)
    bsDb[(DB N)]
    
    bsService --reads/writes--> bsDb
  end
  
  subgraph sa ["State Archive (SA)"]
    direction LR
    
    saWorker(SA Worker)
    saDb[(SADB)]
    
    saWorker --writes--> saDb
  end
  
  subgraph es ["Event Store (ES)"]
    direction LR
  
    esApi(Event Worker)
    esBrokerer((Redis))
    esDb[(Event DB)]
    
    esApi --writes--> esDb
    esApi --subscribes--> esBrokerer
  end
  
  bsService ----reads---> saDb
  bsService ----saga--> esBrokerer
  bsService ----subscribes--> esBrokerer
  saWorker ----subscribes--> esBrokerer
```

## 3. Development perspective

Codebase is organized as a monorepo with the following notable components:

| Component | Path       | Description                                                                                              |
| --------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| API       | ./api      | Contains Business Service (BS) codebases                                                                 |
| Packages  | ./packages | Shared libraries                                                                                         |
| Runtime   | ./runtime  | Contains runtime instances that are needed for a functional deployment (Event Store, State Archive, ...) |
