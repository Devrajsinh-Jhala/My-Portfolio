// app/research/[slug]/page.tsx

import {
  getResearchPapers,
  getSingleResearchPaper,
} from "@/lib/sanity-service";
import { ResearchBody } from "@/components/ResearchBody"; // Import the new component

type Props = { params: { slug: string } };

// Generate static pages at build time for better SEO and performance
export async function generateStaticParams() {
  const papers = await getResearchPapers();
  // Ensure papers exist and have slugs before mapping
  if (!papers || papers.length === 0) {
    return [];
  }
  return papers.map((p: any) => ({ slug: p.slug }));
}

export default async function SingleResearchPage({ params: { slug } }: Props) {
  const paper = await getSingleResearchPaper(slug);

  if (!paper) {
    return <div>Research paper not found.</div>;
  }

  return <ResearchBody paper={paper} />;
}
