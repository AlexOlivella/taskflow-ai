import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { TaskNotFoundError } from 'src/application/task/errors/task-not-found.error';

@Catch(TaskNotFoundError)
export class TaskNotFoundFilter implements ExceptionFilter<TaskNotFoundError> {
  catch(exception: TaskNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.status(404).json({
      statusCode: 404,
      message: exception.message,
      error: 'Not Found',
    });
  }
}
