'use client';

import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Eye, Code, Copy, Download, Check, FileText } from 'lucide-react';
import { useReadmeStore } from '@/store/readmeStore';
import { generateMarkdown } from '@/lib/generateMarkdown';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function PreviewPanel() {
  const state = useReadmeStore((s) => s.state);
  const debouncedState = useDebouncedValue(state, 300);
  const markdown = useMemo(() => generateMarkdown(debouncedState), [debouncedState]);
  
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

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
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded README.md');
  };



  const lineCount = useMemo(() => (markdown ? markdown.split('\n').length : 0), [markdown]);
  const lines = useMemo(() => markdown.split('\n'), [markdown]);

  return (
    <div className="flex h-full min-h-[540px] flex-col overflow-hidden rounded-2xl border border-border/70 bg-[#0d1117] shadow-xl shadow-black/10">
      {/* GitHub Repo File Header Style */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#30363d] px-4 py-3 lg:px-5 bg-[#161b22]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#c9d1d9]">
              <FileText className="h-4 w-4 text-[#8b949e]" />
              README.md
            </div>
            <span className="text-xs text-[#8b949e] border-l border-[#30363d] pl-3">
              {lineCount} lines · {markdown.length.toLocaleString()} Bytes
            </span>
          </div>

          <div className="flex items-center gap-3">
          {/* Live Update Indicator */}
          <div 
            className="flex items-center gap-2 text-xs text-[#8b949e]"
            aria-live="polite"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline">Live sync</span>
          </div>

            <div className="flex items-center gap-1 rounded-md border border-[#30363d] bg-[#0d1117] p-0.5">
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                aria-label="View Preview"
                className={`flex items-center gap-1.5 rounded-sm px-3 py-1 text-xs font-semibold transition-all ${
                  activeTab === 'preview'
                    ? 'bg-[#21262d] text-[#f0f6fc] shadow-sm'
                    : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]/50'
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('code')}
                aria-label="View Code"
                className={`flex items-center gap-1.5 rounded-sm px-3 py-1 text-xs font-semibold transition-all ${
                  activeTab === 'code'
                    ? 'bg-[#21262d] text-[#f0f6fc] shadow-sm'
                    : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]/50'
                }`}
              >
                <Code className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Code</span>
              </button>
            </div>

            <div className="flex items-center gap-1 border-l border-[#30363d] pl-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc]"
                onClick={handleCopy}
                aria-label="Copy raw contents"
                title="Copy raw contents"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc]"
                onClick={handleDownload}
                aria-label="Download raw contents"
                title="Download raw contents"
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

      <div className="flex-1 overflow-y-auto bg-[#0d1117] min-h-0 dark">
        {activeTab === 'preview' ? (
          <div className="px-6 py-8 lg:px-10 lg:py-10 max-w-4xl mx-auto">
            <article className="readme-preview prose prose-invert max-w-none prose-base prose-headings:scroll-mt-24 prose-img:inline prose-img:mx-auto prose-a:text-[#58a6ff] text-[#c9d1d9]">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
                components={{
                  td: ({ node, ...props }) => {
                    // Filter out vAlign to prevent React console warnings
                    // while keeping it in the raw markdown for GitHub
                    const { vAlign, valign, ...rest } = props as any;
                    return <td style={{ verticalAlign: 'top' }} {...rest} />;
                  }
                }}
              >
                {markdown || '*Start filling the form to see your README...*'}
              </ReactMarkdown>
            </article>
          </div>
        ) : (
          <div className="flex min-h-full">
            <div className="flex flex-col items-end border-r border-[#30363d] bg-[#161b22] px-3 py-4 text-xs font-mono text-[#6e7681] select-none text-right">
              {lines.map((_, i) => (
                <div key={i} className="min-w-[2.5rem] leading-[22px]">{i + 1}</div>
              ))}
              {lines.length === 0 && <div className="min-w-[2.5rem] leading-[22px]">1</div>}
            </div>
            <div className="flex-1 overflow-x-auto p-4 relative">
              {markdown ? (
                <pre className="select-all font-mono text-sm leading-[22px] text-[#e6edf3]">
                  <code>{markdown}</code>
                </pre>
              ) : (
                <p className="text-sm text-[#8b949e] italic mt-1">*Start filling the form to generate markdown code...*</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
