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
      skills: { selected: ['py', 'java', 'git', 'vscode', 'html', 'css'] },
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
];
