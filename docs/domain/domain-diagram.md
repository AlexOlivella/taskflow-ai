# Domain Diagram

The following diagram represents the core business entities and their relationships.

```mermaid
erDiagram

    Workspace {
        UUID id
        string name
    }

    User {
        UUID id
        string name
        string email
    }

    WorkspaceMembership {
        UUID id
        WorkspaceRole role
    }

    Project {
        UUID id
        string name
    }

    Task {
        UUID id
        string title
        string description
        TaskStatus status
        datetime createdAt
    }

    Invitation {
        UUID id
        string email
        InvitationStatus status
        datetime createdAt
    }

    Workspace ||--o{ Project : owns
    Workspace ||--o{ Task : owns
    Workspace ||--o{ WorkspaceMembership : owns
    Workspace ||--o{ Invitation : owns

    User      ||--o{ WorkspaceMembership : has
    User      ||--o{ Task : creates
    User      o|--o{ Task : is responsible for
    User      ||--o{ Invitation : invites

    Project   o|--o{ Task : contains


```

This diagram intentionally omits implementation details such as database fields or foreign keys.
Its purpose is to describe the business domain.
