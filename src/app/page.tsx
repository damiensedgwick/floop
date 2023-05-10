import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="">
        <Image
          src="/floop-logo.png"
          alt="floop logo"
          height={200}
          width={200}
        />
        <p className="text-center pt-4">
          <i>Coming soon...</i>
        </p>
      </div>
    </main>
  );
}
