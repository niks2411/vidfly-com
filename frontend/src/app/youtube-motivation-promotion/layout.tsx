import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Vidflyy - YouTube Motivation Promotion (Boost Views & Growth)",
    description: "Grow your motivational channel with real viewers. Get more watch time, subscribers & engagement with targeted YouTube campaigns.",
    canonical: "https://www.vidflyy.com/youtube-motivation-promotion",
});

export default function MotivationPromotionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
