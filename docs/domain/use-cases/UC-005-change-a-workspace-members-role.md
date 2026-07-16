# UC-005 Change a Workspace Member's Role

## Goal

Change a workspace member's role.

## Actor

User

## Preconditions

- The user is authenticated.

## Main Flow

1. The user requests to change a workspace member's role.
2. The system changes the workspace member's role.
3. The system informs the user that the workspace member's role has been changed.

## Alternative Flows

### AF-2.1 The workspace would have no Owner

- **2.a.** The role change would leave the workspace without an Owner.
- **2.b.** The system informs the user that the workspace must always have at least one Owner.
- **2.c.** The workspace member's role is not changed.

## Postconditions

- The workspace member's role is changed.

## Business Rules

- A workspace must always have at least one Owner.
