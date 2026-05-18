export type SectionId =
  | 'profile'
  | 'about'
  | 'skills'
  | 'stats'
  | 'header'
  | 'media'
  | 'social'
  | 'extras';

export interface ProfileSection {
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  email: string;
}

export interface AboutSection {
  workingOn: string;
  learning: string;
  askMeAbout: string;
  funFact: string;
}

export type SkillCategory =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'tools';

export interface SkillsSection {
  selected: string[];
}

export type StatsWidget =
  | 'stats-card'
  | 'streak'
  | 'top-langs'
  | 'trophy'
  | 'activity-graph'
  | 'visitor-counter';

export type StatsTheme =
  | 'default'
  | 'dark'
  | 'radical'
  | 'merko'
  | 'gruvbox'
  | 'tokyonight'
  | 'onedark'
  | 'cobalt'
  | 'synthwave'
  | 'highcontrast'
  | 'dracula'
  | 'prussian'
  | 'monokai'
  | 'vue'
  | 'shades_of_purple'
  | 'nightowl'
  | 'buefy'
  | 'bear'
  | 'lark'
  | 'algolia'
  | 'great-gatsby'
  | 'chartreuse-dark'
  | 'github-dark'
  | 'discord-old-blurple'
  | 'aura';

export interface StatsSection {
  widgets: StatsWidget[];
  theme: StatsTheme;
}

export type CapsuleType = 'animated' | 'gradient' | 'waving' | 'soft';

export interface HeaderSection {
  capsuleEnabled: boolean;
  capsuleType: CapsuleType;
  capsuleColor: string;
  capsuleHeight: number;
  typingEnabled: boolean;
  typingLines: string[];
  typingColor: string;
  typingSpeed: number;
}

export type MediaAlignment = 'left' | 'center' | 'right';
export type MediaSize = 'small' | 'medium' | 'large';

export interface MediaItem {
  id: string;
  url: string;
  preset?: string;
  alignment: MediaAlignment;
  size: MediaSize;
}

export interface MediaSection {
  items: MediaItem[];
}

export interface SocialSection {
  linkedin: string;
  twitter: string;
  devto: string;
  medium: string;
  youtube: string;
  leetcode: string;
  discord: string;
}

export interface ExtrasSection {
  contributionSnake: boolean;
  snakeUsername: string;
  jokesWidget: boolean;
  quotesWidget: boolean;
  buyMeACoffee: boolean;
  buyMeACoffeeUsername: string;
}

export interface ReadmeState {
  sectionOrder: SectionId[];
  profile: ProfileSection;
  about: AboutSection;
  skills: SkillsSection;
  stats: StatsSection;
  header: HeaderSection;
  media: MediaSection;
  social: SocialSection;
  extras: ExtrasSection;
}

export const DEFAULT_SECTION_ORDER: SectionId[] = [
  'header',
  'profile',
  'about',
  'skills',
  'stats',
  'media',
  'social',
  'extras',
];

export const initialReadmeState: ReadmeState = {
  sectionOrder: [...DEFAULT_SECTION_ORDER],
  profile: {
    name: '',
    username: '',
    bio: '',
    location: '',
    website: '',
    email: '',
  },
  about: {
    workingOn: '',
    learning: '',
    askMeAbout: '',
    funFact: '',
  },
  skills: { selected: [] },
  stats: {
    widgets: ['stats-card'],
    theme: 'github-dark',
  },
  header: {
    capsuleEnabled: false,
    capsuleType: 'gradient',
    capsuleColor: '0ea5e9,8b5cf6,ec4899',
    capsuleHeight: 120,
    typingEnabled: true,
    typingLines: ['Hi 👋, I am', 'A Full Stack Developer', 'Building cool things'],
    typingColor: '36BCF7',
    typingSpeed: 50,
  },
  media: { items: [] },
  social: {
    linkedin: '',
    twitter: '',
    devto: '',
    medium: '',
    youtube: '',
    leetcode: '',
    discord: '',
  },
  extras: {
    contributionSnake: false,
    snakeUsername: '',
    jokesWidget: false,
    quotesWidget: false,
    buyMeACoffee: false,
    buyMeACoffeeUsername: '',
  },
};
