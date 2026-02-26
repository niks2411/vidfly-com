import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://vidflyy.com';

    const routes = [
        '',
        '/pricing',
        '/features',
        '/contact',
        '/blog',
        '/success-stories',
        '/how-it-works',
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
