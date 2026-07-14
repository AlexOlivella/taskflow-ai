# UC-003 Accept Workspace Invitation

## Goal

Accept an invitation to collaborate in a workspace.

## Actor

Person

## Preconditions

_None._

## Main Flow

1. The person accepts the invitation.
2. The system verifies that the invitation is pending.
3. The system creates the workspace membership.
4. The system marks the invitation as accepted.
5. The system informs the person that they are now a member of the workspace.

## Alternative Flows

### AF-2.1 Invitation is not pending

- **2.a.** The invitation is not pending.
- **2.b.** The system informs the person that the invitation cannot be accepted.
- **2.c.** The workspace membership is not created.

## Postconditions

- A new workspace membership exists.
- The invitation is accepted.

## Business Rules

_No additional business rules._
