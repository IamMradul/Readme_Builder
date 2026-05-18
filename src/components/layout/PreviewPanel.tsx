'use client';

import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useReadmeStore } from '@/store/readmeStore';
import { generateMarkdown } from '@/lib/generateMarkdown';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

export function PreviewPanel() {
  const state = useReadmeStore((s) => s.state);
  const debouncedState = useDebouncedValue(state, 300);
  const markdown = useMemo(() => generateMarkdown(debouncedState), [debouncedState]);

  return (
    <div className="flex h-full min-h-[480px] flex-col rounded-xl border border-border bg-[#0d1117] shadow-sm">
      <div className="border-b border-[#30363d] px-4 py-3">
        <h2 className="text-lg font-semibold text-[#e6edf3]">Live Preview</h2>
        <p className="text-sm text-[#8b949e]">GitHub-rendered markdown</p>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <article className="readme-preview prose prose-invert max-w-none prose-img:inline prose-img:mx-auto prose-a:text-[#58a6ff]">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {markdown || '*Start filling the form to see your README...*'}
          </ReactMarkdown>
        </article>
      </div>
      <div className="border-t border-[#30363d] px-4 py-2 text-xs text-[#8b949e]">
        {markdown.length.toLocaleString()} characters · updates debounced 300ms
      </div>
    </div>
  );
}

