import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { UserAlreadyWorkspaceMemberError } from 'src/application/workspace/errors/user-already-workspace-member.error';

@Catch(UserAlreadyWorkspaceMemberError)
export class UserAlreadyWorkspaceMemberFilter implements ExceptionFilter<UserAlreadyWorkspaceMemberError> {
  catch(exception: UserAlreadyWorkspaceMemberError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(409).json({
      statusCode: 409,
      message: exception.message,
      error: 'Conflict',
    });
  }
}
