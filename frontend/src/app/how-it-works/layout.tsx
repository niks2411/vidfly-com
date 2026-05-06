import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "How Vidflyy Works - YouTube Promotion Process",
    description: "Learn how easy it is to grow your YouTube channel with Vidflyy. Three simple steps to reach real viewers and subscribers.",
    canonical: "https://www.vidflyy.com/how-it-works",
});

export default function HowItWorksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
