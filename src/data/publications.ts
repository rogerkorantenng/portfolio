export interface Publication {
  id: string;
  title: string;
  type: "book" | "blog" | "article";
  publisher: string;
  description: string;
  highlights: string[];
  link?: string;
}

export const publications: Publication[] = [
  {
    id: "data-science-book",
    title: "Beginner's Guide to Data Science",
    type: "book",
    publisher: "Self-published",
    description:
      "A comprehensive introduction to data science and machine learning for beginners.",
    highlights: [
      "Introduces foundational concepts in data science and machine learning",
      "Provides practical examples and exercises using Jupyter Notebook",
      "Covers data cleaning, analysis, visualization, and model building",
      "Includes step-by-step tutorials for performing data-related projects",
      "Designed for beginners with no prior experience in data science",
    ],
  },
  {
    id: "blog",
    title: "Editor-in-Chief at Rogerkoranteng.com",
    type: "blog",
    publisher: "Rogerkoranteng.com",
    description:
      "Technical blog focusing on machine learning applications for climate solutions and environmental technology.",
    highlights: [
      "Innovative Applications: Insights into machine learning applications for climate solutions, including deforestation monitoring and climate impact predictions",
      "Practical Guides: Tutorials on integrating machine learning with climate data and real-world applications",
      "Case Studies: Real-world examples showcasing successful machine learning projects in environmental management",
    ],
    link: "https://rogerkoranteng.com",
  },
];
