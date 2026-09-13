import type { ReadmeState } from '@/types/readme';
import { initialReadmeState } from '@/types/readme';

export interface ReadmeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  state: Partial<ReadmeState>;
}

export const README_TEMPLATES: ReadmeTemplate[] = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean profile with typing header and essentials',
    thumbnail: '📝',
    state: {
      header: {
        ...initialReadmeState.header,
        typingEnabled: true,
        typingLines: ['Hello, I am', 'A Developer'],
        capsuleEnabled: false,
      },
      profile: {
        name: 'Your Name',
        username: 'yourusername',
        bio: 'Building things with code.',
        location: '',
        website: '',
        email: '',
      },
      stats: { widgets: [], theme: 'github-dark' },
    },
  },
  {
    id: 'stats-beast',
    name: 'Stats Beast',
    description: 'All GitHub stats widgets enabled',
    thumbnail: '📊',
    state: {
      profile: { name: 'Dev Stats', username: 'yourusername', bio: '', location: '', website: '', email: '' },
      stats: {
        widgets: ['stats-card', 'streak', 'top-langs', 'trophy', 'activity-graph', 'visitor-counter'],
        theme: 'radical',
      },
    },
  },
  {
    id: 'student',
    name: 'Student',
    description: 'Learning-focused about section',
    thumbnail: '🎓',
    state: {
      about: {
        workingOn: 'Final year projects',
        learning: 'System design & algorithms',
        askMeAbout: 'Open source & hackathons',
        funFact: 'I debug with rubber ducks',
      },
      skills: { selected: ['py', 'java', 'git', 'vscode', 'html', 'css'], iconStyle: 'skillicons' },
    },
  },
  {
    id: 'hacker',
    name: 'Hacker',
    description: 'Dark aesthetic with snake & matrix vibes',
    thumbnail: '💻',
    state: {
      header: {
        ...initialReadmeState.header,
        capsuleEnabled: true,
        capsuleType: 'gradient',
        capsuleColor: '00ff00,003300,000000',
        typingColor: '00FF00',
        typingLines: ['> whoami', '> full-stack hacker', '> ./build --awesome'],
      },
      extras: { ...initialReadmeState.extras, contributionSnake: true, snakeUsername: 'yourusername' },
      stats: { widgets: ['stats-card', 'streak'], theme: 'chartreuse-dark' },
    },
  },
  {
    id: 'frontend-dev',
    name: 'Frontend Dev',
    description: 'Skills-heavy with social badges',
    thumbnail: '🎨',
    state: {
      skills: {
        selected: ['html', 'css', 'js', 'ts', 'react', 'nextjs', 'tailwind', 'figma', 'vite'],
        iconStyle: 'skillicons',
      },
      social: {
        linkedin: 'https://linkedin.com/in/yourprofile',
        twitter: 'https://twitter.com/yourhandle',
        devto: '',
        medium: '',
        youtube: '',
        leetcode: '',
        discord: '',
      },
    },
  },
  {
    id: 'open-source',
    name: 'Open Source',
    description: 'Community contributor profile',
    thumbnail: '🌍',
    state: {
      profile: {
        name: 'Open Source Enthusiast',
        username: 'yourusername',
        bio: 'Passionate about building in public and contributing to OSS.',
        location: '🌐 Remote',
        website: 'https://yourblog.dev',
        email: 'hello@example.com',
      },
      about: {
        workingOn: 'An awesome open-source tool',
        learning: 'Rust & WebAssembly',
        askMeAbout: 'Contributing to OSS',
        funFact: 'Merged my first PR at 2am',
      },
      extras: { ...initialReadmeState.extras, quotesWidget: true },
    },
  },
  {
    id: 'portfolio',
    name: 'Personal Portfolio',
    description: 'A professional portfolio with projects and skills',
    thumbnail: '💼',
    state: {
      profile: {
        name: 'Jane Doe',
        username: 'janedoe',
        bio: 'Senior Software Engineer | Full Stack | Open Source',
        location: 'San Francisco, CA',
        website: 'https://janedoe.dev',
        email: 'contact@janedoe.dev',
      },
      skills: {
        selected: ['js', 'ts', 'react', 'nextjs', 'nodejs', 'aws', 'docker'],
        iconStyle: 'skillicons',
      },
      stats: { widgets: ['stats-card', 'top-langs'], theme: 'tokyonight' },
      social: { ...initialReadmeState.social, linkedin: 'https://linkedin.com/in/janedoe', twitter: 'https://twitter.com/janedoe' },
    },
  },
  {
    id: 'api-docs',
    name: 'API Documentation',
    description: 'Perfect for library and package repositories',
    thumbnail: '📖',
    state: {
      header: {
        ...initialReadmeState.header,
        typingEnabled: true,
        typingLines: ['My Awesome API', 'A powerful SDK for everything'],
      },
      about: {
        workingOn: 'v2.0.0 release',
        learning: '',
        askMeAbout: 'API integration',
        funFact: '',
      },
      skills: { selected: ['npm', 'ts'], iconStyle: 'skillicons' },
    },
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Tailored for ML, AI, and Data engineers',
    thumbnail: '📈',
    state: {
      skills: {
        selected: ['py', 'r', 'tensorflow', 'pytorch', 'pandas'],
        iconStyle: 'skillicons',
      },
      about: {
        workingOn: 'LLM fine-tuning',
        learning: 'Transformers architecture',
        askMeAbout: 'Data visualization',
        funFact: 'I dream in Python',
      },
    },
  },
  {
    id: 'startup',
    name: 'Startup/SaaS',
    description: 'Product-focused layout for companies',
    thumbnail: '🚀',
    state: {
      header: {
        ...initialReadmeState.header,
        capsuleEnabled: true,
        capsuleType: 'soft',
        capsuleColor: 'FF0000,000000',
      },
      profile: {
        name: 'Awesome SaaS',
        username: 'awesomesaas',
        bio: 'We build the tools of tomorrow.',
        location: 'Global',
        website: 'https://awesomesaas.com',
        email: 'hello@awesomesaas.com',
      },
      stats: { widgets: ['stats-card'], theme: 'radical' },
    },
  },
  {
    id: 'hackathon',
    name: 'Hackathon Project',
    description: 'Quick setup to showcase your build',
    thumbnail: '🏆',
    state: {
      about: {
        workingOn: 'Hackathon 2024 Winner',
        learning: 'New tech stack overnight',
        askMeAbout: 'Our pitch deck',
        funFact: 'Built on 0 hours of sleep',
      },
      skills: {
        selected: ['react', 'firebase', 'vercel', 'figma'],
        iconStyle: 'skillicons',
      },
    },
  },
  {
    id: 'devops',
    name: 'DevOps / SRE',
    description: 'Infrastructure and automation focused',
    thumbnail: '⚙️',
    state: {
      skills: {
        selected: ['aws', 'gcp', 'azure', 'docker', 'kubernetes', 'linux', 'bash', 'terraform', 'githubactions'],
        iconStyle: 'skillicons',
      },
      about: {
        workingOn: 'Zero-downtime migrations',
        learning: 'Chaos engineering',
        askMeAbout: 'CI/CD pipelines',
        funFact: '99.999% uptime enthusiast',
      },
      stats: { widgets: ['streak'], theme: 'github-dark' },
    },
  },
];
