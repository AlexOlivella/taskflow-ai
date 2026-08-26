import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { InvitationNotPendingError } from 'src/application/workspace/errors/invitation-not-pending.error';
import { Response } from 'express';

@Catch(InvitationNotPendingError)
export class InvitationNotPendingFilter implements ExceptionFilter<InvitationNotPendingError> {
  catch(exception: InvitationNotPendingError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(409).json({
      statusCode: 409,
      message: exception.message,
      error: 'Conflict',
    });
  }
}
