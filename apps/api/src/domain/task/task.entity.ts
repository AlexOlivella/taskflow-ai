import { TaskStatus } from './task-status.enum';

export class Task {
  readonly id: string;
  readonly workspaceId: string;
  readonly projectId: string | null;
  private _assigneeId: string | null;
  private _name: string;
  private _status: TaskStatus;

  constructor(
    id: string,
    workspaceId: string,
    projectId: string | null,
    assigneeId: string | null,
    name: string,
    status: TaskStatus = TaskStatus.TODO,
  ) {
    const normalizedName = this.normalizeName(name);

    this.validateName(normalizedName);

    this.id = id;
    this.workspaceId = workspaceId;
    this.projectId = projectId;
    this._assigneeId = assigneeId;
    this._name = normalizedName;
    this._status = status;
  }

  get name(): string {
    return this._name;
  }

  get assigneeId(): string | null {
    return this._assigneeId;
  }

  get status(): TaskStatus {
    return this._status;
  }

  private normalizeName(name: string): string {
    return name.trim();
  }

  private validateName(name: string): void {
    if (name.length === 0) {
      throw new Error('Task name cannot be empty.');
    }
  }

  public rename(newName: string): void {
    const normalizedName = this.normalizeName(newName);

    this.validateName(normalizedName);

    this._name = normalizedName;
  }

  public assignTo(userId: string | null): void {
    this._assigneeId = userId;
  }

  public changeStatus(status: TaskStatus): void {
    this._status = status;
  }
}
