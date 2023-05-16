import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
