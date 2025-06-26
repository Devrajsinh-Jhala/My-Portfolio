// app/blog/page.tsx
import { getPaginatedBlogPosts } from "@/lib/hashnode";
import { BlogList } from "@/components/BlogList";

export default async function BlogPage() {
  const { posts, pageInfo } = await getPaginatedBlogPosts();

  return (
    <section className="w-full max-w-6xl mx-auto py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          My Blog
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Thoughts on technology, development, and everything in between.
        </p>
      </div>
      <BlogList initialPosts={posts} initialPageInfo={pageInfo} />
    </section>
  );
}
