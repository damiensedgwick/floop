import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Image src="/floop-logo.png" alt="floop logo" height={200} width={200} />
      <Link
        className="mt-8 py-2 px-6 bg-teal-500 text-white ease-in-out duration-150 hover:scale-105"
        href="/register"
        title="registration link"
      >
        Register
      </Link>
    </main>
  );
}
