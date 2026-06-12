"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * A styled code block matching the portfolio aesthetic, with an optional
 * filename/label header and a copy-to-clipboard button.
 */
export function CodeBlock({
  children,
  label,
}: {
  children: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable; no-op
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-zinc-950">
      {label ? (
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-2">
          <span className="font-mono text-xs text-gray-500 dark:text-gray-500">{label}</span>
          <CopyButton copied={copied} onClick={copy} />
        </div>
      ) : (
        <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
          <CopyButton copied={copied} onClick={copy} />
        </div>
      )}

      <pre className="overflow-x-auto px-4 py-4 text-sm leading-relaxed">
        <code className="font-mono text-gray-800 dark:text-gray-300">{children.trim()}</code>
      </pre>
    </div>
  );
}

function CopyButton({ copied, onClick }: { copied: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Copy code"
      className="flex items-center gap-1 rounded-md border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-900/70 px-2 py-1 text-[11px] font-medium text-gray-500 dark:text-gray-400 backdrop-blur transition-colors hover:text-black dark:hover:text-white"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" /> Copy
        </>
      )}
    </button>
  );
}
