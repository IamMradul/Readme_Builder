import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'components');

const files = {
  'tabs/StatsTab.tsx': `'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { STATS_THEMES } from '@/data/themes';
import { useReadmeStore } from '@/store/readmeStore';
import type { StatsWidget } from '@/types/readme';

const WIDGETS: { id: StatsWidget; label: string }[] = [
  { id: 'stats-card', label: 'Stats card' },
  { id: 'streak', label: 'Streak stats' },
  { id: 'top-langs', label: 'Top languages' },
  { id: 'trophy', label: 'Trophy' },
  { id: 'activity-graph', label: 'Activity graph' },
  { id: 'visitor-counter', label: 'Visitor counter' },
];

export function StatsTab() {
  const stats = useReadmeStore((s) => s.state.stats);
  const updateSection = useReadmeStore((s) => s.updateSection);

  const toggle = (id: StatsWidget) => {
    const widgets = stats.widgets.includes(id)
      ? stats.widgets.filter((w) => w !== id)
      : [...stats.widgets, id];
    updateSection('stats', { ...stats, widgets });
  };

  return (
    <div className="space-y-6">
      <motion.div className="space-y-2">
        <Label>Theme</Label>
        <Select value={stats.theme} onValueChange={(theme) => updateSection('stats', { ...stats, theme: theme as typeof stats.theme })}>
          <SelectTrigger><SelectValue placeholder="Select theme" /></SelectTrigger>
          <SelectContent className="max-h-60">
            {STATS_THEMES.map((t) => (
              <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
      <motion.div className="space-y-3">
        <Label>Widgets</Label>
        {WIDGETS.map((w) => (
          <motion.div key={w.id} className="flex items-center gap-2">
            <Checkbox id={w.id} checked={stats.widgets.includes(w.id)} onCheckedChange={() => toggle(w.id)} />
            <Label htmlFor={w.id} className="cursor-pointer font-normal">{w.label}</Label>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
`.replace(/motion\./g, ''),

  'tabs/HeaderTab.tsx': `'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useReadmeStore } from '@/store/readmeStore';
import type { CapsuleType } from '@/types/readme';

export function HeaderTab() {
  const header = useReadmeStore((s) => s.state.header);
  const updateSection = useReadmeStore((s) => s.updateSection);
  const set = (patch: Partial<typeof header>) => updateSection('header', { ...header, ...patch });

  const updateLine = (i: number, value: string) => {
    const lines = [...header.typingLines];
    lines[i] = value;
    set({ typingLines: lines });
  };

  return (
    <div className="space-y-6">
      <motion.div className="flex items-center justify-between rounded-lg border p-4">
        <div><Label>Capsule Render banner</Label><p className="text-xs text-muted-foreground">Animated header capsule</p></div>
        <Switch checked={header.capsuleEnabled} onCheckedChange={(v) => set({ capsuleEnabled: v })} />
      </motion.div>
      {header.capsuleEnabled && (
        <motion.div className="grid gap-4 sm:grid-cols-3">
          <motion.div className="space-y-2">
            <Label>Type</Label>
            <Select value={header.capsuleType} onValueChange={(v) => set({ capsuleType: v as CapsuleType })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {(['animated','gradient','waving','soft'] as CapsuleType[]).map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div className="space-y-2">
            <Label>Colors (comma-separated hex)</Label>
            <Input value={header.capsuleColor} onChange={(e) => set({ capsuleColor: e.target.value })} />
          </motion.div>
          <motion.div className="space-y-2">
            <Label>Height</Label>
            <Input type="number" value={header.capsuleHeight} onChange={(e) => set({ capsuleHeight: Number(e.target.value) })} />
          </motion.div>
        </motion.div>
      )}
      <motion.div className="flex items-center justify-between rounded-lg border p-4">
        <div><Label>Typing SVG</Label><p className="text-xs text-muted-foreground">readme-typing-svg.demolab.com</p></div>
        <Switch checked={header.typingEnabled} onCheckedChange={(v) => set({ typingEnabled: v })} />
      </motion.div>
      {header.typingEnabled && (
        <motion.div className="space-y-4">
          {header.typingLines.map((line, i) => (
            <Input key={i} value={line} onChange={(e) => updateLine(i, e.target.value)} placeholder={\`Line \${i + 1}\`} />
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => set({ typingLines: [...header.typingLines, ''] })}>Add line</Button>
          <motion.div className="grid gap-4 sm:grid-cols-2">
            <motion.div className="space-y-2">
              <Label>Color (hex without #)</Label>
              <Input value={header.typingColor} onChange={(e) => set({ typingColor: e.target.value })} />
            </motion.div>
            <motion.div className="space-y-2">
              <Label>Speed (ms per char)</Label>
              <Input type="number" value={header.typingSpeed} onChange={(e) => set({ typingSpeed: Number(e.target.value) })} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
`.replace(/motion\./g, ''),

  'tabs/MediaTab.tsx': `'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GIF_PRESETS } from '@/data/gifPresets';
import { useReadmeStore } from '@/store/readmeStore';
import type { MediaAlignment, MediaItem, MediaSize } from '@/types/readme';

export function MediaTab() {
  const media = useReadmeStore((s) => s.state.media);
  const updateSection = useReadmeStore((s) => s.updateSection);

  const addItem = (url: string, preset?: string) => {
    const item: MediaItem = {
      id: crypto.randomUUID(),
      url,
      preset,
      alignment: 'center',
      size: 'medium',
    };
    updateSection('media', { items: [...media.items, item] });
  };

  const updateItem = (id: string, patch: Partial<MediaItem>) => {
    updateSection('media', {
      items: media.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
    });
  };

  const removeItem = (id: string) => {
    updateSection('media', { items: media.items.filter((i) => i.id !== id) });
  };

  return (
    <div className="space-y-6">
      <motion.div className="space-y-2">
        <Label>Custom GIF / image URL</Label>
        <div className="flex gap-2">
          <Input id="media-url" placeholder="https://..." className="flex-1" onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const input = e.currentTarget;
              if (input.value) { addItem(input.value); input.value = ''; }
            }
          }} />
          <Button type="button" onClick={() => {
            const el = document.getElementById('media-url') as HTMLInputElement;
            if (el?.value) { addItem(el.value); el.value = ''; }
          }}>Add</Button>
        </motion.div>
      </motion.div>
      <motion.div>
        <Label className="mb-2 block">Presets</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {GIF_PRESETS.map((p) => (
            <Button key={p.id} type="button" variant="outline" className="h-auto py-2 text-xs" onClick={() => addItem(p.url, p.id)}>
              {p.name}
            </Button>
          ))}
        </motion.div>
      </motion.div>
      {media.items.map((item) => (
        <motion.div key={item.id} className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm text-muted-foreground">{item.preset || item.url}</span>
            <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(item.id)}>Remove</Button>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Select value={item.alignment} onValueChange={(v) => updateItem(item.id, { alignment: v as MediaAlignment })}>
              <SelectTrigger><SelectValue placeholder="Alignment" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
            <Select value={item.size} onValueChange={(v) => updateItem(item.id, { size: v as MediaSize })}>
              <SelectTrigger><SelectValue placeholder="Size" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
`.replace(/motion\./g, ''),

  'tabs/SocialTab.tsx': `'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useReadmeStore } from '@/store/readmeStore';

const FIELDS = [
  ['linkedin', 'LinkedIn URL'],
  ['twitter', 'Twitter / X URL'],
  ['devto', 'Dev.to URL'],
  ['medium', 'Medium URL'],
  ['youtube', 'YouTube URL'],
  ['leetcode', 'LeetCode URL'],
  ['discord', 'Discord username'],
] as const;

export function SocialTab() {
  const social = useReadmeStore((s) => s.state.social);
  const updateSection = useReadmeStore((s) => s.updateSection);

  return (
    <div className="space-y-4">
      {FIELDS.map(([key, label]) => (
        <motion.div key={key} className="space-y-2">
          <Label htmlFor={key}>{label}</Label>
          <Input
            id={key}
            value={social[key]}
            onChange={(e) => updateSection('social', { ...social, [key]: e.target.value })}
            placeholder={label}
          />
        </motion.div>
      ))}
      <p className="text-xs text-muted-foreground">Badges are auto-generated via shields.io</p>
    </motion.div>
  );
}
`.replace(/motion\./g, ''),

  'tabs/ExtrasTab.tsx': `'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useReadmeStore } from '@/store/readmeStore';

export function ExtrasTab() {
  const extras = useReadmeStore((s) => s.state.extras);
  const updateSection = useReadmeStore((s) => s.updateSection);
  const set = (patch: Partial<typeof extras>) => updateSection('extras', { ...extras, ...patch });

  return (
    <div className="space-y-4">
      <motion.div className="flex items-center justify-between rounded-lg border p-4">
        <div><Label>Contribution snake</Label><p className="text-xs text-muted-foreground">Requires snake workflow on your profile repo</p></div>
        <Switch checked={extras.contributionSnake} onCheckedChange={(v) => set({ contributionSnake: v })} />
      </motion.div>
      {extras.contributionSnake && (
        <motion.div className="space-y-2">
          <Label>Snake username (defaults to profile username)</Label>
          <Input value={extras.snakeUsername} onChange={(e) => set({ snakeUsername: e.target.value })} placeholder="github-username" />
        </motion.div>
      )}
      <motion.div className="flex items-center justify-between rounded-lg border p-4">
        <Label>Jokes widget</Label>
        <Switch checked={extras.jokesWidget} onCheckedChange={(v) => set({ jokesWidget: v })} />
      </motion.div>
      <motion.div className="flex items-center justify-between rounded-lg border p-4">
        <Label>Quotes widget</Label>
        <Switch checked={extras.quotesWidget} onCheckedChange={(v) => set({ quotesWidget: v })} />
      </motion.div>
      <motion.div className="flex items-center justify-between rounded-lg border p-4">
        <Label>Buy Me a Coffee</Label>
        <Switch checked={extras.buyMeACoffee} onCheckedChange={(v) => set({ buyMeACoffee: v })} />
      </motion.div>
      {extras.buyMeACoffee && (
        <motion.div className="space-y-2">
          <Label>BMC username</Label>
          <Input value={extras.buyMeACoffeeUsername} onChange={(e) => set({ buyMeACoffeeUsername: e.target.value })} />
        </motion.div>
      )}
    </motion.div>
  );
}
`.replace(/motion\./g, ''),
};

mkdirSync(join(root, 'tabs'), { recursive: true });
for (const [path, content] of Object.entries(files)) {
  writeFileSync(join(root, path), content, 'utf8');
  console.log('wrote', path);
}
