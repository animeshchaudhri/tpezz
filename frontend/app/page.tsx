import FAQ from "@/components/Faq/Faq";
import { Features } from "@/components/Features/Features";
import { Footer } from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Herosection";
import Navbar from "@/components/navbar/Navbar";
import Newsletter from "@/components/Newsletter/Newsletter";
import Pricing from "@/components/Pricing/Pricing";
import Logos from "@/components/Sponsors/Sponsers";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Logos />
      <Features />
      <Pricing />
      <FAQ />
      <Newsletter />
      <Footer />
    </>
  );
}
