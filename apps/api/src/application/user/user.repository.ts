import { User } from 'src/domain/user/user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
  save(user: User): Promise<void>;
  findUserByEmail(email: string): Promise<User | null>;
}
