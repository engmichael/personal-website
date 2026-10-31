import { Hero } from "@/components/scenes/Hero";
import { AboutScene } from "@/components/scenes/AboutScene";
import { WorkScene } from "@/components/scenes/WorkScene";
import { AchievementsScene } from "@/components/scenes/AchievementsScene";
import { OffTheClockScene } from "@/components/scenes/OffTheClockScene";
import { ContactScene } from "@/components/scenes/ContactScene";

/* Recruiter-first order: who → what I've done → how I lead → the life around it → contact. */
export default function Home() {
  return (
    <>
      <Hero />
      <AboutScene />
      <WorkScene />
      <AchievementsScene />
      <OffTheClockScene />
      <ContactScene />
    </>
  );
}
