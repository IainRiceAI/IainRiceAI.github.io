// ─────────────────────────────────────────────────────────────────────────────
// PROJECT & ARTEFACT REGISTRY
// ─────────────────────────────────────────────────────────────────────────────
// This is the single file to edit when you want to add, update or reorder
// industrial projects, research projects and their artefacts (images, PDFs,
// demos, videos).
//
// Each entry supports:
//   title      (string, required) — project or client name
//   org        (string)           — organisation / partner
//   sector     (string)           — e.g. 'Healthcare', 'FinTech'
//   summary    (string)           — 1–2 sentence description
//   tags       (array of strings) — technologies / themes
//   year       (string)           — e.g. '2024' or '2021–24'
//   kind       ('industry' | 'research') — which listing it appears in
//   featured   (boolean)          — show on the homepage "Selected work" strip
//
// OPTIONAL ARTEFACTS — add any of these later and they will render automatically:
//   image      (string) — path to an image, e.g. '/images/artefacts/rapid-dashboard.jpg'
//                         (drop the file into public/images/artefacts/)
//   artefact   ({ label, href }) — a link to a PDF, demo, video, repo, etc.
//   links      (array of { label, href }) — multiple extra links
//
// Entries without an image render a generated neural-motif placeholder,
// so the page always looks complete — artefacts slot in when ready.
// ─────────────────────────────────────────────────────────────────────────────

export const projects = [
  {
    title: 'RAPID — Real-time Analytics for Paediatric Intensive Care',
    org: "Birmingham Children's Hospital",
    sector: 'Healthcare',
    kind: 'research',
    featured: true,
    year: '2015–17',
    summary:
      'On-ward predictive analytics identifying at-risk children — providing up to 12 hours advance warning of cardiac arrest, with whole-ward visual analytics mapping patient deterioration.',
    tags: ['Predictive analytics', 'Clinical AI', 'Visual analytics'],
    image: '/images/website_images_research/Rapid.jpg',
    // artefact: { label: 'Watch Operation Ouch feature', href: 'https://…' },
  },
  {
    title: 'Adversarial Machine Learning',
    org: "Birmingham City University",
    sector: 'Machine Learning',
    kind: 'research',
    featured: true,
    year: '2023–26',
    summary:
      'PhD Project with Ziad Ali & Atif Azad demonstrating adversarial attacks against state-of-the-art AI algorithms. Published in CVPR.',
    tags: ['Machine Learning', 'Adversarial Attacks', 'Computer Vision'],
    image: '/images/website_images_research/adversarial.jpg',
    // artefact: { label: 'Watch Operation Ouch feature', href: 'https://…' },
  },
    {
    title: 'Dementia-Oriented Adaptive UX Design',
    org: "Birmingham City University",
    sector: 'UX Design',
    kind: 'research',
    featured: true,
    year: '2023–26',
    summary:
      'PhD Project with Kirsty Link & Sayan Sarcar identifying limitations in dementia-oriented UX design.',
    tags: ['UX', 'Web Design', 'Dementia'],
    image: '/images/website_images_research/dementia.jpg',
    // artefact: { label: 'Watch Operation Ouch feature', href: 'https://…' },
  },
  {
    title: 'SONAR Anomaly Detection',
    org: 'Thales UK',
    sector: 'Defence',
    kind: 'research',
    featured: true,
    year: 'PhD',
    summary:
      'PhD research building novel deep-learning architectures and AI-enabled smart alarms for undersea target identification, briefed to high-ranking military personnel.',
    tags: ['Deep learning', 'Anomaly detection', 'Defence intelligence'],
    image: '/images/website_images_research/sonar.jpg',
  },
  {
    title: 'Safer Streets — Crime Pattern Analytics',
    org: 'Our Safer City · City of London Police',
    sector: 'Public safety',
    kind: 'industry',
    featured: true,
    year: 'Current',
    summary:
      'Chief Data Scientist role: predictive analytics and dashboards identifying crime patterns and safe walking routes, helping reduce violence against women and girls (VAWG).',
    tags: ['Predictive policing', 'Dashboards', 'Public safety'],
  },
  {
    title: 'GenAI Customer Support Platform',
    org: 'METCloud',
    sector: 'Cybersecurity / Cloud',
    kind: 'industry',
    featured: true,
    year: '2023–24',
    summary:
      'Leading a GenAI customer-support solution delivering measurable operational efficiencies for a cloud services provider — from guardrail design to deployment.',
    tags: ['GenAI', 'LLM guardrails', 'Customer operations'],
  },
  {
    title: 'Data Visualisation Consultancy',
    org: 'Mindset Associates',
    sector: 'Consultancy',
    kind: 'industry',
    featured: false,
    year: '2022',
    summary:
      'Reframed an "AI problem" as a data-visualisation problem — translating complex data into actionable business intelligence with a fast, business-focused turnaround.',
    tags: ['Data storytelling', 'Dashboards', 'Business intelligence'],
  },
  {
    title: 'AI Strategy & Predictive Analytics',
    org: 'Figg Wealth',
    sector: 'FinTech',
    kind: 'industry',
    featured: false,
    year: 'Current',
    summary:
      'Startup AI advisor developing strategies for maximising data value, LLM integration and predictive analytics in wealth management.',
    tags: ['AI strategy', 'FinTech', 'LLM integration'],
  },
  {
    title: 'Dashboards & GenAI Decision Tools',
    org: 'Oxford Partnership',
    sector: 'Education',
    kind: 'industry',
    featured: false,
    year: '2023',
    summary:
      'Delivering dashboards, database analysis and GenAI tools to improve institutional decision-making.',
    tags: ['Dashboards', 'GenAI', 'Decision support'],
  },
  {
    title: 'Agentic Knowledge Base',
    org: 'Limegreen',
    sector: 'Technology',
    kind: 'industry',
    featured: false,
    year: '2024',
    summary:
      'Managing data curation and creating a structured knowledge base using agentic AI tools.',
    tags: ['Agentic AI', 'Knowledge management', 'Data curation'],
  },
  {
    title: 'Multi-Agent Process Automation',
    org: 'BeeSwift',
    sector: 'Technology',
    kind: 'industry',
    featured: false,
    year: '2024',
    summary:
      'Developing multi-agent solutions for process automation and modernising legacy software systems.',
    tags: ['Multi-agent systems', 'Automation', 'Legacy modernisation'],
  },
  {
    title: 'Booking Platform & AI Strategy',
    org: 'Rural Ibiza Startup',
    sector: 'Travel',
    kind: 'industry',
    featured: false,
    year: '2022',
    summary:
      'Tech advisor and interim CTO — developed AI strategy and delivered a booking platform for a rural technology business.',
    tags: ['Interim CTO', 'Platform delivery', 'AI strategy'],
  },
  {
    title: 'Healthcare Outcome Prediction',
    org: 'Multiple clinical partners',
    sector: 'Healthcare',
    kind: 'research',
    featured: false,
    year: 'Ongoing',
    summary:
      'Diabetes outcome prediction, medical image analysis for dementia characterisation, EEG analysis for intraoperative neurological monitoring and pre-eclampsia outcome prediction.',
    tags: ['Medical imaging', 'Outcome prediction', 'EEG analysis'],
    image: '/images/website_images_research/healthcare.jpg',
  },
  {
    title: 'ELAN — Inclusive AI Talent',
    org: 'Birmingham City University',
    sector: 'Education',
    kind: 'research',
    featured: false,
    year: 'Current',
    summary:
      'Supporting the transition of female, black, disabled and low-income learners into AI fields.',
    tags: ['Widening participation', 'AI education', 'EDI'],
    image: '/images/website_images_research/learners.jpg',
  },
];

// Convenience filters used by pages
export const featuredProjects = projects.filter((p) => p.featured);
export const industryProjects = projects.filter((p) => p.kind === 'industry');
export const researchProjects = projects.filter((p) => p.kind === 'research');
