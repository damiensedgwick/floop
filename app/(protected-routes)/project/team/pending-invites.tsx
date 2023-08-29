import { supabase as sb } from "@/lib/supabase";

export default async function PendingInvites() {
  const { data, error } = await sb.auth.admin.listUsers();

  if (error) {
    console.log("Error fetching users:", error.message);
  }

  if (data) {
    // console.log("Users:", data);
  }

  return (
    <div>
      <i>Pending invites will show here...</i>
    </div>
  );
}
