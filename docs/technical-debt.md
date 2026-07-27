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
