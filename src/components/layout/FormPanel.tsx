'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileTab } from '@/components/tabs/ProfileTab';
import { AboutTab } from '@/components/tabs/AboutTab';
import { SkillsTab } from '@/components/tabs/SkillsTab';
import { StatsTab } from '@/components/tabs/StatsTab';
import { HeaderTab } from '@/components/tabs/HeaderTab';
import { MediaTab } from '@/components/tabs/MediaTab';
import { SocialTab } from '@/components/tabs/SocialTab';
import { ExtrasTab } from '@/components/tabs/ExtrasTab';
import { SectionOrderPanel } from '@/components/builder/SectionOrderPanel';

const TAB_ITEMS = [
  { value: 'profile', label: 'Profile' },
  { value: 'about', label: 'About' },
  { value: 'skills', label: 'Skills' },
  { value: 'stats', label: 'Stats' },
  { value: 'header', label: 'Header' },
  { value: 'media', label: 'Media' },
  { value: 'social', label: 'Social' },
  { value: 'extras', label: 'Extras' },
  { value: 'order', label: 'Order' },
] as const;

const TAB_CONTENT: Record<string, ReactNode> = {
  profile: <ProfileTab />,
  about: <AboutTab />,
  skills: <SkillsTab />,
  stats: <StatsTab />,
  header: <HeaderTab />,
  media: <MediaTab />,
  social: <SocialTab />,
  extras: <ExtrasTab />,
  order: <SectionOrderPanel />,
};

export function FormPanel() {
  const [tab, setTab] = useState('profile');

  return (
    <div className="flex h-full min-h-[540px] flex-col rounded-2xl border border-border/70 bg-card/85 shadow-xl shadow-black/5 backdrop-blur-sm">
      <div className="border-b border-border/70 px-4 py-3">
        <h2 className="text-lg font-semibold tracking-tight">Build your README</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">Fill in sections, reorder them, and preview the result live.</p>
      </div>
      <Tabs value={tab} onValueChange={setTab} className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="mx-4 mt-3 flex h-auto flex-wrap justify-start gap-1 bg-muted/50 p-1">
          {TAB_ITEMS.map((t) => (
            <TabsTrigger key={t.value} value={t.value} className="px-3 py-1.5 text-xs sm:text-sm">
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex-1 overflow-y-auto px-4 py-4 lg:px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
            >
              {TAB_CONTENT[tab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
}

