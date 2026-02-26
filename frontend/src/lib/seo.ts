import { Metadata } from "next";

export function constructMetadata({
    title = "Vidflyy - YouTube Growth Campaigns",
    description = "Launch YouTube Growth Campaigns in Seconds. Get real views, subscribers & engagement on demand.",
    image = "/og-image.png",
    icons = "/favicon.ico",
    noIndex = false,
    canonical = "https://www.vidflyy.in",
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
    canonical?: string;
} = {}): Metadata {
    return {
        title,
        description,
        alternates: {
            canonical,
        },
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@vidflyy",
        },
        icons,
        metadataBase: new URL('https://www.vidflyy.in'),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
