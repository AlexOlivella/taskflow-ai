# UC-004 Remove Workspace Member

## Goal

Remove a workspace member from the workspace.

## Actor

User

## Preconditions

- The user is authenticated.

## Main Flow

1. The user requests to remove a workspace member.
2. The system removes the workspace membership.
3. The system informs the user that the workspace member has been removed.

## Alternative Flows

### AF-2.1 The workspace would have no Owner

- **2.a.** The workspace would have no Owner.
- **2.b.** The system informs the user that the workspace must always have at least one Owner.
- **2.c.** The workspace membership is not removed.

## Postconditions

- The workspace membership no longer exists.

## Business Rules

- A workspace must always have at least one Owner.
