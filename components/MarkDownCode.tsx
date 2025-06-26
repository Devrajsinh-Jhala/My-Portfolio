// components/MarkDownCode.tsx
"use client";

import { useEffect, useState } from "react";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { Copy, Check } from "lucide-react";

export function MarkdownCode({ code, lang }: { code: string; lang: string }) {
  const [processedHtml, setProcessedHtml] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const processCode = async () => {
      const html = `<pre><code class="language-${lang}">${code}</code></pre>`;

      try {
        const result = await unified()
          .use(rehypeParse, { fragment: true })
          .use(rehypePrettyCode, {
            theme: "one-dark-pro",
            keepBackground: false,
          })
          .use(rehypeStringify)
          .process(html);

        setProcessedHtml(result.toString());
      } catch (error) {
        // console.error("Error processing code:", error);
        setProcessedHtml(
          `<pre class="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto"><code>${code}</code></pre>`
        );
      }
    };

    processCode();
  }, [code, lang]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // console.error("Failed to copy:", error);
    }
  };

  if (!processedHtml) {
    return (
      <div className="bg-zinc-950 text-zinc-100 p-4 rounded-lg my-6">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative group my-6">
      <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 rounded-t-lg text-xs">
        <span className="text-zinc-300 font-medium">{lang}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          {copied ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div
        className="overflow-x-auto rounded-b-lg border-t-0 [&>pre]:rounded-none [&>pre]:rounded-b-lg [&>pre]:border-0 [&>pre]:my-0"
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    </div>
  );
}
