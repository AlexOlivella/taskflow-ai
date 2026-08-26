import { IdGenerator } from 'src/application/shared/id-generator';
import { InMemoryInvitationRepository } from 'src/infrastructure/persistence/in-memory/in-memory-invitation.repository';
import { InviteUserToWorkspaceUseCase } from './inviteUserToWorkspace.use-case';
import { InMemoryUserRepository } from 'src/infrastructure/persistence/in-memory/in-memory-user.repository';
import { InMemoryWorkspaceMembershipRepository } from 'src/infrastructure/persistence/in-memory/in-memory-workspaceMembership.repository';
import { InviteUserToWorkspaceInput } from './inviteUserToWorkspace.input';
import { InvitationStatus } from 'src/domain/invitation/invitationStatus.enum';
import { User } from 'src/domain/user/user.entity';
import { WorkspaceMembership } from 'src/domain/workspaceMembership/workspaceMembership.entity';
import { InvitationSender } from './invitation.sender';
import { InvitationAlreadyPendingError } from '../errors/invitation-already-pending.error';
import { UserAlreadyWorkspaceMemberError } from '../errors/user-already-workspace-member.error';

describe('InviteUserToWorkspace', () => {
  class FakeIdGenerator implements IdGenerator {
    generate(): string {
      return 'invitation-123';
    }
  }
  class FakeInvitationSender implements InvitationSender {
    sentInvitations: {
      inviteeEmail: string;
      invitationId: string;
    }[] = [];

    shouldFail = false;

    sendInvitation(inviteeEmail: string, invitationId: string): Promise<void> {
      if (this.shouldFail) {
        return Promise.reject(new Error('Failed to send invitation.'));
      }

      this.sentInvitations.push({
        inviteeEmail,
        invitationId,
      });

      return Promise.resolve();
    }
  }
  const generateEnvironment = () => {
    const userRepository = new InMemoryUserRepository();
    const workspaceMembershipRepository =
      new InMemoryWorkspaceMembershipRepository();
    const invitationRepository = new InMemoryInvitationRepository();
    const idGenerator = new FakeIdGenerator();
    const invitationSender = new FakeInvitationSender();

    const useCase = new InviteUserToWorkspaceUseCase(
      userRepository,
      workspaceMembershipRepository,
      invitationRepository,
      idGenerator,
      invitationSender,
    );

    return {
      useCase,
      userRepository,
      workspaceMembershipRepository,
      invitationSender,
      invitationRepository,
    };
  };

  it('should create the invitation', async () => {
    // Arrange
    const { useCase, invitationSender } = generateEnvironment();

    const input: InviteUserToWorkspaceInput = {
      workspaceId: 'workspace-1',
      inviteeEmail: 'invitee@email.com',
      inviterId: 'inviter-1',
    };

    // Act
    const output = await useCase.execute(input);

    // Assert
    expect(output.invitation.id).toBe('invitation-123');
    expect(output.invitation.inviteeEmail).toBe('invitee@email.com');
    expect(output.invitation.inviterId).toBe('inviter-1');
    expect(output.invitation.status).toBe(InvitationStatus.PENDING);

    expect(invitationSender.sentInvitations).toEqual([
      {
        inviteeEmail: 'invitee@email.com',
        invitationId: 'invitation-123',
      },
    ]);
  });

  it('should not create the invitation when there is one invitation pending', async () => {
    // Arrange
    const { useCase } = generateEnvironment();
    const input: InviteUserToWorkspaceInput = {
      workspaceId: 'workspace-1',
      inviterId: 'inviter-1',
      inviteeEmail: 'invitee@email.com',
    };

    // Act & Assert
    await useCase.execute(input);

    await expect(useCase.execute(input)).rejects.toThrow(
      new InvitationAlreadyPendingError(input.inviteeEmail, input.workspaceId),
    );
  });

  it('should not create the invitation when the user already belongs to the workspace', async () => {
    // Arrange
    const { useCase, userRepository, workspaceMembershipRepository } =
      generateEnvironment();
    await userRepository.save(
      new User('user-1', 'User-1', 'invitee@email.com'),
    );

    await workspaceMembershipRepository.save(
      new WorkspaceMembership('wsm-1', 'workspace-1', 'user-1'),
    );
    const input: InviteUserToWorkspaceInput = {
      workspaceId: 'workspace-1',
      inviterId: 'inviter-1',
      inviteeEmail: 'invitee@email.com',
    };

    // Act & Assert
    await expect(useCase.execute(input)).rejects.toThrow(
      new UserAlreadyWorkspaceMemberError('user-1', input.workspaceId),
    );
  });

  it('should create the invitation when the user is not registered', async () => {
    // Arrange
    const { useCase, invitationSender, userRepository } = generateEnvironment();
    await userRepository.save(
      new User('user-1', 'User-1', 'invitee@email.com'),
    );
    await userRepository.save(
      new User('user-2', 'User-2', 'invitee2@email.com'),
    );
    const input: InviteUserToWorkspaceInput = {
      workspaceId: 'workspace-1',
      inviteeEmail: 'invitee3@email.com',
      inviterId: 'inviter-1',
    };

    // Act
    const output = await useCase.execute(input);

    // Assert
    expect(output.invitation.inviteeEmail).toBe('invitee3@email.com');
    expect(output.invitation.status).toBe(InvitationStatus.PENDING);

    expect(invitationSender.sentInvitations).toEqual([
      {
        inviteeEmail: 'invitee3@email.com',
        invitationId: 'invitation-123',
      },
    ]);
  });

  it('should keep the invitation when sending fails', async () => {
    // Arrange
    const { useCase, invitationRepository, invitationSender } =
      generateEnvironment();

    invitationSender.shouldFail = true;

    const input: InviteUserToWorkspaceInput = {
      workspaceId: 'workspace-1',
      inviteeEmail: 'invitee@email.com',
      inviterId: 'inviter-1',
    };

    // Act & Assert
    await expect(useCase.execute(input)).rejects.toThrow(
      'Failed to send invitation.',
    );

    const invitation =
      await invitationRepository.findPendingInvitationByWorkspaceEmail(
        input.workspaceId,
        input.inviteeEmail,
      );

    expect(invitation).not.toBeNull();
  });
});
