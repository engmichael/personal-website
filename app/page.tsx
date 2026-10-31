import { Hero } from "@/components/scenes/Hero";
import { WorkScene } from "@/components/scenes/WorkScene";
import { AchievementsScene } from "@/components/scenes/AchievementsScene";
import { OffTheClockScene } from "@/components/scenes/OffTheClockScene";
import { ContactScene } from "@/components/scenes/ContactScene";

/* Recruiter-first order: who (the hero letter) → what I've done → how I lead → the life around it → contact. */
export default function Home() {
  return (
    <>
      <Hero />
      <WorkScene />
      <AchievementsScene />
      <OffTheClockScene />
      <ContactScene />
    </>
  );
}
