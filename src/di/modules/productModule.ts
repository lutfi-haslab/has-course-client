import { createProductRepository } from '@/infrastructure/repositories/productRepositoryImpl';
import { createGetProductUseCase } from '@/application/use-cases/getProductUseCase';
import { createProductController } from '@/interface-adapters/controllers/productController';
import { createProductPresenter } from '@/interface-adapters/presenters/productPresenter';

const repository = createProductRepository();
const useCase = createGetProductUseCase(repository);
const presenter = createProductPresenter();
const controller = createProductController(useCase, presenter);

export const productModule = {
  repository,
  useCase,
  controller,
  presenter,
};