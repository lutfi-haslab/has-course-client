import { UserRepository } from '../repositories/userRepository';
import { User } from '@/entities/models/user';

export const createGetUserUseCase = (userRepository: UserRepository) => {
  return {
    execute: async (id: string): Promise<User> => {
      return userRepository.getUser(id);
    }
  };
};