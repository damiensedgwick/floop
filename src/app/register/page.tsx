import { Suspense } from "react";
import Loading from "@/app/register/loading";

export default function Register() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="">
          <h1>Register for Floop</h1>
        </div>
      </main>
    </Suspense>
  );
}
