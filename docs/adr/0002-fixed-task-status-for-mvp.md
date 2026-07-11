# ADR 0002 - Fixed Task Status for MVP

## Status

Accepted

---

## Context

The application requires tasks to have a status in order to support basic task management workflows.

Future versions may require customizable workflows, allowing each workspace to define its own task states (for example: QA, On Hold, Review, Blocked).

Introducing configurable workflows in the MVP would significantly increase the complexity of both the domain model and the implementation.

---

## Decision

The MVP will implement `TaskStatus` as a fixed enumeration.

The domain model intentionally represents task status as a business concept (`TaskStatus`) instead of a generic string, allowing the implementation to evolve into configurable workflow states in future versions without changing the domain model.

---

## Consequences

### Positive

- Simple implementation.
- Easy validation.
- Covers all MVP requirements.
- Keeps the domain model stable.

### Negative

- Adding new workflow states requires a code change.
- Different workspaces cannot customize their workflow during the MVP.
