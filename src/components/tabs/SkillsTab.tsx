'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { SKILL_CATEGORIES, getSkillsByCategory } from '@/data/skills';
import { useReadmeStore } from '@/store/readmeStore';
import { cn } from '@/lib/utils';

export function SkillsTab() {
  const selected = useReadmeStore((s) => s.state.skills.selected);
  const updateSection = useReadmeStore((s) => s.updateSection);

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    updateSection('skills', { selected: next });
  };

  return (
    <div className="space-y-6">
      {SKILL_CATEGORIES.map((cat) => {
        const skills = getSkillsByCategory(cat.id);
        return (
          <div key={cat.id}>
            <h4 className="mb-2 text-sm font-medium text-muted-foreground">{cat.label}</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => {
                const isOn = selected.includes(skill.id);
                return (
                  <motion.button
                    key={skill.id}
                    type="button"
                    onClick={() => toggle(skill.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant={isOn ? 'default' : 'outline'}
                      className={cn('cursor-pointer transition-colors', isOn && 'ring-2 ring-primary')}
                    >
                      {skill.name}
                    </Badge>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
