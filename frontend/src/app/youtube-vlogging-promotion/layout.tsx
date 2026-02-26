import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "YouTube Vlogging Channel Promotion - Vidflyy",
    description: "Share your life. Grow your vlogging channel reach and engage with real viewers who love your content.",
    canonical: "https://www.vidflyy.in/youtube-vlogging-promotion",
});

export default function VloggingPromotionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
