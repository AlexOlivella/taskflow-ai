# UC-003 Get Workspace

## Goal

Retrieve a workspace.

## Actor

User

## Preconditions

- The user is authenticated.

## Main Flow

1. The user requests a workspace.
2. The system retrieves the workspace.
3. The system returns the workspace.

## Alternative Flows

### AF-2.1 Workspace does not exist

- **2.a.** The requested workspace does not exist.
- **2.b.** The system informs the user that the workspace does not exist.
- **2.c.** The use case ends.

## Postconditions

- The requested workspace has been returned.

## Business Rules

_None._
