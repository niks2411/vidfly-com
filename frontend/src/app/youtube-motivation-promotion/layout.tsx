import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "YouTube Motivational Channel Promotion - Vidflyy",
    description: "Inspire more people. Grow your motivational and educational channel with targeted growth campaigns.",
    canonical: "https://www.vidflyy.in/youtube-motivation-promotion",
});

export default function MotivationPromotionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
