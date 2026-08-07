export const profile = {
  name: "Aman",
  surname: "Singh",
  title: "Full-Stack Developer & Engineer",
  tagline: "Full-stack JavaScript development focused on React and Node.js.",
  bio: [
    "Full-Stack Developer specializing in JavaScript, React, and Node.js.",
    "Building responsive, accessible, and performant web applications.",
    "Comfortable working across frontend and backend stacks with a product focus.",
  ],
  resumeUrl: "https://github.com/Aman18-18",
  avatar: "/luffy.jpg",
  email: "",
  availability: "Open to new opportunities — available for freelance and full-time roles.",
  location: "Prayagraj, India",
  social: {
    github: "https://github.com/Aman18-18",
    linkedin: "https://www.linkedin.com/in/amansingh1818/",
    x: "https://x.com/ykykaman",
  },
};

export const techStack = [
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "Tailwind CSS",
  "Vite",
  "SQL",
  "REST APIs",
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const indexLinks = [
  { label: "Hero", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const experience = [
  {
    id: "work-1",
    company: "Freelance / Personal Projects",
    status: "Working" as const,
    role: "Full-Stack Developer",
    period: "2022 - Present",
    location: "Remote",
    tech: ["React", "Node.js", "Tailwind CSS"],
    bullets: [
      "Built SignalStack: an information prioritization system for news and articles.",
      "Designed and implemented LifeGrid: a performance analytics dashboard with streak tracking.",
    ],
  },
  {
    id: "work-2",
    company: "Open Source & Community",
    status: "Completed" as const,
    role: "Contributor / Maintainer",
    period: "2020 - 2022",
    location: "Online",
    tech: ["JavaScript", "React", "Express"],
    bullets: [
      "Contributed to various tooling and web projects; focused on accessibility and performance.",
    ],
  },
];

export const skills = [
  "JavaScript",
  "React.js",
  "Node.js",
  "Express.js",
  "Tailwind CSS",
  "HTML5",
  "CSS3",
  "SQL",
  "REST APIs",
  "Git",
  "GitHub",
];

export const projects = [
  {
    title: "SignalStack - Smart Information Prioritizer",
    description:
      "A full-stack web app that ranks news articles by relevance, freshness, and uniqueness so users can focus on the most valuable content.",
    tech: ["React", "Node.js", "Express", "Tailwind CSS"],
    link: "https://github.com/Aman18-18/News-Generator",
    category: "Web App",
    year: 2024,
    status: "Live" as const,
  },
  {
    title: "LifeGrid - Personal Performance Analytics Dashboard",
    description:
      "A productivity dashboard that turns daily habits into a unified performance score with visual analytics and streak-based insights.",
    tech: ["React", "Vite", "Tailwind CSS", "Node.js"],
    link: "https://github.com/Aman18-18/LifeGrid",
    category: "Dashboard",
    year: 2024,
    status: "Live" as const,
  },
];

export const quote = {
  text: "Let's build something meaningful and ship it.",
  author: "Aman Singh",
};

export default {};
