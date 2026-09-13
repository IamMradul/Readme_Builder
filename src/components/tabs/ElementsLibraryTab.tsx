'use client';

import { useReadmeStore } from '@/store/readmeStore';
import { COMPONENTS_LIBRARY } from '@/data/components-library';
import { Check, Plus } from 'lucide-react';
import { BadgeCustomizer } from '@/components/builder/BadgeCustomizer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function ElementsLibraryTab() {
  const { elements } = useReadmeStore((s) => s.state);
  const updateSection = useReadmeStore((s) => s.updateSection);

  const toggleComponent = (id: string) => {
    const current = elements?.components || [];
    const next = current.includes(id)
      ? current.filter((c) => c !== id)
      : [...current, id];
    updateSection('elements', { ...elements, components: next });
  };

  const componentCategories = Array.from(new Set(COMPONENTS_LIBRARY.map((c) => c.category)));

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          Visual Elements Library
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add beautiful badges and advanced markdown components.
        </p>
      </div>

      <Tabs defaultValue="badges" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-sm mb-6">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="mt-0">
          <BadgeCustomizer />
        </TabsContent>

        <TabsContent value="components" className="mt-0 space-y-6">
          <div>
            <h3 className="text-sm font-semibold">Markdown Components</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Select pre-built markdown snippets to add to your README.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {componentCategories.map((category) => (
              <div key={category} className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {category}
                </h4>
                <div className="flex flex-col gap-2">
                  {COMPONENTS_LIBRARY.filter((c) => c.category === category).map((comp) => {
                    const isSelected = elements?.components?.includes(comp.id) || false;
                    return (
                      <div
                        key={comp.id}
                        className={`rounded-lg border transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'border-border/50 bg-card hover:border-primary/50 hover:bg-accent/10'
                        }`}
                      >
                        <div
                          onClick={() => toggleComponent(comp.id)}
                          className="group relative flex cursor-pointer items-center justify-between p-3"
                          role="button"
                          tabIndex={0}
                        >
                          <div>
                            <p className={`text-sm font-medium ${isSelected ? 'text-primary' : ''}`}>
                              {comp.name}
                            </p>
                          </div>
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                              isSelected
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                            }`}
                          >
                            {isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                          </div>
                        </div>
                        
                        {isSelected && (
                          <div className="px-3 pb-3">
                            <textarea
                              className="w-full text-xs font-mono bg-background/50 border border-border/50 rounded-md p-2 h-24 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-y"
                              value={elements?.componentContent?.[comp.id] ?? comp.markdown}
                              onChange={(e) => updateSection('elements', {
                                ...elements,
                                componentContent: {
                                  ...(elements?.componentContent || {}),
                                  [comp.id]: e.target.value
                                }
                              })}
                              spellCheck={false}
                            />
                            <p className="text-[10px] text-muted-foreground mt-1">
                              Edit the raw markdown for this component.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
