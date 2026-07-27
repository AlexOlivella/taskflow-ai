import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ProjectNameAlreadyExistsError } from 'src/application/project/errors/project-name-already-exists.error';

@Catch(ProjectNameAlreadyExistsError)
export class ProjectNameAlreadyExistsFilter implements ExceptionFilter<ProjectNameAlreadyExistsError> {
  catch(exception: ProjectNameAlreadyExistsError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(409).json({
      statusCode: 409,
      message: exception.message,
      error: 'Conflict',
    });
  }
}
