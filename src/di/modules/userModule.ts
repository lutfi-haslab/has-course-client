// src/di/modules/userModule.ts
import { createUserRepository } from '@/infrastructure/repositories/userRepositoryImpl';
import { createUserService } from '@/infrastructure/services/userServiceImpl';
import { createGetUserUseCase } from '@/application/use-cases/getUserUseCase';
import { createUserController } from '@/interface-adapters/controllers/userController';
import { createUserPresenter } from '@/interface-adapters/presenters/userPresenter';

const repository = createUserRepository();
const service = createUserService();
const useCase = createGetUserUseCase(repository);
const presenter = createUserPresenter(service);
const controller = createUserController(useCase, presenter);

export const userModule = {
  repository,
  service,
  useCase,
  controller,
  presenter,
};