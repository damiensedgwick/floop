import Hero from "@/components/marketing/hero";
import Features from "@/components/marketing/features";
import Pricing from "@/components/marketing/pricing";
import Footer from "@/app/footer";
import GettingStarted from "@/components/marketing/getting-started";
import FAQ from "@/components/marketing/faq";
import Header from "@/components/marketing/header";
import WidgetPreview from "@/components/marketing/widget-preview";

export default function Page() {
  return (
    <>
      <Header />
      <div>
        <Hero />
        <Features />
        <Pricing />
        <GettingStarted />
        <WidgetPreview />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}
