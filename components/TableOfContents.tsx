// components/TableOfContents.tsx - Complete working version
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";

type Heading = { id: string; text: string; level: number };

interface TableOfContentsProps {
  headings: Heading[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  headings,
}) => {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-10% 0px -80% 0px",
        threshold: 0.1,
      }
    );

    // Wait for the DOM to be ready
    const observeHeadings = () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    };

    // Delay observation to ensure elements are rendered
    const timeoutId = setTimeout(observeHeadings, 1000);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Account for fixed header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const getIndentLevel = (level: number) => {
    // Normalize indentation starting from level 1
    const minLevel = Math.min(...headings.map((h) => h.level));
    const normalizedLevel = level - minLevel;
    return normalizedLevel * 16; // 16px per level
  };

  const getTextStyle = (level: number) => {
    const styles = {
      1: "text-sm font-semibold",
      2: "text-sm font-medium",
      3: "text-xs font-medium",
      4: "text-xs",
      5: "text-xs opacity-90",
      6: "text-xs opacity-80",
    };
    return styles[level as keyof typeof styles] || "text-xs";
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card/50 backdrop-blur-sm border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Table of Contents</h3>
        </div>
        <ChevronRight
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </div>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-1 max-h-96 overflow-y-auto">
              {headings.map((heading, index) => (
                <motion.button
                  key={heading.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => scrollToHeading(heading.id)}
                  className={`
                    block w-full text-left transition-all duration-200 py-2 px-3 rounded-md group
                    ${getTextStyle(heading.level)}
                    ${
                      activeId === heading.id
                        ? "text-primary bg-primary/10 border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }
                  `}
                  style={{
                    paddingLeft: `${12 + getIndentLevel(heading.level)}px`,
                    marginLeft: `${getIndentLevel(heading.level)}px`,
                  }}
                >
                  <span className="block truncate group-hover:text-clip">
                    {heading.text}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
