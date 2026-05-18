import type { SkillCategory } from '@/types/readme';

export interface SkillIcon {
  id: string;
  name: string;
  category: SkillCategory;
}

export const SKILL_CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: 'languages', label: 'Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'DB' },
  { id: 'devops', label: 'DevOps' },
  { id: 'tools', label: 'Tools' },
];

export const SKILLS: SkillIcon[] = [
  { id: 'js', name: 'JavaScript', category: 'languages' },
  { id: 'ts', name: 'TypeScript', category: 'languages' },
  { id: 'py', name: 'Python', category: 'languages' },
  { id: 'java', name: 'Java', category: 'languages' },
  { id: 'cpp', name: 'C++', category: 'languages' },
  { id: 'cs', name: 'C#', category: 'languages' },
  { id: 'go', name: 'Go', category: 'languages' },
  { id: 'rust', name: 'Rust', category: 'languages' },
  { id: 'php', name: 'PHP', category: 'languages' },
  { id: 'kotlin', name: 'Kotlin', category: 'languages' },
  { id: 'swift', name: 'Swift', category: 'languages' },
  { id: 'html', name: 'HTML', category: 'frontend' },
  { id: 'css', name: 'CSS', category: 'frontend' },
  { id: 'react', name: 'React', category: 'frontend' },
  { id: 'vue', name: 'Vue', category: 'frontend' },
  { id: 'angular', name: 'Angular', category: 'frontend' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind', category: 'frontend' },
  { id: 'sass', name: 'Sass', category: 'frontend' },
  { id: 'nodejs', name: 'Node.js', category: 'backend' },
  { id: 'express', name: 'Express', category: 'backend' },
  { id: 'django', name: 'Django', category: 'backend' },
  { id: 'flask', name: 'Flask', category: 'backend' },
  { id: 'spring', name: 'Spring', category: 'backend' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend' },
  { id: 'mongodb', name: 'MongoDB', category: 'database' },
  { id: 'mysql', name: 'MySQL', category: 'database' },
  { id: 'postgres', name: 'PostgreSQL', category: 'database' },
  { id: 'redis', name: 'Redis', category: 'database' },
  { id: 'firebase', name: 'Firebase', category: 'database' },
  { id: 'docker', name: 'Docker', category: 'devops' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops' },
  { id: 'aws', name: 'AWS', category: 'devops' },
  { id: 'azure', name: 'Azure', category: 'devops' },
  { id: 'gcp', name: 'GCP', category: 'devops' },
  { id: 'linux', name: 'Linux', category: 'devops' },
  { id: 'git', name: 'Git', category: 'tools' },
  { id: 'vscode', name: 'VS Code', category: 'tools' },
  { id: 'figma', name: 'Figma', category: 'tools' },
  { id: 'postman', name: 'Postman', category: 'tools' },
  { id: 'webpack', name: 'Webpack', category: 'tools' },
  { id: 'vite', name: 'Vite', category: 'tools' },
  { id: 'npm', name: 'npm', category: 'tools' },
];

export function getSkillsByCategory(category: SkillCategory): SkillIcon[] {
  return SKILLS.filter((s) => s.category === category);
}

export function buildSkillIconsUrl(ids: string[]): string {
  if (ids.length === 0) return '';
  return `https://skillicons.dev/icons?i=${ids.join(',')}&perline=10`;
}
