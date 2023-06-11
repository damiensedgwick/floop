import { submitForm } from "@/app/(protected-routes)/project/team/invite-team-member/actions";

export default async function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Invite your team member
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={submitForm}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 placeholder:text-gray-400 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-1.5 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                id="email"
                name="email"
                type="text"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              className="mt-2 block w-full rounded-md border-0 pr-10 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 py-1.5 focus:ring-2 focus:ring-teal-600 sm:text-sm sm:leading-6"
              defaultValue="basic_member"
            >
              <option value="basic_member">Member</option>
              <option value="admin">Admin</option>
            </select>
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
      </div>
    </div>
  );
}
