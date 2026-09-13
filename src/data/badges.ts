export interface Badge {
  id: string;
  name: string;
  url: string;
  category: 'social' | 'tech' | 'status' | 'fun';
}

export const BADGES: Badge[] = [
  // Social
  { id: 'b-twitter', name: 'Twitter', category: 'social', url: 'https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white' },
  { id: 'b-linkedin', name: 'LinkedIn', category: 'social', url: 'https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white' },
  { id: 'b-youtube', name: 'YouTube', category: 'social', url: 'https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white' },
  { id: 'b-discord', name: 'Discord', category: 'social', url: 'https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white' },
  
  // Tech
  { id: 'b-react', name: 'React', category: 'tech', url: 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' },
  { id: 'b-nextjs', name: 'Next.js', category: 'tech', url: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white' },
  { id: 'b-node', name: 'Node.js', category: 'tech', url: 'https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white' },
  { id: 'b-ts', name: 'TypeScript', category: 'tech', url: 'https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' },
  { id: 'b-py', name: 'Python', category: 'tech', url: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white' },
  { id: 'b-docker', name: 'Docker', category: 'tech', url: 'https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white' },
  
  // Status
  { id: 'b-maintained', name: 'Maintained', category: 'status', url: 'https://img.shields.io/badge/Maintained%3F-yes-green.svg' },
  { id: 'b-wip', name: 'Work in Progress', category: 'status', url: 'https://img.shields.io/badge/Status-Work_in_Progress-yellow' },
  { id: 'b-build', name: 'Build Passing', category: 'status', url: 'https://img.shields.io/badge/build-passing-brightgreen' },
  
  // Fun
  { id: 'b-coffee', name: 'Buy me a coffee', category: 'fun', url: 'https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black' },
  { id: 'b-music', name: 'Listening to Spotify', category: 'fun', url: 'https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white' },
];
