import { Module } from '@nestjs/common';
import { CreateTaskUseCase } from 'src/application/task/create-task/create-task.use-case';
import { TASK_REPOSITORY } from 'src/application/task/task.repository';
import { InMemoryTaskRepository } from '../persistence/in-memory/in-memory-task.repository';
import { ID_GENERATOR } from 'src/application/shared/id-generator';
import { UuidIdGenerator } from '../ids/uuid-id-generator';
import { TaskController } from './controllers/task.controller';
import { GetTasksUseCase } from 'src/application/task/get-tasks/get-tasks.use-case';
import { GetTaskUseCase } from 'src/application/task/get-task/get-task.use-case';
import { UpdateTaskUseCase } from 'src/application/task/update-task/update-task.use-case';
import { DeleteTaskUseCase } from 'src/application/task/delete-task/delete-task.use-case';
import { AssignTaskUseCase } from 'src/application/task/assign-task/assign-task.use-case';
import { ChangeTaskStatusUseCase } from 'src/application/task/change-task-status/change-task-status.use-case';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [
    // Use Cases
    CreateTaskUseCase,
    GetTasksUseCase,
    GetTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    AssignTaskUseCase,
    ChangeTaskStatusUseCase,

    // Infraestructure
    {
      provide: TASK_REPOSITORY,
      useClass: InMemoryTaskRepository,
    },
    {
      provide: ID_GENERATOR,
      useClass: UuidIdGenerator,
    },
  ],
})
export class TaskModule {}
