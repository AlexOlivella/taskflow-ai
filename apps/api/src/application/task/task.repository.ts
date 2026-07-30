import { Task } from 'src/domain/task/task.entity';

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findById(id: string): Promise<Task | null>;
  findByWorkspaceId(workspaceId: string): Promise<Task[]>;
}
