'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { SKILL_CATEGORIES, getSkillsByCategory } from '@/data/skills';
import { useReadmeStore } from '@/store/readmeStore';
import { cn } from '@/lib/utils';

export function SkillsTab() {
  const skills = useReadmeStore((s) => s.state.skills);
  const selected = skills.selected;
  const iconStyle = skills.iconStyle ?? 'skillicons';
  const updateSection = useReadmeStore((s) => s.updateSection);

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    updateSection('skills', { ...skills, selected: next });
  };

  const setIconStyle = (style: 'skillicons' | 'shields') => {
    updateSection('skills', { ...skills, iconStyle: style });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 rounded-lg border border-border p-4 bg-muted/25">
        <label className="text-sm font-semibold">Icon Display Style</label>
        <div className="flex gap-1 p-1 bg-muted/60 border rounded-lg w-fit">
          <button
            type="button"
            onClick={() => setIconStyle('skillicons')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              iconStyle === 'skillicons'
                ? 'bg-card text-foreground shadow-sm border border-border/50'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            SkillIcons Unified Grid
          </button>
          <button
            type="button"
            onClick={() => setIconStyle('shields')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              iconStyle === 'shields'
                ? 'bg-card text-foreground shadow-sm border border-border/50'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Shields.io Badges
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          {iconStyle === 'skillicons'
            ? 'Unified grid of modern skill icons from skillicons.dev'
            : 'Beautiful, custom individual badges constructed using shields.io with official brand colors'}
        </p>
      </div>
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
