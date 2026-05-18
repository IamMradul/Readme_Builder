'use client';

import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Eye, Code, Copy, Download, Check } from 'lucide-react';
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

  const lineCount = useMemo(() => markdown.split('\n').length, [markdown]);

  return (
    <div className="flex h-full min-h-[480px] flex-col rounded-xl border border-border bg-[#0d1117] shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#30363d] px-4 py-2">
        <div className="flex items-center gap-1 bg-[#161b22] p-1 rounded-lg border border-[#30363d]">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'preview'
                ? 'bg-[#21262d] text-[#f0f6fc] shadow-sm'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'code'
                ? 'bg-[#21262d] text-[#f0f6fc] shadow-sm'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            Code
          </button>
        </div>

        {activeTab === 'code' && markdown && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2.5 text-xs text-[#c9d1d9] border-[#30363d] bg-[#161b22] hover:bg-[#21262d] hover:text-[#f0f6fc]"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-3.5 w-3.5 text-[#3fb950]" /> : <Copy className="h-3.5 w-3.5" />}
              <span className="ml-1.5 hidden sm:inline">Copy</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2.5 text-xs text-[#c9d1d9] border-[#30363d] bg-[#161b22] hover:bg-[#21262d] hover:text-[#f0f6fc]"
              onClick={handleDownload}
            >
              <Download className="h-3.5 w-3.5" />
              <span className="ml-1.5 hidden sm:inline">Download</span>
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'preview' ? (
          <article className="readme-preview prose prose-invert max-w-none prose-img:inline prose-img:mx-auto prose-a:text-[#58a6ff]">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {markdown || '*Start filling the form to see your README...*'}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="relative rounded-lg border border-[#30363d] bg-[#161b22] p-4 overflow-x-auto max-h-[600px]">
            {markdown ? (
              <pre className="font-mono text-sm text-[#e6edf3] leading-relaxed select-all">
                <code>{markdown}</code>
              </pre>
            ) : (
              <p className="text-sm text-[#8b949e] italic">*Start filling the form to generate markdown code...*</p>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-[#30363d] px-4 py-2.5 flex items-center justify-between text-xs text-[#8b949e]">
        <div>{markdown.length.toLocaleString()} characters</div>
        <div>{lineCount} lines · updates debounced 300ms</div>
      </div>
    </div>
  );
}

