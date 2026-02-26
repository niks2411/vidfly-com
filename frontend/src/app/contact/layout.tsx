import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Contact Us - Vidflyy",
    description: "Have questions about YouTube growth? Get in touch with the Vidflyy team for support and inquiries.",
    canonical: "https://www.vidflyy.in/contact",
});

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
