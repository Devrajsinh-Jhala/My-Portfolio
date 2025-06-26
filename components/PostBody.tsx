// components/PostBody.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { TableOfContents } from "@/components/TableOfContents";
import { motion } from "framer-motion";
import { Clock, Calendar, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import slugify from "slugify";
import { MarkdownCode } from "@/components/MarkDownCode";

type Post = {
  title: string;
  publishedAt: string;
  readTimeInMinutes: number;
  brief: string;
  author: { name: string; profilePicture: string; bio: { text: string } };
  tags: { name: string; slug: string }[];
  coverImage?: { url: string };
  content: { markdown: string };
};

type Heading = { id: string; text: string; level: number };
type Props = { post: Post; headings: Heading[]; hasTableOfContents: boolean };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const PostBody = ({ post, headings, hasTableOfContents }: Props) => {
  // Clean Hashnode markdown - remove align attributes from image URLs
  const cleanMarkdown = post.content.markdown.replace(
    /!\[([^\]]*)\]\(([^)]+)\s+align="[^"]*"\)/g,
    "![$1]($2)"
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full mx-auto py-16 md:py-24 px-4 ${
        hasTableOfContents
          ? "max-w-7xl flex flex-col lg:flex-row gap-12"
          : "max-w-4xl"
      }`}
    >
      {/* Table of Contents Sidebar */}
      {hasTableOfContents && headings.length > 0 && (
        <aside className="w-full lg:w-1/4 lg:order-2">
          <div className="sticky top-28">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div
        className={
          hasTableOfContents && headings.length > 0
            ? "w-full lg:w-3/4 lg:order-1"
            : "w-full"
        }
      >
        <article className="min-w-0">
          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-center text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Metadata */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 mb-8 text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTimeInMinutes} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author.name}</span>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {post.tags.map((tag) => (
              <Badge key={tag.slug} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </motion.div>

          {/* Cover Image */}
          <motion.div variants={itemVariants}>
            {post.coverImage?.url && (
              <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-12 shadow-lg">
                <Image
                  src={post.coverImage.url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </motion.div>

          {/* Article Content */}
          <motion.div variants={itemVariants}>
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-28">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Paragraphs with justified text
                  p: ({ children, ...props }) => (
                    <p className="text-justify leading-relaxed mb-4" {...props}>
                      {children}
                    </p>
                  ),

                  // Image component with proper handling
                  img: ({ src, alt, ...props }) => {
                    if (!src) return null;

                    return (
                      <div className="my-8 text-center">
                        <Image
                          src={src}
                          alt={alt || "Blog image"}
                          width={800}
                          height={450}
                          className="rounded-lg shadow-lg mx-auto max-w-full h-auto"
                          unoptimized
                        />
                        {alt && (
                          <p className="text-center text-sm text-muted-foreground mt-2 italic">
                            {alt}
                          </p>
                        )}
                      </div>
                    );
                  },

                  // Enhanced Unordered Lists
                  ul: ({ children, ...props }) => (
                    <ul className="my-6 space-y-2 list-none pl-0" {...props}>
                      {children}
                    </ul>
                  ),

                  // Enhanced Ordered Lists
                  ol: ({ children, ...props }) => (
                    <ol
                      className="my-6 space-y-2 list-none pl-0 counter-reset-[list-counter]"
                      {...props}
                    >
                      {children}
                    </ol>
                  ),

                  // Enhanced List Items for Unordered Lists
                  li: ({ children, node, ...props }) => {
                    // Check if this li is inside a ul or ol
                    const isOrderedList = node?.parent?.tagName === "ol";

                    if (isOrderedList) {
                      return (
                        <li
                          className="relative pl-8 mb-3 text-justify leading-relaxed counter-[list-counter] before:content-[counter(list-counter)'.'] before:absolute before:left-0 before:top-0 before:font-semibold before:text-primary before:mr-2"
                          {...props}
                        >
                          {children}
                        </li>
                      );
                    } else {
                      return (
                        <li
                          className="relative pl-8 mb-3 text-justify leading-relaxed before:content-['•'] before:absolute before:left-2 before:top-0 before:text-primary before:font-bold before:text-lg before:leading-relaxed"
                          {...props}
                        >
                          {children}
                        </li>
                      );
                    }
                  },

                  // Code blocks
                  pre: ({ children, ...props }) => {
                    const codeElement = React.Children.toArray(children).find(
                      (child) =>
                        React.isValidElement(child) && child.type === "code"
                    ) as React.ReactElement | undefined;

                    if (codeElement) {
                      const lang =
                        codeElement.props.className?.replace("language-", "") ||
                        "plaintext";
                      const codeString = String(
                        codeElement.props.children || ""
                      );
                      return <MarkdownCode code={codeString} lang={lang} />;
                    }

                    return (
                      <pre
                        className="dark:bg-zinc-950 dark:text-zinc-100 p-4 rounded-lg overflow-x-auto my-6 border"
                        {...props}
                      >
                        {children}
                      </pre>
                    );
                  },

                  // Inline code
                  code: ({ children, className, ...props }) => {
                    if (className?.startsWith("language-")) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code
                        className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono border text-primary"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },

                  // Headings with IDs for Table of Contents
                  h1: ({ children, ...props }) => (
                    <h1
                      id={slugify(children?.toString() || "", {
                        lower: true,
                        strict: true,
                      })}
                      className="text-3xl md:text-4xl font-bold mt-12 mb-6 pb-3 border-b scroll-mt-28"
                      {...props}
                    >
                      {children}
                    </h1>
                  ),
                  h2: ({ children, ...props }) => (
                    <h2
                      id={slugify(children?.toString() || "", {
                        lower: true,
                        strict: true,
                      })}
                      className="text-2xl md:text-3xl font-semibold mt-10 mb-5 scroll-mt-28"
                      {...props}
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children, ...props }) => (
                    <h3
                      id={slugify(children?.toString() || "", {
                        lower: true,
                        strict: true,
                      })}
                      className="text-xl md:text-2xl font-semibold mt-8 mb-4 scroll-mt-28"
                      {...props}
                    >
                      {children}
                    </h3>
                  ),
                  h4: ({ children, ...props }) => (
                    <h4
                      id={slugify(children?.toString() || "", {
                        lower: true,
                        strict: true,
                      })}
                      className="text-lg md:text-xl font-medium mt-6 mb-3 scroll-mt-28"
                      {...props}
                    >
                      {children}
                    </h4>
                  ),
                  h5: ({ children, ...props }) => (
                    <h5
                      id={slugify(children?.toString() || "", {
                        lower: true,
                        strict: true,
                      })}
                      className="text-base md:text-lg font-medium mt-5 mb-2 scroll-mt-28"
                      {...props}
                    >
                      {children}
                    </h5>
                  ),
                  h6: ({ children, ...props }) => (
                    <h6
                      id={slugify(children?.toString() || "", {
                        lower: true,
                        strict: true,
                      })}
                      className="text-sm md:text-base font-medium mt-4 mb-2 scroll-mt-28"
                      {...props}
                    >
                      {children}
                    </h6>
                  ),

                  // Enhanced blockquotes
                  blockquote: ({ children, ...props }) => (
                    <blockquote
                      className="border-l-4 border-primary pl-6 py-4 my-6 bg-muted/30 rounded-r-lg italic text-justify"
                      {...props}
                    >
                      {children}
                    </blockquote>
                  ),

                  // Enhanced tables
                  table: ({ children, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table
                        className="min-w-full border-collapse border border-border rounded-lg"
                        {...props}
                      >
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children, ...props }) => (
                    <th
                      className="border border-border bg-muted px-4 py-2 text-left font-semibold"
                      {...props}
                    >
                      {children}
                    </th>
                  ),
                  td: ({ children, ...props }) => (
                    <td
                      className="border border-border px-4 py-2 text-justify"
                      {...props}
                    >
                      {children}
                    </td>
                  ),

                  // Enhanced strong/bold text
                  strong: ({ children, ...props }) => (
                    <strong
                      className="font-semibold text-foreground"
                      {...props}
                    >
                      {children}
                    </strong>
                  ),

                  // Enhanced emphasis/italic text
                  em: ({ children, ...props }) => (
                    <em className="italic text-muted-foreground" {...props}>
                      {children}
                    </em>
                  ),
                }}
              >
                {cleanMarkdown}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* Author Card */}
          <motion.div variants={itemVariants} className="mt-16 pt-8 border-t">
            <div className="flex items-start gap-4 p-6 bg-muted/30 rounded-lg">
              <Image
                src={post.author.profilePicture}
                alt={post.author.name}
                width={60}
                height={60}
                className="rounded-full"
                unoptimized
              />
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {post.author.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                  {post.author.bio.text}
                </p>
              </div>
            </div>
          </motion.div>
        </article>
      </div>
    </motion.div>
  );
};
