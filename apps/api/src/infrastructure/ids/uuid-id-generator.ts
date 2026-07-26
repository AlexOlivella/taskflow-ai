import { Injectable } from '@nestjs/common';
import { IdGenerator } from 'src/application/shared/id-generator';

@Injectable()
export class UuidIdGenerator implements IdGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
