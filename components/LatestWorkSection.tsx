// components/LatestWorkSection.tsx
import { getLatestWork } from "@/lib/sanity-service";
import { getPaginatedBlogPosts } from "@/lib/hashnode";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight, Clock, Eye } from "lucide-react";
import { Badge } from "./ui/badge";

// --- THE FINAL, ROBUST WORK CARD ---
const WorkCard = ({ item, basePath }: { item: any; basePath: string }) => {
  return (
    <Link href={`/${basePath}/${item.slug}`} className="block group">
      <article className="flex flex-col h-full rounded-xl overflow-hidden border bg-card hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
        {/* Padded Image Area */}
        <div className="relative aspect-video bg-muted/30 p-4">
          <div className="relative w-full h-full rounded-md overflow-hidden">
            {item.coverImage ? (
              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <p className="text-xs text-muted-foreground">No Image</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 pt-4 flex flex-col flex-grow">
          {/* Tags (if they exist) */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.slice(0, 2).map(
                (
                  tag: string // Show up to 2 tags
                ) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs font-medium"
                  >
                    {tag}
                  </Badge>
                )
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
            {item.title}
          </h3>

          {/* Brief (if it exists) - This will grow to push footer down */}
          <p
            className={`mt-3 text-sm text-muted-foreground line-clamp-2 ${item.brief ? "flex-grow" : ""}`}
          >
            {item.brief}
          </p>

          {/* Metadata Footer (always at the bottom) */}
          <div className="mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground flex items-center justify-between">
            {item.publishedAt ? (
              <span>
                {new Date(item.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            ) : (
              <div />
            )}{" "}
            {/* Empty div to maintain space-between alignment */}
            <div className="flex items-center gap-4">
              {item.readTimeInMinutes && (
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>{item.readTimeInMinutes} min read</span>
                </div>
              )}
              {item.views !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Eye size={12} />
                  <span>{item.views} views</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

// --- The Main Section Component ---
export const LatestWorkSection = async () => {
  // Fetch data from both sources
  const sanityWork = await getLatestWork();
  const { posts: blogPosts } = await getPaginatedBlogPosts();

  // Prepare the data with consistent structures
  const latestProjects = sanityWork.projects || [];
  const latestResearch = sanityWork.research || [];

  // Standardize the Hashnode blog post data
  const latestBlog = blogPosts
    ? blogPosts
        .map((p: any) => ({
          title: p.node.title,
          slug: p.node.slug,
          coverImage: p.node.coverImage?.url,
          brief: p.node.brief,
          publishedAt: p.node.publishedAt,
          readTimeInMinutes: p.node.readTimeInMinutes,
          views: p.node.views,
          tags: p.node.tags.map((t: any) => t.name), // Extract tag names
        }))
        .slice(0, 4)
    : [];

  return (
    <section className="w-full max-w-7xl mx-auto py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Latest Work & Writings
        </h2>
        <p className="mt-4 text-muted-foreground md:text-xl max-w-2xl mx-auto">
          A glimpse of what I've been building, researching, and thinking about
          recently.
        </p>
      </div>

      <div className="space-y-16">
        {/* Latest Projects */}
        {latestProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestProjects.map((item: any) => (
                <WorkCard key={item._id} item={item} basePath="projects" />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/projects">
                <Button variant="ghost">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Latest Blog Posts */}
        {latestBlog.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Recent Blogs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestBlog.map((item: any) => (
                <WorkCard key={item.slug} item={item} basePath="blog" />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/blog">
                <Button variant="ghost">
                  View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Latest Research */}
        {latestResearch.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Research</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestResearch.map((item: any) => (
                <WorkCard key={item._id} item={item} basePath="research" />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/research">
                <Button variant="ghost">
                  View All Research <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
