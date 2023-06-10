import Image from "next/image";
import { submitForm } from "@/app/(protected-routes)/project/new/actions";
import { auth } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId, getToken } = auth();

  const supabaseAccessToken = await getToken({ template: "supabase" });
  const sb = await supabase(supabaseAccessToken);

  const { data, error } = await sb
    .from("project")
    .select()
    .eq("owner_id", userId)
    .maybeSingle();

  if (error) {
    return <p>Error fetching your project</p>;
  }

  const project = data;

  if (project) {
    redirect("/project/dashboard");
  }

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

// "use client";
//
// import { FormEvent } from "react";
// import { useRouter } from "next/navigation";
//
// export default function CreateprojectForm() {
//   const router = useRouter();
//
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//
//     const formData = new FormData(e.currentTarget);
//
//     const name = formData.get("name") as string;
//
//     if (!name) {
//       console.log("Name is required");
//       return;
//     }
//
//     const body = {
//       name: name,
//     };
//
//     try {
//       const response = await fetch("/project", {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.log("Error creating project:", errorData.message);
//         return;
//       }
//
//       const result = await response.json();
//       const { id } = result;
//
//       router.push(`/project/${id}/dashboard`, {
//         forceOptimisticNavigation: true,
//       });
//     } catch (error) {
//       console.error("Error creating project:", error);
//     }
//   };
//
//   return (
//     <form className="space-y-6" onSubmit={handleSubmit}>
//       <div>
//         <label
//           htmlFor="name"
//           className="block text-sm font-medium leading-6 text-gray-900"
//         >
//           project name
//         </label>
//         <div className="mt-2">
//           <input
//             className="block w-full rounded-md border-0 placeholder:text-gray-400 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-1.5 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
//             id="name"
//             name="name"
//             type="text"
//             required
//           />
//         </div>
//       </div>
//
//       <div>
//         <button
//           type="submit"
//           className="flex w-full justify-center rounded-md bg-teal-600 px-3 text-sm font-semibold leading-6 text-white shadow-sm py-1.5 hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// }
