import type { Metadata } from "next";
// import { Analytics } from "@vercel/analytics/next";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import { spaceGrotesk, jetbrainsMono, micro5 } from "@/lib/fonts";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { ThemeKeys } from "@/components/layout/theme-keys";
import { ThemePicker } from "@/components/ui/theme-picker";
import { PostHogProvider } from "@/components/layout/posthog-provider";
import { PostHogPageView } from "@/components/layout/posthog-pageview";
import { Suspense } from "react";
import { SITE } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
    title: SITE.title,
    description: SITE.description,
    metadataBase: new URL(SITE.url),
    manifest: "/site.webmanifest",
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-icon.png",
    },
    openGraph: {
        title: SITE.title,
        description: SITE.descriptionShort,
        url: SITE.url,
        siteName: SITE.domain,
        locale: SITE.locale,
        type: "website",
        images: [{ url: "/og-twitter.png", width: 1200, height: 630, alt: `${SITE.name} - Software Developer` }],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE.title,
        description: SITE.descriptionShort,
        images: ["/og-twitter.png"],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: SITE.url },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
    jobTitle: SITE.jobTitle,
    worksFor: { "@type": "Organization", name: SITE.employer },
    address: { "@type": "PostalAddress", addressLocality: SITE.location.city, addressCountry: SITE.location.country },
    sameAs: SITE.sameAs,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${micro5.variable}`} suppressHydrationWarning>
            <body className="flex min-h-screen flex-col" suppressHydrationWarning>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <PostHogProvider>
                <Suspense fallback={null}><PostHogPageView /></Suspense>
                <ThemeProvider>
                    <a
                        href="#main"
                        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-60 focus:rounded focus:bg-accent-primary focus:px-3 focus:py-1.5 focus:font-space focus:text-[14px] focus:text-bg-primary"
                    >
                        skip → main
                    </a>
                    <Navbar />
                    <ThemeKeys />
                    <div id="main" className="flex-1">{children}</div>
                    <ThemePicker />
                </ThemeProvider>
                </PostHogProvider>
                {/* <Analytics />
                <SpeedInsights /> */}
            </body>
        </html>
    );
}
