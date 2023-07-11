"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function LogoutButton() {
  const router = useRouter();

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button onClick={signOut}>
      <ArrowRightOnRectangleIcon width={24} height={24} />
    </button>
  );
}
