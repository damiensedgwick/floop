import "./globals.css";

export const metadata = {
  title: "Floop | A feedback loop for your product",
  description:
    "Floop enables your users to submit ratings, issues and suggestions for your product and then presents them to you in a way that is easy to understand!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full">
        <main className="h-full">{children}</main>
      </body>
    </html>
  );
}
