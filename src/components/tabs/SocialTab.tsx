'use client';

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
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>{label}</Label>
          <Input
            id={key}
            value={social[key]}
            onChange={(e) => updateSection('social', { ...social, [key]: e.target.value })}
            placeholder={label}
          />
        </div>
      ))}
      <p className="text-xs text-muted-foreground">Badges are auto-generated via shields.io</p>
    </div>
  );
}
