import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayCircleFreeIcons,
  ArrowRight01FreeIcons,
} from "@hugeicons/core-free-icons";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Changelog",
  description:
    "Track PropertyPro release notes, new property management features, platform improvements, and maintenance fixes.",
  path: "/changelog",
  keywords: ["PropertyPro updates", "property software changelog"],
});

type Section = "features" | "improvements" | "fixes";

type Release = {
  version: string;
  level: "major" | "minor";
  date: string;
  title: string;
  sections: Partial<Record<Section, string[]>>;
};

const releases: Release[] = [
  {
    version: "3.0.0",
    level: "major",
    date: "August 3, 2026",
    title: "Public Website, Online Applications & Auth Rebuild",
    sections: {
      features: [
        "Public marketing website served from the same install — home page with hero search, a properties browser, property and unit detail pages, and a contact page, replacing the bare root redirect that used to send every visitor to sign-in",
        "Online rental applications — prospective renters apply for a unit end to end through a four-step checkout collecting their details, requested lease terms, income, rental history, and screening consent, with no payment taken and nobody touching the dashboard",
        "Applicants without an account register in the same pass — the checkout creates their tenant account from the submission, and both the confirmation screen and acknowledgement email explain that sign-in opens only once staff approve them",
        "Live booking card on property and unit pages — move-in date, lease term (6/12/18/24 months), and adults, children, and pets counters recalculate an itemized move-in total, prorating the first month when the move-in date isn't the 1st",
        "Approving a checkout application creates a DRAFT lease automatically, carrying the applicant's requested dates and the rent and deposit quoted at submission",
        "Public Site module at Dashboard → Public Site — a master switch plus per-page switches for Home, Properties, Property detail, and Contact, with a switched-off page redirecting rather than 404ing",
        "Five content editors put the public site's copy under admin control — brand and navigation, home hero and feature cards, properties headings, FAQ categories, and contact methods and form copy, plus per-page SEO title, meta description, and social share metadata",
        "Contact inquiries inbox at Dashboard → Inbox → Inquiries — website messages arrive with an INQ- reference number, searchable and filterable by status and topic, with replies sent from the dashboard and kept as a thread on the record",
        "Pluggable maps configured at Settings → Maps — OpenStreetMap (the default, needing no API key, Google Cloud account, or credit card), Google Maps, or no maps at all, stored in the database so switching providers needs no rebuild or redeploy",
        "Address autocomplete on the property form fills street, city, state, ZIP, and country and captures coordinates, with a draggable pin to correct the location without touching the address text",
        "Public property browser with a filter bar — location with suggestions, max rent, home type, and bedrooms, plus Pets OK and Available now chips, sorting, and a grid/list toggle, all held in the URL so a filtered view is shareable",
        "Every filter option is computed from the live portfolio, so no picker can offer a choice that lands a visitor on an empty page, and a picker the portfolio can't fill hides itself",
        "Unit-level public pages with the unit's own photos, specs, rent, deposit, and move-in date, a Lease this unit action, and a strip of sibling units to compare against",
        "Video tours — one per property and optionally one per unit, accepting YouTube, Vimeo, or a direct video link — alongside a full-screen photo lightbox with thumbnails and keyboard navigation",
        "Any lease that hasn't already ended can now be terminated — active, expired, pending, or pending-signature — from one shared dialog on the leases table, card grid, and detail page, with backdated, immediate, or scheduled end dates",
        "Built-in Manager and Tenant roles are now editable; Administrator stays locked so the ability to undo a role change can never be removed",
        "Per-row Edit, Cancel, and Delete actions plus bulk delete on the inspections list, each option hidden when the API would refuse it",
        "Reset to defaults panel restores any single public-site section, or the whole public site, to the copy the app shipped with",
      ],
      improvements: [
        "Authentication rebuilt on Better Auth — run db:migrate-better-auth once when upgrading; existing passwords keep working and the auth secret falls back to your current AUTH_SECRET or NEXTAUTH_SECRET, but everyone is signed out once because pre-3.0 logins have no server-side record to convert",
        "Properties created before this release stay off the maps until you run db:backfill-coordinates to geocode their stored addresses — a dry run by default, and it needs a server-side Google geocoding key even on OpenStreetMap installs",
        "Deleting records now requires its own permission — lease_delete, tenant_delete, payment_delete, document_delete, and user_delete are never implied by the matching edit grant, so the built-in Manager role ships without them until an admin grants them",
        "Sign-in, registration, and password reset are rate limited for the first time — 10 sign-in attempts per 5 minutes, 5 registrations per hour, and 3 forgot-password requests per hour, per IP",
        "Minimum password length raised from 6 to 8 characters, enforced identically across sign-up, reset, invitation setup, admin-created users, and change-password; existing passwords are unaffected",
        "Leases stay editable for their whole life instead of drafts only — property, unit, and tenant freeze once the lease claims a unit, and rent and dates freeze only once invoices have actually been issued",
        "Ended leases can now be deleted, taking their invoices, settled payments, security deposit, and documents with them as soft deletes stamped so an audit can tell them apart",
        "Changing an active lease's rent or dates rebuilds its unbilled scheduled invoices in the same transaction and reports how many were replaced",
        "Notifications and Announcements merged into a single Updates entry with a combined unread badge — the old URLs redirect, so existing links and stored notification targets keep working",
        "Maintenance status actions behave identically from the detail page, the row menu, and the bulk endpoints — one permission check, one transition table, and one unit-status sync",
        "Maintenance list moved to server-side pagination, search, filtering, and sorting instead of loading the whole collection into the browser, with summary cards counting the full dataset",
        "Cards and skeletons across the dashboard, settings, and public pages drop their border in favor of a soft shadow, with shadows switched off entirely in dark mode",
        "Tenant records are easier to enter and import — only Employer is required within the employment section, and the move-in date is no longer capped to a ±5-year window",
        "A terminated tenant can be moved back into the pipeline so staff can re-lease to a past tenant, and the status dropdown no longer offers transitions the server will reject",
        "Signed-out visitors to any dashboard page are returned to their original deep link after signing in, and signed-in visitors opening sign-in or sign-up go straight to the dashboard",
        "Active session screens now report a single 24-hour window (Active today / Idle) to match how Better Auth records session activity",
        "The whole app honours the operating system's reduce-motion setting, clamping animations and transitions to effectively zero",
        "Package management switched from npm to pnpm, and the README now documents the real first-admin bootstrap — POST /api/setup/create-admin behind SETUP_SECRET — with a tracked .env.example and an UPGRADE.md covering migration, verification, and rollback",
        "Localization updates for the Updates and Public Site navigation across Arabic, German, English, Spanish, and French",
      ],
      fixes: [
        "Closed a hole where working demo administrator, manager, and tenant logins shipped in the product — the demo panel renders only under NEXT_PUBLIC_DEMO_MODE with passwords supplied per deployment, and seed:demo refuses to run in production; delete or reset those accounts if you ever ran it",
        "Closed a privilege-escalation hole where a custom role named after a built-in alias (super_admin, landlord, owner, …) silently granted the full built-in permission set while the UI showed only the permissions that were picked",
        "Changing a password now signs out every other device, as does an administrator resetting a user's password or a user completing the forgot-password flow",
        "Deactivated, deleted, locked, and pending-application accounts are now refused on every sign-in method including Google and GitHub, not just email and password",
        "Google and GitHub sign-in no longer provisions a working account on its own — an unknown address lands as a pending tenant application awaiting staff approval",
        "Fixed rate limits and audit-log IP addresses being spoofable through a forged X-Forwarded-For header",
        "Restricted session details so a property manager can no longer read an administrator's IP, device, and email by requesting a known session ID",
        "Blocking, locking, or deactivating a user now ends that account's live sessions immediately instead of only refusing its next sign-in",
        "Fixed emergency escalation failing on every attempt — the level always read back as 0, escalation history was discarded, and any escalation carrying a note failed outright",
        "Fixed clearing a tenant's date of birth, SSN, employment info, emergency contacts, documents, or credit score reporting success while changing nothing",
        "Fixed editing a lease silently wiping the terms the form doesn't display — pet deposit, utilities, restrictions, and payment config are now preserved",
        "Fixed re-creating a tenant whose account was previously deleted failing with a duplicate-email error; existing databases can drop the legacy index with db:migrate-email-index",
        "Fixed legacy leases created before lease numbers existed failing to save with \"Lease number is required\"",
        "Fixed a lease getting permanently stuck reporting \"A lease lifecycle operation is already in progress\"",
        "Restricted lease termination so tenants can no longer end their own tenancy",
        "Fixed the maintenance list's This Week and This Month filters matching everything, and Priority sorting ordering alphabetically instead of by severity",
        "Fixed bulk maintenance assign and status updates failing whenever a note was supplied, and photo attachments on the emergency request form failing to upload",
        "Fixed cancelling an inspection overwriting the scheduling notes with the cancellation reason, and users holding a custom staff role being rejected as inspectors",
      ],
    },
  },
  {
    version: "2.3.0",
    level: "major",
    date: "July 22, 2026",
    title: "Settings Platform, Media Library & Finance Hardening",
    sections: {
      features: [
        "Self-service tenant onboarding — prospective tenants apply online with their personal, employment, and emergency-contact details, arriving in Tenants → Applications as pending applications for staff to review and approve",
        "Applicants are held out of the app until an admin approves them: sign-in stays blocked while an application is pending or after it's been rejected",
        "Storage settings with a Cloudflare R2 or local-disk provider and a built-in credential test",
        "Searchable, paginated media library that indexes every upload across storage backends",
        "Property Setup module — property types, unit types, amenities, and new-unit defaults are now admin-configurable instead of hardcoded",
        "Security deposits and refunds accounting layer with real refunds and deposit returns across Stripe, PayPal, Paystack, and Razorpay",
        "PDF, Excel, and CSV export for accounting reports and the tenants directory",
        "Tenant email invitations — invite a tenant who then sets their own password",
        "Application backup management",
        "Settings change audit — every admin save leaves a secret-masked audit trail",
        "Forgot, reset, and setup password pages with a \"Forgot password?\" link on sign-in",
        "Active session tracking in user management, including sessions created before tracking existed",
      ],
      improvements: [
        "Redesigned multi-section signup form capturing date of birth, employment (employer, position, income, start date), and an emergency contact, with 18+ age validation and all-or-nothing employment fields",
        "Sign-in now shows a specific message for pending and rejected tenant applications instead of a generic error",
        "Applications list merges self-service signups with property applications, always surfacing the newest signups first",
        "Money handling rebuilt on pure, unit-tested algorithms covering revenue, invoices, late fees, refunds, and deposit accounting",
        "Stronger lease lifecycle: transitions, overlap rules, termination, occupancy sync, late fees, and automatic invoicing",
        "One reconciled gateway attempt per invoice across Stripe, PayPal, Razorpay, and Paystack",
        "Database-level pagination and server-computed stats for users, properties, units, and listings",
        "Properties details rebuilt as a slim header with tabs and a dedicated stats endpoint",
        "Dashboard, financial reports, and transactions now count received cash the same way everywhere",
        "Renamed Appearance settings to Branding, with the old route redirected",
        "Removed the legacy duplicate settings stack for a smaller, cleaner codebase",
        "Wider, redesigned create pages and refreshed sidebar, card, and analytics styling",
        "Deposit collection wording clarified for offline (cash, check, ACH, bank transfer) payments",
        "Localization updates across Arabic, German, English, Spanish, and French",
      ],
      fixes: [
        "Fixed units disappearing from leases caused by unit IDs being regenerated on property edit",
        "Fixed zero-decimal currencies (e.g. JPY) being overcharged 100x on Stripe and PayPal",
        "Fixed a crash on tenant payment and receipt views from an ObjectId recursion bug",
        "Closed a privilege-escalation hole that let self-registration create admin accounts",
        "Added a last-admin safeguard so the final admin can't be demoted, deactivated, or deleted",
        "Restricted admin pages and APIs with server-side guards; deleted users now lose access immediately",
        "Custom roles now work end-to-end instead of being wrongly routed to the tenant dashboard",
        "Tenant portal billing now derives dues from unpaid invoices, and receipt PDF download works",
        "Fixed notifications, collapsible button, dynamic logo/business name, and email template data issues",
      ],
    },
  },
  {
    version: "2.2.0",
    level: "major",
    date: "June 30, 2026",
    title: "Payment Gateways & Account Management",
    sections: {
      features: [
        "PayPal, Razorpay, and Paystack integrations for payment collection",
        "Password change, reset, and email verification management from the UI",
        "SMTP setup and test tools in the admin dashboard",
      ],
      improvements: [
        "Lease start date can now be set to a past date",
        "Optimized delete behavior to keep finance data accurate",
      ],
      fixes: [
        "Fixed PWA app icon and branding issue",
        "Resolved dynamic favicon issue",
        "Fixed full branding feature isolation issue",
        "Replaced hardcoded user data with dynamic values",
        "Synchronized system overview data",
      ],
    },
  },
  {
    version: "2.1.0",
    level: "minor",
    date: "June 19, 2026",
    title: "Preference Settings & RTL Mode",
    sections: {
      features: [
        "Dedicated preference settings, inspired by Storify",
        "RTL (right-to-left) mode support",
      ],
      improvements: [
        "Optimized RTL mode behavior across the app",
        "Improved sidebar SVG chain design",
        "Enhanced radio icon visibility in the sidebar",
      ],
      fixes: [
        "Fixed apparent mode active color issue",
      ],
    },
  },
  {
    version: "2.0.0",
    level: "major",
    date: "April 23, 2026",
    title: "Finance Module Development & Platform Enhancements",
    sections: {
      features: [
        "PWA implementation for both online and offline usage",
        "Support ticket system for better communication",
        "Inspection features developed for admins",
        "Push notifications for real-time updates",
        "Full finance module",
      ],
      improvements: [
        "Version upgrade from Next.js 15.5.9 to 16.2.1",
        "Implemented React Compiler",
        "Optimized package compatibility",
        "Developed a dedicated notifications module in the communications department",
        "Improved menu names and optimized submenu organization",
        "Developed a dedicated announcements module",
        "Enhanced tenant portal design for consistency with the admin portal",
        "Updated sidebar design and improved behavior",
        "Optimized stats card design",
        "Redesigned chat interface",
        "Improved real-time chat with SSE",
        "Optimized toast error messages to show exact issues",
        "Improved dashboard graph data accuracy",
        "Implemented optional chaining across the application for better null and undefined data handling",
      ],
      fixes: ["Resolved Stripe payment issue and updated payment status"],
    },
  },
  {
    version: "1.4.0",
    level: "major",
    date: "January 8, 2026",
    title: "Unit Management Module",
    sections: {
      features: [
        "Dedicated unit management module with comprehensive controls",
        "Unit images gallery with multiple photo support",
        "Unit features and amenities management",
        "Additional related information fields for units",
        "Document upload capability during tenant creation",
      ],
      improvements: [
        "Enhanced unit details page with better organization",
        "Streamlined tenant onboarding workflow",
      ],
    },
  },
  {
    version: "1.3.0",
    level: "minor",
    date: "January 3, 2026",
    title: "Design & Form Improvements",
    sections: {
      improvements: [
        "Refined design elements across the application",
        "Enhanced pagination with better user experience",
        "Improved form layouts and input validation",
        "Polished UI components for consistency",
      ],
      fixes: [
        "Resolved tenant-related bug on payment creation page",
        "Fixed form submission edge cases",
      ],
    },
  },
  {
    version: "1.2.0",
    level: "major",
    date: "December 16, 2025",
    title: "Multi-lingual & UI/UX Enhancements",
    sections: {
      features: [
        "Multi-lingual functionality with language switching",
        "Dedicated navigation system for better UX",
        "Individual pages for all property units",
      ],
      improvements: [
        "UI/UX improvements across all modules",
        "Enhanced visual consistency throughout the app",
        "Better responsive design for mobile devices",
        "Refined component styling and interactions",
      ],
      fixes: [
        "Multiple bug fixes across the system",
        "Improved error handling and validation",
      ],
    },
  },
  {
    version: "1.1.0",
    level: "minor",
    date: "November 4, 2025",
    title: "Dark Mode & Roles Enhancement",
    sections: {
      improvements: [
        "Enhanced dark mode with better contrast and readability",
        "Improved roles management system",
        "Refined color palette for both light and dark themes",
        "Better accessibility across all pages",
      ],
      fixes: [
        "Fixed image upload functionality issues",
        "Resolved dark mode color inconsistencies",
        "Corrected theme switching behavior",
      ],
    },
  },
  {
    version: "1.0.0",
    level: "major",
    date: "October 30, 2025",
    title: "Initial Release",
    sections: {
      features: [
        "Complete property management dashboard",
        "Multi-unit property support with unlimited units",
        "Tenant management with self-service portal",
        "Lease creation and lifecycle management",
        "Maintenance request system with work orders",
        "Role-based access control (Admin, Manager, Tenant)",
        "Document management with cloud storage",
        "Responsive design with dark/light mode support",
        "Email notifications system",
        "Comprehensive reporting and analytics dashboard",
      ],
    },
  },
];

const sectionStyles: Record<Section, string> = {
  features: "bg-teal-50 text-teal-700",
  improvements: "bg-violet-50 text-violet-700",
  fixes: "bg-orange-50 text-orange-700",
};

const sectionMarker: Record<Section, string> = {
  features: "marker:text-teal-500",
  improvements: "marker:text-violet-500",
  fixes: "marker:text-orange-500",
};

const sectionLabels: Record<Section, string> = {
  features: "Features",
  improvements: "Improvements",
  fixes: "Fixes",
};

const sectionOrder: Section[] = ["features", "improvements", "fixes"];

const levelBadge: Record<Release["level"], string> = {
  major: "border-emerald-200 bg-emerald-50 text-emerald-700",
  minor: "border-sky-200 bg-sky-50 text-sky-700",
};

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <JsonLd data={createBreadcrumbSchema("Changelog", "/changelog")} />
      <Navbar />

      <section className="px-6 pt-12 pb-20 md:px-12 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-5xl">
          {/* Page header */}
          <div className="text-center">
            <p className="text-sm font-medium text-teal-700">Changelog</p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-balance text-slate-950 md:text-5xl">
              What&apos;s new in PropertyPro
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-slate-500 sm:text-lg">
              New updates and improvements to PropertyPro.
            </p>
          </div>

          {/* Releases */}
          <div className="mt-8 space-y-6  md:space-y-8">
            {releases.map((release) => (
              <article
                key={release.version}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-10"
              >
                <header className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold tracking-normal text-slate-950">
                      {release.version}
                    </h2>
                    <span
                      className={`inline-flex h-6 w-fit shrink-0 items-center rounded-full border px-3 text-xs font-medium capitalize ${levelBadge[release.level]}`}
                    >
                      {release.level}
                    </span>
                  </div>
                  <span className="text-xs italic text-slate-500">
                    {release.date}
                  </span>
                </header>

                <h3 className="mt-4 text-lg font-semibold text-slate-700">
                  {release.title}
                </h3>

                <div className="mt-6 space-y-6">
                  {sectionOrder.map((s) => {
                    const items = release.sections[s];
                    if (!items?.length) return null;
                    return (
                      <div key={s} className="grid gap-3">
                        <span
                          className={`inline-flex w-fit rounded px-2 py-1 text-xs font-medium ${sectionStyles[s]}`}
                        >
                          {sectionLabels[s]}
                        </span>
                        <ul
                          className={`ml-4 list-disc space-y-1.5 text-sm leading-relaxed text-slate-700 ${sectionMarker[s]}`}
                        >
                          {items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 text-center md:px-16 md:py-20">
          {/* Decorative rings */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -bottom-20 size-64 rounded-full border border-white/5"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 size-80 rounded-full border border-white/5"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-12 size-56 rounded-full border border-white/5"
          />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-balance text-white md:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
              Join hundreds of teams using PropertyPro to streamline their
              property workflow.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="https://propertypro-live.neurolightstudio.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="h-11 rounded-full border-transparent bg-white px-5 text-sm font-medium text-slate-900 hover:bg-slate-100"
                >
                  <HugeiconsIcon icon={PlayCircleFreeIcons} className="size-4" />
                  View Live Demo
                </Button>
              </Link>
              <Link
                href="https://codecanyon.net/item/propertypro-property-tenant-management-software-nextjs-mongodb/60300696"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="h-11 rounded-full bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-700">
                  Purchase Now
                  <HugeiconsIcon
                    icon={ArrowRight01FreeIcons}
                    className="size-4"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
