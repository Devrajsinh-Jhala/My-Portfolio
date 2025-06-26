// app/projects/[slug]/page.tsx

import { getProjects, getSingleProject } from "@/lib/sanity-service";
import { ProjectBody } from "@/components/ProjectBody"; // A new client component for the project detail page

type Props = { params: { slug: string } };

// Generate static pages at build time for better SEO and performance
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p: any) => ({ slug: p.slug }));
}

export default async function SingleProjectPage({ params: { slug } }: Props) {
  const project = await getSingleProject(slug);
//   console.log("Fetched project:", project);

  if (!project) {
    // In a real app, you might want to redirect to a 404 page
    return <div>Project not found.</div>;
  }

  // We fetch the data on the server and pass it to a client component for animations
  return <ProjectBody project={project} />;
}
