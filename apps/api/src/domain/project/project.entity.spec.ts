import { Project } from './project.entity';

describe('Project', () => {
  it('should throw when name is empty', () => {
    expect(() => new Project('1', 'workspace-1', '')).toThrow(
      'Project name cannot be empty.',
    );
  });

  it('should throw when name contains only spaces', () => {
    expect(() => new Project('1', 'workspace-1', '          ')).toThrow(
      'Project name cannot be empty.',
    );
  });

  it('should create a project with a valid name', () => {
    const project = new Project('1', 'workspace-1', 'Project 1');

    expect(project.id).toBe('1');
    expect(project.workspaceId).toBe('workspace-1');
    expect(project.name).toBe('Project 1');
  });

  it('should rename a project with a valid name', () => {
    const project = new Project('1', 'workspace-1', 'Project 1');

    project.rename('Project renamed');

    expect(project.name).toBe('Project renamed');
  });

  it('should throw when renaming to an empty name', () => {
    const project = new Project('1', 'workspace-1', 'Project 1');

    expect(() => project.rename('')).toThrow('Project name cannot be empty.');
  });

  it('should throw when renaming to a name containing only spaces', () => {
    const project = new Project('1', 'workspace-1', 'Project 1');

    expect(() => project.rename('      ')).toThrow(
      'Project name cannot be empty.',
    );
  });
});
