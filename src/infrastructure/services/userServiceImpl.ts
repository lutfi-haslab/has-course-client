import { UserService } from '@/application/services/userService';
import { User } from '@/entities/models/user';

export const createUserService = (): UserService => {
  return {
    formatUserName: (user: User): string => {
      return `${user.name} (${user.email})`;
    }
  };
};