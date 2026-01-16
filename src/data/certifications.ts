export interface Certification {
  id: string;
  name: string;
  issuer?: string;
  date: string;
}

export const certifications: Certification[] = [
  {
    id: "ibm-ds",
    name: "IBM Data Science Professional Certificate",
    issuer: "IBM",
    date: "Feb 2020 - March 2021",
  },
  {
    id: "imc",
    name: "Integrated Marketing Communications",
    date: "",
  },
  {
    id: "umich-web",
    name: "Developing Web Applications",
    issuer: "University of Michigan",
    date: "",
  },
  {
    id: "google-cloud",
    name: "Developing Applications with Google Cloud",
    issuer: "Google",
    date: "August 2021 - February 2022",
  },
  {
    id: "it-security",
    name: "IT Security: Defense against the digital dark arts",
    date: "February 2023 - April 2023",
  },
];
