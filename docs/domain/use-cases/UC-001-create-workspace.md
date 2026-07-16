# UC-001 Create Workspace

## Goal

Create a workspace.

## Actor

User

## Preconditions

- The user is authenticated.

## Main Flow

1. The user requests to create a workspace.
2. The system creates the workspace.
3. The system creates an initial workspace membership with the Owner role for the creator.
4. The system informs the user that the workspace has been created.

## Alternative Flows

_None._

## Postconditions

- A new workspace exists.
- The creator is the Owner of the workspace.

## Business Rules

- A workspace must have a name.
- The creator of a workspace becomes its initial Owner.
