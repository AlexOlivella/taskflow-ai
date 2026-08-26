import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { WorkspaceMustHaveOwnerError } from 'src/application/workspace/errors/workspace-must-have-owner.error';

@Catch(WorkspaceMustHaveOwnerError)
export class WorkspaceMustHaveOwnerFilter implements ExceptionFilter<WorkspaceMustHaveOwnerError> {
  catch(exception: WorkspaceMustHaveOwnerError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(409).json({
      statusCode: 409,
      message: exception.message,
      error: 'Conflict',
    });
  }
}
