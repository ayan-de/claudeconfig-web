import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Download } from "@/components/sections/download";
import { Install } from "@/components/sections/install";
import { Architecture } from "@/components/sections/architecture";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Download />
        <Install />
        <Architecture />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}