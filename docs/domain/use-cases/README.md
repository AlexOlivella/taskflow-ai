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

The use case identifier (UC-XXX) should remain stable after the initial documentation has been completed.

### Alternative Flows

Alternative Flows are identified by the Main Flow step where they originate (e.g. `AF-4.1` starts at step 4). They may either resume the Main Flow at a later step or terminate the use case.

# Index

## Workspace

- [UC-001 Create Workspace](./UC-001-create-workspace.md)
- [UC-002 Get Workspaces](./UC-002-get-workspaces.md)
- [UC-003 Get Workspace](./UC-003-get-workspace.md)
- [UC-004 Update Workspace](./UC-004-update-workspace.md)
- [UC-005 Delete Workspace](./UC-005-delete-workspace.md)
- [UC-006 Invite User to Workspace](./UC-006-invite-user-to-workspace.md)
- [UC-007 Accept Workspace Invitation](./UC-007-accept-workspace-invitation.md)
- [UC-008 Remove Workspace Member](./UC-008-remove-workspace-member.md)
- [UC-009 Change a Workspace Member's Role](./UC-009-change-a-workspace-members-role.md)

## Project

- [UC-010 Create Project](./UC-010-create-project.md)
- [UC-011 Get Projects](./UC-011-get-projects.md)
- [UC-012 Get Project](./UC-012-get-project.md)
- [UC-013 Update Project](./UC-013-update-project.md)
- [UC-014 Delete Project](./UC-014-delete-project.md)

## Task

- [UC-015 Create Task](./UC-015-create-task.md)
- [UC-016 Get Tasks](./UC-016-get-tasks.md)
- [UC-017 Get Task](./UC-017-get-task.md)
- [UC-018 Update Task](./UC-018-update-task.md)
- [UC-019 Delete Task](./UC-019-delete-task.md)
- [UC-020 Assign Task](./UC-020-assign-task.md)
- [UC-021 Change Task Status](./UC-021-change-task-status.md)
