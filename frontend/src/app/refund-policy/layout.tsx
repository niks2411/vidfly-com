import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Refund Policy - Vidflyy",
    description: "Read our policies regarding refunds and cancellations for Vidflyy's promotion services.",
    canonical: "https://www.vidflyy.in/refund-policy",
});

export default function RefundPolicyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
