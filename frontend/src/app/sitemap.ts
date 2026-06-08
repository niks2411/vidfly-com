import { MetadataRoute } from 'next';
import { ARTICLES } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.vidflyy.com';

    const blogRoutes = ARTICLES.map((article) => `/blog/${article.slug}`);

    const routes = [
        '',
        '/pricing',
        '/features',
        '/contact',
        '/blog',
        ...blogRoutes,
        '/success-stories',
        '/how-it-works',
        '/faq',
        '/about',
        '/disclaimer',
        '/privacy-policy',
        '/refund-policy',
        '/terms-and-conditions',
        '/get-started',
        '/youtube-gaming-promotion',
        '/youtube-music-promotion',
        '/youtube-health-beauty-promotion',
        '/youtube-motivation-promotion',
        '/youtube-travel-promotion',
        '/youtube-vlogging-promotion',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}

