"use client";

import Script from "next/script";
import { useId } from "react";

export const OrganizationSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Vidflyy",
        "url": "https://vidflyy.in",
        "logo": "https://vidflyy.in/logo.png",
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

export const FAQSchema = ({ items }: { items: { question: string; answer: string }[] }) => {
    const reactId = useId();
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
            },
        })),
    };

    return (
        <Script
            id={`faq-schema${reactId.replace(/:/g, "-")}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
