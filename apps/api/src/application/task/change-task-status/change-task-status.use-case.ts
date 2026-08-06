import { Inject, Injectable } from '@nestjs/common';
import { TASK_REPOSITORY, type TaskRepository } from '../task.repository';
import { ChangeTaskStatusInput } from './change-task-status.input';
import { ChangeTaskStatusOutput } from './change-task-status.output';
import { TaskNotFoundError } from '../errors/task-not-found.error';

@Injectable()
export class ChangeTaskStatusUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}
  async execute(input: ChangeTaskStatusInput): Promise<ChangeTaskStatusOutput> {
    const task = await this.taskRepository.findById(input.id);

    if (!task) {
      throw new TaskNotFoundError(input.id);
    }

    task.changeStatus(input.status);
    await this.taskRepository.save(task);

    return {
      task: {
        id: task.id,
        workspaceId: task.workspaceId,
        projectId: task.projectId,
        assigneeId: task.assigneeId,
        name: task.name,
        status: task.status,
      },
    };
  }
}
