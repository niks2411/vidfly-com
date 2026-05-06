import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "Disclaimer - Vidflyy",
    description: "Legal disclaimer regarding the use of Vidflyy's services and the results you can expect.",
    canonical: "https://www.vidflyy.com/disclaimer",
});

export default function DisclaimerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
