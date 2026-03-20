export interface Project {
  id: number;
  number: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  challenge: string;
  highlights: string[];
  techGroups: { label: string; items: string[] }[];
  tech: string[];
  year: string;
  status: 'live' | 'beta' | 'in-progress';
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  color: string;
  bgGradient: string;
  screenshots: {
    desktop: string;
    mobile: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    number: '01',
    slug: 'invoicefeed',
    title: 'InvoiceFeed',
    category: 'SaaS · Full Stack',
    tagline: 'Invoice management, simplified.',
    description:
      'I built InvoiceFeed as a solo project. It handles the full invoicing workflow from creation to payment, with multi-role auth, Stripe subscriptions and a CI/CD pipeline on Digital Ocean. Every layer of the stack was my decision and my code.',
    challenge:
      'Going solo on a financial product means there is no one to catch your mistakes. I had to think carefully about the data model, payment edge cases and security from the start, while still shipping fast enough to keep momentum.',
    highlights: [
      'Architected the full system from zero to production as sole founder',
      'Stripe integration for one-time payments and recurring subscriptions',
      'Real-time invoice creation, editing, and status tracking via Vue 3 reactivity',
      'Multi-role authentication system using Laravel Breeze',
      'CI/CD pipeline via Laravel Forge deployed on Digital Ocean with monitoring',
      'Optimised relational schema covering invoices, clients, line-items, and payments',
    ],
    techGroups: [
      { label: 'Frontend', items: ['Vue 3', 'Inertia.js', 'TypeScript', 'Tailwind CSS'] },
      { label: 'Backend', items: ['Laravel', 'PHP'] },
      { label: 'Database', items: ['MySQL'] },
      { label: 'Payments', items: ['Stripe'] },
      { label: 'DevOps', items: ['Digital Ocean', 'Laravel Forge', 'CI/CD'] },
    ],
    tech: ['Laravel', 'Vue 3', 'Inertia.js', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Stripe', 'Digital Ocean'],
    year: '2024',
    status: 'live',
    liveUrl: 'https://invoicefeed.com',
    githubUrl: 'https://github.com/Outdreamer19/invoice',
    featured: true,
    color: 'rgb(94, 103, 230)',
    bgGradient: 'linear-gradient(135deg, rgb(94,103,230) 0%, rgb(120,130,255) 100%)',
    screenshots: {
      desktop: '/screenshots/invoicefeed-desktop.jpg',
      mobile: '/screenshots/invoicefeed-mobile.jpg',
    },
  },
  {
    id: 2,
    number: '02',
    slug: 'blendable-ai',
    title: 'Blendable AI',
    category: 'AI Platform · Full Stack',
    tagline: 'One interface. Every AI model.',
    description:
      'Blendable started from a frustration with switching between AI tools. I built one interface that handles multiple AI providers, lets you create custom personas with their own knowledge bases, and supports team workspaces. Stripe billing and a prompt library are built in.',
    challenge:
      'Routing requests across different AI APIs while keeping the UI responsive was the core problem. I built an abstraction layer to handle model switching cleanly, then layered in streaming responses, quota tracking and billing without it turning into a mess.',
    highlights: [
      'Unified interface supporting multiple AI model providers in a single session',
      'Custom persona engine: define AI behaviour, tone, and attached knowledge bases',
      'Team and workspace management built for enterprise collaboration',
      'Image generation and AI upscaling tools integrated',
      'Prompt library with folder organisation and search',
      'Stripe billing with per-user usage tracking and quota limits',
    ],
    techGroups: [
      { label: 'Frontend', items: ['Vue.js', 'Inertia.js', 'TypeScript', 'Tailwind CSS'] },
      { label: 'Backend', items: ['Laravel', 'PHP', 'Laravel Horizon'] },
      { label: 'Database', items: ['MySQL'] },
      { label: 'Payments', items: ['Stripe'] },
      { label: 'AI Integration', items: ['OpenAI API', 'Multi-model routing'] },
    ],
    tech: ['Laravel', 'Vue.js', 'Inertia.js', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Stripe', 'Laravel Horizon'],
    year: '2024',
    status: 'live',
    liveUrl: 'https://blendable.app',
    githubUrl: 'https://github.com/Outdreamer19/blendable',
    featured: true,
    color: 'rgb(16, 185, 129)',
    bgGradient: 'linear-gradient(135deg, rgb(16,185,129) 0%, rgb(52,211,153) 100%)',
    screenshots: {
      desktop: '/screenshots/blendable-desktop.jpg',
      mobile: '/screenshots/blendable-mobile.jpg',
    },
  },
  {
    id: 3,
    number: '03',
    slug: 'hardball-smokehouse',
    title: 'Hardball Smokehouse',
    category: 'Hospitality · Web App',
    tagline: 'Caribbean flavours, served online.',
    description:
      'Hardball is a Caribbean smokehouse restaurant in the UK. I built their full web presence: marketing site, online reservations, an events board and a custom admin dashboard so the owner can manage menus, bookings and promotions without touching any code.',
    challenge:
      'The owner needed something they could actually use. That meant keeping the customer-facing side polished while making the admin side simple enough for non-technical staff to run day to day. Getting that balance right was the main challenge.',
    highlights: [
      'Online reservation booking system with availability management',
      'Events and vacancies board with full admin CRUD controls',
      'Dynamic admin dashboard: manage menus, bookings, events, and content',
      'Newsletter subscription with campaign analytics',
      'Light/dark theme support across the full site',
      'Contact form and customer-facing marketing pages',
    ],
    techGroups: [
      { label: 'Frontend', items: ['JavaScript', 'Tailwind CSS', 'Blade', 'Ziggy'] },
      { label: 'Backend', items: ['Laravel', 'PHP'] },
      { label: 'Database', items: ['MySQL'] },
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'JavaScript', 'Ziggy'],
    year: '2024',
    status: 'live',
    liveUrl: 'https://hardballsmokehouse.co.uk',
    githubUrl: 'https://github.com/Outdreamer19/hardball',
    featured: true,
    color: 'rgb(239, 68, 68)',
    bgGradient: 'linear-gradient(135deg, rgb(239,68,68) 0%, rgb(252,120,90) 100%)',
    screenshots: {
      desktop: '/screenshots/hardball-desktop.jpg',
      mobile: '/screenshots/hardball-mobile.jpg',
    },
  },
  {
    id: 4,
    number: '04',
    slug: 'proposal-ai',
    title: 'Proposal AI',
    category: 'AI Tool · Full Stack',
    tagline: 'Win more clients. Stop writing proposals.',
    description:
      'I built Proposal AI as a full-stack SaaS tool that generates professional freelance proposals in seconds using the OpenAI API. It features a full marketing landing page, three tone modes, PDF download, and a structured output — built with Laravel, Vue 3, and GPT-4o mini.',
    challenge:
      'Getting the AI to produce proposals that actually sound human and tailored was the hard part. I designed a structured prompt system with tone modifiers (Formal, Friendly, Technical) that shapes the output to match the client context, not just fill a template.',
    highlights: [
      'Real OpenAI GPT-4o mini integration with structured prompt engineering',
      'Three tone modes: Formal, Friendly, Technical — one click to match your client',
      'Full marketing landing page: hero, features, how-it-works, pricing, testimonials',
      'PDF generation and copy-to-clipboard output',
      'Glassmorphism UI with animated blob glows, dot grid and shimmer skeletons',
      'SaaS-ready architecture — Free tier + Pro £9/month via Stripe',
    ],
    techGroups: [
      { label: 'Frontend', items: ['Vue 3', 'Inertia.js', 'TypeScript', 'Tailwind CSS'] },
      { label: 'Backend', items: ['Laravel', 'PHP'] },
      { label: 'Database', items: ['MySQL'] },
      { label: 'AI', items: ['OpenAI API', 'GPT-4o mini', 'Prompt Engineering'] },
    ],
    tech: ['Laravel', 'Vue 3', 'Inertia.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'PHP', 'MySQL'],
    year: '2025',
    status: 'live',
    liveUrl: 'https://shanebell.dev/proposal',
    githubUrl: 'https://github.com/Outdreamer19/proposal-ai',
    featured: true,
    color: 'rgb(139, 92, 246)',
    bgGradient: 'linear-gradient(135deg, rgb(139,92,246) 0%, rgb(167,139,250) 100%)',
    screenshots: {
      desktop: '/screenshots/proposal-desktop.jpg',
      mobile: '/screenshots/proposal-mobile.jpg',
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
