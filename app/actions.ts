// app/actions.ts
"use server";

import { getPaginatedBlogPosts } from "@/lib/hashnode";

export async function fetchMorePosts(cursor: string) {
    try {
        const { posts, pageInfo } = await getPaginatedBlogPosts(cursor);
        return { posts, pageInfo };
    } catch (error) {
        // console.error("Failed to fetch more posts:", error);
        return { posts: [], pageInfo: { hasNextPage: false, endCursor: "" } };
    }
}