# Programming Guidelines

This document provides guidelines for various aspects of the development process.

## Git/GitHub

### Branch/Commit types

| Type       | Description                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| `feat`     | branches/commits that deliver functionalities or functional changes.                                        |
| `fix`      | branches/commits that deliver bug fixes.                                                                    |
| `docs`     | branches/commits that deliver documentations changes.                                                       |
| `ci`       | branches/commits that deliver DevOps changes.                                                               |
| `refactor` | branches/commits that makes code changes without affecting existing functionalities.                        |
| `test`     | branches/commits that deliver changes to solution testing.                                                  |
| `chore`    | branches/commits that deliver none of the above (partial implementation, config, directory structure, ...). |

### Branching Conventions

```
{type}/[optional-issue]-{branch-delivery}
```

Examples:

```
docs/db-access-programming-guidelines
feat/vehicles-management-api
fix/15-authentication-bug
```

### Commit Conventions

```
{type}(scope)[!]: commit delivery
```

Examples:

```
feat: deliver a functionality
feat(auth): authentication support
feat(auth)!: a breaking change related to auth
```