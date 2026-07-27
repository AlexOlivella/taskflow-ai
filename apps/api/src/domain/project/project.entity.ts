export class Project {
  readonly id: string;
  readonly workspaceId: string;
  private _name: string;

  constructor(id: string, workspaceId: string, name: string) {
    const normalizedName = this.normalizeName(name);

    this.validateName(normalizedName);

    this.id = id;
    this.workspaceId = workspaceId;
    this._name = normalizedName;
  }

  get name(): string {
    return this._name;
  }

  private normalizeName(name: string): string {
    return name.trim();
  }

  private validateName(name: string): void {
    if (name.length === 0) {
      throw new Error('Project name cannot be empty.');
    }
  }

  public rename(newName: string): void {
    const normalizedName = this.normalizeName(newName);

    this.validateName(normalizedName);

    this._name = normalizedName;
  }
}
