import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "YouTube Travel Channel Promotion - Vidflyy",
    description: "Share your adventures. Promote your travel vlogs and reach travel enthusiasts worldwide.",
    canonical: "https://www.vidflyy.in/youtube-travel-promotion",
});

export default function TravelPromotionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
