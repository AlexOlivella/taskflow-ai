import { InMemoryProjectRepository } from 'src/infrastructure/persistence/in-memory/in-memory-project.repository';
import { GetProjectUseCase } from './get-project.use-case';
import { Project } from 'src/domain/project/project.entity';
import { ProjectNotFoundError } from '../errors/project-not-found.error';

describe('GetProjectUseCase', () => {
  it('should return the project', async () => {
    // Arrange
    const projectRepository = new InMemoryProjectRepository();
    const useCase = new GetProjectUseCase(projectRepository);

    await projectRepository.save(
      new Project('project-1', 'workspace-1', 'Project 1'),
    );
    // Act
    const output = await useCase.execute({ id: 'project-1' });

    // Assert
    expect(output.project.id).toBe('project-1');
    expect(output.project.workspaceId).toBe('workspace-1');
    expect(output.project.name).toBe('Project 1');
  });

  it('should throw when the project does not exist', async () => {
    // Arrange
    const projectRepository = new InMemoryProjectRepository();
    const useCase = new GetProjectUseCase(projectRepository);

    // Act & Assert
    await expect(useCase.execute({ id: 'project-2' })).rejects.toThrow(
      ProjectNotFoundError,
    );
  });
});
