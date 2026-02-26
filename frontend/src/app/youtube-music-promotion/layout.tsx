import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "YouTube Music Video Promotion - Vidflyy",
    description: "Get your music heard. Promote your music videos to the right audience and increase your views and fan base.",
});

export default function MusicPromotionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
