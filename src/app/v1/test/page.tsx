import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to Clean Architecture Next.js</h1>
      <Link href="/v1/test/users/1">View User 1</Link>
      <Link href="/v1/test/products/1">View Product 1</Link>
    </main>
  );
}