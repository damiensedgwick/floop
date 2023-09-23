import { Separator } from "@/components/ui/separator";
import UpdatePreferredNameForm from "@/app/(protected-routes)/project/profile/update-preferred-name-form";
import UpdateFirstNameForm from "@/app/(protected-routes)/project/profile/update-first-name-form";
import UpdatePasswordForm from "@/app/(protected-routes)/project/profile/update-password-form";
import UpdateLastNameForm from "@/app/(protected-routes)/project/profile/update-lastname-form";
import { getPublicUser } from "@/app/(protected-routes)/project/utils";

export default async function Profile() {
  const user = await getPublicUser();

  return (
    <>
      <UpdatePreferredNameForm
        id={user.id}
        name={user.preferred_name || "John Doe"}
      />
      <UpdateFirstNameForm id={user.id} name={user.first_name || "John"} />
      <UpdateLastNameForm id={user.id} name={user.last_name || "Doe"} />
      <UpdatePasswordForm />
    </>
  );
}
