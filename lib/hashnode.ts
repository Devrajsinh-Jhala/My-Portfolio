// lib/hashnode.ts

const HASHNODE_API_URL = 'https://gql.hashnode.com/';
const HASHNODE_HOST = process.env.HASHNODE_HOST;

// A reusable function to make GraphQL requests with caching
async function gql(query: string, variables: Record<string, any> = {}) {
    const data = await fetch(HASHNODE_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
        next: { revalidate: 3600 } // Revalidate cache every 60 minutes
    });

    return data.json();
}

// Query to get a list of all posts with their tags
export async function getBlogPosts() {
    const query = `
    query Publication {
      publication(host: "${HASHNODE_HOST}") {
        title
        posts(first: 20) {
          edges {
            node {
              title
              brief
              slug
              publishedAt
              coverImage {
                url
              }
              tags {
                name
                slug
              }
            }
          }
        }
      }
    }
  `;

    const response = await gql(query);
    return response.data.publication.posts.edges;
}

// Query to get a single post by its slug
export async function getSinglePost(slug: string) {
    const query = `
    query Post($slug: String!) {
      publication(host: "${process.env.HASHNODE_HOST}") {
        post(slug: $slug) {
          title
          publishedAt
          brief
          readTimeInMinutes
          author {
            name
            profilePicture
            bio { 
              text
            }
          }
          tags {
            name
            slug
          }
          coverImage {
            url
          }
          content {
            markdown
          }
        }
      }
    }
  `;

    const variables = { slug };
    const response = await gql(query, variables);
    return response.data.publication.post;
}

export async function getPaginatedBlogPosts(cursor: string = "") {
    const query = `
    query Publication($cursor: String) {
      publication(host: "${process.env.HASHNODE_HOST}") {
        posts(first: 6, after: $cursor) { 
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              title
              brief
              slug
              publishedAt
              coverImage {
                url
              }
              author { 
                name
                profilePicture
              }
              tags {
                name
                slug
              }
                brief
                readTimeInMinutes
            }
          }
        }
      }
    }
  `;

    const variables = { cursor };
    const response = await gql(query, variables);

    return {
        posts: response.data.publication.posts.edges,
        pageInfo: response.data.publication.posts.pageInfo,
    };
}