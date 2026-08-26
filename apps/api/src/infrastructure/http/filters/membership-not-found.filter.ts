import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { MembershipNotFoundError } from 'src/application/workspace/errors/membership-not-found.error';

@Catch(MembershipNotFoundError)
export class MembershipNotFoundFilter implements ExceptionFilter<MembershipNotFoundError> {
  catch(exception: MembershipNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.status(404).json({
      statusCode: 404,
      message: exception.message,
      error: 'Not Found',
    });
  }
}
