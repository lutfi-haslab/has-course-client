import { create } from 'zustand';
import { container } from '@/di/container';

interface ProductState {
    currentProduct: any | null;
    fetchProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
    currentProduct: null,
    fetchProduct: async (id: string) => {
        const productController = container.product.controller;
        const product = await productController.getProduct(id);
        set({ currentProduct: product });
    },
}));