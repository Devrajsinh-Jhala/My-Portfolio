// components/ResearchBody.tsx
"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FileText, Github, Calendar, Tag } from "lucide-react"; // Changed icon for paper
import { Button } from "@/components/ui/button";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { motion } from "framer-motion";

// --- Type Definitions (tailored for Research) ---
type ResearchPaper = {
  title: string;
  coverImage?: string;
  body: any; // Sanity's Portable Text
  publishedAt?: string;
  repoLink?: string;
  paperLink?: string; // Specific to research
  tags?: string[];
};
type Props = { paper: ResearchPaper };

// --- Animation Variants (reused for consistency) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Main Component ---
export const ResearchBody = ({ paper }: Props) => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Cinematic Hero Section */}
      <motion.div
        variants={itemVariants}
        className="relative w-full h-[60vh] md:h-[70vh]"
      >
        {paper.coverImage && (
          <Image
            src={paper.coverImage}
            alt={paper.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl text-foreground">
            {paper.title}
          </h1>
        </div>
      </motion.div>

      {/* Main Content Wrapper */}
      <div className="w-full max-w-4xl mx-auto py-12 md:py-16 px-4">
        {/* Snapshot / Metadata */}
        <motion.div
          variants={itemVariants}
          className="mb-12 p-6 bg-card border rounded-lg"
        >
          <h2 className="text-xl font-bold mb-4">Paper Snapshot</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            {paper.publishedAt && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Published</p>
                  <p className="text-muted-foreground">
                    {new Date(paper.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            )}
            {paper.tags && (
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Keywords</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {paper.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-6 pt-6 border-t">
            {paper.paperLink && (
              <Link
                href={paper.paperLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  Read Paper <FileText className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            {paper.repoLink && (
              <Link
                href={paper.repoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  View Code <Github className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </motion.div>

        {/* Rich Text Content */}
        <motion.div
          variants={itemVariants}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          {paper.body ? (
            <PortableTextRenderer content={paper.body} />
          ) : (
            <p>
              The abstract and findings for this research are being prepared.
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
