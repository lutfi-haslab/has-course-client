import { useQuery } from '@tanstack/react-query';
import { container } from '@/di/container';

export const useProductQuery = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const productController = container.product.controller;
      return await productController.getProduct(id);
    },
  });
};