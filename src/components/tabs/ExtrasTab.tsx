'use client';

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
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div><Label>Contribution snake</Label><p className="text-xs text-muted-foreground">Requires snake workflow on your profile repo</p></div>
        <Switch checked={extras.contributionSnake} onCheckedChange={(v) => set({ contributionSnake: v })} />
      </div>
      {extras.contributionSnake && (
        <div className="space-y-2">
          <Label>Snake username (defaults to profile username)</Label>
          <Input value={extras.snakeUsername} onChange={(e) => set({ snakeUsername: e.target.value })} placeholder="github-username" />
        </div>
      )}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <Label>Jokes widget</Label>
        <Switch checked={extras.jokesWidget} onCheckedChange={(v) => set({ jokesWidget: v })} />
      </div>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <Label>Quotes widget</Label>
        <Switch checked={extras.quotesWidget} onCheckedChange={(v) => set({ quotesWidget: v })} />
      </div>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <Label>Buy Me a Coffee</Label>
        <Switch checked={extras.buyMeACoffee} onCheckedChange={(v) => set({ buyMeACoffee: v })} />
      </div>
      {extras.buyMeACoffee && (
        <div className="space-y-2">
          <Label>BMC username</Label>
          <Input value={extras.buyMeACoffeeUsername} onChange={(e) => set({ buyMeACoffeeUsername: e.target.value })} />
        </div>
      )}
    </div>
  );
}
