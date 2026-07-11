# Domain Model

This document describes the core business entities of TaskFlow AI, their responsibilities, relationships, and business rules.

The goal is to define the domain independently of any implementation details such as databases, frameworks, or APIs.

This document is organized into three sections for each entity:

- **Responsibilities** describe the role of the entity within the business domain.
- **Relationships** describe how entities are connected.
- **Invariants** describe business rules that must always hold true.

## Workspace

Represents an isolated collaboration space where users work together.

### Responsibilities

- Provides an isolated collaboration space.
- Defines the scope in which projects, tasks and workspace memberships exist.

### Relationships

- Owns many projects.
- Owns many tasks.
- Contains many workspace memberships.

### Invariants

- Projects cannot exist outside a workspace.
- Tasks cannot exist outside a workspace.
- Workspace memberships cannot exist outside a workspace.

---

## User

Represents a person who collaborates within one or more workspaces.

### Responsibilities

- Participates in collaborative work.
- Interacts with workspaces and their resources.

### Relationships

- Has many workspace memberships.
- Has many created tasks.
- Has many assigned tasks.

---

## Project

Represents a logical grouping of related tasks within a workspace.

### Responsibilities

- Organizes related work within a workspace.

### Relationships

- Belongs to one workspace.
- Contains many tasks.

### Invariants

- Must belong to exactly one workspace.
- Cannot change its workspace.

---

## Task

Represents a unit of work.

### Responsibilities

- Represents work that needs to be completed.

### Relationships

- Belongs to one workspace.
- May belong to one project.
- May be assigned to one user.
- Has one creator.

### Invariants

- Must belong to exactly one workspace.
- Cannot change its workspace.

---

## Workspace Membership

Represents the relationship between a user and a workspace.

### Responsibilities

- Associates a user with a workspace.
- Defines the user's role within that workspace.

### Relationships

- Belongs to one workspace.
- Belongs to one user.

### Invariants

- A user can have only one membership per workspace.
- Every membership has exactly one role.
