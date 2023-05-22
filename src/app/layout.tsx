import { Inter } from "next/font/google";
import { AuthProvider } from "@/providers";
import { LayoutProps } from "@/types";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Floop | A feedback loop for your product",
  description:
    "Floop enables your users to submit ratings, issues and suggestions for your product and then presents them to you in a way that is easy to understand!",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <html className="h-full bg-white" lang="en">
        <body className={"h-full " + inter.variable}>{children}</body>
      </html>
    </AuthProvider>
  );
}
