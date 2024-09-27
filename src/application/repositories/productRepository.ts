import { Product } from '@/entities/models/product';

export interface ProductRepository {
  getProduct: (id: string) => Promise<Product>;
}