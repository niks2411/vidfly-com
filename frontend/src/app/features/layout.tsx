import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Powerful Features - Vidflyy",
    description: "Explore Vidflyy's advanced YouTube promotion features: In-feed ads, In-stream ads, precision targeting, and real-time analytics.",
});

export default function FeaturesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
