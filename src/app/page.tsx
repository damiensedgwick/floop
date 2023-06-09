import Pricing from "@/app/Pricing";
import Features from "@/app/Features";
import Overview from "@/app/Overview";
import Hero from "@/app/Hero";
import Nav from "@/app/Nav";
import Footer from "@/app/Footer";

export default async function Home() {
  return (
    <>
      <header>
        <Nav />
        <Hero />
      </header>
      <main>
        <Overview />
        <Features />
        <Pricing />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
