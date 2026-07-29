# UC-011 Get Projects

## Goal

Retrieve all projects belonging to a workspace.

## Actor

User

## Preconditions

- The user is authenticated.

## Main Flow

1. The user requests the list of projects for a workspace.
2. The system retrieves all projects belonging to the workspace.
3. The system returns the list of projects.

## Alternative Flows

_None._

## Postconditions

_None._

## Business Rules

- Only projects belonging to the requested workspace are returned.
