export const profile = {
  name: "Roger Obeng Koranteng",
  title: "Senior Software Engineer",
  email: "Rogerkorantenng@gmail.com",
  phone: "+233547738808",
  location: "Accra, Ghana",
  links: {
    blog: "https://rogerkoranteng.com",
    github: "https://github.com/rogerkorantenng",
    linkedin: "https://linkedin.com/in/rogerkorantenng",
  },
  summary:
    "Senior Software Engineer with expertise in building scalable backend systems, AI-powered applications, and IoT solutions. Experienced in leading engineering teams, optimizing multi-tenant SaaS architectures, and delivering products that drive measurable impact. Passionate about leveraging technology to solve real-world problems, from climate monitoring to enterprise software.",
  highlights: {
    yearsOfExperience: "3+",
    teamSize: "5 engineers led",
    specialties: ["Backend Development", "AI/ML", "Cloud Architecture", "IoT"],
    achievements: [
      "Led AI-powered SOP Rewriter achieving 80% adoption",
      "Reduced request latency by 40% on multi-tenant SaaS",
      "Winner - Dell & Nvidia HackAI (Enterprise CV)",
      "Nvidia Inception Award recipient ($100K cloud resources)",
    ],
  },
  // Gamification stats
  stats: {
    yearsExperience: 3,
    projectsCompleted: 4,
    certificationsEarned: 5,
    awardsWon: 2,
    teamsLed: 1,
  },
};

// XP Calculation
// Formula: years * 1000 + projects * 200 + certs * 150 + awards * 500
export function getXP(): number {
  const { stats } = profile;
  return (
    stats.yearsExperience * 1000 +
    stats.projectsCompleted * 200 +
    stats.certificationsEarned * 150 +
    stats.awardsWon * 500 +
    stats.teamsLed * 300
  );
}

// Level calculation (XP / 500, minimum level 1)
export function getLevel(): number {
  return Math.max(1, Math.floor(getXP() / 500) + 1);
}

// Progress towards next level (percentage)
export function getLevelProgress(): number {
  const xp = getXP();
  const currentLevelXP = (getLevel() - 1) * 500;
  const nextLevelXP = getLevel() * 500;
  return ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
}

// Get XP breakdown for display
export function getXPBreakdown() {
  const { stats } = profile;
  return [
    { source: "Years Experience", value: stats.yearsExperience * 1000, formula: `${stats.yearsExperience} years × 1000` },
    { source: "Projects Completed", value: stats.projectsCompleted * 200, formula: `${stats.projectsCompleted} projects × 200` },
    { source: "Certifications", value: stats.certificationsEarned * 150, formula: `${stats.certificationsEarned} certs × 150` },
    { source: "Awards Won", value: stats.awardsWon * 500, formula: `${stats.awardsWon} awards × 500` },
    { source: "Teams Led", value: stats.teamsLed * 300, formula: `${stats.teamsLed} team × 300` },
  ];
}

export type Profile = typeof profile;
