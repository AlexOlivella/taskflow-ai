# UC-014 Delete Project

## Goal

Delete a project.

## Actor

User

## Preconditions

- The user is authenticated.

## Main Flow

1. The user requests to delete a project.
2. The system deletes the project.
3. The system informs the user that the project has been deleted.

## Alternative Flows

_None._

## Postconditions

- The project no longer exists.
- Tasks previously assigned to the deleted project remain in the workspace and become unassigned from any project.

## Business Rules

_No additional business rules._
