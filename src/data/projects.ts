export interface Project {
  id: string;
  title: string;
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
}

export const projects: Project[] = [
  {
    id: "insurance-prediction",
    title: "Insurance Cost Prediction App",
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
  },
  {
    id: "deforestation-monitoring",
    title: "Sentinel-2 Deforestation Monitoring",
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
  },
  {
    id: "nose-mask-detection",
    title: "Nose Mask Detection System",
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
  },
  {
    id: "movie-sentiment",
    title: "Movie Review Sentiment Analysis",
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
  },
];

export const projectCategories = ["All", "AI", "Backend", "Cloud", "IoT", "Frontend"] as const;
export type ProjectCategory = (typeof projectCategories)[number];
