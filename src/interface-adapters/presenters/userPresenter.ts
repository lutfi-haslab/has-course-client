import { User } from '@/entities/models/user';
import { UserService } from '@/application/services/userService';

export const createUserPresenter = (userService: UserService) => {
    return {
        present: (user: User) => {
            return {
                id: user.id,
                formattedName: userService.formatUserName(user),
            };
        }
    };
};