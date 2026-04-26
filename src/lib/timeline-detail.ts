import { fetchHashnodePostById, type HashnodePost } from "@/lib/hashnode";
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
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.warn(`[timeline] Failed to fetch Hashnode post for ${event.id} (attempt ${i + 1}/${attempts})`, error);
            }
            // fallback flow handles failures after retries
        }
    }
    return null;
}

async function fetchTimelineHashnodePost(event: TimelineEvent): Promise<HashnodePost | null> {
    const hashnodePostId = event.hashnodePostId.trim();
    if (!hashnodePostId) {
        return null;
    }
    const byId = await fetchHashnodePostById(hashnodePostId);
    return byId;
}
