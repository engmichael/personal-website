/* Chapter 02 — Experience. Professional history + education. Leadership and
   volunteer work live in `achievements.ts`. */

export type Engagement = {
  years: string;
  client: string;
  focus: string;
  summary: string;
  highlights: string[];
  stat?: { value: string; label: string };
};

export type Education = {
  years: string;
  school: string;
  degree: string;
  note?: string;
};

export const experience = {
  employer: "Accenture",
  practice: "Strategy",
  location: "New York",
  years: "2022 — 2026",
  engagements: [
    {
      years: "2024 — 2026",
      client: "Waymo",
      focus: "Operations & Partnerships",
      summary:
        "Helped scale autonomous fleet operations from 20 vehicles to 500+, across new markets in the U.S. and abroad.",
      highlights: ["Strategy", "Operations transformation", "Partnership design"],
      stat: { value: "20 → 500+", label: "vehicles in the fleet" },
    },
    {
      years: "2022 — 2024",
      client: "Splunk & Kinaxis",
      focus: "Go-to-Market",
      summary:
        "Partner activation, joint value propositions, and co-sell motions for two enterprise software platforms.",
      highlights: ["Partner activation", "Value propositions", "Co-sell"],
    },
  ] satisfies Engagement[],
};

export const education: Education[] = [
  {
    years: "2026 — 2028",
    school: "The University of Chicago Booth School of Business",
    degree: "MBA / MPCS",
  },
  {
    years: "2018 — 2021",
    school: "The University of Texas at Austin",
    // CONFIRM: list the three majors here.
    degree: "Undergraduate · three majors",
    note: "Convergent build team: designed an NLP-driven platform giving students access to back-end university resources.",
  },
];
