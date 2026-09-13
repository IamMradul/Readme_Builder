'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Copy, Download, Share2, Check, FileText, RotateCcw, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReadmeStore } from '@/store/readmeStore';
import { generateMarkdown } from '@/lib/generateMarkdown';
import { TemplatesModal } from '@/components/builder/TemplatesModal';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const state = useReadmeStore((s) => s.state);
  const showSaved = useReadmeStore((s) => s.showSaved);
  const getEncodedState = useReadmeStore((s) => s.getEncodedState);
  const resetState = useReadmeStore((s) => s.resetState);

  useEffect(() => setMounted(true), []);

  const copyText = async (text: string): Promise<boolean> => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {
        console.warn('Navigator clipboard failed, falling back:', e);
      }
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    } catch (err) {
      console.error('Fallback copy failed:', err);
      document.body.removeChild(textArea);
      return false;
    }
  };

  const handleCopy = async () => {
    const markdown = generateMarkdown(state);
    const success = await copyText(markdown);
    if (success) {
      setCopied(true);
      toast.success('Markdown copied!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy');
    }
  };

  const handleDownload = () => {
    const markdown = generateMarkdown(state);
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
    const success = await copyText(url);
    if (success) {
      toast.success('Share link copied!');
    } else {
      toast.error('Failed to copy share link');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--glass-border)] shadow-[var(--glass-shadow)] transition-all">
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-2 px-4 py-3 md:px-5 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.6_0.15_240)] text-white shadow-lg shadow-primary/20">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none sm:text-base bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">README Builder</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">A cleaner way to craft a GitHub profile README</p>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {showSaved && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500"
              role="status"
              aria-live="polite"
            >
              <Check className="h-3.5 w-3.5" /> Saved
            </motion.span>
          )}
          
          <div className="flex items-center gap-2 border-r border-border/50 pr-4">
            <TemplatesModal />
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => {
                if (confirm('Are you sure you want to reset the README? This will clear all fields.')) {
                  resetState();
                  toast.success('Form reset successful!');
                }
              }}
              aria-label="Reset form"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2 border-r border-border/50 pr-4">
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={handleCopy} aria-label="Copy markdown">
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              <span className="hidden sm:inline">Copy Markdown</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={handleDownload} aria-label="Download markdown">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button variant="default" size="sm" className="gap-1.5 bg-gradient-to-r from-primary to-[oklch(0.6_0.15_240)] text-primary-foreground hover:opacity-90 transition-opacity border-0" onClick={handleShare} aria-label="Share">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-2">
          {showSaved && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500"
              role="status"
              aria-live="polite"
            >
              <Check className="h-3 w-3" />
            </motion.span>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 pt-10">
              <SheetHeader>
                <SheetTitle className="text-left">Actions</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <TemplatesModal />
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => {
                      if (confirm('Are you sure you want to reset the README? This will clear all fields.')) {
                        resetState();
                        toast.success('Form reset successful!');
                      }
                    }}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" /> Reset Form
                  </Button>
                </div>
                
                <div className="h-px bg-border/50" />
                
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    {mounted && theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                    Toggle Theme
                  </Button>
                </div>

                <div className="h-px bg-border/50" />
                
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full justify-start" onClick={handleCopy}>
                    {copied ? <Check className="mr-2 h-4 w-4 text-emerald-500" /> : <Copy className="mr-2 h-4 w-4" />}
                    Copy Markdown
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download .md
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-primary to-[oklch(0.6_0.15_240)] text-primary-foreground border-0" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Link
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
