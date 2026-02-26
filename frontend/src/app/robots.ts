import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/campaign/'],
            },
        ],
        sitemap: 'https://www.vidflyy.in/sitemap.xml',
    };
}
