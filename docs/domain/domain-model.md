# Domain Model

This document describes the core business entities of TaskFlow AI, their responsibilities, relationships, and business rules.

The goal is to define the domain independently of any implementation details such as databases, frameworks, or APIs.

## Workspace

Represents an isolated collaboration space where users work together.

Responsibilities

- Provides an isolated collaboration space.
- Defines the boundary for projects, tasks and members.

Relationships

- Owns many projects.
- Owns many tasks.
- Contains many workspace memberships.

Invariants

- Projects cannot exist outside a workspace.
- Tasks cannot exist outside a workspace.

---

## User

Represents a person who collaborates within one or more workspaces.

Responsibilities

- Participates in collaborative work.
- Can create tasks.
- Can be assigned work.

Relationships

- Has many workspace memberships.
- Owns many created tasks.
- Can be assigned many tasks.

---

## Project

Represents a logical grouping of related tasks within a workspace.

Responsibilities

- Organizes related work within a workspace.

Relationships

- Belongs to one workspace.
- Contains many tasks.

Invariants

- Must belong to exactly one workspace.

---

## Task

Represents a unit of work.

Responsibilities

- Represents work that needs to be completed.
- Tracks who created the work and who is responsible for it.
- Can exist independently of a project.

Relationships

- Belongs to one workspace.
- May belong to one project.
- May be assigned to one user.
- Has one creator.

Invariants

- Must belong to exactly one workspace.
- Cannot be moved between workspaces.
- Can belong to at most one project.
- Can be unassigned.

---

## Workspace Membership

Represents the participation of a user within a workspace.

Responsibilities

- Defines the relationship between a user and a workspace.
- Determines the user's role within the workspace.
- Represents the membership lifecycle.

Relationships

- Belongs to one user.
- Belongs to one workspace.

Invariants

- A user can have at most one membership per workspace.
- Every membership must belong to exactly one user.
- Every membership must belong to exactly one workspace.
