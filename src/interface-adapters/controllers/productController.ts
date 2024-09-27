import { createGetProductUseCase } from '@/application/use-cases/getProductUseCase';
import { createProductPresenter } from '../presenters/productPresenter';

export const createProductController = (
    getProductUseCase: ReturnType<typeof createGetProductUseCase>,
    productPresenter: ReturnType<typeof createProductPresenter>
) => {
    return {
        getProduct: async (id: string) => {
            const product = await getProductUseCase.execute(id);
            return productPresenter.present(product);
        }
    };
};