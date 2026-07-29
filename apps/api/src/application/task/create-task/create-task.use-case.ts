import { Inject, Injectable } from '@nestjs/common';
import { TASK_REPOSITORY, type TaskRepository } from '../task.repository';
import { CreateTaskInput } from './create-task.input';
import { CreateTaskOutput } from './create-task.output';
import {
  ID_GENERATOR,
  type IdGenerator,
} from 'src/application/shared/id-generator';
import { Task } from 'src/domain/task/task.entity';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,

    @Inject(ID_GENERATOR)
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(input: CreateTaskInput): Promise<CreateTaskOutput> {
    const id = this.idGenerator.generate();
    const task = new Task(id, input.workspaceId, input.projectId, input.name);
    await this.taskRepository.save(task);

    return { id };
  }
}
