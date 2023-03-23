import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/protected-route";
import "@/styles/globals.css";

const protectedRoutes = [
  "/",
  "/dashboard",
  "/dashboard/feedback",
  "/dashboard/issues",
  "/dashboard/users",
  "/profile",
];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      {protectedRoutes.includes(router.pathname) ? (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}
