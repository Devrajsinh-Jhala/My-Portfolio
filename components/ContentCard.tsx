// components/ContentCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

// This type definition now represents the props of the component itself
export type ContentCardProps = {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: string;
  brief?: string;
  tags?: string[];
  publishedAt?: string;
  basePath: "projects" | "research";
};

// --- THE FIX: We destructure the props directly from the function signature ---
export const ContentCard = ({
  slug,
  coverImage,
  title,
  brief,
  tags,
  publishedAt,
  basePath,
}: ContentCardProps) => {
  // Correctly get the slug string from the slug object
  const finalSlug = slug || "";
//   console.log("Rendering ContentCard for slug:", slug);

  return (
    <Link href={`/${basePath}/${finalSlug}`} className="block group">
      <article className="flex flex-col h-full rounded-xl overflow-hidden border bg-card hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
        <div className="relative w-full h-56 bg-muted">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title || "Cover Image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No Image</p>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
            <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
              {title || "Untitled"}
            </h2>
            <div className="flex flex-wrap gap-2 flex-shrink-0">
              {tags?.slice(0, 1).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {publishedAt && (
            <p className="text-sm text-muted-foreground mt-2">
              {new Date(publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}

          {brief && (
            <p className="mt-4 text-muted-foreground flex-grow line-clamp-3">
              {brief}
            </p>
          )}

          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center text-primary font-semibold">
              Read More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
