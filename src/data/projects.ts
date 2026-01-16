export interface Project {
  id: string;
  title: string;
  codename?: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
  features: string[];
  category: "AI" | "Backend" | "Cloud" | "IoT" | "Frontend";
  platform?: string;
  links?: {
    github?: string;
    demo?: string;
    live?: string;
  };
  featured: boolean;
  // Gamification fields
  difficulty: 1 | 2 | 3 | 4 | 5; // Star rating
  xpReward: number;
  badges: string[];
  status: "COMPLETE" | "IN_PROGRESS" | "CLASSIFIED";
  completedDate?: string;
}

export const projects: Project[] = [
  {
    id: "insurance-prediction",
    title: "Insurance Cost Prediction App",
    codename: "ORACLE",
    description:
      "ML-powered application that predicts insurance costs using AWS services including Amazon Comprehend Medical and SageMaker.",
    problem:
      "Insurance cost estimation is complex and traditionally requires manual assessment, leading to delays and inconsistencies.",
    solution:
      "Developed a machine learning application leveraging AWS services to automate and accurately predict insurance costs based on user data.",
    stack: [
      "AWS SageMaker",
      "Amazon Comprehend Medical",
      "Juju",
      "Python",
      "Machine Learning",
    ],
    features: [
      "Automated deployment using Juju for scalable infrastructure",
      "Integration with Amazon Comprehend Medical for data processing",
      "Real-time cost predictions using trained ML models",
      "Streamlined development process with efficient service orchestration",
    ],
    category: "AI",
    platform: "AWS",
    featured: true,
    difficulty: 4,
    xpReward: 500,
    badges: ["AWS_SPECIALIST", "ML_ENGINEER", "AUTOMATION"],
    status: "COMPLETE",
    completedDate: "2023",
  },
  {
    id: "deforestation-monitoring",
    title: "Sentinel-2 Deforestation Monitoring",
    codename: "GUARDIAN",
    description:
      "Satellite imagery analysis system to monitor deforestation in Ghana using Sentinel-2 data from the Copernicus Program.",
    problem:
      "Deforestation is a major recurring issue in Ghana, with limited real-time monitoring capabilities for forest reserves.",
    solution:
      "Built a monitoring system using Sentinel-2 satellite imagery to track deforestation patterns across major forest and wildlife reserves.",
    stack: [
      "AWS SageMaker",
      "Sentinel-2",
      "Copernicus Program",
      "Python",
      "API Development",
    ],
    features: [
      "Analysis using Sentinel-2 bands 1-12 for comprehensive monitoring",
      "Comparison tracking of Mole National Park and Ankasa Game Reserve",
      "API for periodic data collection from AWS buckets",
      "Dashboard accessible to regulatory organizations and public users",
    ],
    category: "AI",
    platform: "AWS",
    featured: true,
    difficulty: 5,
    xpReward: 750,
    badges: ["ENVIRONMENTAL_HERO", "SATELLITE_EXPERT", "DATA_ANALYST"],
    status: "COMPLETE",
    completedDate: "2023",
  },
  {
    id: "nose-mask-detection",
    title: "Nose Mask Detection System",
    codename: "VIGILANT",
    description:
      "Deep learning computer vision model to detect whether a person is wearing a nose mask, deployed on Azure.",
    problem:
      "Manual mask compliance checking is time-consuming and inconsistent, especially in high-traffic areas.",
    solution:
      "Trained a deep learning model using TensorFlow on AWS EC2 dl1 Habana instances powered by Gaudi Accelerators for efficient mask detection.",
    stack: [
      "TensorFlow",
      "AWS EC2 dl1",
      "Gaudi Accelerators",
      "Flask",
      "Azure",
      "Habana Framework",
    ],
    features: [
      "Computer vision model trained on Gaudi Accelerators for efficiency",
      "User-friendly Flask application for image upload and prediction",
      "Leveraged TensorFlow Keras API with Habana TensorFlow framework",
      "Optimized testing using single Gaudi accelerator",
    ],
    category: "AI",
    platform: "Azure",
    featured: true,
    difficulty: 4,
    xpReward: 500,
    badges: ["CV_SPECIALIST", "AZURE_CERTIFIED", "HACKATHON_WINNER"],
    status: "COMPLETE",
    completedDate: "2023",
  },
  {
    id: "movie-sentiment",
    title: "Movie Review Sentiment Analysis",
    codename: "CRITIC",
    description:
      "NLP application that analyzes movie reviews to determine positive or negative sentiment using LSTM neural networks.",
    problem:
      "Manually analyzing large volumes of movie reviews for sentiment is impractical and time-consuming.",
    solution:
      "Built an LSTM-based sentiment analysis model with real-time training capabilities using live IMDB comments.",
    stack: [
      "Python",
      "LSTM",
      "TensorFlow",
      "CountVectorizer",
      "TfidfVectorizer",
      "API",
    ],
    features: [
      "Test accuracy of 87.50% with loss of 0.4559",
      "Text conversion using CountVectorizer and TfidfVectorizer",
      "API integration for real-time data updates and training",
      "Live comment analysis from IMDB for continuous improvement",
    ],
    category: "AI",
    platform: "Local",
    featured: false,
    difficulty: 3,
    xpReward: 350,
    badges: ["NLP_SPECIALIST", "DEEP_LEARNING"],
    status: "COMPLETE",
    completedDate: "2023",
  },
];

// Calculate total XP from completed projects
export function getProjectXP(): number {
  return projects
    .filter((p) => p.status === "COMPLETE")
    .reduce((sum, p) => sum + p.xpReward, 0);
}

// Get all unique badges earned from projects
export function getProjectBadges(): string[] {
  return [...new Set(projects.filter((p) => p.status === "COMPLETE").flatMap((p) => p.badges))];
}

// Get project by ID
export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

// Get projects by category
export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((p) => p.category === category);
}

// Difficulty label helper
export function getDifficultyLabel(difficulty: number): string {
  const labels = ["", "TRIVIAL", "EASY", "MODERATE", "HARD", "LEGENDARY"];
  return labels[difficulty] || "UNKNOWN";
}

export const projectCategories = ["All", "AI", "Backend", "Cloud", "IoT", "Frontend"] as const;
export type ProjectCategory = (typeof projectCategories)[number];
