export class InvitationNotPendingError extends Error {
  constructor(public readonly id: string) {
    super(`Invitation ${id} cannot be accepted because it is not pending.`);
    this.name = InvitationNotPendingError.name;
  }
}
