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
- [UC-002 Invite User to Workspace](./UC-002-invite-user-to-workspace.md)
- [UC-003 Accept Workspace Invitation](./UC-003-accept-workspace-invitation.md)
- UC-004 Remove Workspace Member
- UC-005 Change Workspace Member Role

## Project

- UC-006 Create Project
- UC-007 Update Project
- UC-008 Delete Project

## Task

- UC-009 Create Task
- UC-010 Update Task
- UC-011 Delete Task
- UC-012 Assign Task
- UC-013 Change Task Status
