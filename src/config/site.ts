// Edit all contact links, prices, projects and testimonials here.
export const site = {
  name: "Ramazon",
  whatsappNumber: "992111139408",
  contacts: {
    whatsapp: { label: "+992 111 139 408", href: "https://wa.me/992111139408" },
    telegram: { label: "@Ramazon_l8", href: "https://t.me/Ramazon_l8" },
    instagram: { label: "@_ramazonwoh_", href: "https://instagram.com/_ramazonwoh_" },
    github: { label: "GitHub", href: "https://github.com/" }, // placeholder
  },
  resumeUrl: "#", // placeholder: put your resume link here
  typing: ["Web Developer", "Bot Builder", "Frontend Magician", "Telegram API Specialist"],
  stats: [
    { value: 40, suffix: "+", label: "Projects shipped" },
    { value: 25, suffix: "+", label: "Happy clients" },
    { value: 3, suffix: " yrs", label: "Experience" },
  ],
  tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Python", "Telegram Bot API", "Node.js", "PostgreSQL", "Figma"],
  skills: [
    { name: "Frontend & React / Next.js", level: 92 },
    { name: "Telegram Bots & Python", level: 88 },
    { name: "UI/UX & Tailwind CSS", level: 85 },
    { name: "API Architecture & Databases", level: 80 },
  ],
  services: [
    { title: "Website Development", desc: "Custom Next.js/React websites, landing pages, portfolios, SEO and performance optimization.", price: "Starting from $X", hot: false, icon: "globe" },
    { title: "Telegram Bot Development", desc: "Bots, Telegram Mini Apps, payments, admin panels and automation.", price: "Starting from $X", hot: true, icon: "bot" },
    { title: "Frontend & UI Implementation", desc: "Figma designs turned into pixel-perfect, responsive Tailwind/React components.", price: "Starting from $X", hot: false, icon: "layout" },
  ],
  projects: [
    { title: "Project One", category: "Websites", desc: "A fast, modern website built to convert visitors.", tags: ["Next.js", "Tailwind"], url: "#" },
    { title: "Project Two", category: "Bots", desc: "A Telegram bot that automates orders and payments.", tags: ["Python", "Bot API"], url: "#" },
    { title: "Project Three", category: "Frontend", desc: "Pixel-perfect UI from a Figma design system.", tags: ["React", "TypeScript"], url: "#" },
    { title: "Project Four", category: "Websites", desc: "A landing page with smooth animations and great SEO.", tags: ["React", "SEO"], url: "#" },
  ],
  process: [
    { n: "01", title: "Discover", desc: "We talk goals, users and scope.", time: "Days 1-2" },
    { n: "02", title: "Design", desc: "Wireframes and visuals you approve.", time: "Days 3-5" },
    { n: "03", title: "Develop", desc: "Clean code, weekly demos.", time: "Week 2" },
    { n: "04", title: "Launch", desc: "Deploy, test and hand over.", time: "Week 3" },
  ],
  pricing: [
    { name: "Starter", price: "$XXX", features: ["1-page landing", "Responsive design", "Basic SEO", "Contact form", "1 revision"], popular: false },
    { name: "Business", price: "$XXX", features: ["Up to 5 pages or a bot", "Custom design", "Admin panel", "Analytics", "3 revisions"], popular: true },
    { name: "Premium", price: "$XXX", features: ["Full solution", "Website + bot", "Payments", "Priority support", "Unlimited revisions"], popular: false },
  ],
  // Replace with real client feedback
  testimonials: [
    { name: "Client Name", role: "Founder, Company", text: "Replace with real client feedback. Ramazon delivered fast and the result looked amazing." },
    { name: "Client Name", role: "Marketing Lead", text: "Replace with real client feedback. Our Telegram bot saves us hours every week." },
    { name: "Client Name", role: "Product Owner", text: "Replace with real client feedback. Clean code, clear communication, on time." },
  ],
  projectTypes: ["Telegram Bot", "Website", "Frontend/UI", "Full Solution", "Consulting"],
  budgets: ["Under $1,000", "$1,000-$2,500", "$2,500-$5,000", "$5,000+"],
};
