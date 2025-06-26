// components/BlogList.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useInView } from "react-intersection-observer";
import { fetchMorePosts } from "@/app/actions";
import { Loader2, Clock } from "lucide-react";

// --- Type Definitions (Updated) ---
type PostNode = {
  title: string;
  slug: string;
  publishedAt: string;
  coverImage: { url: string };
  author: { name: string; profilePicture: string };
  tags: { name: string; slug: string }[];
  brief: string; // <-- Added
  readTimeInMinutes: number; // <-- Added
};
type PostEdge = { node: PostNode };
type PageInfo = { hasNextPage: boolean; endCursor: string };
type Props = { initialPosts: PostEdge[]; initialPageInfo: PageInfo };

// --- Main Component ---
export const BlogList = ({ initialPosts, initialPageInfo }: Props) => {
  const [posts, setPosts] = useState<PostEdge[]>(initialPosts);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const { ref, inView } = useInView({ threshold: 0.5 });
  const filtersActive = searchQuery !== "" || selectedTag !== "All";

  // Logic for tags and filtering (no changes needed)
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialPosts.forEach((post) =>
      post.node.tags.forEach((tag) => tags.add(tag.name))
    );
    return ["All", ...Array.from(tags)];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    if (!filtersActive) return posts;
    return posts.filter(({ node }) => {
      const searchMatch =
        node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.brief.toLowerCase().includes(searchQuery.toLowerCase());
      const tagMatch =
        selectedTag === "All" ||
        node.tags.some((tag) => tag.name === selectedTag);
      return searchMatch && tagMatch;
    });
  }, [posts, searchQuery, selectedTag, filtersActive]);

  // Infinite scroll logic (no changes needed)
  useEffect(() => {
    async function loadMore() {
      if (inView && pageInfo.hasNextPage && !isLoading && !filtersActive) {
        setIsLoading(true);
        const { posts: newPosts, pageInfo: newPageInfo } = await fetchMorePosts(
          pageInfo.endCursor
        );
        setPosts((prev) => [...prev, ...newPosts]);
        setPageInfo(newPageInfo);
        setIsLoading(false);
      }
    }
    loadMore();
  }, [inView, pageInfo, isLoading, filtersActive]);

  return (
    <div>
      {/* Search and Filter UI (no changes needed) */}
      <div className="flex flex-col gap-6 mb-12">
        <div className="w-full">
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        {/* <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-4 -mb-4 scrollbar-hide">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "secondary"}
                onClick={() => setSelectedTag(tag)}
                className="cursor-pointer text-sm whitespace-nowrap px-4 py-1.5 transition-transform hover:scale-105"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div> */}
      </div>

      {/* --- MODIFIED & REDESIGNED Post Grid --- */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map(({ node }) => (
          <Link
            href={`/blog/${node.slug}`}
            key={node.slug}
            className="block group"
          >
            <article className="flex flex-col h-full rounded-lg overflow-hidden border bg-card hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
              <div className="relative w-full h-48">
                <Image
                  src={node.coverImage.url}
                  alt={node.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* This is the key to the consistent layout */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                  {node.title}
                </h3>

                {/* Brief - This will grow to push the footer down */}
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3 flex-grow">
                  {node.brief}
                </p>

                {/* Footer Section */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {node.tags.slice(0, 3).map(
                      (
                        tag // Show up to 3 tags
                      ) => (
                        <Badge
                          key={tag.slug}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag.name}
                        </Badge>
                      )
                    )}
                  </div>

                  {/* Author and Metadata Line */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Image
                        src={node.author.profilePicture}
                        alt={node.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span>{node.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{node.readTimeInMinutes} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Loader Logic - Unchanged but now works correctly with filters */}
      <div ref={ref} className="flex justify-center items-center p-8 h-16">
        {isLoading && (
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        )}
        {!isLoading && filtersActive && (
          <p className="text-muted-foreground text-sm">
            Clear filters to load more posts.
          </p>
        )}
        {!isLoading &&
          !filtersActive &&
          !pageInfo.hasNextPage &&
          filteredPosts.length > 0 && (
            <p className="text-muted-foreground text-sm">
              You've reached the end!
            </p>
          )}
      </div>
      {filteredPosts.length === 0 && !isLoading && (
        <p className="text-center text-muted-foreground mt-8 text-lg">
          No posts found.
        </p>
      )}
    </div>
  );
};
