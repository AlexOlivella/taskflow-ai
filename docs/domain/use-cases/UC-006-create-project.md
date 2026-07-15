# UC-006 Create Project

## Goal

Create a project.

## Actor

User

## Preconditions

- The user is authenticated.

## Main Flow

1. The user requests to create a project.
2. The system creates the project.
3. The system informs the user that the project has been created.

## Alternative Flows

### AF-2.1 Project name already exists within the workspace

- **2.a.** The project name already exists within the workspace.
- **2.b.** The system informs the user that the project name already exists within the workspace.
- **2.c.** The project is not created.

## Postconditions

- A new project exists.

## Business Rules

- Project names must be unique within a workspace.
