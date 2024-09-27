import React, { useEffect } from 'react';
import { useProductStore } from '@/interface-adapters/store/productStore';

interface ProductDetailProps {
  id: string;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const { currentProduct, fetchProduct } = useProductStore();

  useEffect(() => {
    fetchProduct(id);
  }, [id, fetchProduct]);

  if (!currentProduct) return <div>Loading...</div>;

  return (
    <div>
      <h2>{currentProduct.name}</h2>
      <p>Price: {currentProduct.formattedPrice}</p>
    </div>
  );
};