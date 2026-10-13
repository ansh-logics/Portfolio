import projectsJson from "../Projects.json";

export interface Project {
  title: string;
  role: string;
  description: string;
  built: string;
  tech: string[];
  link: string;
  website: string;
  theme: string;
}

export const projects: Project[] = projectsJson;

export const profile = {
  name: "Ansh Bhatt",
  handle: "ansh@bhatt",
  role: "Backend & Full-Stack Developer",
  location: "Delhi NCR, India",
  phone: "+91-9560078250",
  summary:
    "Backend and full-stack developer building product-focused applications with TypeScript, Node.js, Python, FastAPI, PostgreSQL, and Docker. Experienced in API design, asynchronous service integration, background workflows, media processing, and production debugging.",
};

export const links = {
  email: "anshbhatt140@gmail.com",
  github: "https://github.com/ansh-logics",
  linkedin: "https://www.linkedin.com/in/ansh-bhatt-py",
  twitter: "https://twitter.com/AnshBhatt906",
  website: "https://anshbhatt.space",
  cv: "/CV.pdf",
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "C++"] },
  { group: "Backend", items: ["Node.js", "FastAPI", "Express.js", "Django", "Flask", "REST APIs", "Async HTTP"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "MySQL", "SQLAlchemy", "Redis"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"] },
  { group: "Infrastructure", items: ["Docker", "Docker Compose", "Git", "GitHub", "Cloudinary", "FFmpeg"] },
  { group: "Integrations", items: ["Figma API", "YouTube IFrame API", "Groq API", "Hugging Face Transformers"] },
];

export const experience = [
  {
    company: "Waysorted",
    role: "Part-time Backend Contributor",
    period: "Sep 2025 – Sep 2026",
    location: "Remote",
    url: "https://www.waysorted.com",
    points: [
      "Built backend capabilities for a real-time Figma plugin, including 15+ REST APIs for authentication, synchronization, and plugin operations.",
      "Diagnosed cross-service product-event and subscriber workflows spanning the plugin, web application, and Flask newsletter service.",
      "Validated a seven-day inactivity-email journey through a controlled canary-to-eligible-user rollout, clearing queued work with zero recorded delivery failures.",
    ],
  },
  {
    company: "House of Couton Pvt. Ltd.",
    role: "Web Developer Intern",
    period: "Jan 2025 – Dec 2025",
    location: "Delhi NCR",
    url: "",
    points: [
      "Built full-stack internal applications for marketing, human-resources, and management-research teams using MERN, Django, Flask, and PostgreSQL.",
      "Translated requirements into REST APIs, database workflows, and third-party integrations with cross-functional stakeholders.",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Dr. A.P.J. Abdul Kalam Technical University",
    period: "2023 – 2027",
    location: "Uttar Pradesh",
  },
  {
    degree: "Senior Secondary (Class XII), Science & Mathematics",
    institution: "The Union Academy Senior Secondary School",
    period: "Completed 2023",
    location: "New Delhi",
  },
];

export const achievements = [
  { title: "Smart India Hackathon 2025", detail: "Selected for the external round among 145+ teams." },
  { title: "AWS Young Builders Challenge 2023", detail: "Ranked among the Top 11 teams nationally." },
  { title: "Bank of Baroda × Microsoft Hackathon 2024", detail: "Ranked among the Top 20 teams nationally." },
  { title: "GDG on Campus Lead", detail: "Leading the Google Developer Group chapter, 2025–26." },
  { title: "Hackathon Winner", detail: "Two-time college hackathon winner." },
];

export const sections = [
  { id: "about", label: "about" },
  { id: "work", label: "work" },
  { id: "experience", label: "experience" },
  { id: "contact", label: "contact" },
];
