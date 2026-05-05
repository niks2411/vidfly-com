import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Vidflyy - YouTube Vlog Promotion (Grow Your Channel Fast)",
    description: "Promote your vlogs to real viewers who binge-watch content. Boost watch time, engagement & loyal subscribers instantly.",
    canonical: "https://www.vidflyy.in/youtube-vlogging-promotion",
});

export default function VloggingPromotionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
