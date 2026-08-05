# UC-016 Get Tasks

## Goal

Retrieve all tasks belonging to a workspace.

## Actor

User

## Preconditions

- The user is authenticated.

## Main Flow

1. The user requests the list of tasks in a workspace.
2. The system retrieves all tasks belonging to the workspace.
3. The system returns the list of tasks.

## Alternative Flows

_None._

## Postconditions

- The user receives the list of tasks in the workspace.

## Business Rules

- Only tasks belonging to the requested workspace are returned.
