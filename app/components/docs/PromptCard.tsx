"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * A read-only prompt with a prominent "Copy prompt" button. The user pastes
 * the prompt into their AI coding tool to bootstrap the whole portfolio.
 */
export function PromptCard({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable; no-op
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-500">
          Setup prompt
        </span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy prompt
            </>
          )}
        </button>
      </div>
      <pre className="max-h-72 overflow-auto px-4 py-4 text-xs leading-relaxed">
        <code className="whitespace-pre-wrap font-mono text-gray-700 dark:text-gray-300">{prompt.trim()}</code>
      </pre>
    </div>
  );
}
