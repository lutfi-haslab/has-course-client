import { container } from '@/di/container';

export default async function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const userController = container.user.controller;
  const user = await userController.getUser(id);

  return (
    <div>
      <h1>User Details</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.formattedName}</p>
    </div>
  );
}