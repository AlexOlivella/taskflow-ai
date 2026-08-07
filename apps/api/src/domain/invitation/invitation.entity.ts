import { InvitationStatus } from './invitationStatus.enum';

export class Invitation {
  readonly id: string;
  readonly workspaceId: string;
  readonly inviterId: string;
  readonly createdAt: Date;

  private _inviteeEmail: string;
  private _status: InvitationStatus;

  constructor(
    id: string,
    workspaceId: string,
    inviterId: string,
    inviteeEmail: string,
    createdAt: Date,
  ) {
    const normalizedEmail = this.normalizeEmail(inviteeEmail);

    this.validateEmail(normalizedEmail);

    this.id = id;
    this.workspaceId = workspaceId;
    this.inviterId = inviterId;
    this.createdAt = createdAt;

    this._inviteeEmail = normalizedEmail;
    this._status = InvitationStatus.PENDING;
  }

  get inviteeEmail(): string {
    return this._inviteeEmail;
  }

  get status(): InvitationStatus {
    return this._status;
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private validateEmail(email: string): void {
    if (email.length === 0) {
      throw new Error('Invitee email cannot be empty.');
    }
  }

  public accept(): void {
    this._status = InvitationStatus.ACCEPTED;
  }

  public reject(): void {
    this._status = InvitationStatus.REJECTED;
  }
}
