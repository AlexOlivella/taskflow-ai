# UC-001 Create Workspace

## Goal

Create a new workspace where users can collaborate. The creator becomes its initial Owner.

## Actor

User

## Preconditions

- The user is authenticated

## Main Flow

1. The user requests to create a new workspace.
2. The system prompts the user for the workspace name.
3. The user provides the workspace name.
4. The system validates the workspace name.
5. The system creates the workspace.
6. The system creates an initial workspace membership with the Owner role for the creator.
7. The system confirms that the workspace has been created.

## Alternative Flows

### AF-4.1 Invalid workspace name

4a. The workspace name is empty.
4b. The system informs the user that the workspace name is required.
4c. The workspace is not created.

## Postconditions

- A new workspace exists.
- The creator is the Owner of the workspace.

## Business Rules

- The creator of a workspace becomes its initial Owner.
