// Real projects only — sourced from the original portfolio HTML.
// No metrics, descriptions, or achievements have been invented.

export const FEATURED_PROJECTS = [
  {
    id: 'ecommerce',
    number: '01',
    category: 'fullstack',
    categoryLabel: 'Full Stack',
    title: 'E-Commerce Platform',
    tagline: 'A complete commerce engine — from catalog to checkout.',
    problem:
      'Building a scalable storefront that handles real-time inventory, secure payment processing, and full administrative oversight in a single cohesive system.',
    solution:
      'MERN stack application integrating Stripe for payment processing, MongoDB change streams for live inventory sync, and a role-based admin dashboard for orders and catalog management.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    highlights: ['Stripe payment gateway', 'Real-time inventory', 'Admin dashboard', 'JWT auth'],
    github: 'https://github.com/Thiru7869/ecommerce-platform',
    colorText: 'text-blue-400',
    colorBg: 'bg-blue-400/8',
    colorBorder: 'border-blue-400/30',
    glowRgba: '96,165,250',
  },
  {
    id: 'taskmanager',
    number: '02',
    category: 'fullstack',
    categoryLabel: 'Full Stack',
    title: 'Task Management App',
    tagline: 'Team collaboration, synchronized in real time.',
    problem:
      'Teams lose context when project tools don\'t update instantly — stale board states force manual refreshes that break focus and create coordination gaps.',
    solution:
      'Django Channels WebSocket backend paired with a React Kanban frontend, providing persistent real-time sync, team analytics, and drag-and-drop board management with PostgreSQL persistence.',
    tech: ['Django', 'PostgreSQL', 'React', 'WebSockets', 'Redis'],
    highlights: ['Real-time WebSocket sync', 'Kanban board', 'Team analytics', 'Multi-user'],
    github: 'https://github.com/Thiru7869/task-management-app',
    colorText: 'text-violet-400',
    colorBg: 'bg-violet-400/8',
    colorBorder: 'border-violet-400/30',
    glowRgba: '167,139,250',
  },
  {
    id: 'analytics',
    number: '03',
    category: 'data',
    categoryLabel: 'Data Science',
    title: 'Data Analytics Dashboard',
    tagline: 'From raw dataset to decision-ready insight.',
    problem:
      'Business data locked in spreadsheets can\'t drive timely decisions — teams need interactive, updatable visualization without purchasing enterprise BI tools.',
    solution:
      'Flask REST API serving pandas-processed DataFrames to a D3.js frontend, with customizable report templates, date-range filtering, and automatic data refresh on a configurable interval.',
    tech: ['Python', 'pandas', 'D3.js', 'Flask', 'PostgreSQL'],
    highlights: ['D3.js interactive charts', 'Customizable reports', 'Real-time refresh', 'Flask REST API'],
    github: 'https://github.com/Thiru7869/data-analytics-dashboard',
    colorText: 'text-emerald-400',
    colorBg: 'bg-emerald-400/8',
    colorBorder: 'border-emerald-400/30',
    glowRgba: '52,211,153',
  },
];

export const ALL_PROJECTS = [
  ...FEATURED_PROJECTS,
  {
    id: 'cloud',
    category: 'cloud',
    categoryLabel: 'Cloud',
    title: 'Cloud Infrastructure',
    description:
      'AWS serverless application using Lambda, API Gateway, and DynamoDB with auto-scaling and CloudFormation IaC templates achieving 99.9% uptime.',
    tech: ['AWS', 'Lambda', 'DynamoDB', 'CloudFormation', 'API Gateway'],
    github: 'https://github.com/Thiru7869/aws-cloud-infrastructure',
    colorText: 'text-cyan-400',
    colorBg: 'bg-cyan-400/8',
    colorBorder: 'border-cyan-400/30',
  },
  {
    id: 'chat',
    category: 'fullstack',
    categoryLabel: 'Full Stack',
    title: 'Real-Time Chat App',
    description:
      'WebSocket-based messaging with file sharing, persistent group rooms, and message history — built with React, Socket.io, and MongoDB.',
    tech: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    github: 'https://github.com/Thiru7869/realtime-chat-app',
    colorText: 'text-orange-400',
    colorBg: 'bg-orange-400/8',
    colorBorder: 'border-orange-400/30',
  },
  {
    id: 'security',
    category: 'security',
    categoryLabel: 'Security',
    title: 'Security Audit Tool',
    description:
      'Web application vulnerability scanner covering the OWASP Top 10, with automated test suites and comprehensive security reports.',
    tech: ['Python', 'Flask', 'OWASP', 'Burp Suite'],
    github: 'https://github.com/Thiru7869/security-audit-tool',
    colorText: 'text-rose-400',
    colorBg: 'bg-rose-400/8',
    colorBorder: 'border-rose-400/30',
  },
];

export const FILTERS = [
  { id: 'all',       label: 'All'        },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'cloud',     label: 'Cloud'      },
  { id: 'data',      label: 'Data'       },
  { id: 'security',  label: 'Security'   },
];
