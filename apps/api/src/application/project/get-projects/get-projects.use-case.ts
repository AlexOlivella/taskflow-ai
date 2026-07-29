import { Inject, Injectable } from '@nestjs/common';
import {
  PROJECT_REPOSITORY,
  type ProjectRepository,
} from '../project.repository';
import { GetProjectsOutput } from './get-projects.output';
import { GetProjectsInput } from './get-projects.input';

@Injectable()
export class GetProjectsUseCase {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async execute(input: GetProjectsInput): Promise<GetProjectsOutput> {
    const projects = await this.projectRepository.findByWorkspaceId(
      input.workspaceId,
    );

    return {
      projects: projects.map((project) => ({
        id: project.id,
        workspaceId: project.workspaceId,
        name: project.name,
      })),
    };
  }
}
