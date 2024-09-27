import { createGetUserUseCase } from '@/application/use-cases/getUserUseCase';
import { createUserPresenter } from '../presenters/userPresenter';


export const createUserController = (
    getUserUseCase: ReturnType<typeof createGetUserUseCase>,
    userPresenter: ReturnType<typeof createUserPresenter>
) => {
    return {
        getUser: async (id: string) => {
            const user = await getUserUseCase.execute(id);
            return userPresenter.present(user);
        }
    };
};