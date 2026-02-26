import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Terms and Conditions - Vidflyy",
    description: "The official terms and conditions governing the use of Vidflyy's website and services.",
    canonical: "https://www.vidflyy.in/terms-and-conditions",
});

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
