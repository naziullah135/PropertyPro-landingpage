import type { Metadata } from "next";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayCircleFreeIcons,
  ArrowRight01FreeIcons,
} from "@hugeicons/core-free-icons";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Changelog · PropertyPro",
  description: "New updates and improvements to PropertyPro.",
};

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
      <Navbar />

      <section className="px-6 pt-12 pb-20 md:px-12 md:pt-20 md:pb-28">
        <div className="mx-auto max-w-5xl">
          {/* Page header */}
          <div className="text-center">
            <p className="text-sm font-medium text-teal-700">Changelog</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance text-slate-950 md:text-6xl">
              What&apos;s new in PropertyPro
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-slate-500 sm:text-lg">
              New updates and improvements to PropertyPro.
            </p>
          </div>

          {/* Releases */}
          <div className="mt-16 space-y-8 md:mt-20 md:space-y-10">
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
              <Button
                variant="outline"
                className="h-11 rounded-full border-transparent bg-white px-5 text-sm font-medium text-slate-900 hover:bg-slate-100"
              >
                <HugeiconsIcon icon={PlayCircleFreeIcons} className="size-4" />
                View Live Demo
              </Button>
              <Button className="h-11 rounded-full bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-700">
                Purchase Now
                <HugeiconsIcon
                  icon={ArrowRight01FreeIcons}
                  className="size-4"
                />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
