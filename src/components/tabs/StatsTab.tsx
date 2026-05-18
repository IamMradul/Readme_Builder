'use client';

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
      <div className="space-y-2">
        <Label>Theme</Label>
        <Select value={stats.theme} onValueChange={(theme) => updateSection('stats', { ...stats, theme: theme as typeof stats.theme })}>
          <SelectTrigger><SelectValue placeholder="Select theme" /></SelectTrigger>
          <SelectContent className="max-h-60">
            {STATS_THEMES.map((t) => (
              <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-3">
        <Label>Widgets</Label>
        {WIDGETS.map((w) => (
          <div key={w.id} className="flex items-center gap-2">
            <Checkbox id={w.id} checked={stats.widgets.includes(w.id)} onCheckedChange={() => toggle(w.id)} />
            <Label htmlFor={w.id} className="cursor-pointer font-normal">{w.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
