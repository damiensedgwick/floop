import { submitForm } from "@/app/(protected-routes)/project/new/actions";

export default async function Page() {
  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
        <svg
          className="w-12 h-12 mx-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-semibold text-gray-900">
          No projects
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new project.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={submitForm}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Project name
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

        <p className="mt-10 text-sm text-center text-gray-500">
          If you are already a member of an project, for access, please speak to
          your project administrator.
        </p>
      </div>
    </div>
  );
}
