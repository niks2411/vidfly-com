import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Pricing Plans - Vidflyy",
    description: "Flexible pricing plans designed to fit every YouTube creator's needs and budget. Start growing your channel today.",
    canonical: "https://www.vidflyy.com/pricing",
});

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
