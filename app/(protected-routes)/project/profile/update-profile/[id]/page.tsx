import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6">Update Profile</h1>
          <Separator />
        </div>
      </div>
    </div>
  );
}
