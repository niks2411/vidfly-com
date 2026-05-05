import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Vidflyy - YouTube Travel Promotion (Get Real Travel Audience)",
    description: "Promote your travel videos to real viewers worldwide. Boost views, engagement & subscribers with safe and fast YouTube campaigns.",
    canonical: "https://www.vidflyy.in/youtube-travel-promotion",
});

export default function TravelPromotionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
