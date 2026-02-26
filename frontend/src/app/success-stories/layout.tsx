import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Success Stories - Vidflyy",
    description: "See how YouTubers like you are scaling their channels, gaining subscribers, and maximizing reach with Vidflyy.",
});

export default function SuccessStoriesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
