import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import DocsClient from "./docs-client";

export const metadata: Metadata = createPageMetadata({
  title: "Documentation",
  description:
    "Read the PropertyPro documentation for installation, environment setup, MongoDB, Cloudflare R2 storage, Stripe, email, deployment, customization, and update workflows.",
  path: "/docs",
  keywords: [
    "PropertyPro documentation",
    "property management software setup",
    "Next.js MongoDB installation guide",
    "Cloudflare R2 configuration guide",
  ],
});

export default function DocsPage() {
  return (
    <>
      <JsonLd data={createBreadcrumbSchema("Documentation", "/docs")} />
      <DocsClient />
    </>
  );
}
