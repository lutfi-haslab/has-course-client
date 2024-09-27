import { container } from '@/di/container';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const productController = container.product.controller;
  const product = await productController.getProduct(id);

  return (
    <div>
      <h1>Product Details</h1>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Price: {product.formattedPrice}</p>
    </div>
  );
}