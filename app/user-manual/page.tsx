import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import UserManualClient from "./user-manual-client";

export const metadata: Metadata = createPageMetadata({
  title: "User Manual",
  description:
    "Learn how to use PropertyPro for daily property management workflows, including tenants, leases, rent payments, maintenance, reports, settings, PWA access, and productivity shortcuts.",
  path: "/user-manual",
  keywords: [
    "PropertyPro user manual",
    "tenant management guide",
    "lease management workflow",
    "property management user guide",
  ],
});

export default function UserManualPage() {
  return (
    <>
      <JsonLd data={createBreadcrumbSchema("User Manual", "/user-manual")} />
      <UserManualClient />
    </>
  );
}
