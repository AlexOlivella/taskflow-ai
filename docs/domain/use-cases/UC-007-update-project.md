# UC-007 Update Project

## Goal

Update a project.

## Actor

User

## Preconditions

- The user is authenticated.

## Main Flow

1. The user requests to update a project.
2. The system updates the project.
3. The system informs the user that the project has been updated.

## Alternative Flows

### AF-2.1 Project name already exists within the workspace

- **2.a.** The project name already exists within the workspace.
- **2.b.** The system informs the user that the project name already exists within the workspace.
- **2.c.** The project is not updated.

## Postconditions

- The project is updated.

## Business Rules

- Project names must be unique within a workspace.
