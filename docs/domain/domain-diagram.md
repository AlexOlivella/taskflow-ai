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

    Workspace ||--o{ Project : owns
    Workspace ||--o{ Task : owns
    Workspace ||--o{ WorkspaceMembership : has
    User      ||--o{ WorkspaceMembership : has
    Project   o|--o{ Task : contains
    User      ||--o{ Task : creates
    User      o|--o{ Task : assigned


```

This diagram intentionally omits implementation details such as database fields or foreign keys.
Its purpose is to describe the business domain.
