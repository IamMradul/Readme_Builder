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
import { User, Info, Terminal, BarChart2, Type, Image as ImageIcon, Link2, Puzzle, ListOrdered } from 'lucide-react';

const TAB_ITEMS = [
  { value: 'profile', label: 'Profile', icon: User },
  { value: 'about', label: 'About', icon: Info },
  { value: 'skills', label: 'Skills', icon: Terminal },
  { value: 'stats', label: 'Stats', icon: BarChart2 },
  { value: 'header', label: 'Header', icon: Type },
  { value: 'media', label: 'Media', icon: ImageIcon },
  { value: 'social', label: 'Social', icon: Link2 },
  { value: 'extras', label: 'Extras', icon: Puzzle },
  { value: 'order', label: 'Order', icon: ListOrdered },
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
    <div className="flex h-[calc(100vh-100px)] min-h-[540px] flex-col rounded-2xl glass-card overflow-hidden">
      <div className="border-b border-[var(--glass-border)] px-5 py-4 bg-background/50 backdrop-blur-md">
        <h2 className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Build your README</h2>
        <p className="mt-1 text-xs text-muted-foreground">Fill in sections, reorder them, and preview the result live.</p>
      </div>
      
      <Tabs value={tab} onValueChange={setTab} className="flex flex-1 flex-col sm:flex-row overflow-hidden">
        <TabsList className="flex sm:flex-col justify-start h-auto w-full sm:w-[100px] md:w-[120px] bg-muted/20 border-b sm:border-b-0 sm:border-r border-[var(--glass-border)] overflow-x-auto sm:overflow-y-auto overflow-y-hidden sm:overflow-x-hidden p-2 gap-1 rounded-none">
          {TAB_ITEMS.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.value;
            
            return (
              <TabsTrigger 
                key={t.value} 
                value={t.value} 
                className="relative flex flex-col items-center justify-center gap-1.5 h-16 w-16 sm:w-full min-w-16 rounded-xl data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-colors hover:bg-muted/50"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`h-5 w-5 z-10 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                <span className={`text-[10px] font-medium z-10 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {t.label}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        
        <div className="flex-1 overflow-y-auto px-4 py-5 lg:px-6 scroll-smooth bg-background/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {TAB_CONTENT[tab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
}
