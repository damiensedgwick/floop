"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function CreateprojectForm() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const body = {
      name: formData.get("name"), // comes from the form
    };

    const response = await fetch("/project", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("There was an error creating your project");
      router.push("/");
    }

    const result = await response.json();
    const { id } = result;

    router.push(`/project/${id}/dashboard`, {
      forceOptimisticNavigation: true,
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
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
  );
}
