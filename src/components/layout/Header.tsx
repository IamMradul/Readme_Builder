'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Copy, Download, Share2, Check, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReadmeStore } from '@/store/readmeStore';
import { generateMarkdown } from '@/lib/generateMarkdown';
import { TemplatesModal } from '@/components/builder/TemplatesModal';
import { toast } from 'sonner';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const state = useReadmeStore((s) => s.state);
  const showSaved = useReadmeStore((s) => s.showSaved);
  const getEncodedState = useReadmeStore((s) => s.getEncodedState);

  useEffect(() => setMounted(true), []);

  const markdown = generateMarkdown(state);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast.success('Markdown copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded README.md');
  };

  const handleShare = async () => {
    const encoded = getEncodedState();
    const url = `${window.location.origin}${window.location.pathname}?s=${encoded}`;
    await navigator.clipboard.writeText(url);
    toast.success('Share link copied!');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-14 flex-wrap items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#238636] text-white">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none sm:text-base">README Builder</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">GitHub profile generator</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {showSaved && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 text-xs text-[#3fb950]"
            >
              <Check className="h-3.5 w-3.5" /> Saved
            </motion.span>
          )}

          <TemplatesModal />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button variant="outline" size="sm" className="gap-1.5" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 text-[#3fb950]" /> : <Copy className="h-4 w-4" />}
            <span className="hidden sm:inline">Copy Markdown</span>
          </Button>

          <Button variant="outline" size="sm" className="gap-1.5" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download .md</span>
          </Button>

          <Button variant="default" size="sm" className="gap-1.5 bg-[#238636] hover:bg-[#2ea043]" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
