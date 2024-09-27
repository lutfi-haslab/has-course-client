import { ProductRepository } from '../repositories/productRepository';
import { Product } from '@/entities/models/product';

export const createGetProductUseCase = (productRepository: ProductRepository) => {
    return {
        execute: async (id: string): Promise<Product> => {
            return productRepository.getProduct(id);
        }
    };
};