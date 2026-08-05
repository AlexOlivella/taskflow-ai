# UC-017 Get Task

## Goal

Retrieve a task.

## Actor

User

## Preconditions

- The user is authenticated.

## Main Flow

1. The user requests a task.
2. The system retrieves the task.
3. The system returns the task.

## Alternative Flows

### 2a. Task does not exist

1. The system informs the user that the task does not exist.

## Postconditions

- The requested task is returned.

## Business Rules

- A task must exist.
