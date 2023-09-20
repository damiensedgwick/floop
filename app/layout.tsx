import { ReactNode } from "react";
import { Metadata } from "next";
import { Nunito } from "next/font/google";
import { clsx } from "clsx";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.feedback-loop.io"),
  title: "Floop | A feedback loop for your product",
  description:
    "Floop enables your users to submit ratings, issues and suggestions for your product and then presents them to you in a way that is easy to understand!",
  openGraph: {
    title: "",
    description: "",
    images: {
      url: "/floop-dashboard.png",
      alt: "Floop Dashboard",
      width: "2948",
      height: "1762",
    },
  },
};

const nunito = Nunito({
  display: "swap",
  style: "normal",
  subsets: ["latin"],
  weight: "600",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={clsx("h-full scroll-smooth antialiased", nunito.className)}
      suppressHydrationWarning
    >
      <body className="h-full">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="h-full">{children}</main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
