/* Chapter 1 — Experience. Professional history + education, from the résumé
   (ENG_MICHAEL_RESUME.pdf). Leadership and volunteer work live in
   `achievements.ts`. */

export type Stat = { value: string; label: string };

export type Role = {
  title: string;
  years: string;
  project: {
    client: string;
    focus: string;
    summary: string;
    stats: Stat[];
    bullets: string[];
  };
};

export type EarlierRole = {
  org: string;
  title: string;
  location: string;
  years: string;
  summary: string;
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
  years: "2021 — 2026",
  roles: [
    {
      title: "Strategy Consultant",
      years: "Jan 2024 — Sept 2026",
      project: {
        // The résumé anonymizes this client as "Leading Autonomous Vehicle
        // Ride-Hail Service"; the site names it, as the previous site did.
        client: "Waymo",
        focus: "Ops Transformation & Partnership Strategy",
        summary:
          "Delivered a three-year transformation roadmap to close critical process gaps, enable vendor partnerships and expand the ride-hail service.",
        stats: [
          { value: "20 → 500", label: "vehicles in California" },
          { value: "70% → 85%", label: "peak fleet availability" },
          { value: "16 → 5 mo", label: "time to launch a market" },
        ],
        bullets: [
          "Scaled California operations from 20 vehicles to a fleet of 500 serving 30,000+ weekly trips, contributing to $2.5B in VC funding.",
          "Redesigned depot and charging workflows, the source of 65% of vehicle downtime, lifting peak-hour availability from ~70% to 85%.",
          "Mobilized expansion into 7 new markets (3 international) with a repeatable launch playbook for depots, staffing and shipping.",
          "Assessed operational maturity across six core functions and prioritized quick wins worth $8M+ in savings.",
        ],
      },
    },
    {
      title: "Consulting Senior Analyst",
      years: "Nov 2022 — Dec 2023",
      project: {
        client: "Splunk & Kinaxis",
        focus: "GTM Strategy & Due Diligence",
        summary:
          "Led GTM strategy for key software and platform clients, co-developing partner activation models, joint value propositions and co-sell playbooks.",
        stats: [
          { value: "$80M+", label: "license & service sales" },
          { value: "+23%", label: "win rate" },
          { value: "+15%", label: "average deal size" },
        ],
        bullets: [
          "Segmented 115+ accounts, refocusing co-sell on life sciences, high tech and industrials and rolling out joint offerings across 20+ delivery teams.",
          "Secured $35M+ in investments by running innovation workshops and building narratives for CEO, CFO and COO audiences.",
        ],
      },
    },
    {
      title: "Consulting Analyst",
      years: "Aug 2021 — Oct 2022",
      project: {
        client: "California EDD",
        focus: "Fraud Strategy & Remediation",
        summary:
          "Designed analytical frameworks to identify coordinated fraud networks in the state's unemployment system.",
        stats: [
          { value: "$135M+", label: "fraudulent claims reclaimed" },
          { value: "20K+", label: "suspicious claims flagged" },
          { value: "−45%", label: "manual claim review" },
        ],
        bullets: [
          "Converted fraud-network findings into 85 detection rules.",
          "Synthesized the analysis into legislative briefing materials for Governor Newsom on the state's fraud response.",
        ],
      },
    },
  ] satisfies Role[],
  earlier: [
    {
      org: "PwC",
      title: "Financial Markets Intern",
      location: "Dallas",
      years: "Summer 2019",
      summary:
        "Ran right-of-use asset impairment valuations for 500+ retail properties across $250M+ in real estate deals, built purchase price allocations for a $90M deal, and advised asset managers on the LIBOR transition.",
    },
  ] satisfies EarlierRole[],
};

export const education: Education[] = [
  {
    years: "2026 — 2028",
    school: "The University of Chicago Booth School of Business",
    degree: "MBA & MS in Computer Science · Joint degree",
    note: "Concentrations in Strategic Management, Finance and International Business.",
  },
  {
    years: "2017 — 2021",
    school: "The University of Texas at Austin",
    degree: "BBA, Finance & MIS · BA, Economics",
    note: "Minors in Computer Science, Marketing and Educational Psychology. Studied abroad at VŠE Prague; interned abroad with Dun & Bradstreet in Hong Kong. Delta Sigma Pi, University Securities Investment Team, Club Volleyball, Convergent.",
  },
];
