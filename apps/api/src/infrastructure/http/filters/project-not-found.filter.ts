import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ProjectNotFoundError } from 'src/application/project/errors/project-not-found.error';

@Catch(ProjectNotFoundError)
export class ProjectNotFoundFilter implements ExceptionFilter<ProjectNotFoundError> {
  catch(exception: ProjectNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.status(404).json({
      statusCode: 404,
      message: exception.message,
      error: 'Not Found',
    });
  }
}
