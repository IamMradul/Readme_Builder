'use client';

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
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div><Label>Capsule Render banner</Label><p className="text-xs text-muted-foreground">Animated header capsule</p></div>
        <Switch checked={header.capsuleEnabled} onCheckedChange={(v) => set({ capsuleEnabled: v })} />
      </div>
      {header.capsuleEnabled && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={header.capsuleType} onValueChange={(v) => set({ capsuleType: v as CapsuleType })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {(['animated','gradient','waving','soft'] as CapsuleType[]).map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Colors (comma-separated hex)</Label>
            <Input value={header.capsuleColor} onChange={(e) => set({ capsuleColor: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Height</Label>
            <Input type="number" value={header.capsuleHeight} onChange={(e) => set({ capsuleHeight: Number(e.target.value) })} />
          </div>
        </div>
      )}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div><Label>Typing SVG</Label><p className="text-xs text-muted-foreground">readme-typing-svg.demolab.com</p></div>
        <Switch checked={header.typingEnabled} onCheckedChange={(v) => set({ typingEnabled: v })} />
      </div>
      {header.typingEnabled && (
        <div className="space-y-4">
          {header.typingLines.map((line, i) => (
            <Input key={i} value={line} onChange={(e) => updateLine(i, e.target.value)} placeholder={`Line ${i + 1}`} />
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => set({ typingLines: [...header.typingLines, ''] })}>Add line</Button>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Color (hex without #)</Label>
              <Input value={header.typingColor} onChange={(e) => set({ typingColor: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Speed (ms per char)</Label>
              <Input type="number" value={header.typingSpeed} onChange={(e) => set({ typingSpeed: Number(e.target.value) })} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
