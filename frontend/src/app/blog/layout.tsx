import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "YouTube Growth Blog - Vidflyy",
    description: "Expert tips, guides, and trends to help you grow your YouTube presence and master the algorithm.",
});

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
