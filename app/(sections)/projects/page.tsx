// app/projects/page.tsx
import { getProjects } from "@/lib/sanity-service";
import { ContentCard } from "@/components/ContentCard";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="w-full max-w-6xl mx-auto py-16 md:py-24 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          My Projects
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl max-w-2xl mx-auto">
          A collection of my work, from full-stack applications to experimental
          prototypes. Each project is a story of a problem solved.
        </p>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project: any) => (
            // --- THE FIX: Spread the project properties directly ---
            <ContentCard
              key={project._id}
              basePath="projects"
              {...project} // This passes title, slug, coverImage, etc., as individual props
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No projects found. Check back soon!
        </p>
      )}
    </section>
  );
}
