import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Vidflyy - YouTube Music Promotion (Get Real Views & Fans Fast)",
    description: "Promote your music on YouTube and reach real listeners instantly. Boost views, engagement & subscribers with safe, targeted campaigns.",
    canonical: "https://www.vidflyy.com/youtube-music-promotion",
});

export default function MusicPromotionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
