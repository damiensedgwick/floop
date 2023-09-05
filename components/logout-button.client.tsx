"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button
      className="mb-3 shadow w-[125px] lg:w-full"
      variant="outline"
      onClick={signOut}
    >
      <ArrowLeftOnRectangleIcon className="mr-1" width={24} height={24} />
      Logout
    </Button>
  );
}
