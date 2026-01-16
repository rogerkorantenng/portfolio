export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  type: "full-time" | "contract" | "remote";
  categories: string[];
  responsibilities: {
    area: string;
    bullets: string[];
  }[];
}

export const experiences: Experience[] = [
  {
    id: "college-league",
    title: "Lead Software Engineer",
    company: "College League App",
    location: "US (Remote)",
    startDate: "Nov 2024",
    endDate: "Present",
    type: "remote",
    categories: ["Backend", "AI", "Leadership"],
    responsibilities: [
      {
        area: "Product Leadership",
        bullets: [
          "Acted as Product Lead and engineering team owner, ensuring tasks were properly scoped, prioritized, and delivered on time.",
          "Led a team of 5 engineers to deliver an AI-powered Statement of Purpose Rewriter within 6 weeks, achieving 80% adoption in the first month of launch.",
        ],
      },
      {
        area: "Backend Development",
        bullets: [
          "Designed and implemented scalable server-side architectures, improving platform efficiency and reliability.",
          "Optimized a multi-tenant SaaS backend (Laravel + Redis queues + Horizon) to handle thousands of concurrent users, reducing request latency by 40%.",
        ],
      },
      {
        area: "API Design",
        bullets: [
          "Developed and optimized RESTful and GraphQL APIs for seamless communication between services and applications.",
          "Built a secure student billing API with token-based authentication and caching, enabling real-time tuition payments with 200ms average response time.",
        ],
      },
      {
        area: "Database Management",
        bullets: [
          "Designed, normalized, and optimized PostgreSQL schemas for student and financial records.",
          "Applied indexing and query optimization techniques, reducing execution time from 3s to under 300ms and ensuring data consistency across central and tenant databases.",
        ],
      },
    ],
  },
  {
    id: "kofa",
    title: "Backend Engineer - API, Machine Learning & IoT",
    company: "Kofa Technologies",
    location: "Accra, Ghana",
    startDate: "Oct 2023",
    endDate: "Oct 2024",
    type: "full-time",
    categories: ["Backend", "IoT", "ML"],
    responsibilities: [
      {
        area: "IoT Data Management for Electric Motorbikes",
        bullets: [
          "Designed and implemented robust web-based solutions for managing and analyzing IoT data using PHP (Laravel).",
          "Built scalable data processing systems that enhanced real-time tracking and analytics, contributing to a 15% reduction in local emissions.",
        ],
      },
      {
        area: "Back-End Development and Optimization",
        bullets: [
          "Spearheaded back-end development for electric motorbike data management systems using PHP and Laravel.",
          "Optimized data processing workflows by 30%, resulting in faster, more efficient data management and improved application performance.",
        ],
      },
      {
        area: "Database Management and Integration",
        bullets: [
          "Engineered and maintained efficient MySQL database structures to ensure seamless data storage and retrieval.",
          "Developed and integrated RESTful APIs with Laravel to enable smooth communication between system components and third-party services, enhancing monitoring functionality.",
        ],
      },
    ],
  },
  {
    id: "bluesky",
    title: "Software Engineer - API and Testing",
    company: "Blue Sky Products Gh. Ltd.",
    location: "Accra, Ghana",
    startDate: "Apr 2022",
    endDate: "Jun 2023",
    type: "full-time",
    categories: ["Frontend", "Testing"],
    responsibilities: [
      {
        area: "Frontend System Management",
        bullets: [
          "Assisted in managing and maintaining the frontend systems, ensuring that web interfaces and user experiences are optimized for performance and reliability.",
        ],
      },
      {
        area: "UI/UX Issue Resolution",
        bullets: [
          "Troubleshot frontend-related technical issues, such as layout inconsistencies and responsive design challenges, and provided timely resolutions to ensure smooth user interactions.",
        ],
      },
      {
        area: "Component Installation and Configuration",
        bullets: [
          "Assisted in the installation and configuration of frontend libraries and frameworks, ensuring compatibility and optimal performance across different browsers and devices.",
        ],
      },
      {
        area: "Security and Data Integrity",
        bullets: [
          "Implemented frontend security measures, such as content security policies and input validation, to protect user data and ensure the integrity of web applications.",
        ],
      },
    ],
  },
];
