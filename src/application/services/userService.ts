import { User } from '@/entities/models/user';

export interface UserService {
  formatUserName: (user: User) => string;
}