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

### Use Cases documentation alignment

**Status**

Pending

**Description**

Several CRUD use cases have been implemented during development (e.g. Get Workspace, Update Workspace, Delete Workspace) but are not currently represented in the use case documentation.

**Goal**

Review the use case catalogue and ensure every implemented use case is documented.

If necessary:

- Add the missing use cases.
- Reorganize the numbering.
- Update cross references and the README.

## Test coverage audit

### Status

Pending

### Description

During the initial implementation, some use cases were completed without their corresponding unit tests.

### Goal

Review every implemented use case and ensure that:

- Every use case has a dedicated unit test file.
- Success scenarios are covered.
- All documented alternative flows are covered.
- The implemented behavior matches the documented use case.

### Notes

When implementing new functionality, avoid moving to the next use case until:

- The implementation is finished.
- Unit tests are complete.
- The implementation has been manually verified (if applicable).
