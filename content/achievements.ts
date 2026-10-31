/* Chapter 03 — Leadership & impact. Stat-led cards + Booth involvement. */

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
    unit: "students",
    title: "EPOG Academy",
    role: "Associate Board Co-Chair",
    when: "2023 →",
    desc: "Launched the associate board for a nonprofit focused on educational equity, expanding programs to 17 campuses.",
  },
  {
    stat: "300+",
    unit: "applicants",
    title: "Texas Consulting",
    role: "Co-Founder & President",
    when: "2018 — 2021",
    desc: "Built a pro-bono consulting group serving nonprofits and Fortune 500s, growing it to 300+ student applicants in two years.",
  },
  {
    stat: "$5,500",
    unit: "raised",
    title: "NYC Marathon",
    role: "Runner · Success Academy",
    when: "2025",
    desc: "Ran the five-borough race and raised over $5,500 for educational equity in NYC charter schools.",
  },
];

export const boothGroups = ["Graduate Business Council", "Booth Ed", "Net Impact", "Epicurean Club"];
