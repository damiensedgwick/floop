import AuthCheck from "@/components/AuthCheck";

export default function TopSecret() {
  return (
    <AuthCheck>
      <p className="my-2">
        This top secret text should only be visible is the user is
        authenticated!
      </p>
    </AuthCheck>
  );
}
