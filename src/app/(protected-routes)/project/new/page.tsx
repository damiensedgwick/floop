import Image from "next/image";
import { submitForm } from "@/app/(protected-routes)/project/new/actions";

export default async function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto"
          src="/assets/floop-logo.png"
          alt="Floop"
          width={128}
          height={128}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your project
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={submitForm}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              project name
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 placeholder:text-gray-400 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-1.5 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                id="name"
                name="name"
                type="text"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-600 px-3 text-sm font-semibold leading-6 text-white shadow-sm py-1.5 hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Submit
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          If you are already a member of an project, for access, please speak to
          your project administrator.
        </p>
      </div>
    </div>
  );
}
