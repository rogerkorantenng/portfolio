export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
}

export const education: Education[] = [
  {
    id: "msc",
    degree: "Master of Science",
    field: "Computer Science",
    institution: "University of Ghana",
    location: "Accra, Ghana",
  },
  {
    id: "bsc",
    degree: "Bachelor of Commerce",
    field: "Commerce",
    institution: "University for Development Studies",
    location: "Tamale, Ghana",
  },
];
