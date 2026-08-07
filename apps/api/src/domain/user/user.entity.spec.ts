import { User } from './user.entity';

describe('User', () => {
  it('should throw when name is empty', () => {
    expect(() => new User('user-1', '', 'user@user.com')).toThrow(
      'User name cannot be empty.',
    );
  });

  it('should throw when name contains only spaces', () => {
    expect(() => new User('user-1', '          ', 'user@user.com')).toThrow(
      'User name cannot be empty.',
    );
  });

  it('should create a user', () => {
    const user = new User('user-1', 'User 1', 'user@user.com');

    expect(user.id).toBe('user-1');
    expect(user.name).toBe('User 1');
    expect(user.email).toBe('user@user.com');
  });

  it('should rename a user with a valid name', () => {
    const user = new User('user-1', 'User 1', 'user@user.com');

    user.rename('User renamed');

    expect(user.name).toBe('User renamed');
  });

  it('should normalize renamed name', () => {
    const user = new User('user-1', 'User 1', 'user@user.com');

    user.rename('   User renamed   ');

    expect(user.name).toBe('User renamed');
  });

  it('should throw when renaming to an empty name', () => {
    const user = new User('user-1', 'User 1', 'user@user.com');

    expect(() => user.rename('')).toThrow('User name cannot be empty.');
  });

  it('should throw when renaming to a name containing only spaces', () => {
    const user = new User('user-1', 'User 1', 'user@user.com');

    expect(() => user.rename('      ')).toThrow('User name cannot be empty.');
  });

  it('should throw when email is empty', () => {
    expect(() => new User('user-1', 'User 1', '')).toThrow(
      'User email cannot be empty.',
    );
  });

  it('should throw when email contains only spaces', () => {
    expect(() => new User('user-1', 'User 1', '      ')).toThrow(
      'User email cannot be empty.',
    );
  });

  it('should normalize email', () => {
    const user = new User('user-1', 'User 1', '  USER@Example.COM  ');

    expect(user.email).toBe('user@example.com');
  });
});
