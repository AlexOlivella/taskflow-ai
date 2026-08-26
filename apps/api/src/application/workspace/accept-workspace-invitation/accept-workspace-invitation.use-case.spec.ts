import { InMemoryInvitationRepository } from 'src/infrastructure/persistence/in-memory/in-memory-invitation.repository';
import { AcceptWorkspaceInvitationUseCase } from './accept-workspace-invitation.use-case';
import { InMemoryUserRepository } from 'src/infrastructure/persistence/in-memory/in-memory-user.repository';
import { InMemoryWorkspaceMembershipRepository } from 'src/infrastructure/persistence/in-memory/in-memory-workspaceMembership.repository';
import { IdGenerator } from 'src/application/shared/id-generator';
import { Invitation } from 'src/domain/invitation/invitation.entity';
import { InvitationStatus } from 'src/domain/invitation/invitationStatus.enum';
import { User } from 'src/domain/user/user.entity';
import { InvitationNotFoundError } from '../errors/invitation-not-found.error';
import { InvitationNotPendingError } from '../errors/invitation-not-pending.error';

describe('AcceptWorkspaceInvitationUseCase', () => {
  class FakeIdGenerator implements IdGenerator {
    private counter = 0;

    generate(): string {
      this.counter++;
      return `id-${this.counter}`;
    }
  }

  const generateEnvironment = () => {
    const userRepository = new InMemoryUserRepository();
    const workspaceMembershipRepository =
      new InMemoryWorkspaceMembershipRepository();
    const invitationRepository = new InMemoryInvitationRepository();
    const idGenerator = new FakeIdGenerator();

    const useCase = new AcceptWorkspaceInvitationUseCase(
      invitationRepository,
      userRepository,
      workspaceMembershipRepository,
      idGenerator,
    );

    return {
      useCase,
      userRepository,
      workspaceMembershipRepository,
      invitationRepository,
    };
  };

  it('should accept an invitation', async () => {
    // Arrange
    const {
      useCase,
      invitationRepository,
      userRepository,
      workspaceMembershipRepository,
    } = generateEnvironment();

    await invitationRepository.save(
      new Invitation(
        'invitation-123',
        'workspace-1',
        'inviter-1',
        'email@invitee.com',
        new Date(),
      ),
    );

    // Act
    const output = await useCase.execute({ invitationId: 'invitation-123' });

    // Assert
    const user = await userRepository.findUserByEmail('email@invitee.com');

    expect(user?.id).toBe('id-1');

    const membership =
      await workspaceMembershipRepository.findByWorkspaceIdAndUserId(
        'workspace-1',
        'id-1',
      );

    expect(membership).not.toBeNull();
    expect(membership?.id).toBe('id-2');
    expect(membership?.workspaceId).toBe('workspace-1');
    expect(membership?.userId).toBe('id-1');

    expect(output.invitation.id).toBe('invitation-123');
    expect(output.invitation.inviteeEmail).toBe('email@invitee.com');
    expect(output.invitation.status).toBe(InvitationStatus.ACCEPTED);
    expect(output.invitation.userId).toBe('id-1');

    const invitationAfter =
      await invitationRepository.findById('invitation-123');

    expect(invitationAfter?.status).toBe(InvitationStatus.ACCEPTED);
  });

  it('should throw when the invitation does not exist', async () => {
    // Arrange
    const { useCase } = generateEnvironment();
    const invitationId = 'invitation-123';
    // Act & Assert
    await expect(() =>
      useCase.execute({ invitationId: invitationId }),
    ).rejects.toThrow(new InvitationNotFoundError(invitationId));
  });

  it('should throw when the invitation status is not PENDING', async () => {
    // Arrange
    const {
      useCase,
      invitationRepository,
      userRepository,
      workspaceMembershipRepository,
    } = generateEnvironment();

    const invitationId = 'invitation-123';

    const invitation = new Invitation(
      invitationId,
      'workspace-1',
      'inviter-1',
      'invitee@email.com',
      new Date(),
    );

    invitation.accept();

    await invitationRepository.save(invitation);

    // Act & Assert
    await expect(useCase.execute({ invitationId })).rejects.toThrow(
      new InvitationNotPendingError(invitationId),
    );

    const user = await userRepository.findUserByEmail('invitee@email.com');

    expect(user).toBeNull();

    const membership =
      await workspaceMembershipRepository.findByWorkspaceIdAndUserId(
        'workspace-1',
        'id-1',
      );

    expect(membership).toBeNull();
  });

  it('should accept an invitation when a user is already created', async () => {
    // Arrange
    const {
      useCase,
      invitationRepository,
      userRepository,
      workspaceMembershipRepository,
    } = generateEnvironment();

    await userRepository.save(new User('user-1', 'User 1', 'user1@email.com'));

    await invitationRepository.save(
      new Invitation(
        'invitation-123',
        'workspace-1',
        'inviter-1',
        'user1@email.com',
        new Date(),
      ),
    );
    // Act
    const output = await useCase.execute({ invitationId: 'invitation-123' });

    // Assert
    expect(output.invitation.id).toBe('invitation-123');
    expect(output.invitation.userId).toBe('user-1');
    expect(output.invitation.inviteeEmail).toBe('user1@email.com');
    expect(output.invitation.status).toBe(InvitationStatus.ACCEPTED);

    const workspaceMembership =
      await workspaceMembershipRepository.findByWorkspaceIdAndUserId(
        'workspace-1',
        'user-1',
      );

    expect(workspaceMembership).not.toBeNull();
    expect(workspaceMembership?.id).toBe('id-1');
    expect(workspaceMembership?.workspaceId).toBe('workspace-1');
    expect(workspaceMembership?.userId).toBe('user-1');

    const user = await userRepository.findUserByEmail('user1@email.com');

    expect(user?.id).toBe('user-1');
    expect(user?.name).toBe('User 1');
  });
});
