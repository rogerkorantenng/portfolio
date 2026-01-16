export const profile = {
  name: "Roger Obeng Koranteng",
  title: "Lead Software Engineer",
  email: "Rogerkorantenng@gmail.com",
  phone: "+233547738808",
  location: "Accra, Ghana",
  links: {
    blog: "https://rogerkoranteng.com",
    github: "https://github.com/rogerkorantenng",
    linkedin: "https://linkedin.com/in/rogerkorantenng",
  },
  summary:
    "Lead Software Engineer with expertise in building scalable backend systems, AI-powered applications, and IoT solutions. Experienced in leading engineering teams, optimizing multi-tenant SaaS architectures, and delivering products that drive measurable impact. Passionate about leveraging technology to solve real-world problems, from climate monitoring to enterprise software.",
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
};

export type Profile = typeof profile;
