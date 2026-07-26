import { Inject, Injectable } from '@nestjs/common';
import {
  WORKSPACE_REPOSITORY,
  type WorkspaceRepository,
} from '../workspace.repository';
import { GetWorkspacesOutput } from './get-workspaces.output';

@Injectable()
export class GetWorkspacesUseCase {
  constructor(
    @Inject(WORKSPACE_REPOSITORY)
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async execute(): Promise<GetWorkspacesOutput> {
    const workspaces = await this.workspaceRepository.findAll();

    return {
      workspaces: workspaces.map((workspace) => ({
        id: workspace.id,
        name: workspace.name,
      })),
    };
  }
}
