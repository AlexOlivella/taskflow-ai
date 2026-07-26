import { Workspace } from 'src/domain/workspace/workspace.entity';

export interface WorkspaceRepository {
  save(workspace: Workspace): Promise<void>;
  findAll(): Promise<Workspace[]>;
  findById(id: string): Promise<Workspace | null>;
  delete(id: string): Promise<void>;
}

export const WORKSPACE_REPOSITORY = Symbol('WORKSPACE_REPOSITORY');
