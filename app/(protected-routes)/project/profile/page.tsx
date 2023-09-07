import { Separator } from "@/components/ui/separator";
import UpdatePreferredNameForm from "@/app/(protected-routes)/project/profile/update-preferred-name-form";
import UpdateFirstNameForm from "@/app/(protected-routes)/project/profile/update-first-name-form";
import UpdatePasswordForm from "@/app/(protected-routes)/project/profile/update-password-form";
import UpdateLastNameForm from "@/app/(protected-routes)/project/profile/update-lastname-form";

export default function Page() {
  return (
    <div className="px-4 pt-2 pb-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="text-xl font-semibold leading-7">Profile</h1>
          <Separator />
          <UpdatePreferredNameForm />
          <UpdateFirstNameForm />
          <UpdateLastNameForm />
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}
