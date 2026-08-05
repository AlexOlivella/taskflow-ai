import { Inject, Injectable } from '@nestjs/common';
import { TASK_REPOSITORY, type TaskRepository } from '../task.repository';
import { GetTaskInput } from './get-task.input';
import { GetTaskOutput } from './get-task.output';
import { TaskNotFoundError } from '../errors/task-not-found.error';

@Injectable()
export class GetTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(input: GetTaskInput): Promise<GetTaskOutput> {
    const task = await this.taskRepository.findById(input.id);
    if (!task) {
      throw new TaskNotFoundError(input.id);
    }
    return {
      id: task.id,
      workspaceId: task.workspaceId,
      projectId: task.projectId,
      name: task.name,
    };
  }
}
