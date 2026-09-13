'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LayoutTemplate, Search } from 'lucide-react';
import { README_TEMPLATES } from '@/data/templates';
import { useReadmeStore } from '@/store/readmeStore';
import { toast } from 'sonner';
import type { ReadmeState } from '@/types/readme';

export function TemplatesModal() {
  const applyTemplate = useReadmeStore((s) => s.applyTemplate);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredTemplates = useMemo(() => {
    return README_TEMPLATES.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleApply = (state: Partial<ReadmeState>, name: string) => {
    applyTemplate(state);
    toast.success(`Applied "${name}" template`);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <LayoutTemplate className="h-4 w-4" />
          <span className="hidden sm:inline">Templates</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 glass-card bg-background/95">
        <div className="p-6 pb-4 border-b border-[var(--glass-border)] bg-background/50 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Starter Templates
            </DialogTitle>
            <DialogDescription>
              Choose a starting point for your README.
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-lg border border-border/50 bg-muted/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-background/20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredTemplates.map((t, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  key={t.id}
                  className={`group relative flex flex-col rounded-xl border ${selectedId === t.id ? 'border-primary ring-1 ring-primary' : 'border-border/50'} bg-card/50 p-5 text-left transition-all hover:border-primary/50 hover:bg-accent/10 hover:shadow-lg hover:shadow-primary/5 cursor-pointer`}
                  onMouseEnter={() => setSelectedId(t.id)}
                  onMouseLeave={() => setSelectedId(null)}
                  onClick={() => handleApply(t.state, t.name)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleApply(t.state, t.name);
                    }
                  }}
                  role="button"
                  aria-label={`Apply ${t.name} template`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl shadow-inner">
                      {t.thumbnail}
                    </span>
                    <Button 
                      size="sm" 
                      variant={selectedId === t.id ? "default" : "outline"}
                      className={`rounded-full transition-opacity ${selectedId === t.id ? 'opacity-100 bg-primary text-primary-foreground' : 'opacity-0 group-hover:opacity-100'}`}
                    >
                      Use
                    </Button>
                  </div>
                  <h3 className="font-semibold text-lg">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredTemplates.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                <p>No templates found matching &quot;{search}&quot;</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
