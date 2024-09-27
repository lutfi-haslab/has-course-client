import { UserRepository } from '@/application/repositories/userRepository';
import { User } from '@/entities/models/user';

export const createUserRepository = (): UserRepository => {
  return {
    getUser: async (id: string): Promise<User> => {
      // Dummy implementation
      return { id, name: 'John Doe', email: 'john@example.com' };
    }
  };
};