import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Get Started - Vidflyy",
    description: "Launch your YouTube growth campaign today. Enter your video URL and start reaching real viewers.",
    canonical: "https://www.vidflyy.in/get-started",
});

export default function GetStartedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
