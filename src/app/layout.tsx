import { Inter } from "next/font/google";
import "@/app/globals.css";
import AuthProvider from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Floop | A feedback loop for your product",
  description:
    "Floop enables your users to submit ratings, ideas and issues for your product and then presents them to you in a way that is easy to understand!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html className="h-full bg-white" lang="en">
        <body className={"h-full " + inter.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
