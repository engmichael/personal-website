/* Chapter 2 — Leadership & Impact. Stat-led cards from the résumé's
   Education and Additional sections. Booth involvement lives on the
   Experience timeline (`work.ts`). `motif` picks the illustration at the
   top of each card (components/ui/Motifs.tsx). */

export type Motif = "rings" | "sunflower" | "dialogue" | "route";

export type Achievement = {
  stat: string;
  unit: string;
  title: string;
  role: string;
  when: string;
  desc: string;
  motif: Motif;
};

export const achievements: Achievement[] = [
  {
    stat: "500+",
    unit: "students reached",
    title: "EPOG Academy",
    role: "Associate Board Co-Chair",
    when: "2023 →",
    desc: "Launched the associate board of a nonprofit advancing educational equity through AI-driven personal development, improving initiatives across 17 campuses.",
    motif: "rings",
  },
  {
    stat: "350+",
    unit: "students in two years",
    title: "Texas Consulting",
    role: "Co-Founder & President",
    when: "UT Austin",
    desc: "Co-founded a student-led pro-bono consulting organization serving global nonprofits and Fortune 500s; led projects for the American Heart Association and Zeta Charter Schools.",
    motif: "sunflower",
  },
  {
    stat: "35+",
    unit: "students a year",
    title: "Speech & Debate",
    role: "Coach · Plano West Senior High",
    when: "Public Forum · Policy",
    desc: "Competed in Public Forum at Plano West, winning 3 tournaments, finaling at state twice and qualifying for nationals. Now coaches the team's Public Forum and Policy debaters.",
    motif: "dialogue",
  },
  {
    stat: "$5.5K",
    unit: "raised in 3 months",
    title: "NYC Marathon",
    role: "Runner · Success Academy",
    when: "2025",
    desc: "Ran the five-borough race to raise funds and public visibility for Success Academy's educational-equity mission.",
    motif: "route",
  },
];
