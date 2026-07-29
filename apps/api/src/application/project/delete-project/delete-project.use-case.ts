import { Inject, Injectable } from '@nestjs/common';
import {
  PROJECT_REPOSITORY,
  type ProjectRepository,
} from '../project.repository';
import { DeleteProjectInput } from './delete-project.input';
import { DeleteProjectOutput } from './delete-project.output';
import { ProjectNotFoundError } from '../errors/project-not-found.error';

@Injectable()
export class DeleteProjectUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(input: DeleteProjectInput): Promise<DeleteProjectOutput> {
    const project = await this.projectRepository.findById(input.id);

    if (!project) {
      throw new ProjectNotFoundError(input.id);
    }

    await this.projectRepository.delete(input.id);

    return {
      id: project.id,
    };
  }
}
