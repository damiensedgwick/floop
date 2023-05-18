import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="h-screen flex flex-col items-center justify-center p-24">
      <Image src="/floop-logo.png" alt="floop logo" height={200} width={200} />
      <p className="text-center mt-6">
        <i>coming soon...</i>
      </p>

      {session ? (
        <p className="mt-6">There is a session</p>
      ) : (
        <p className="mt-6">There is not a session</p>
      )}
    </main>
  );
}
