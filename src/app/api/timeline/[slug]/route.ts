import { NextResponse } from "next/server";
import { getTimelineEventBySlug } from "@/content/timeline";
import { getTimelineDetailContent } from "@/lib/timeline-detail";

type RouteContext = {
    params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
    const { slug } = await params;
    const event = getTimelineEventBySlug(slug);
    if (!event) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const detail = await getTimelineDetailContent(event);
    return NextResponse.json(detail);
}
