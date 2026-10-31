/* Chapter 2 — Leadership & impact. Stat-led cards + Booth involvement,
   from the résumé's Education and Additional sections. */

export type Achievement = {
  stat: string;
  unit: string;
  title: string;
  role: string;
  when: string;
  desc: string;
};

export const achievements: Achievement[] = [
  {
    stat: "500+",
    unit: "students reached",
    title: "EPOG Academy",
    role: "Associate Board Co-Chair",
    when: "2023 →",
    desc: "Launched the associate board of a nonprofit advancing educational equity through AI-driven personal development, improving initiatives across 17 campuses.",
  },
  {
    stat: "350+",
    unit: "students in two years",
    title: "Texas Consulting",
    role: "Co-Founder & President",
    when: "UT Austin",
    desc: "Co-founded a student-led pro-bono consulting organization serving global nonprofits and Fortune 500s; led projects for the American Heart Association and Zeta Charter Schools.",
  },
  {
    stat: "35+",
    unit: "students a year",
    title: "Speech & Debate",
    role: "Coach · Plano West Senior High",
    when: "Public Forum · Policy",
    desc: "Mentors students in Public Forum and Policy Debate each year — part of a broader commitment to expanding educational access.",
  },
  {
    stat: "$5.5K",
    unit: "raised in 3 months",
    title: "NYC Marathon",
    role: "Runner · Success Academy",
    when: "2025",
    desc: "Ran the five-borough race to raise funds and public visibility for Success Academy's educational-equity mission.",
  },
];

export const boothGroups = [
  "Graduate Business Council (elected)",
  "Management Consulting Group",
  "Booth Education Group",
  "Net Impact",
  "Epicurean Club",
];
