import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/user/user.repository';
import { User } from 'src/domain/user/user.entity';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  save(user: User): Promise<void> {
    const userIndex = this.users.findIndex(
      (existingUser) => existingUser.id === user.id,
    );

    if (userIndex === -1) {
      this.users.push(user);
    } else {
      this.users[userIndex] = user;
    }

    return Promise.resolve();
  }

  findUserByEmail(email: string): Promise<User | null> {
    return Promise.resolve(
      this.users.find((user) => user.email === email) ?? null,
    );
  }
}
