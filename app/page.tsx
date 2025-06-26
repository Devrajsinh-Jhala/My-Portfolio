import ExperienceSection from "@/components/ExperienceSection";
import Hero from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import { LatestWorkSection } from '@/components/LatestWorkSection';

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto">
      <Hero />
      <SkillsSection />
      <ExperienceSection />
      <LatestWorkSection />
    </section>
  );
}
