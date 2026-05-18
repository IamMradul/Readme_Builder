import type { SkillCategory } from '@/types/readme';

export interface SkillIcon {
  id: string;
  name: string;
  category: SkillCategory;
  color: string;      // Official brand color hex (without #)
  logo: string;       // SimpleIcons slug name
  logoColor?: string; // Optional logo color override
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
  { id: 'js', name: 'JavaScript', category: 'languages', color: 'F7DF1E', logo: 'javascript', logoColor: 'black' },
  { id: 'ts', name: 'TypeScript', category: 'languages', color: '3178C6', logo: 'typescript' },
  { id: 'py', name: 'Python', category: 'languages', color: '3776AB', logo: 'python' },
  { id: 'java', name: 'Java', category: 'languages', color: 'ED8B00', logo: 'openjdk' },
  { id: 'cpp', name: 'C++', category: 'languages', color: '00599C', logo: 'cplusplus' },
  { id: 'cs', name: 'C#', category: 'languages', color: '239120', logo: 'csharp' },
  { id: 'go', name: 'Go', category: 'languages', color: '00ADD8', logo: 'go' },
  { id: 'rust', name: 'Rust', category: 'languages', color: '000000', logo: 'rust' },
  { id: 'php', name: 'PHP', category: 'languages', color: '777BB4', logo: 'php' },
  { id: 'kotlin', name: 'Kotlin', category: 'languages', color: '7F52FF', logo: 'kotlin' },
  { id: 'swift', name: 'Swift', category: 'languages', color: 'F05138', logo: 'swift' },
  { id: 'html', name: 'HTML', category: 'frontend', color: 'E34F26', logo: 'html5' },
  { id: 'css', name: 'CSS', category: 'frontend', color: '1572B6', logo: 'css3' },
  { id: 'react', name: 'React', category: 'frontend', color: '61DAFB', logo: 'react', logoColor: 'black' },
  { id: 'vue', name: 'Vue', category: 'frontend', color: '4FC08D', logo: 'vue.js' },
  { id: 'angular', name: 'Angular', category: 'frontend', color: 'DD0031', logo: 'angular' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', color: '000000', logo: 'next.js' },
  { id: 'tailwind', name: 'Tailwind', category: 'frontend', color: '06B6D4', logo: 'tailwindcss' },
  { id: 'sass', name: 'Sass', category: 'frontend', color: 'CC6699', logo: 'sass' },
  { id: 'nodejs', name: 'Node.js', category: 'backend', color: '339933', logo: 'nodedotjs' },
  { id: 'express', name: 'Express', category: 'backend', color: '000000', logo: 'express' },
  { id: 'django', name: 'Django', category: 'backend', color: '092E20', logo: 'django' },
  { id: 'flask', name: 'Flask', category: 'backend', color: '000000', logo: 'flask' },
  { id: 'spring', name: 'Spring', category: 'backend', color: '6DB33F', logo: 'spring' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', color: '009688', logo: 'fastapi' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', color: '47A248', logo: 'mongodb' },
  { id: 'mysql', name: 'MySQL', category: 'database', color: '4479A1', logo: 'mysql' },
  { id: 'postgres', name: 'PostgreSQL', category: 'database', color: '4169E1', logo: 'postgresql' },
  { id: 'redis', name: 'Redis', category: 'database', color: 'DC382D', logo: 'redis' },
  { id: 'firebase', name: 'Firebase', category: 'database', color: 'FFCA28', logo: 'firebase', logoColor: 'black' },
  { id: 'docker', name: 'Docker', category: 'devops', color: '2496ED', logo: 'docker' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', color: '326CE5', logo: 'kubernetes' },
  { id: 'aws', name: 'AWS', category: 'devops', color: '232F3E', logo: 'amazon-aws' },
  { id: 'azure', name: 'Azure', category: 'devops', color: '0089D6', logo: 'microsoft-azure' },
  { id: 'gcp', name: 'GCP', category: 'devops', color: '4285F4', logo: 'google-cloud' },
  { id: 'linux', name: 'Linux', category: 'devops', color: 'FCC624', logo: 'linux', logoColor: 'black' },
  { id: 'git', name: 'Git', category: 'tools', color: 'F05032', logo: 'git' },
  { id: 'vscode', name: 'VS Code', category: 'tools', color: '007ACC', logo: 'visual-studio-code' },
  { id: 'figma', name: 'Figma', category: 'tools', color: 'F24E1E', logo: 'figma' },
  { id: 'postman', name: 'Postman', category: 'tools', color: 'FF6C37', logo: 'postman' },
  { id: 'webpack', name: 'Webpack', category: 'tools', color: '8DD6F9', logo: 'webpack' },
  { id: 'vite', name: 'Vite', category: 'tools', color: '646CFF', logo: 'vite' },
  { id: 'npm', name: 'npm', category: 'tools', color: 'CB3837', logo: 'npm' },
];

export function getSkillsByCategory(category: SkillCategory): SkillIcon[] {
  return SKILLS.filter((s) => s.category === category);
}

export function buildSkillIconsUrl(ids: string[]): string {
  if (ids.length === 0) return '';
  return `https://skillicons.dev/icons?i=${ids.join(',')}&perline=10`;
}
