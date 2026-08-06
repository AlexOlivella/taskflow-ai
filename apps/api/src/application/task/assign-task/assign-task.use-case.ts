import { Inject, Injectable } from '@nestjs/common';
import { TASK_REPOSITORY, type TaskRepository } from '../task.repository';
import { AssignTaskInput } from './assign-task.input';
import { AssignTaskOutput } from './assign-task.output';
import { TaskNotFoundError } from '../errors/task-not-found.error';

@Injectable()
export class AssignTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(input: AssignTaskInput): Promise<AssignTaskOutput> {
    const task = await this.taskRepository.findById(input.id);
    if (!task) {
      throw new TaskNotFoundError(input.id);
    }
    // TODO: Validate request with ValidationPipe + class-validator.
    // assigneeId must be present (string | null), undefined is not allowed.
    task.assignTo(input.assigneeId);
    await this.taskRepository.save(task);

    return {
      task: {
        id: task.id,
        workspaceId: task.workspaceId,
        projectId: task.projectId,
        assigneeId: task.assigneeId,
        name: task.name,
      },
    };
  }
}
