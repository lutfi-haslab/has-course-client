import { Product } from '@/entities/models/product';

export const createProductPresenter = () => {
    return {
        present: (product: Product) => {
            return {
                ...product,
                formattedPrice: `$${product.price.toFixed(2)}`
            };
        }
    };
};