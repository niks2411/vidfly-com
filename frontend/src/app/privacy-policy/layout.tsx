import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Privacy Policy - Vidflyy",
    description: "Learn how Vidflyy collects, uses, and protects your personal data when you use our services.",
    canonical: "https://www.vidflyy.com/privacy-policy",
});

export default function PrivacyPolicyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
