export type AdditionalWorkItem = {
  title: string;
  category: string;
  description: string;
  evidence: string[];
  tags: string[];
};

export const additionalWork: AdditionalWorkItem[] = [
  {
    title: "Google Developer Student Clubs / Technical Community",
    category: "Leadership / Developer Education",
    description:
      "Led and supported student technical learning through workshops, side-project guidance, and community activities at National Chi Nan University.",
    evidence: [
      "Planned learning activities and helped peers move from concepts to small working projects.",
      "Served in a student technical community role that combined teaching, coordination, and hands-on engineering practice.",
    ],
    tags: ["GDSC", "Workshops", "Mentorship", "Community", "Technical Learning"],
  },
  {
    title: "Digital Companion Program",
    category: "Education / Service / Operations",
    description:
      "Supported rural and local school students through a multi-semester digital learning service program, taking on coordination and student-support responsibilities.",
    evidence: [
      "Worked across tutoring, class support, group coordination, information support, and operations responsibilities.",
      "Built communication and leadership experience by helping learning activities run smoothly across multiple school partners.",
    ],
    tags: ["Education", "Service", "Coordination", "Student Support"],
  },
  {
    title: "Reading Café Student Initiative",
    category: "Campus Community / Career Exploration",
    description:
      "Co-founded a campus initiative focused on career exploration, peer learning, and alumni-style knowledge sharing.",
    evidence: [
      "Helped organize small-group gatherings, speaker-style sharing, and community activities.",
      "Turned broad career questions into structured conversations and student-facing events.",
    ],
    tags: ["Community Building", "Career Exploration", "Leadership"],
  },
  {
    title: "FinTech and Robo-Advisory Research Writing",
    category: "Research / Finance Technology",
    description:
      "Explored the difference between human financial advisors and robo-advisory products, including user experience, market comparison, and future trends.",
    evidence: [
      "Combined information-management and finance perspectives to explain financial-technology products clearly.",
      "Practiced turning technical and financial concepts into readable long-form analysis.",
    ],
    tags: ["FinTech", "Robo-Advisor", "Research", "Writing", "Finance"],
  },
];
