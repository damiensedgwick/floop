import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ProductInformation from "@/components/website/ProductInformation";
import ProductFeatures from "@/components/website/ProductFeatures";
import ProductPricing from "@/components/website/ProductPricing";
import Hero from "@/components/website/Hero";
import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import { PublicUser } from "@/types";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const auth_user = session?.user;

  let public_user: PublicUser = null;

  if (auth_user) {
    public_user = await prisma.public_users.findUnique({
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
