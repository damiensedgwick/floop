import Hero from "@/components/marketing/hero";
import Features from "@/components/marketing/features";
import Pricing from "@/components/marketing/pricing";
import Footer from "@/app/footer";
import GettingStarted from "@/components/marketing/getting-started";
import FAQ from "@/components/marketing/faq";
import Header from "@/components/marketing/header";

export default function Page() {
  return (
    <>
      <Header />
      <div>
        <Hero />
        <Features />
        <Pricing />
        <GettingStarted />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}
