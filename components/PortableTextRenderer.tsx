// components/PortableTextRenderer.tsx
"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { MarkdownCode } from "./MarkDownCode";
import { CheckCircle2 } from "lucide-react"; // For a nice icon

const SanityImage = ({ value }: { value: { url: string; alt?: string } }) => {
  if (!value?.url) {
    return null;
  }
  return (
    <div className="my-8 flex justify-center">
      <div className="relative w-full max-w-4xl aspect-video">
        <Image
          src={value.url}
          alt={value.alt || "Content image"}
          fill
          className="rounded-lg shadow-md object-contain"
        />
      </div>
      {value.alt && (
        <p className="text-center text-sm text-muted-foreground mt-2 italic">
          {value.alt}
        </p>
      )}
    </div>
  );
};

/**
 * --- THE NEW, REDESIGNED LIST ITEM COMPONENT ---
 * This component will be used for every <li> tag.
 * It includes an icon and a connecting line.
 */
const CustomListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="relative flex items-start gap-x-4">
      {/* Icon and connecting line */}
      <div className="absolute left-0 top-0 flex w-6 justify-center -translate-x-1/2">
        <div className="w-px h-full bg-border"></div>
      </div>
      <div className="flex-shrink-0 h-6 flex items-center justify-center">
        <CheckCircle2 className="h-5 w-5 text-primary" />
      </div>
      {/* Content */}
      <div className="flex-grow pt-0.5">{children}</div>
    </li>
  );
};

/**
 * The full set of components that PortableText will use.
 */
const ptComponents = {
  types: {
    code: ({ value }: { value: { code: string; language: string } }) => {
      return (
        <MarkdownCode code={value.code} lang={value.language || "plaintext"} />
      );
    },
    image: SanityImage,
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-12 mb-6 scroll-mt-28">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-10 mb-4 scroll-mt-28">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-8 mb-4 scroll-mt-28">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 bg-muted/30 rounded-r-lg italic">
        {children}
      </blockquote>
    ),
  },

  // --- CORRECTED LIST STYLING ---
  list: {
    // Both bulleted and numbered lists will use the same wrapper style
    bullet: ({ children }: any) => (
      <ul className="my-6 space-y-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-6 space-y-4">{children}</ol>
    ),
  },

  listItem: {
    // Both list item types will now use our custom component
    bullet: CustomListItem,
    number: CustomListItem,
  },
  // --- End of list styling ---

  marks: {
    link: ({ value, children }: any) => {
      const href = value?.href || "";
      const isInternal = href.startsWith("/");
      if (isInternal) {
        return (
          <Link
            href={href}
            className="text-primary underline hover:text-primary/80"
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary/80"
        >
          {children}
        </a>
      );
    },
  },
};

export const PortableTextRenderer = ({ content }: { content: any }) => {
  if (!content) return null;
  return <PortableText value={content} components={ptComponents} />;
};
