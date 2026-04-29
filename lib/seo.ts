import type { Metadata } from "next";

const fallbackSiteUrl = "https://propertypro.neurolightstudio.com";

function normalizeSiteUrl(url?: string) {
  const normalized = (url ?? fallbackSiteUrl).trim().replace(/\/+$/, "");

  try {
    return new URL(normalized).toString().replace(/\/+$/, "");
  } catch {
    return fallbackSiteUrl;
  }
}

export const siteConfig = {
  name: "PropertyPro",
  creator: "NeuroLight Studio",
  url: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL,
  ),
  description:
    "PropertyPro is a Next.js property management software for landlords, property managers, and real estate agencies to manage tenants, rent, leases, maintenance, payments, reports, and documents from one dashboard.",
  marketplaceUrl:
    "https://codecanyon.net/item/propertypro-property-tenant-management-software-nextjs-mongodb/60300696",
  demoUrl: "https://propertypro-live.neurolightstudio.com/dashboard",
  supportUrl: "https://support.neurolightstudio.com/",
  screenshotUrl:
    "https://pub-87b115b8ffd84f39963e0f5bfaa9a50e.r2.dev/Screenshot/dashboard-2.0.png",
  ogImage: "/opengraph-image",
  keywords: [
    "property management software",
    "tenant management software",
    "rent collection software",
    "lease management",
    "maintenance request software",
    "real estate CRM",
    "landlord software",
    "Next.js property management",
  ],
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

function formatTitle(title: string) {
  return title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  imageAlt?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  imageAlt,
}: PageMetadataOptions): Metadata {
  const fullTitle = formatTitle(title);
  const socialImageAlt = imageAlt ?? `${fullTitle} dashboard preview`;

  return {
    title,
    description,
    keywords: Array.from(new Set([...siteConfig.keywords, ...keywords])),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          alt: socialImageAlt,
        },
      ],
    },
  };
}

export function createHomePageSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      alternateName: ["PropertyPro App", "PropertyPro Software"],
      url: absoluteUrl("/"),
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.creator,
      url: "https://neurolightstudio.com",
      sameAs: [siteConfig.marketplaceUrl, siteConfig.supportUrl],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "PropertyPro property management software",
      url: absoluteUrl("/"),
      description: siteConfig.description,
      image: siteConfig.screenshotUrl,
      about: {
        "@type": "WebApplication",
        name: siteConfig.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web browser",
        browserRequirements: "Requires a modern web browser",
        url: absoluteUrl("/"),
        screenshot: siteConfig.screenshotUrl,
        featureList: [
          "Property and unit management",
          "Tenant onboarding",
          "Lease lifecycle tracking",
          "Rent collection and invoices",
          "Maintenance requests",
          "Reports and analytics",
          "Document management",
          "Installable PWA",
        ],
      },
    },
  ];
}

export function createBreadcrumbSchema(pageName: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: absoluteUrl(path),
      },
    ],
  };
}
