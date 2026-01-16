export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    name: "Backend Development",
    skills: [
      "Laravel",
      "Django",
      "PHP",
      "Python",
      "RESTful APIs",
      "GraphQL",
      "Node.js",
    ],
  },
  {
    name: "Databases",
    skills: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "SQL Optimization",
      "NoSQL",
      "Database Design",
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      "AWS (SageMaker, EC2, S3)",
      "Azure",
      "Google Cloud",
      "Docker",
      "Redis Queues",
      "Horizon",
    ],
  },
  {
    name: "AI & Machine Learning",
    skills: [
      "TensorFlow",
      "Natural Language Processing (NLP)",
      "Computer Vision",
      "LSTM Networks",
      "Amazon Comprehend",
      "Deep Learning",
    ],
  },
  {
    name: "IoT & Data",
    skills: [
      "IoT Data Management",
      "Real-time Analytics",
      "Satellite Data Processing",
      "Data Pipelines",
    ],
  },
  {
    name: "Tools & Practices",
    skills: [
      "Git",
      "API Documentation",
      "Juju",
      "Agile/Scrum",
      "Technical Writing",
      "Team Leadership",
    ],
  },
];

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
