import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { InvitationAlreadyPendingError } from 'src/application/workspace/errors/invitation-already-pending.error';

@Catch(InvitationAlreadyPendingError)
export class InvitationAlreadyPendingFilter implements ExceptionFilter<InvitationAlreadyPendingError> {
  catch(exception: InvitationAlreadyPendingError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(409).json({
      statusCode: 409,
      message: exception.message,
      error: 'Conflict',
    });
  }
}
