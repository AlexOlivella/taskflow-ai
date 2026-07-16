# UC-002 Invite User to Workspace

## Goal

Invite a person to collaborate in a workspace.

## Actor

User

## Preconditions

- The user is authenticated.

## Main Flow

1. The user requests to invite a person to the workspace.
2. The system creates the invitation.
3. The system sends the invitation.
4. The system informs the user that the invitation has been sent.

## Alternative Flows

### AF-2.1 The person already belongs to the workspace

- **2.a.** The person already belongs to the workspace.
- **2.b.** The system informs the user that the person already belongs to the workspace.
- **2.c.** The invitation is not created.

### AF-2.2 A pending invitation already exists

- **2.a.** A pending invitation already exists for the email address in the workspace.
- **2.b.** The system informs the user that a pending invitation already exists for the email address in the workspace.
- **2.c.** The invitation is not created.

## Postconditions

- A new invitation exists.

## Business Rules

- A workspace member cannot be invited to the same workspace.
- Only one pending invitation per email address can exist within a workspace.
