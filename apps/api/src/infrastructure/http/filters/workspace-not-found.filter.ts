import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { WorkspaceNotFoundError } from 'src/application/workspace/errors/workspace-not-found.error';

@Catch(WorkspaceNotFoundError)
export class WorkspaceNotFoundFilter implements ExceptionFilter<WorkspaceNotFoundError> {
  catch(exception: WorkspaceNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.status(404).json({
      statusCode: 404,
      message: exception.message,
      error: 'Not Found',
    });
  }
}
