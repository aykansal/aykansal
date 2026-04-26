import { timelineEvents } from "@/content/timeline";
import { TimelineView } from "@/components/timeline/timeline-view";

export default function TimelinePage() {
    return (
        <main className="mx-auto min-h-[calc(100vh-56px)] w-full max-w-6xl px-6 py-16 min-[900px]:h-[calc(100vh-56px)] min-[900px]:overflow-hidden min-[900px]:py-10">
            <header className="max-w-2xl">
                <h1 className="font-micro text-[40px] leading-none text-text-primary">TIMELINE</h1>
                <p className="mt-4 font-space text-[15px] leading-relaxed text-text-secondary">
                    The story of the builder, one event at a time. Latest first, grouped yearwise.
                </p>
            </header>
            <TimelineView events={timelineEvents} />
        </main>
    );
}