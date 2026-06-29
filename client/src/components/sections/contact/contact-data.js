// All contact data sourced from the original portfolio HTML only.
// No email, phone, social link, or location has been invented.

export const CONTACT_INFO = {
  email:        'reddytn4@gmail.com',
  emailHref:    'mailto:reddytn4@gmail.com',
  phone:        '+91 93926 13828',
  phoneHref:    'tel:+919392613828',
  whatsapp:     'https://wa.me/919392613828',
  location:     'Venkatagiri, Andhra Pradesh',
  locationShort:'Venkatagiri, AP',
  linkedin:     'https://www.linkedin.com/in/thirumala-narasimha-poluru-23775926b',
  github:       'https://github.com/Thiru7869',
  leetcode:     'https://leetcode.com/u/thiru7869/',
  resume:       'https://drive.google.com/file/d/1tf1CfdDaZpWJ4SvDiEV7sYd1Z4y-eBiY/view',
};

export const AVAILABILITY = {
  status:       'Open to Work',
  types:        ['Full-time', 'Freelance', 'Remote'],
  responseTime: 'Responds within 24 hours',
};

export const CONTACT_METHODS = [
  {
    id:    'email',
    label: 'Email',
    value: 'reddytn4@gmail.com',
    href:  'mailto:reddytn4@gmail.com',
    icon:  '✉️',
    colorText:   'text-accent',
    colorBg:     'bg-accent/8',
    colorBorder: 'border-accent/20',
    colorBar:    'bg-accent/15',
    colorBarHov: 'group-hover:bg-accent/50',
    colorGlow:   'rgba(37,99,235,0.07)',
  },
  {
    id:    'phone',
    label: 'Phone',
    value: '+91 93926 13828',
    href:  'tel:+919392613828',
    icon:  '📱',
    colorText:   'text-emerald-400',
    colorBg:     'bg-emerald-400/8',
    colorBorder: 'border-emerald-400/20',
    colorBar:    'bg-emerald-400/15',
    colorBarHov: 'group-hover:bg-emerald-400/50',
    colorGlow:   'rgba(52,211,153,0.07)',
  },
  {
    id:    'whatsapp',
    label: 'WhatsApp',
    value: 'Chat on WhatsApp',
    href:  'https://wa.me/919392613828',
    icon:  '💬',
    colorText:   'text-green-400',
    colorBg:     'bg-green-400/8',
    colorBorder: 'border-green-400/20',
    colorBar:    'bg-green-400/15',
    colorBarHov: 'group-hover:bg-green-400/50',
    colorGlow:   'rgba(74,222,128,0.07)',
  },
  {
    id:    'location',
    label: 'Location',
    value: 'Venkatagiri, AP',
    href:  null,
    icon:  '📍',
    colorText:   'text-violet-400',
    colorBg:     'bg-violet-400/8',
    colorBorder: 'border-violet-400/20',
    colorBar:    'bg-violet-400/15',
    colorBarHov: 'group-hover:bg-violet-400/50',
    colorGlow:   'rgba(167,139,250,0.07)',
  },
];

export const SOCIALS = [
  {
    id:    'linkedin',
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/thirumala-narasimha-poluru-23775926b',
    icon:  'linkedin',
    description: 'Professional profile',
    colorText:   'text-sky-400',
    colorBg:     'bg-sky-400/8',
    colorBorder: 'border-sky-400/20',
    colorGlow:   'rgba(56,189,248,0.1)',
  },
  {
    id:    'github',
    label: 'GitHub',
    href:  'https://github.com/Thiru7869',
    icon:  'github',
    description: '25+ repositories',
    colorText:   'text-foreground',
    colorBg:     'bg-surface/80',
    colorBorder: 'border-border/60',
    colorGlow:   'rgba(255,255,255,0.04)',
  },
  {
    id:    'leetcode',
    label: 'LeetCode',
    href:  'https://leetcode.com/u/thiru7869/',
    icon:  'leetcode',
    description: 'Problem solving',
    colorText:   'text-yellow-400',
    colorBg:     'bg-yellow-400/8',
    colorBorder: 'border-yellow-400/20',
    colorGlow:   'rgba(250,204,21,0.07)',
  },
];

// Proxy /api in dev (Vite proxies to localhost:5000). Set VITE_API_URL in prod.
export const API_BASE = import.meta.env.VITE_API_URL ?? '';
