import { auth } from "@clerk/nextjs";

export default function Page() {
  const { userId } = auth();

  console.log("userId: " + userId);

  return (
    <div>
      <h1>Dashboard View</h1>
      <p>This should be a protected route</p>
    </div>
  );
}
