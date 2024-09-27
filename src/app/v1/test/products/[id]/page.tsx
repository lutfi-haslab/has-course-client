'use client';

import { useProductQuery } from '@/interface-adapters/query/productQueries';

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: product, isLoading, error } = useProductQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>Product Details</h1>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Price: {product.formattedPrice}</p>
    </div>
  );
}