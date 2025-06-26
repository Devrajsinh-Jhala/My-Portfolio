// app/research/page.tsx
import { getResearchPapers } from '@/lib/sanity-service';
import { ContentCard } from '@/components/ContentCard';

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function ResearchPage() {
  const papers = await getResearchPapers();
//   console.log('Fetched research papers:', papers);

  return (
    <section className="w-full max-w-6xl mx-auto py-16 md:py-24 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Research & Publications
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl max-w-2xl mx-auto">
          Exploring concepts in Artificial Intelligence, data systems, and software engineering methodologies.
        </p>
      </div>
      
      {papers && papers.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {papers.map((paper: any) => (
            // console.log('Rendering paper:', paper),
            <ContentCard
              key={paper._id}
              slug={paper.slug}
              coverImage={paper.coverImage}
              title={paper.title}
              brief={paper.brief}
              tags={paper.tags}
              basePath="research" // Important: tell the card where to link
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No research papers found. Check back soon!</p>
      )}
    </section>
  );
}