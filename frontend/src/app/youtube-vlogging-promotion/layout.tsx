import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "YouTube Vlogging Channel Promotion - Vidflyy",
    description: "Share your life. Grow your vlogging channel reach and engage with real viewers who love your content.",
});

export default function VloggingPromotionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
