export class User {
  readonly id: string;
  private _name: string;
  private _email: string;

  constructor(id: string, name: string, email: string) {
    const normalizedName = this.normalizeName(name);

    this.validateName(normalizedName);

    const normalizedEmail = this.normalizeEmail(email);

    this.validateEmail(normalizedEmail);

    this.id = id;
    this._name = normalizedName;
    this._email = normalizedEmail;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  private normalizeName(name: string): string {
    return name.trim();
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private validateName(name: string): void {
    if (name.length === 0) {
      throw new Error('User name cannot be empty.');
    }
  }

  private validateEmail(email: string): void {
    if (email.length === 0) {
      throw new Error('User email cannot be empty.');
    }
  }

  public rename(newName: string): void {
    const normalizedName = this.normalizeName(newName);

    this.validateName(normalizedName);

    this._name = normalizedName;
  }
}
