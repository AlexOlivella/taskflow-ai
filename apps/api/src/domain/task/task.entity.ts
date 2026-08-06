export class Task {
  readonly id: string;
  readonly workspaceId: string;
  readonly projectId: string | null;
  private _assigneeId: string | null;
  private _name: string;

  constructor(
    id: string,
    workspaceId: string,
    projectId: string | null,
    assigneeId: string | null,
    name: string,
  ) {
    const normalizedName = this.normalizeName(name);

    this.validateName(normalizedName);

    this.id = id;
    this.workspaceId = workspaceId;
    this.projectId = projectId;
    this._assigneeId = assigneeId;
    this._name = normalizedName;
  }

  get name(): string {
    return this._name;
  }

  get assigneeId(): string | null {
    return this._assigneeId;
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
}
