import { notFound } from "next/navigation";
import { ARTICLES } from "@/lib/blogData";
import BlogPostClient from "./BlogPostClient";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

interface RouteParams {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return ARTICLES.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
    const { slug } = await params;
    const article = ARTICLES.find((a) => a.slug === slug);
    if (!article) return {};

    return constructMetadata({
        title: `${article.title} - Vidflyy`,
        description: article.description,
        canonical: `https://www.vidflyy.com/blog/${article.slug}`,
    });
}

export default async function BlogPostPage({ params }: RouteParams) {
    const { slug } = await params;
    const article = ARTICLES.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    return <BlogPostClient article={article} />;
}
