'use client';

import { useReadmeStore } from '@/store/readmeStore';
import { Button } from '@/components/ui/button';
import { Table, Code, Type, LayoutTemplate } from 'lucide-react';
import { toast } from 'sonner';

const QUICK_INSERTS = [
  { id: 'c-table-2col', label: 'Add Table', icon: Table },
  { id: 'c-code-block', label: 'Add Code Block', icon: Code },
  { id: 'c-accordion', label: 'Add Collapsible', icon: LayoutTemplate },
  { id: 'c-quote', label: 'Add Quote', icon: Type },
] as const;

export function QuickInsertBar() {
  const { elements } = useReadmeStore((s) => s.state);
  const updateSection = useReadmeStore((s) => s.updateSection);

  const insertComponent = (id: string, label: string) => {
    const current = elements?.components || [];
    if (!current.includes(id)) {
      updateSection('elements', { ...elements, components: [...current, id] });
      toast.success(`Inserted ${label} to Elements`);
    } else {
      toast.info(`${label} is already in Elements`);
    }
  };

  return (
    <div className="flex items-center gap-1 bg-muted/40 p-1.5 rounded-lg border border-[var(--glass-border)] mx-4 mb-4 mt-auto w-fit shadow-lg shadow-black/5">
      <span className="text-[10px] font-medium text-muted-foreground uppercase px-2 tracking-wider hidden sm:inline">
        Quick Insert:
      </span>
      {QUICK_INSERTS.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors"
            onClick={() => insertComponent(item.id, item.label)}
            title={item.label}
            aria-label={item.label}
          >
            <Icon className="h-4 w-4" />
          </Button>
        );
      })}
    </div>
  );
}
