import { Inject, Injectable } from '@nestjs/common';
import { TASK_REPOSITORY, type TaskRepository } from '../task.repository';
import { DeleteTaskInput } from './delete-task.input';
import { DeleteTaskOutput } from './delete-task.output';
import { TaskNotFoundError } from '../errors/task-not-found.error';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(input: DeleteTaskInput): Promise<DeleteTaskOutput> {
    const task = await this.taskRepository.findById(input.id);

    if (!task) {
      throw new TaskNotFoundError(input.id);
    }

    await this.taskRepository.delete(task.id);

    return { id: task.id };
  }
}
