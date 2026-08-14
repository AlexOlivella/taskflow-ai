# Technical Debt

## High priority

### Business Rules audit

**Status**

Pending

**Description**

Review every Business Rule documented in the use cases and verify that:

- It is implemented.
- It is covered by tests.
- It belongs to the correct layer (Domain/Application).
- The documentation matches the implementation.

**Notes**

Do not assume that documenting a Business Rule means it is already enforced.

Perform a complete audit once the first version of the domain has been implemented.

For future development, every new Business Rule should be:

- Documented.
- Implemented.
- Covered by tests.

---

### Domain validation errors

**Status**

Pending

**Description**

The domain currently throws generic `Error` instances for validation failures (e.g. empty workspace/project names).

**Goal**

Introduce a common domain validation error hierarchy.

Example:

- `DomainValidationError`
- `InvalidWorkspaceNameError`
- `InvalidProjectNameError`

Expose them through a common HTTP filter returning `400 Bad Request`.

---

### Test coverage audit

**Status**

Pending

**Description**

During the initial implementation, some use cases were completed without their corresponding unit tests.

**Goal**

Review every implemented use case and ensure that:

- Every use case has a dedicated unit test file.
- Success scenarios are covered.
- All documented alternative flows are covered.
- The implemented behavior matches the documented use case.

**Notes**

When implementing new functionality, avoid moving to the next use case until:

- The implementation is finished.
- Unit tests are complete.
- The implementation has been manually verified (if applicable).

---

## Medium priority

### HTTP validation strategy

**Status**

Pending

**Description**

Define the boundary between HTTP validation (DTOs) and domain validation.

Evaluate the use of `class-validator` for request DTOs while keeping domain invariants inside the entities.

---

### Shared IdModule

**Status**

Pending

**Description**

The `ID_GENERATOR` provider is currently registered in multiple modules.

**Goal**

Extract it into a shared `IdModule` that exports the `ID_GENERATOR` provider so all modules reuse the same configuration.

---

### Application error handling strategy

**Status**

Pending

**Description**

The application currently uses a mix of typed application errors and generic `Error` instances.

Some errors have dedicated types and HTTP filters (e.g. `WorkspaceNotFoundError`, `ProjectNameAlreadyExistsError`), while other use cases throw generic `Error` instances with a message.

**Goal**

Standardize application and domain errors by:

- Using typed errors for business/application failures.
- Avoiding generic `Error` instances for expected business errors.
- Defining a consistent error hierarchy where appropriate.
- Mapping application/domain errors to the correct HTTP responses through a consistent filter strategy.
- Ensuring the HTTP layer does not depend on error message strings to determine the response.

**Notes**

This should be addressed after the E2E test suite is in place so the expected HTTP behavior can be defined and verified through E2E tests.

Do not introduce individual filters for every error without first defining the overall error handling strategy.
