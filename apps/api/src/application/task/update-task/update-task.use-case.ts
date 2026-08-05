import { Inject, Injectable } from '@nestjs/common';
import { TASK_REPOSITORY, type TaskRepository } from '../task.repository';
import { UpdateTaskInput } from './update-task.input';
import { UpdateTaskOutput } from './update-task.output';
import { TaskNotFoundError } from '../errors/task-not-found.error';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(input: UpdateTaskInput): Promise<UpdateTaskOutput> {
    const task = await this.taskRepository.findById(input.id);
    if (!task) {
      throw new TaskNotFoundError(input.id);
    }

    task.rename(input.name);
    await this.taskRepository.save(task);

    return {
      task: {
        id: task.id,
        workspaceId: task.workspaceId,
        projectId: task.projectId,
        name: task.name,
      },
    };
  }
}
