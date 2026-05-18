'use client';

import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LayoutTemplate } from 'lucide-react';
import { README_TEMPLATES } from '@/data/templates';
import { useReadmeStore } from '@/store/readmeStore';
import { toast } from 'sonner';

export function TemplatesModal() {
  const applyTemplate = useReadmeStore((s) => s.applyTemplate);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <LayoutTemplate className="h-4 w-4" />
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Starter templates</DialogTitle>
          <DialogDescription>One-click apply a preset configuration</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          {README_TEMPLATES.map((t) => (
            <motion.button
              key={t.id}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                applyTemplate(t.state);
                toast.success(`Applied "${t.name}" template`);
              }}
              className="flex flex-col items-start gap-2 rounded-lg border bg-card p-4 text-left transition-colors hover:border-primary hover:bg-accent/50"
            >
              <span className="text-3xl">{t.thumbnail}</span>
              <span className="font-semibold">{t.name}</span>
              <span className="text-xs text-muted-foreground">{t.description}</span>
            </motion.button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
