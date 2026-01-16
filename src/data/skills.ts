export interface Skill {
  name: string;
  mastery: 1 | 2 | 3 | 4 | 5; // 1 = Beginner, 5 = Master
  description?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string; // Emoji or icon name
  color: "cyan" | "pink" | "green" | "yellow" | "purple";
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    name: "Backend Development",
    icon: "server",
    color: "cyan",
    skills: [
      { name: "Laravel", mastery: 5, description: "Expert in Laravel framework and ecosystem" },
      { name: "Django", mastery: 4, description: "Proficient in Django and DRF" },
      { name: "PHP", mastery: 5, description: "Deep understanding of PHP internals" },
      { name: "Python", mastery: 4, description: "Strong Python development skills" },
      { name: "RESTful APIs", mastery: 5, description: "Expert API design and implementation" },
      { name: "GraphQL", mastery: 3, description: "Working knowledge of GraphQL" },
      { name: "Node.js", mastery: 3, description: "Backend development with Node.js" },
    ],
  },
  {
    id: "databases",
    name: "Databases",
    icon: "database",
    color: "green",
    skills: [
      { name: "PostgreSQL", mastery: 5, description: "Advanced PostgreSQL optimization" },
      { name: "MySQL", mastery: 5, description: "Deep MySQL expertise" },
      { name: "Redis", mastery: 4, description: "Caching and queue management" },
      { name: "SQL Optimization", mastery: 5, description: "Query performance tuning" },
      { name: "NoSQL", mastery: 3, description: "Document and key-value stores" },
      { name: "Database Design", mastery: 4, description: "Schema design and normalization" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: "cloud",
    color: "pink",
    skills: [
      { name: "AWS", mastery: 4, description: "SageMaker, EC2, S3, Lambda" },
      { name: "Azure", mastery: 3, description: "Azure deployment and services" },
      { name: "Google Cloud", mastery: 3, description: "GCP fundamentals" },
      { name: "Docker", mastery: 4, description: "Containerization and orchestration" },
      { name: "Redis Queues", mastery: 4, description: "Message queue management" },
      { name: "Horizon", mastery: 4, description: "Laravel Horizon for queue monitoring" },
    ],
  },
  {
    id: "aiml",
    name: "AI & Machine Learning",
    icon: "brain",
    color: "purple",
    skills: [
      { name: "TensorFlow", mastery: 4, description: "Deep learning with TensorFlow" },
      { name: "NLP", mastery: 4, description: "Natural Language Processing" },
      { name: "Computer Vision", mastery: 4, description: "Image recognition and analysis" },
      { name: "LSTM Networks", mastery: 3, description: "Sequential data modeling" },
      { name: "Amazon Comprehend", mastery: 4, description: "AWS ML services" },
      { name: "Deep Learning", mastery: 4, description: "Neural network architecture" },
    ],
  },
  {
    id: "iot",
    name: "IoT & Data",
    icon: "cpu",
    color: "yellow",
    skills: [
      { name: "IoT Data Management", mastery: 4, description: "Real-time IoT systems" },
      { name: "Real-time Analytics", mastery: 4, description: "Live data processing" },
      { name: "Satellite Data", mastery: 4, description: "Sentinel-2 imagery analysis" },
      { name: "Data Pipelines", mastery: 4, description: "ETL and data workflows" },
    ],
  },
  {
    id: "tools",
    name: "Tools & Practices",
    icon: "wrench",
    color: "cyan",
    skills: [
      { name: "Git", mastery: 5, description: "Version control expert" },
      { name: "API Documentation", mastery: 4, description: "OpenAPI/Swagger specs" },
      { name: "Juju", mastery: 3, description: "Infrastructure orchestration" },
      { name: "Agile/Scrum", mastery: 4, description: "Agile methodologies" },
      { name: "Technical Writing", mastery: 4, description: "Documentation and guides" },
      { name: "Team Leadership", mastery: 4, description: "Leading engineering teams" },
    ],
  },
];

// Helper function to get mastery label
export function getMasteryLabel(mastery: number): string {
  const labels = ["", "Novice", "Apprentice", "Skilled", "Expert", "Master"];
  return labels[mastery] || "Unknown";
}

// Helper function to get mastery color
export function getMasteryColor(mastery: number): string {
  const colors = ["", "#666666", "#00ff00", "#00ffff", "#ff00ff", "#ffff00"];
  return colors[mastery] || "#666666";
}

// Calculate total mastery points
export function getTotalMasteryPoints(): number {
  return skillCategories.reduce((total, category) => {
    return total + category.skills.reduce((catTotal, skill) => catTotal + skill.mastery, 0);
  }, 0);
}

// Get max possible mastery points
export function getMaxMasteryPoints(): number {
  return skillCategories.reduce((total, category) => {
    return total + category.skills.length * 5;
  }, 0);
}

// Get category mastery percentage
export function getCategoryMastery(categoryId: string): number {
  const category = skillCategories.find((c) => c.id === categoryId);
  if (!category) return 0;

  const totalPoints = category.skills.reduce((sum, skill) => sum + skill.mastery, 0);
  const maxPoints = category.skills.length * 5;
  return Math.round((totalPoints / maxPoints) * 100);
}

// Legacy exports for compatibility
export const skills = skillCategories.map((category) => ({
  name: category.name,
  skills: category.skills.map((s) => s.name),
}));

export const coreTechnologies = [
  "Laravel",
  "Django",
  "AWS",
  "PostgreSQL",
  "TensorFlow",
  "Python",
  "PHP",
  "REST APIs",
];
