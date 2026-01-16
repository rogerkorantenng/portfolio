export interface Award {
  id: string;
  title: string;
  organization: string;
  achievement: string;
  description: string;
  year?: string;
  link?: string;
}

export const awards: Award[] = [
  {
    id: "nvidia-hackai",
    title: "Dell & Nvidia HackAI Hackathon",
    organization: "Nvidia",
    achievement: "Best in Enterprise Computer Vision (Winner)",
    description:
      "Won first place in the Enterprise Computer Vision category at the Dell & Nvidia HackAI Hackathon.",
    year: "2023",
  },
  {
    id: "nvidia-inception",
    title: "Nvidia Inception Global Award",
    organization: "Nvidia Corporation",
    achievement: "Inception Program Member",
    description:
      "Recognized for leveraging Nvidia GPU technology to innovate in AI and machine learning applications. Awarded $100,000 in cloud resources to support development and implementation of GPU-accelerated projects.",
    year: "2023",
  },
];
