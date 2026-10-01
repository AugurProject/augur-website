export type SiteRoute = {
  href: string;
  label: string;
  question: string;
  boundary: string;
};

export const siteRoutes: SiteRoute[] = [
  {
    href: "/",
    label: "Home",
    question: "What is Augur, and why investigate it?",
    boundary: "Introduction and short previews.",
  },
  {
    href: "/protocol/",
    label: "Protocol",
    question: "How does Augur Lituus resolve a question?",
    boundary: "Mechanism, security assumptions, and responsibilities.",
  },
  {
    href: "/developers/",
    label: "Developers",
    question: "What can I explore today?",
    boundary: "Application fit, status, public code, known gaps, and Zoltar.",
  },
  {
    href: "/learn/",
    label: "Learn",
    question: "Where do I start?",
    boundary: "Evergreen foundations, definitions, and worked examples.",
  },
  {
    href: "/blog/",
    label: "Blog",
    question: "What is new or being discussed?",
    boundary: "Dated articles, interpretation, and updates.",
  },
  {
    href: "/research/",
    label: "Research",
    question: "Which source supports this?",
    boundary: "Published papers, discussions, and editions.",
  },
  {
    href: "/rep/",
    label: "REP",
    question: "What is REP, which version do I hold, and what are my responsibilities?",
    boundary: "Token identity, reporting, and forks.",
  },
  {
    href: "/faq/",
    label: "FAQ",
    question: "Where is a direct answer?",
    boundary: "Short explanations and version guidance.",
  },
  {
    href: "/about/",
    label: "About",
    question: "Who is behind the work and how do I reach them?",
    boundary: "Roles, funding, operator, and Contact.",
  },
  {
    href: "/history/",
    label: "History",
    question: "How does earlier information apply?",
    boundary: "Dated chronology, versions, and original sources.",
  },
  {
    href: "/terms/",
    label: "Terms",
    question: "What terms apply?",
    boundary: "Reviewed operator, dates, contact, and policy detail.",
  },
  {
    href: "/privacy/",
    label: "Privacy",
    question: "What data practices apply?",
    boundary: "Reviewed operator, dates, contact, and privacy detail.",
  },
];

export const primaryNavigation = [
  { href: "/protocol/", label: "Protocol" },
  { href: "/developers/", label: "Developers" },
  { href: "/blog/", label: "Blog" },
  { href: "/faq/", label: "FAQ" },
] as const;

export const resourceNavigation = [
  { href: "/learn/", label: "Learn" },
  { href: "/rep/", label: "REP" },
  { href: "/research/", label: "Research" },
  { href: "/history/", label: "History" },
] as const;

// Augur is a community project: its contact routes are the community
// channels linked from the current augur.net (checked 2026-10-01). The
// site also links x.com/AugurLituus, which returned 404 on that date, so it
// is left out until a maintainer confirms the handle.
export type CommunityChannel = {
  id: string;
  label: string;
  handle: string;
  href: string;
};

export const communityChannels: CommunityChannel[] = [
  { id: "discord", label: "Discord", handle: "Community discussion", href: "https://discord.gg/Y3tCZsSmz3" },
  { id: "telegram", label: "Telegram", handle: "t.me/augurlituus", href: "https://t.me/augurlituus" },
  { id: "x-project", label: "X", handle: "@AugurProject", href: "https://x.com/AugurProject" },
  { id: "github", label: "GitHub", handle: "AugurProject", href: "https://github.com/AugurProject" },
];

export const productOrder = [
  "Augur",
  "Augur Lituus",
  "Zoltar",
  "Augur Statoblast",
  "Statoblast Trading",
  "Lituus Foundation",
] as const;
