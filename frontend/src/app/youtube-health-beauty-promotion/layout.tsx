import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Vidflyy - YouTube Beauty Promotion (Get Real Views & Subscribers)",
    description: "Promote skincare, makeup & wellness videos to the right audience. Get real engagement, views & subscribers—no bots, just results.",
    canonical: "https://www.vidflyy.com/youtube-health-beauty-promotion",
});

export default function HealthBeautyPromotionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
