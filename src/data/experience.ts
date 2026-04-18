export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "contract" | "remote";
  categories: string[];
  responsibilities: {
    area: string;
    bullets: string[];
  }[];
}

export const experiences: Experience[] = [
  {
    id: "waltergates",
    title: "Senior Software Engineer",
    company: "WalterGates Ghana Limited",
    location: "Accra, Ghana",
    type: "full-time",
    categories: ["Backend", "Full-Stack", "Payments"],
    responsibilities: [
      {
        area: "FalconPay — Payment Processing Platform",
        bullets: [
          "Engineered a payment processing system enabling seamless transactions across the Walter Gates ecosystem, integrated with ITC UniWallet gateway.",
          "Built the Laravel API backend with Sanctum authentication, business registration workflows, and automated fee/commission calculations.",
          "Implemented queue-based payment notifications and transaction processing via Supervisor workers.",
        ],
      },
      {
        area: "WG Commodities — Hire-Purchase Platform",
        bullets: [
          "Developed a full-stack hire-purchase platform with Next.js frontend and Laravel API, enabling customers to acquire products through installment payments.",
          "Built a multi-role system (Admin, Agent, Customer, Supplier) with credit application workflows and tiered progression (Entry → Silver → Gold).",
          "Implemented agent commission tracking, daily payment collection, and vendor payout calculations.",
        ],
      },
      {
        area: "ISDBMS — Informal Sector Database Management System",
        bullets: [
          "Built a purpose-designed system to digitize and structure records for informal sector operations, bridging traditional business practices with modern data management.",
          "Developed the Next.js frontend (deployed via PM2) and Laravel API backend with Sanctum-based authentication.",
          "Set up staging and production environments with Nginx reverse proxy, Certbot SSL, and Supervisor for background processing.",
        ],
      },
    ],
  },
  {
    id: "college-league",
    title: "Lead Software Engineer",
    company: "College League App",
    location: "US (Remote)",
    type: "remote",
    categories: ["Backend", "API", "Leadership"],
    responsibilities: [
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
    id: "vb-it-consult",
    title: "Software Engineer",
    company: "VB IT Consult - Adesuapa Project",
    location: "Remote",
    type: "remote",
    categories: ["Backend", "Full-Stack", "DevOps"],
    responsibilities: [
      {
        area: "Multi-Tenant Application Development",
        bullets: [
          "Built and maintained a multi-tenant Laravel application serving multiple educational institutions with isolated data and customizable configurations.",
          "Implemented bulk student import system via Excel file uploads, streamlining onboarding for schools.",
        ],
      },
      {
        area: "Notification & Background Processing",
        bullets: [
          "Developed SMS and email notification pipelines using Laravel queues, Horizon, and Supervisor for reliable background job processing.",
          "Created a demo provisioning system that auto-generates institution trial accounts with temporary credentials.",
        ],
      },
      {
        area: "Server Deployment & Infrastructure",
        bullets: [
          "Managed server deployments on Linux (Ubuntu), including Nginx configuration, Supervisor process management, and storage/permission handling.",
          "Built the frontend with Vite, handling production build optimization under resource-constrained environments.",
        ],
      },
    ],
  },
  {
    id: "kofa",
    title: "Backend Engineer - API, Machine Learning & IoT",
    company: "Kofa Technologies",
    location: "Accra, Ghana",
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
    title: "Software Engineer Intern",
    company: "Blue Sky Products Gh. Ltd.",
    location: "Nsawam, Ghana",
    type: "full-time",
    categories: ["Software Engineering"],
    responsibilities: [
      {
        area: "Software Development",
        bullets: [
          "Contributed to developing and improving software features, supporting overall system reliability and user experience.",
          "Identified issues, optimized functionality, and ensured code quality across assigned modules.",
        ],
      },
    ],
  },
];
