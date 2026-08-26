import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { InvitationNotFoundError } from 'src/application/workspace/errors/invitation-not-found.error';

@Catch(InvitationNotFoundError)
export class InvitationNotFoundFilter implements ExceptionFilter<InvitationNotFoundError> {
  catch(exception: InvitationNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.status(404).json({
      statusCode: 404,
      message: exception.message,
      error: 'Not Found',
    });
  }
}
