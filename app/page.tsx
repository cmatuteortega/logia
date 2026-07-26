import Hero from "@/components/Hero";
import ProblemAgitation from "@/components/ProblemAgitation";
import ValueProps from "@/components/ValueProps";
import HowItWorks from "@/components/HowItWorks";
import Founder from "@/components/Founder";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <ProblemAgitation />
      <ValueProps />
      <HowItWorks />
      <Founder />
      <Pricing />
      <Faq />
      <FinalCta />
      <footer className="border-t border-slate-200 px-6 py-8 text-center text-sm text-slate-500">
        Logia — {new Date().getFullYear()}
      </footer>
    </main>
  );
}
