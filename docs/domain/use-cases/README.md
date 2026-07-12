# Use Cases

This directory contains the functional use cases of TaskFlow AI.

Each use case describes a single interaction between an actor and the system.

Every use case follows the same structure:

- Goal
- Actor
- Preconditions
- Main Flow
- Alternative Flows
- Postconditions
- Business Rules

The use case identifier (UC-XXX) is stable and should not change over time, even if the title evolves.

### Alternative Flows

Alternative Flows are identified by the Main Flow step where they originate (e.g. `AF-4.1` starts from step 4). They may either resume the Main Flow at a later step or terminate the use case.

# Index

## Workspace

- [UC-001 Create Workspace](./UC-001-create-workspace.md)
- UC-002 Invite User
- UC-003 Leave Workspace

## Project

- UC-004 Create Project
- UC-005 Update Project
- UC-006 Delete Project

## Task

- UC-007 Create Task
- UC-008 Update Task
- UC-009 Delete Task
- UC-010 Assign Task
- UC-011 Change Task Status

## Invitation

- UC-012 Accept Invitation
- UC-013 Reject Invitation
