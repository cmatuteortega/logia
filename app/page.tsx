import Hero from "@/components/Hero";
import ProblemAgitation from "@/components/ProblemAgitation";
import ValueProps from "@/components/ValueProps";
import HowItWorks from "@/components/HowItWorks";
import TrialMonth from "@/components/TrialMonth";
import Founder from "@/components/Founder";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <main id="top" className="flex flex-1 flex-col">
      <Hero />
      <ProblemAgitation />
      <ValueProps />
      <HowItWorks />
      <TrialMonth />
      <Founder />
      <Pricing />
      <Faq />
      <FinalCta />
    </main>
  );
}
