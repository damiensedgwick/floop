"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import Logout from "@/components/icons/log-out";

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
      className="shadow w-[125px] lg:w-full"
      variant="outline"
      onClick={signOut}
    >
      Logout
      <Logout className="w-4 h-4 ml-1.5 stroke-2 stroke-accent-foreground fill-none" />
    </Button>
  );
}
