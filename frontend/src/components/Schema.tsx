"use client";

import Script from "next/script";

export const OrganizationSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Vidflyy",
        "url": "https://vidflyy.com",
        "logo": "https://vidflyy.com/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-7355518761",
            "contactType": "customer service"
        }
    };

    return (
        <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export const ServiceSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "YouTube Video Promotion",
        "provider": {
            "@type": "Organization",
            "name": "Vidflyy"
        },
        "areaServed": "Worldwide",
        "description": "Professional YouTube growth campaigns to increase views, subscribers, and engagement using targeted Google Ads."
    };

    return (
        <Script
            id="service-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
