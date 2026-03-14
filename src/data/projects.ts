export interface Project {
  id: number;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  year: string;
  status: 'live' | 'beta' | 'in-progress';
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  color: string; // accent colour for the card
}

export const projects: Project[] = [
  {
    id: 1,
    number: '01',
    title: 'InvoiceFeed',
    category: 'SaaS · Full Stack',
    tagline: 'Invoice management, simplified.',
    description:
      'I built InvoiceFeed from scratch as a solo project. It handles invoice creation, client management, and payments through Stripe, with multi-role auth and a CI/CD pipeline running on Digital Ocean.',
    highlights: [
      'Built from zero to production as solo founder',
      'Stripe one-time payments & recurring subscriptions',
      'Real-time invoice creation & status tracking',
      'Multi-role auth via Laravel Breeze',
      'CI/CD via Laravel Forge on Digital Ocean',
      'Optimised MySQL schema for invoices, clients & payments',
    ],
    tech: ['Laravel', 'Vue 3', 'Inertia.js', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Stripe', 'Digital Ocean'],
    year: '2024',
    status: 'live',
    liveUrl: 'https://invoicefeed.com',
    githubUrl: 'https://github.com/Outdreamer19/invoice',
    featured: true,
    color: 'rgb(94, 103, 230)',
  },
  {
    id: 2,
    number: '02',
    title: 'Blendable AI',
    category: 'AI Platform · Full Stack',
    tagline: 'One interface. Every AI model.',
    description:
      'Blendable lets users chat with multiple AI models, build custom personas, and manage team workspaces, all in one place. I designed and built the full product including Stripe billing and a prompt library.',
    highlights: [
      'Multi-model chat: switch AI models in one app',
      'Custom personas with attached knowledge bases',
      'Team & workspace management for enterprise',
      'Image generation & upscaling tools',
      'Prompt library with folder organisation',
      'Stripe billing with usage & quota tracking',
    ],
    tech: ['Laravel', 'Vue.js', 'Inertia.js', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Stripe', 'Laravel Horizon'],
    year: '2024',
    status: 'live',
    liveUrl: 'https://blendable.app',
    githubUrl: 'https://github.com/Outdreamer19/blendable',
    featured: true,
    color: 'rgb(16, 185, 129)',
  },
  {
    id: 3,
    number: '03',
    title: 'Hardball Smokehouse',
    category: 'Hospitality · Web App',
    tagline: 'Caribbean flavours, served online.',
    description:
      'Built for a Caribbean smokehouse restaurant in the UK. Customers can book tables and browse events online, while the owner manages everything through a custom admin dashboard I built for them.',
    highlights: [
      'Online reservation booking system',
      'Events management & vacancies board',
      'Full admin dashboard (menus, events, bookings)',
      'Newsletter subscription & analytics',
      'Light / dark theme support',
      'Contact form & customer-facing marketing site',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'JavaScript', 'Ziggy'],
    year: '2024',
    status: 'live',
    liveUrl: 'https://hardballsmokehouse.co.uk',
    githubUrl: 'https://github.com/Outdreamer19/hardball',
    featured: true,
    color: 'rgb(239, 68, 68)',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
