"use client";

import { Helmet } from 'react-helmet-async';
import { usePathname } from 'next/navigation';

const CanonicalTag = () => {
    const pathname = usePathname();
    const canonicalUrl = `https://www.vidflyy.in${pathname === '/' ? '' : pathname}`;

    return (
        <Helmet>
            <link rel="canonical" href={canonicalUrl} />
        </Helmet>
    );
};

export default CanonicalTag;
