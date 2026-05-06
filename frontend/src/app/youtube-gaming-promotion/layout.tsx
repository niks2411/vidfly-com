import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Vidflyy - YouTube Gaming Promotion (Real Views from Gamers)",
    description: "Grow your gaming channel with real gamer views & subscribers. Promote gameplay, streams & highlights using powerful YouTube ads.",
    canonical: "https://www.vidflyy.com/youtube-gaming-promotion",
});

export default function GamingPromotionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
