'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { FormPanel } from '@/components/layout/FormPanel';
import { PreviewPanel } from '@/components/layout/PreviewPanel';
import { useReadmeStore } from '@/store/readmeStore';

export default function Home() {
  const loadFromEncoded = useReadmeStore((s) => s.loadFromEncoded);
  const markSaved = useReadmeStore((s) => s.markSaved);

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
