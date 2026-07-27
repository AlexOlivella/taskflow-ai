import { Project } from 'src/domain/project/project.entity';

export const PROJECT_REPOSITORY = Symbol('PROJECT_REPOSITORY');

export interface ProjectRepository {
  findByWorkspaceIdAndName(
    workspaceId: string,
    name: string,
  ): Promise<Project | null>;

  save(project: Project): Promise<void>;
}
