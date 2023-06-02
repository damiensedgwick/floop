import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ProductInformation from "@/app/ProductInformation";
import ProductFeatures from "@/app/ProductFeatures";
import ProductPricing from "@/app/ProductPricing";
import Hero from "@/app/Hero";
import Header from "@/app/Header";
import Footer from "@/app/Footer";
import { PublicUser } from "@/types";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const auth_user = session?.user;

  let public_user: PublicUser = null;

  if (auth_user) {
    public_user = await prisma.public_users.findFirst({
      where: {
        id: auth_user?.id,
      },
    });
  }

  return (
    <>
      {/* TODO: Delete this after launch */}
      <Banner />
      <Header user={public_user} />
      <main>
        <Hero />
        <ProductInformation />
        <ProductFeatures />
        <ProductPricing />
      </main>
      <Footer />
    </>
  );
}

function Banner() {
  return (
    <div className="bg-teal-600 px-6 py-2.5 sm:before:flex-1 sm:px-3.5">
      <p className="text-center text-sm leading-6 text-white">
        Floop is under active development and will be available soon!
      </p>
    </div>
  );
}
