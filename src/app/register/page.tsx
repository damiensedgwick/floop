import { Suspense } from "react";
import Loading from "@/app/register/loading";

export default function Register() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="w-96">
          <form className="w-full p-8 shadow-2xl">
            <p className="mb-2 text-center text-xl font-bold uppercase">
              Register for Floop
            </p>
            <label htmlFor="email">
              <input
                className="my-2 w-full border-2 p-2"
                type="text"
                name="email"
              />
            </label>
            <label htmlFor="password">
              <input
                className="my-2 w-full border-2 p-2"
                type="password"
                name="password"
              />
            </label>
            <button
              className="mt-4 w-full bg-teal-500 px-4 py-2 text-white hover:bg-teal-700"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </Suspense>
  );
}
