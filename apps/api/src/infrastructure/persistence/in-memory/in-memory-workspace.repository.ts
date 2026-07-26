import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from 'src/application/workspace/workspace.repository';
import { Workspace } from 'src/domain/workspace/workspace.entity';

@Injectable()
export class InMemoryWorkspaceRepository implements WorkspaceRepository {
  private readonly workspaces: Workspace[] = [];

  save(workspace: Workspace): Promise<void> {
    const workspacePosition = this.workspaces.findIndex(
      (workspaceItem) => workspaceItem.id === workspace.id,
    );

    if (workspacePosition !== -1) {
      this.workspaces[workspacePosition] = workspace;
    } else {
      this.workspaces.push(workspace);
    }

    return Promise.resolve();
  }

  findAll(): Promise<Workspace[]> {
    return Promise.resolve([...this.workspaces]);
  }

  findById(id: string): Promise<Workspace | null> {
    return Promise.resolve(
      this.workspaces.find((workspace) => workspace.id === id) || null,
    );
  }

  delete(id: string): Promise<void> {
    const workspacePosition = this.workspaces.findIndex(
      (workspaceItem) => workspaceItem.id === id,
    );

    if (workspacePosition === -1) {
      return Promise.resolve();
    }

    this.workspaces.splice(workspacePosition, 1);

    return Promise.resolve();
  }
}
