# UC-002 Invite User to Workspace

## Goal

Invite a person to collaborate in a workspace.

## Actor

User

## Preconditions

- The user is authenticated.

## Main Flow

1. The user requests to invite a person to the workspace.
2. The system prompts the user for the person's email address.
3. The user provides the email address.
4. The system validates the email address.
5. The system verifies that the person is not already a member of the workspace.
6. The system verifies that no pending invitation exists for the email address in the workspace.
7. The system creates the invitation.
8. The system sends the invitation.
9. The system confirms that the invitation has been sent.

## Alternative Flows

### AF-4.1 Invalid email address

- **4.a.** The email address is invalid.
- **4.b.** The system informs the user that the email address is invalid.
- **4.c.** The invitation is not created.

### AF-5.1 Person already belongs to the workspace

- **5.a.** The person already belongs to the workspace.
- **5.b.** The system informs the user that the person already belongs to the workspace.
- **5.c.** The invitation is not created.

### AF-6.1 Pending invitation already exists

- **6.a.** A pending invitation already exists for the email address in the workspace.
- **6.b.** The system informs the user that a pending invitation already exists for the email address in the workspace.
- **6.c.** The invitation is not created.

## Postconditions

- A new invitation exists.

## Business Rules

_No additional business rules._
