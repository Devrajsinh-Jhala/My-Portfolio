// components/ProjectBody.tsx
"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { motion } from "framer-motion";

// --- Type Definitions ---
type Project = {
  title: string;
  coverImage?: string;
  body: any; // Sanity's Portable Text
  publishedAt?: string;
  githubLink?: string;
  publishedLink?: string;
  tags?: string[];
};
type Props = { project: Project };

// --- Animation Variants ---
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
export const ProjectBody = ({ project }: Props) => {
//   console.log("Project data:", project);
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Cinematic Hero Section */}
      <motion.div
        variants={itemVariants}
        className="relative w-full h-[60vh] md:h-[70vh]"
      >
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-contain"
            priority // Important for LCP
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl text-foreground">
            {project.title}
          </h1>
        </div>
      </motion.div>

      {/* Main Content Wrapper */}
      <div className="w-full max-w-4xl mx-auto py-12 md:py-16 px-4">
        {/* Project Snapshot / Metadata */}
        <motion.div
          variants={itemVariants}
          className="mb-12 p-6 bg-card border rounded-lg"
        >
          <h2 className="text-xl font-bold mb-4">Project Snapshot</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            {project.publishedAt && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Published</p>
                  <p className="text-muted-foreground">
                    {new Date(project.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            )}
            {project.tags && (
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Category</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.tags.map((tag) => (
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
            {project.publishedLink && (
              <Link
                href={project.publishedLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  View Live <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            {project.githubLink && (
              <Link
                href={project.githubLink}
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
          {project.body ? (
            <PortableTextRenderer content={project.body} />
          ) : (
            <p>No detailed write-up available for this project.</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
