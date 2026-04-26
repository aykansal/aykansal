import { fetchHashnodePost, fetchHashnodePostById, type HashnodePost } from "@/lib/hashnode";
import type { TimelineEvent } from "@/content/timeline";

export interface TimelineDetailContent {
    source: "hashnode" | "fallback";
    title: string;
    brief: string;
    html?: string;
}

export async function getTimelineDetailContent(event: TimelineEvent): Promise<TimelineDetailContent> {
    const remote = await fetchWithRetry(event, 2);
    if (remote) {
        return {
            source: "hashnode",
            title: remote.title,
            brief: remote.brief,
            html: remote.content?.html,
        };
    }

    return {
        source: "fallback",
        title: event.title,
        brief: event.fallback?.brief ?? event.summary,
        html: event.fallback?.html,
    };
}

async function fetchWithRetry(event: TimelineEvent, attempts: number): Promise<HashnodePost | null> {
    for (let i = 0; i < attempts; i++) {
        try {
            const post = await fetchTimelineHashnodePost(event);
            if (post) return post;
        } catch (_error) {
            // fallback flow handles failures after retries
        }
    }
    return null;
}

async function fetchTimelineHashnodePost(event: TimelineEvent): Promise<HashnodePost | null> {
    if (event.hashnodePostId) {
        const byId = await fetchHashnodePostById(event.hashnodePostId);
        if (byId) return byId;
    }
    if (event.hashnodeSlug) {
        return fetchHashnodePost(event.hashnodeSlug);
    }
    return null;
}
