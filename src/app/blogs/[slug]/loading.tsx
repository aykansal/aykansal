export default function BlogPostLoading() {
    return (
        <main className="mx-auto max-w-5xl px-6 py-24 min-h-[calc(100vh-56px)] relative">
            <div className="flex items-center gap-2 text-text-muted mb-12 font-jetbrains text-sm w-fit">
                <span className="h-3 w-3 rounded-full border border-text-muted/40 border-t-text-muted animate-spin" />
                Loading article...
            </div>

            <div className="space-y-6">
                <div className="h-10 w-3/4 rounded bg-bg-secondary animate-pulse" />
                <div className="h-4 w-40 rounded bg-bg-secondary animate-pulse" />
                <div className="space-y-3 pt-4">
                    <div className="h-4 w-full rounded bg-bg-secondary animate-pulse" />
                    <div className="h-4 w-[96%] rounded bg-bg-secondary animate-pulse" />
                    <div className="h-4 w-[92%] rounded bg-bg-secondary animate-pulse" />
                    <div className="h-4 w-[88%] rounded bg-bg-secondary animate-pulse" />
                </div>
            </div>
        </main>
    );
}
