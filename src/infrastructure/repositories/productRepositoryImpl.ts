import { ProductRepository } from '@/application/repositories/productRepository';
import { Product } from '@/entities/models/product';

export const createProductRepository = (): ProductRepository => {
    return {
        getProduct: async (id: string): Promise<Product> => {
            // Dummy implementation
            return { id, name: 'Sample Product', price: 19.99 };
        }
    };
};