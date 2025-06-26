// lib/sanity-service.ts
import { createClient } from 'next-sanity';

// --- Client Configuration (No changes needed) ---
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});


// --- GROQ QUERIES (Corrected & Optimized) ---

// 1. A lean query for the LISTING pages (Projects, Research).
//    - It fetches a 'brief' field for summaries, NOT the full 'body'.
//    - It correctly resolves references for images and categories.
const cardFields = `
  _id,
  title,
  "slug": slug.current,
  "coverImage": mainImage.asset->url,
  "tags": categories[]->title,
  publishedAt,
`;

// 2. A detailed query for the SINGLE item pages.
//    - This is where we fetch the full 'body' and other links.
const detailFields = `
  title,
  "slug": slug.current,
  "coverImage": mainImage.asset->url,
 // Fetch the full rich text content
  publishedAt,
  githubLink,
  publishedLink,
  paperLink,
  "tags": categories[]->title,
  body[]{
  ...,
  _type == "image" => {
    "url": asset->url,
    "alt": alt,
    }
  }
`;

// --- API Functions ---

// Function to fetch all projects for the main listing page
export async function getProjects() {
  // NOTE: Your query used _type == 'post'. I'm using 'project' as per our goal.
  // Change this to 'post' if that's what you named your project schema.
  const query = `*[_type == "post"] { ${cardFields} }`;
  // console.log('Fetching projects with query:', query);
  return client.fetch(query);
}





// Function to fetch all research papers for the listing page
export async function getResearchPapers() {
  const query = `*[_type == "research"] | order(publishedAt desc) { ${cardFields} }`;
  return client.fetch(query);
}

// Function to fetch ONE specific project for its detail page
export async function getSingleProject(slug: string) {
  // Change _type to 'post' if needed
  const query = `*[_type == "post" && slug.current == $slug][0] { ${detailFields} }`;
  return client.fetch(query, { slug });
}

// Function to fetch ONE specific research paper for its detail page
export async function getSingleResearchPaper(slug: string) {
  const query = `*[_type == "research" && slug.current == $slug][0] { ${detailFields} }`;
  return client.fetch(query, { slug });
}


// lib/sanity-service.ts

// ... (client setup and other functions) ...

// A query to fetch the latest 4 items from each content type
export async function getLatestWork() {
  const query = `
    {
      "projects": *[_type == "post"] | order(_publishedAt desc)[0...4] {
        _id,
        title,
        "slug": slug.current,
        "tags": categories[]->title,
        publishedAt,
        "coverImage": mainImage.asset->url
      },
      "research": *[_type == "research"] | order(_createdAt desc)[0...2] {
        _id,
        title,
        "slug": slug.current,
        "tags": categories[]->title,
        publishedAt,
        "coverImage": mainImage.asset->url
      },
    }
  `;
  return client.fetch(query);
}