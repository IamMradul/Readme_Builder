'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useReadmeStore } from '@/store/readmeStore';

const FIELDS = [
  ['workingOn', 'Currently working on'],
  ['learning', 'Learning'],
  ['askMeAbout', 'Ask me about'],
  ['funFact', 'Fun fact'],
] as const;

export function AboutTab() {
  const about = useReadmeStore((s) => s.state.about);
  const updateSection = useReadmeStore((s) => s.updateSection);

  const set = (field: keyof typeof about, value: string) =>
    updateSection('about', { ...about, [field]: value });

  return (
    <div className="space-y-4">
      {FIELDS.map(([key, label]) => (
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>{label}</Label>
          <Input id={key} value={about[key]} onChange={(e) => set(key, e.target.value)} />
        </div>
      ))}
    </div>
  );
}
