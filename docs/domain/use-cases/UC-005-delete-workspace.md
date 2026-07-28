# UC-005 Delete Workspace

## Goal

Delete a workspace.

## Actor

User

## Preconditions

- The user is authenticated.

## Main Flow

1. The user requests to delete a workspace.
2. The system deletes the workspace.
3. The system informs the user that the workspace has been deleted.

## Alternative Flows

### AF-2.1 Workspace does not exist

- **2.a.** The requested workspace does not exist.
- **2.b.** The system informs the user that the workspace does not exist.
- **2.c.** The use case ends.

## Postconditions

- The workspace has been deleted.

## Business Rules

_None._
