import { Workspace } from './workspace.entity';

describe('Workspace', () => {
  it('should throw when name is empty', () => {
    expect(() => new Workspace('1', '')).toThrow(
      'Workspace name cannot be empty.',
    );
  });

  it('should throw when name contains only spaces', () => {
    expect(() => new Workspace('1', '          ')).toThrow(
      'Workspace name cannot be empty.',
    );
  });

  it('should create a workspace with a valid name', () => {
    expect(() => new Workspace('1', 'Taskflow AI')).not.toThrow();
  });

  it('should rename a workspace with a valid name', () => {
    const workspace = new Workspace('1', 'Taskflow AI');

    workspace.rename('Taskflow renamed');

    expect(workspace.name).toBe('Taskflow renamed');
  });

  it('should throw when renaming to an empty name', () => {
    const workspace = new Workspace('1', 'Taskflow AI');

    expect(() => workspace.rename('')).toThrow(
      'Workspace name cannot be empty.',
    );
  });

  it('should throw when renaming to a name containing only spaces', () => {
    const workspace = new Workspace('1', 'Taskflow AI');

    expect(() => workspace.rename('      ')).toThrow(
      'Workspace name cannot be empty.',
    );
  });
});
