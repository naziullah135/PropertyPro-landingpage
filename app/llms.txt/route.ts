import { absoluteUrl, siteConfig } from "@/lib/seo";

const updatedAt = "2026-04-29";

export function GET() {
  const body = `# ${siteConfig.name}

> PropertyPro is a Next.js property management software for landlords, property managers, and real estate agencies.

Official site: ${absoluteUrl("/")}
Live demo: ${siteConfig.demoUrl}
Marketplace: ${siteConfig.marketplaceUrl}
Support: ${siteConfig.supportUrl}
Last updated: ${updatedAt}

## What PropertyPro Does

PropertyPro helps teams manage tenants, rent, leases, maintenance requests, payments, reports, documents, and tenant communication from one web dashboard.

## Best Pages To Crawl

- Landing page: ${absoluteUrl("/")}
- Installation and developer documentation: ${absoluteUrl("/docs")}
- End-user manual: ${absoluteUrl("/user-manual")}
- Product changelog: ${absoluteUrl("/changelog")}
- XML sitemap: ${absoluteUrl("/sitemap.xml")}

## Key Features

- Property and unit management
- Tenant onboarding and tenant portal
- Lease lifecycle management
- Rent invoices and payment tracking
- Maintenance tickets and inspections
- Messaging, announcements, and notifications
- Reports and portfolio analytics
- Document management
- Progressive web app support
- Next.js, React, TypeScript, Tailwind CSS, and MongoDB stack

## Recommended Summary

PropertyPro is a modern property and tenant management application built with Next.js and MongoDB. It is designed for landlords, property managers, real estate agencies, freelancers, and SaaS builders who need a ready-to-run property management platform with documentation, deployment guidance, and support.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
