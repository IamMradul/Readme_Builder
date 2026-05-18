'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { FormPanel } from '@/components/layout/FormPanel';
import { PreviewPanel } from '@/components/layout/PreviewPanel';
import { useReadmeStore } from '@/store/readmeStore';

export default function Home() {
  const loadFromEncoded = useReadmeStore((s) => s.loadFromEncoded);
  const markSaved = useReadmeStore((s) => s.markSaved);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get('s');
    if (shared) loadFromEncoded(shared);
  }, [loadFromEncoded]);

  useEffect(() => {
    const interval = setInterval(() => {
      markSaved();
    }, 2000);
    return () => clearInterval(interval);
  }, [markSaved]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#238636] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto grid gap-6 px-4 py-6 md:grid-cols-2 md:py-8">
        <FormPanel />
        <PreviewPanel />
      </main>
    </div>
  );
}
