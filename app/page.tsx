import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { StatsCounter } from "@/components/landing/StatsCounter";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyRealvora } from "@/components/landing/WhyRealvora";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <StatsCounter />
        <HowItWorks />
        <WhyRealvora />
        <ComparisonTable />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

