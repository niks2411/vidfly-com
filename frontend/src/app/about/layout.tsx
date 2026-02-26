import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "About Vidflyy - Our Story & Mission",
    description: "Learn about Vidflyy, our certified YouTube Ads experts, and our mission to help content creators achieve massive channel growth.",
    canonical: "https://www.vidflyy.in/about",
});

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
