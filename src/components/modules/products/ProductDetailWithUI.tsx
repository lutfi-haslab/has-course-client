import React from 'react';
import { useProductQuery } from '@/interface-adapters/query/productQueries';
import { useUIStore } from '@/interface-adapters/store/uiStore';

interface ProductDetailWithUIProps {
  id: string;
}

export const ProductDetailWithUI: React.FC<ProductDetailWithUIProps> = ({ id }) => {
  const { data: product, isLoading, error } = useProductQuery(id);
  const { isProductDetailExpanded, toggleProductDetail } = useUIStore();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <button onClick={toggleProductDetail}>
        {isProductDetailExpanded ? 'Hide Details' : 'Show Details'}
      </button>
      {isProductDetailExpanded && (
        <div>
          <p>Price: {product.formattedPrice}</p>
          {/* More details here */}
        </div>
      )}
    </div>
  );
};