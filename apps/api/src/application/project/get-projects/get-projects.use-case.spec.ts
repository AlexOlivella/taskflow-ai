import { InMemoryProjectRepository } from 'src/infrastructure/persistence/in-memory/in-memory-project.repository';
import { GetProjectsUseCase } from './get-projects.use-case';
import { Project } from 'src/domain/project/project.entity';

describe('GetProjectsUseCase', () => {
  it('should return projects associated with the workspaceId', async () => {
    // Arrange
    const projectRepository = new InMemoryProjectRepository();
    const useCase = new GetProjectsUseCase(projectRepository);

    await projectRepository.save(
      new Project('project-1', 'workspace-1', 'Project 1'),
    );
    await projectRepository.save(
      new Project('project-2', 'workspace-1', 'Project 2'),
    );

    // Act
    const output = await useCase.execute({ workspaceId: 'workspace-1' });

    // Assert
    expect(output.projects).toHaveLength(2);
    expect(output.projects[0].id).toBe('project-1');
    expect(output.projects[0].workspaceId).toBe('workspace-1');
    expect(output.projects[0].name).toBe('Project 1');
    expect(output.projects[1].id).toBe('project-2');
    expect(output.projects[1].workspaceId).toBe('workspace-1');
    expect(output.projects[1].name).toBe('Project 2');
  });

  it('should return an empty list when there is no projects associated in the workspaceId', async () => {
    // Arrange
    const projectRepository = new InMemoryProjectRepository();
    const useCase = new GetProjectsUseCase(projectRepository);

    // Act
    const output = await useCase.execute({ workspaceId: 'workspace-1' });

    // Assert
    expect(output.projects).toHaveLength(0);
  });

  it('should return only projects belonging to the requested workspace', async () => {
    // Arrange
    const projectRepository = new InMemoryProjectRepository();
    const useCase = new GetProjectsUseCase(projectRepository);

    await projectRepository.save(
      new Project('project-1', 'workspace-1', 'Project 1'),
    );
    await projectRepository.save(
      new Project('project-2', 'workspace-1', 'Project 2'),
    );

    await projectRepository.save(
      new Project('project-3', 'workspace-2', 'Project 3'),
    );

    // Act
    const output = await useCase.execute({ workspaceId: 'workspace-1' });

    // Assert
    expect(output.projects).toHaveLength(2);
    expect(
      output.projects.every((project) => project.workspaceId === 'workspace-1'),
    ).toBe(true);
    expect(output.projects.map((project) => project.id)).toEqual([
      'project-1',
      'project-2',
    ]);
  });
});
