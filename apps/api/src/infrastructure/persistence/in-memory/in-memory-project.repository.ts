import { Injectable } from '@nestjs/common';
import { ProjectRepository } from 'src/application/project/project.repository';
import { Project } from 'src/domain/project/project.entity';

@Injectable()
export class InMemoryProjectRepository implements ProjectRepository {
  private readonly projects: Project[] = [];

  save(project: Project): Promise<void> {
    const projectPosition = this.projects.findIndex(
      (projectItem) => projectItem.id === project.id,
    );

    if (projectPosition !== -1) {
      this.projects[projectPosition] = project;
    } else {
      this.projects.push(project);
    }

    return Promise.resolve();
  }
  findByWorkspaceIdAndName(
    workspaceId: string,
    name: string,
  ): Promise<Project | null> {
    const project =
      this.projects.find(
        (project) =>
          project.workspaceId === workspaceId && project.name === name,
      ) ?? null;
    return Promise.resolve(project);
  }

  findById(id: string): Promise<Project | null> {
    const project = this.projects.find((project) => project.id === id) ?? null;
    return Promise.resolve(project);
  }

  delete(id: string): Promise<void> {
    const projectIndex = this.projects.findIndex(
      (project) => project.id === id,
    );

    if (projectIndex === -1) {
      return Promise.resolve();
    }

    this.projects.splice(projectIndex, 1);

    return Promise.resolve();
  }

  findByWorkspaceId(workspaceId: string): Promise<Project[]> {
    return Promise.resolve(
      this.projects.filter((project) => project.workspaceId === workspaceId),
    );
  }
}
