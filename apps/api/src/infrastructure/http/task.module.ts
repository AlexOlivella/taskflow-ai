import { Module } from '@nestjs/common';
import { CreateTaskUseCase } from 'src/application/task/create-task/create-task.use-case';
import { TASK_REPOSITORY } from 'src/application/task/task.repository';
import { InMemoryTaskRepository } from '../persistence/in-memory/in-memory-task.repository';
import { ID_GENERATOR } from 'src/application/shared/id-generator';
import { UuidIdGenerator } from '../ids/uuid-id-generator';
import { TaskController } from './controllers/task.controller';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [
    // Use Cases
    CreateTaskUseCase,

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
