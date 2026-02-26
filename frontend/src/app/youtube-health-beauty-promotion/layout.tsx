import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "YouTube Health & Beauty Channel Promotion - Vidflyy",
    description: "Reach beauty and wellness lovers. Promote your tutorials and reviews to a high-engagement audience.",
    canonical: "https://www.vidflyy.in/youtube-health-beauty-promotion",
});

export default function HealthBeautyPromotionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
