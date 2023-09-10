import Hero from "@/app/hero";
import Features from "@/app/features";
import Pricing from "@/app/pricing";
import Footer from "@/app/footer";
import GettingStarted from "@/app/getting-started";
import FAQ from "@/app/faq";
import RecentPosts from "@/app/recent-posts";

export default async function Page() {
  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
      <GettingStarted />
      {/*<RecentPosts />*/}
      <FAQ />
      <Footer />
    </div>
  );
}
