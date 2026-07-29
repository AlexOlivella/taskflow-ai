import { Project } from 'src/domain/project/project.entity';
import { InMemoryProjectRepository } from 'src/infrastructure/persistence/in-memory/in-memory-project.repository';
import { DeleteProjectUseCase } from './delete-project.use-case';
import { ProjectNotFoundError } from '../errors/project-not-found.error';

describe('DeleteProjectUseCase', () => {
  it('should delete the project', async () => {
    // Arrange
    const projectRepository = new InMemoryProjectRepository();
    const useCase = new DeleteProjectUseCase(projectRepository);
    await projectRepository.save(
      new Project('project-1', 'workspace-1', 'Project 1'),
    );

    // Act
    const output = await useCase.execute({ id: 'project-1' });

    // Assert
    expect(output.id).toBe('project-1');

    const projectDeleted = await projectRepository.findById('project-1');

    expect(projectDeleted).toBeNull();
  });

  it('should throw when the project does not exist', async () => {
    // Arrange
    const projectRepository = new InMemoryProjectRepository();
    const useCase = new DeleteProjectUseCase(projectRepository);
    // Act & Assert

    await expect(useCase.execute({ id: 'project-1' })).rejects.toThrow(
      ProjectNotFoundError,
    );
  });
});
