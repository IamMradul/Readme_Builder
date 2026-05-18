import type { ReadmeState, SectionId, StatsWidget } from '@/types/readme';
import { buildSkillIconsUrl, SKILLS } from '@/data/skills';
import { MEDIA_SIZE_WIDTH } from '@/data/gifPresets';

const SECTION_MARKERS: Record<SectionId, { start: string; end: string }> = {
  profile: { start: '<!-- PROFILE:START -->', end: '<!-- PROFILE:END -->' },
  about: { start: '<!-- ABOUT:START -->', end: '<!-- ABOUT:END -->' },
  skills: { start: '<!-- SKILLS:START -->', end: '<!-- SKILLS:END -->' },
  stats: { start: '<!-- STATS:START -->', end: '<!-- STATS:END -->' },
  header: { start: '<!-- HEADER:START -->', end: '<!-- HEADER:END -->' },
  media: { start: '<!-- MEDIA:START -->', end: '<!-- MEDIA:END -->' },
  social: { start: '<!-- SOCIAL:START -->', end: '<!-- SOCIAL:END -->' },
  extras: { start: '<!-- EXTRAS:START -->', end: '<!-- EXTRAS:END -->' },
};

function wrapSection(id: SectionId, body: string): string {
  if (!body.trim()) return '';
  const { start, end } = SECTION_MARKERS[id];
  return `${start}\n${body}\n${end}\n\n`;
}

function alignBlock(content: string, align: string): string {
  return `<div align="${align}">\n${content.trim()}\n</div>`;
}

function buildCapsuleUrl(state: ReadmeState): string {
  const { capsuleType, capsuleColor, capsuleHeight } = state.header;
  const colors = encodeURIComponent(capsuleColor);
  return `https://capsule-render.vercel.app/api?type=${capsuleType}&height=${capsuleHeight}&color=${colors}`;
}

function buildTypingUrl(state: ReadmeState): string {
  const { typingLines, typingColor, typingSpeed } = state.header;
  const lines = typingLines
    .filter(Boolean)
    .map((l) => encodeURIComponent(l))
    .join('&lines=');
  return `https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=${typingSpeed}&pause=1000&color=${typingColor}&center=true&vCenter=true&width=600&lines=${lines}`;
}

function buildStatsUrl(username: string, widget: StatsWidget, theme: string): string {
  const u = encodeURIComponent(username);
  const t = theme === 'github-dark' ? 'dark' : theme;
  switch (widget) {
    case 'stats-card':
      return `https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=${t}&hide_border=true&count_private=true`;
    case 'streak':
      return `https://streak-stats.demolab.com?user=${u}&theme=${t}&hide_border=true`;
    case 'top-langs':
      return `https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&theme=${t}&hide_border=true&layout=compact`;
    case 'trophy':
      return `https://github-profile-trophy.vercel.app/?username=${u}&theme=${t}&no-frame=true&column=4`;
    case 'activity-graph':
      return `https://github-readme-activity-graph.vercel.app/graph?username=${u}&theme=${t}&hide_border=true&area=true`;
    case 'visitor-counter':
      return `https://komarev.com/ghpvc/?username=${u}&label=Profile%20views&color=0e75b6&style=flat`;
    default:
      return '';
  }
}

function sectionHeader(state: ReadmeState): string {
  const parts: string[] = [];
  const { header } = state;

  if (header.capsuleEnabled) {
    parts.push(`<img src="${buildCapsuleUrl(state)}" width="100%" />`);
  }
  if (header.typingEnabled && header.typingLines.some(Boolean)) {
    parts.push(alignBlock(`<img src="${buildTypingUrl(state)}" alt="Typing SVG" />`, 'center'));
  }
  return wrapSection('header', parts.join('\n\n'));
}

function sectionProfile(state: ReadmeState): string {
  const { profile } = state;
  if (!profile.name && !profile.username && !profile.bio) return '';

  const lines: string[] = [];
  if (profile.name) {
    lines.push(`<h1 align="center">Hi 👋, I'm ${profile.name}</h1>`);
  }
  if (profile.bio) {
    lines.push(`<h3 align="center">${profile.bio}</h3>`);
  }

  const meta: string[] = [];
  if (profile.location) meta.push(`📍 ${profile.location}`);
  if (profile.website) meta.push(`🌐 [Portfolio](${profile.website})`);
  if (profile.email) meta.push(`📧 [Email](mailto:${profile.email})`);
  if (profile.username) {
    meta.push(`🐙 [@${profile.username}](https://github.com/${profile.username})`);
  }
  if (meta.length) {
    lines.push(`<p align="center">${meta.join(' · ')}</p>`);
  }

  return wrapSection('profile', lines.join('\n\n'));
}

function sectionAbout(state: ReadmeState): string {
  const { about } = state;
  const items: string[] = [];
  if (about.workingOn) items.push(`🔭 **Currently working on:** ${about.workingOn}`);
  if (about.learning) items.push(`🌱 **Learning:** ${about.learning}`);
  if (about.askMeAbout) items.push(`💬 **Ask me about:** ${about.askMeAbout}`);
  if (about.funFact) items.push(`⚡ **Fun fact:** ${about.funFact}`);
  if (!items.length) return '';

  return wrapSection('about', `## 👨‍💻 About Me\n\n${items.join('\n\n')}`);
}

function sectionSkills(state: ReadmeState): string {
  const { selected } = state.skills;
  if (!selected.length) return '';

  const byCategory = SKILLS.reduce(
    (acc, skill) => {
      if (selected.includes(skill.id)) {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.id);
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  const blocks = Object.values(byCategory).map((ids) => {
    const url = buildSkillIconsUrl(ids);
    return `<img src="${url}" alt="skills" />`;
  });

  return wrapSection(
    'skills',
    `## 🛠️ Tech Stack\n\n${alignBlock(blocks.join('\n\n'), 'center')}`
  );
}

function sectionStats(state: ReadmeState): string {
  const { stats, profile } = state;
  if (!profile.username || !stats.widgets.length) return '';

  const imgs = stats.widgets
    .map((w) => {
      const url = buildStatsUrl(profile.username, w, stats.theme);
      if (!url) return '';
      return `<img src="${url}" alt="${w}" />`;
    })
    .filter(Boolean);

  const grid =
    stats.widgets.length > 1
      ? alignBlock(
          `<table><tr>${imgs.map((img) => `<td valign="top">${img}</td>`).join('')}</tr></table>`,
          'center'
        )
      : alignBlock(imgs.join('\n'), 'center');

  return wrapSection('stats', `## 📊 GitHub Stats\n\n${grid}`);
}

function sectionMedia(state: ReadmeState): string {
  const { items } = state.media;
  if (!items.length) return '';

  const blocks = items.map((item) => {
    const width = MEDIA_SIZE_WIDTH[item.size] ?? 400;
    const img = `<img src="${item.url}" width="${width}" alt="media" />`;
    return alignBlock(img, item.alignment);
  });

  return wrapSection('media', blocks.join('\n\n'));
}

function formatSocialUrl(type: string, input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  
  switch (type) {
    case 'linkedin':
      if (trimmed.includes('linkedin.com/')) {
        return `https://${trimmed.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
      }
      return `https://linkedin.com/in/${encodeURIComponent(trimmed)}`;
    case 'twitter':
      if (trimmed.includes('twitter.com/') || trimmed.includes('x.com/')) {
        return `https://${trimmed.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
      }
      const cleanTwitter = trimmed.replace(/^@/, '');
      return `https://twitter.com/${encodeURIComponent(cleanTwitter)}`;
    case 'devto':
      if (trimmed.includes('dev.to/')) {
        return `https://${trimmed.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
      }
      return `https://dev.to/${encodeURIComponent(trimmed)}`;
    case 'medium':
      if (trimmed.includes('medium.com/')) {
        return `https://${trimmed.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
      }
      const cleanMedium = trimmed.replace(/^@/, '');
      return `https://medium.com/@${encodeURIComponent(cleanMedium)}`;
    case 'youtube':
      if (trimmed.includes('youtube.com/')) {
        return `https://${trimmed.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
      }
      const cleanYoutube = trimmed.replace(/^@/, '');
      return `https://youtube.com/@${encodeURIComponent(cleanYoutube)}`;
    case 'leetcode':
      if (trimmed.includes('leetcode.com/')) {
        return `https://${trimmed.replace(/^(https?:\/\/)?(www\.)?/, '')}`;
      }
      return `https://leetcode.com/${encodeURIComponent(trimmed)}`;
    default:
      return trimmed.startsWith('www.') ? `https://${trimmed}` : `https://${trimmed}`;
  }
}

function sectionSocial(state: ReadmeState): string {
  const { social } = state;
  const badges: string[] = [];

  const add = (label: string, url: string, color: string, logo: string, type: string) => {
    if (!url.trim()) return;
    const href = formatSocialUrl(type, url);
    badges.push(
      `[![${label}](https://img.shields.io/badge/${label}-${color}?style=for-the-badge&logo=${logo}&logoColor=white)](${href})`
    );
  };

  add('LinkedIn', social.linkedin, '0A66C2', 'linkedin', 'linkedin');
  add('Twitter', social.twitter, '1DA1F2', 'x', 'twitter');
  add('Dev.to', social.devto, '0A0A0A', 'devdotto', 'devto');
  add('Medium', social.medium, '000000', 'medium', 'medium');
  add('YouTube', social.youtube, 'FF0000', 'youtube', 'youtube');
  add('LeetCode', social.leetcode, 'FFA116', 'leetcode', 'leetcode');
  if (social.discord.trim()) {
    badges.push(
      `![Discord](https://img.shields.io/badge/Discord-${encodeURIComponent(social.discord)}-5865F2?style=for-the-badge&logo=discord&logoColor=white)`
    );
  }

  if (!badges.length) return '';
  return wrapSection(
    'social',
    `## 🔗 Connect with me\n\n${alignBlock(badges.join(' '), 'center')}`
  );
}

function sectionExtras(state: ReadmeState): string {
  const { extras, profile } = state;
  const parts: string[] = [];
  const username = extras.snakeUsername || profile.username;

  if (extras.contributionSnake && username) {
    const encodedUser = encodeURIComponent(username);
    parts.push(
      `![Snake animation](https://raw.githubusercontent.com/${encodedUser}/${encodedUser}/output/github-contribution-grid-snake.svg)`
    );
  }
  if (extras.jokesWidget) {
    parts.push(
      `![Jokes Card](https://readme-jokes.vercel.app/api?hideBorder=true&theme=github-dark)`
    );
  }
  if (extras.quotesWidget) {
    parts.push(
      `![Quotes](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=dark)`
    );
  }
  if (extras.buyMeACoffee && extras.buyMeACoffeeUsername) {
    const bmcUser = encodeURIComponent(extras.buyMeACoffeeUsername);
    parts.push(
      `[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/${bmcUser})`
    );
  }

  if (!parts.length) return '';
  return wrapSection('extras', alignBlock(parts.join('\n\n'), 'center'));
}

const SECTION_BUILDERS: Record<SectionId, (s: ReadmeState) => string> = {
  profile: sectionProfile,
  about: sectionAbout,
  skills: sectionSkills,
  stats: sectionStats,
  header: sectionHeader,
  media: sectionMedia,
  social: sectionSocial,
  extras: sectionExtras,
};

export function generateMarkdown(state: ReadmeState): string {
  return state.sectionOrder
    .map((id) => SECTION_BUILDERS[id](state))
    .filter(Boolean)
    .join('')
    .trimEnd();
}
