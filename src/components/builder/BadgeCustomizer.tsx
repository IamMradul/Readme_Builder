'use client';

import { useReadmeStore } from '@/store/readmeStore';
import { BADGES } from '@/data/badges';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BadgeCustomizer() {
  const { elements } = useReadmeStore((s) => s.state);
  const updateSection = useReadmeStore((s) => s.updateSection);

  const toggleBadge = (id: string) => {
    const current = elements?.badges || [];
    const next = current.includes(id)
      ? current.filter((b) => b !== id)
      : [...current, id];
    updateSection('elements', { ...elements, badges: next });
  };

  const categories = Array.from(new Set(BADGES.map((b) => b.category)));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold">GitHub Badges</h3>
        <p className="text-xs text-muted-foreground mt-1">Select badges to display on your profile.</p>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category} className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {BADGES.filter((b) => b.category === category).map((badge) => {
                const isSelected = elements?.badges?.includes(badge.id) || false;
                return (
                  <button
                    key={badge.id}
                    onClick={() => toggleBadge(badge.id)}
                    className={`relative rounded-md p-1 transition-all ${
                      isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:scale-105 hover:bg-muted'
                    }`}
                    title={badge.name}
                  >
                    <img src={badge.url} alt={badge.name} className="h-6 object-contain" />
                    {isSelected && (
                      <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {elements?.badges?.length > 0 && (
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateSection('elements', { ...elements, badges: [] })}
            className="text-xs"
          >
            Clear all badges
          </Button>
        </div>
      )}
    </div>
  );
}
