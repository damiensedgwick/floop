import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center p-24">
      <Image src="/floop-logo.png" alt="floop logo" height={200} width={200} />
      <p className="text-center mt-6">
        <i>coming soon...</i>
      </p>
    </main>
  );
}
