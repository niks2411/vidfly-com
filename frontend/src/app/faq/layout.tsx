import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "FAQ - Vidflyy Viewers Support",
    description: "Find answers to frequently asked questions about Vidflyy's YouTube promotion services, safety, results, and more.",
    canonical: "https://www.vidflyy.com/faq",
});

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
