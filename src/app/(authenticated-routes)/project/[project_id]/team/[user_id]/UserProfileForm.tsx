"use client";

import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { FormEvent } from "react";

type Props = {
  name: string | null | undefined;
  image: string | null | undefined;
};

export default function UserProfileForm({ name, image }: Props) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const body = {
      name: formData.get("name"),
      image: formData.get("image"),
    };

    console.log(JSON.stringify(body));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed within your project.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block flex-1 border-0 bg-transparent pl-3 placeholder:text-gray-400 text-gray-900 py-1.5 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder={name ?? "Name"}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-6">
                {image ? (
                  <Image
                    className="rounded-full bg-gray-50"
                    src={image ?? ""}
                    alt=""
                    width={72}
                    height={72}
                  />
                ) : (
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}
                <button
                  type="button"
                  className="rounded-md bg-white text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-2.5 py-1.5 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
