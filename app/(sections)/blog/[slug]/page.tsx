// app/blog/[slug]/page.tsx - Fixed version
import { getSinglePost, getBlogPosts } from "@/lib/hashnode";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import slugify from "slugify";
import { PostBody } from "@/components/PostBody";
import type { Root, Heading as MdastHeading } from "mdast";

type Props = { params: Promise<{ slug: string }> };
type PostEdge = { node: { slug: string } };
type Heading = { id: string; text: string; level: number };

export async function generateStaticParams() {
  const posts: PostEdge[] = await getBlogPosts();
  return posts.map((post) => ({ slug: post.node.slug }));
}

export default async function SinglePostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getSinglePost(slug);
  if (!post) return <div>Post not found.</div>;

  // Extract headings with proper typing
  const headings: Heading[] = [];

  const processor = unified().use(remarkParse).use(remarkGfm);

  const tree = processor.parse(post.content.markdown) as Root;

  visit(tree, "heading", (node: MdastHeading) => {
    if (node.depth >= 1 && node.depth <= 6) {
      // Extract text from all children nodes
      const text = node.children
        .map((child) => {
          if (child.type === "text") {
            return child.value;
          }
          if (child.type === "inlineCode") {
            return child.value;
          }
          if (child.type === "strong" || child.type === "emphasis") {
            return child.children
              .map((grandChild: any) => grandChild.value || "")
              .join("");
          }
          return "";
        })
        .join("");

      if (text.trim()) {
        const id = slugify(text, { lower: true, strict: true });
        headings.push({ id, text: text.trim(), level: node.depth });
      }
    }
  });

  // console.log("Extracted headings:", headings); // Debug log

  const hasTableOfContents = false;

  return (
    <PostBody
      post={post}
      headings={headings}
      hasTableOfContents={hasTableOfContents}
    />
  );
}
