import { WorkspaceRole } from './workspaceRole.enum';

export class WorkspaceMembership {
  readonly id: string;
  readonly workspaceId: string;
  readonly userId: string;
  private _role: WorkspaceRole;

  constructor(
    id: string,
    workspaceId: string,
    userId: string,
    role: WorkspaceRole = WorkspaceRole.MEMBER,
  ) {
    this.id = id;
    this.workspaceId = workspaceId;
    this.userId = userId;
    this._role = role;
  }

  get role(): WorkspaceRole {
    return this._role;
  }

  public changeRole(role: WorkspaceRole): void {
    this._role = role;
  }
}
