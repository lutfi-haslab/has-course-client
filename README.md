This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Step-by-step guide to create a new page:

1. Define the entity (ie. src/entities/models/product.ts)
2. Create the repository interface (ie. src/application/repositories/productRepository.ts)
3. Implement the repository (ie. src/infrastructure/repositories/productRepositoryImpl.ts)
4. Create the use case (ie. src/application/use-cases/getProductUseCase.ts)
5. Create the presenter (ie. src/interface-adapters/presenters/productPresenter.ts)
6. Create the controller (ie. src/interface-adapters/controllers/productController.ts)
7. Wire up the dependencies (ie. src/di/modules/productModule.ts, update to src/di/container.ts) 
8. Create the page component (ie. src/app/v1/test/products/[id]/page.tsx)

```
 const productController = container.product.controller;
  const product = await productController.getProduct(id);
```