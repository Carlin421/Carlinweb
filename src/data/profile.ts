export const profile = {
  name: "Carlin Hou",
  title: "Software Engineer | Incoming MSI Student at University of Michigan",
  shortIntro:
    "I build AI-assisted tools, full-stack applications, and systems that turn messy real-world workflows into usable software. My current interests include retrieval systems, backend engineering, voice interfaces, and ML infrastructure.",
  searchStatus:
    "Currently looking for 2027 summer internship opportunities in software engineering, AI engineering, backend systems, and ML infrastructure.",
  location: "Based in the U.S.",
  email: "YOUR_EMAIL_HERE",
  github: "https://github.com/Carlin421",
  linkedin: "https://www.linkedin.com/in/carlin-hou-036212293/",
  resume: "/resume.pdf",
  about: [
    "I am an incoming Master of Science in Information student at the University of Michigan with experience in full-stack development, AI-assisted systems, and real-world software projects.",
    "Recently, I worked on customer-support automation projects involving retrieval-augmented generation, voice interfaces, and LLM-based workflow tools during a software engineering internship in New York.",
    "My current interests are software engineering, ML infrastructure, retrieval systems, backend development, and AI products that improve operational efficiency.",
  ],
  education: [
    {
      school: "University of Michigan",
      degree: "Master of Science in Information",
      detail: "Incoming student, Fall 2026",
    },
    {
      school: "National Chi Nan University",
      degree: "Information Management major, Finance minor",
      detail: "Undergraduate background",
    },
  ],
};

export const focusAreas = [
  "AI-assisted support systems",
  "Retrieval pipelines",
  "Backend infrastructure",
  "Voice interfaces",
  "Full-stack products",
];

// Any value still left as a "YOUR_..._HERE" placeholder is treated as unset so the
// UI can hide it instead of shipping a broken link/mailto. Fill the real value into
// `profile` above and the corresponding link appears automatically.
const isPlaceholder = (value: string) =>
  value.includes("YOUR_") || value.includes("_HERE");

export const socials = {
  email: isPlaceholder(profile.email) ? null : profile.email,
  github: isPlaceholder(profile.github) ? null : profile.github,
  linkedin: isPlaceholder(profile.linkedin) ? null : profile.linkedin,
};
