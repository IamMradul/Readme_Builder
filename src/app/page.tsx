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
      <main className="mx-auto grid w-full max-w-[1600px] gap-5 px-4 py-4 md:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] md:px-5 md:py-5 lg:px-6">
        <FormPanel />
        <PreviewPanel />
      </main>
    </div>
  );
}
