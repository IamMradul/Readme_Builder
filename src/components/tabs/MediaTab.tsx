'use client';

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
      <div className="space-y-2">
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
        </div>
      </div>
      <div>
        <Label className="mb-2 block">Presets</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {GIF_PRESETS.map((p) => (
            <Button key={p.id} type="button" variant="outline" className="h-auto py-2 text-xs" onClick={() => addItem(p.url, p.id)}>
              {p.name}
            </Button>
          ))}
        </div>
      </div>
      {media.items.map((item) => (
        <div key={item.id} className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm text-muted-foreground">{item.preset || item.url}</span>
            <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(item.id)}>Remove</Button>
          </div>
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
          </div>
        </div>
      ))}
    </div>
  );
}
