import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "YouTube Gaming Channel Promotion - Vidflyy",
    description: "Boost your gaming channel. Reach real gaming enthusiasts and grow your subscriber base with Vidflyy's targeted campaigns.",
});

export default function GamingPromotionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
