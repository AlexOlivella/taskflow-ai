export class InvitationNotFoundError extends Error {
  constructor(public readonly id: string) {
    super(`Invitation with id "${id}" not found`);
    this.name = InvitationNotFoundError.name;
  }
}
