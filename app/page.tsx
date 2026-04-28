import Link from "next/link";
import Image from "next/image";
import {
  Building03FreeIcons,
  ContractsFreeIcons,
  HomeFreeIcons,
  ArrowUpRight01FreeIcons,
  CheckmarkCircle02FreeIcons,
  StarFreeIcons,
  UserMultiple02FreeIcons,
  CreditCardFreeIcons,
  WrenchFreeIcons,
  MessageMultiple02FreeIcons,
  ChartLineData02FreeIcons,
  File01FreeIcons,
  SmartPhone01FreeIcons,
} from "@hugeicons/core-free-icons";
import { FAQ } from "@/components/faq";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";

const HERO_SCREENSHOT_URL =
  process.env.NEXT_PUBLIC_HERO_SCREENSHOT_URL ??
  "https://pub-87b115b8ffd84f39963e0f5bfaa9a50e.r2.dev/Screenshot/dashboard-2.0.png";

const features: { title: string; description: string; icon: IconSvgElement }[] =
  [
    {
      title: "Properties",
      description:
        "Organize your portfolio with flexible buildings, units, and amenities — all in one workspace.",
      icon: Building03FreeIcons,
    },
    {
      title: "Tenants",
      description:
        "Onboard tenants in minutes, store contact details, and keep household profiles tidy.",
      icon: UserMultiple02FreeIcons,
    },
    {
      title: "Leases",
      description:
        "Generate, send, and renew leases with smart reminders and clean version history.",
      icon: ContractsFreeIcons,
    },
    {
      title: "Payments",
      description:
        "Collect rent, track invoices, and reconcile deposits without spreadsheet juggling.",
      icon: CreditCardFreeIcons,
    },
    {
      title: "Maintenance",
      description:
        "Capture tickets, assign vendors, and resolve issues before tenants need to chase.",
      icon: WrenchFreeIcons,
    },
    {
      title: "Messages",
      description:
        "Talk to tenants, owners, and vendors in threaded conversations tied to each property.",
      icon: MessageMultiple02FreeIcons,
    },
    {
      title: "Reports",
      description:
        "Occupancy, collection, and revenue trends visualized for owners and stakeholders.",
      icon: ChartLineData02FreeIcons,
    },
    {
      title: "Documents",
      description:
        "Centralize leases, IDs, and inspection files with secure links and per-tenant access.",
      icon: File01FreeIcons,
    },
    {
      title: "PWA",
      description:
        "Installable, offline-friendly progressive web app — works on any device, no app store.",
      icon: SmartPhone01FreeIcons,
    },
  ];

const stats = [
  {
    value: "40%",
    description: "Faster portfolio reviews and automated rent workflows.",
  },
  {
    value: "3×",
    description: "Higher tenant satisfaction with real-time updates.",
  },
  {
    value: "100%",
    description: "Real-time insights across leases, payments, and tickets.",
  },
  {
    value: "10k+",
    description: "Active landlords, agencies, and growing portfolios.",
  },
];

const steps = [
  {
    n: "01",
    title: "Simple And Fast Setup",
    description:
      "Spin up your portfolio in minutes — import properties and invite tenants instantly.",
  },
  {
    n: "02",
    title: "Work Together Effortlessly",
    description:
      "Owners, managers, and tenants stay in sync with shared dashboards and messages.",
  },
  {
    n: "03",
    title: "Monitor Your Progress",
    description:
      "Track occupancy, payments, and maintenance health from one focused workspace.",
  },
];

const testimonials = [
  {
    quote:
      "PropertyPro replaced three tools for us. Our managers now close maintenance tickets twice as fast and tenants love the portal.",
    name: "Amelia Carter",
    role: "Director of Operations",
    company: "Maple Heights Realty",
  },
  {
    quote:
      "We onboarded 80 units in a single afternoon. The lease automation alone saved us roughly 15 hours per week across the team.",
    name: "Daniel Whitman",
    role: "Portfolio Manager",
    company: "Riverside Capital",
  },
  {
    quote:
      "The dashboards finally give our investors confidence. Occupancy and collection trends are visible without any spreadsheet gymnastics.",
    name: "Priya Natarajan",
    role: "Founder",
    company: "Oakwood Stays",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white font-sans">
      {/* Sky/cloud backdrop — sits behind navbar + hero for a seamless top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[760px] overflow-hidden bg-gradient-to-b from-sky-100 via-blue-50/60 to-transparent"
      >
        <div className="absolute -top-20 left-1/2 h-[460px] w-[900px] -translate-x-1/2 rounded-[50%] bg-white/70 blur-3xl" />
      </div>

      <Navbar />
      {/* Hero */}
      <section className="relative px-6 pt-6 pb-16 md:px-12 md:pt-8 md:pb-24">
        <div className="mx-auto w-full max-w-7xl">
          {/* Headline */}
          <div className="relative z-10 mx-auto mt-6 max-w-7xl text-center md:mt-12">
            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
              <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Property Management Software
              </span>
              <span className="mt-5  block text-lg font-semibold leading-tight text-black md:text-3xl">
                Manage <span className="text-cyan-700">tenants, rent, leases, and maintenance</span> from one
                dashboard.
              </span>
            </h1>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://propertypro-live.neurolightstudio.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-xl font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700"
              >
                Try Live Demo
              </a>
            </div>
          </div>

          {/* Floating persona pills */}
          <div className="relative z-10 mx-auto mt-12 hidden max-w-5xl md:block">
            <PersonaPill
              label="Landlord"
              dotClass="bg-amber-400"
              position="absolute left-4 top-2"
            />
            <PersonaPill
              label="Property Manager"
              dotClass="bg-blue-500"
              position="absolute right-4 top-2"
            />
          </div>

          {/* Hero product mockup */}
          <div className="relative z-10 mx-auto mt-6 w-full px-6 md:mt-10 md:px-12">
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-blue-900/10">
              <Link href="https://propertypro-live.neurolightstudio.com/dashboard">
                <Image
                  src={HERO_SCREENSHOT_URL}
                  alt="PropertyPro dashboard preview"
                  width={1280}
                  height={848}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  preload
                  className="h-auto w-full"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-balance text-slate-900 md:text-5xl">
            Everything You Need To
            <br />
            Run A Calmer Portfolio.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 md:text-lg">
            Nine focused modules covering the full property lifecycle — from
            listings to renewals.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-slate-200/80 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="-mt-px -ml-px border border-slate-200/80 p-8 md:p-10"
            >
              <HugeiconsIcon
                icon={f.icon}
                className="size-6 text-slate-500"
                strokeWidth={1.6}
              />
              <h3 className="mt-8 text-lg font-semibold text-slate-900">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose — Stats */}
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-balance text-slate-900 md:text-5xl">
            Why Teams Choose PropertyPro
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 md:text-lg">
            Trusted by landlords and agencies to manage portfolios more
            efficiently. Designed to help teams do their best work.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-gradient-to-b from-blue-50/80 via-sky-50/40 to-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <p className="text-4xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </p>
                <span className="flex size-7 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600">
                  <HugeiconsIcon
                    icon={ArrowUpRight01FreeIcons}
                    className="size-4"
                  />
                </span>
              </div>
              <p className="mt-10 text-sm leading-relaxed text-slate-500">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Easy Steps */}
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-balance text-slate-900 md:text-5xl">
            Get Started In Just 3 Easy Steps
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 md:text-lg">
            Get started in just 3 easy steps with a guided onboarding experience
            designed for speed and simplicity.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl items-center gap-8 lg:grid-cols-2">
          <OnboardingMock />
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.n}
                className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                  {step.n}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-balance text-slate-900 md:text-5xl">
            Real Results, Real Impact.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Our Success Stories
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 md:text-lg">
            Real-world success stories showcasing growth, performance, and
            productivity improvements.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
            >
              <div>
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HugeiconsIcon
                      key={i}
                      icon={StarFreeIcons}
                      className="size-4"
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  “{t.quote}”
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="size-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQ />

      {/* Footer CTA */}
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 px-6 py-14 text-center shadow-xl shadow-blue-500/20 md:px-16 md:py-20">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-balance text-white md:text-5xl">
            Ready to run a calmer portfolio?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80 md:text-lg">
            Launch your property business faster with a production-ready system
            built for landlords, managers, and tenants.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="https://propertypro-live.neurolightstudio.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="h-12 cursor-pointer rounded-full bg-white px-6 text-lg font-bold text-blue-600 hover:bg-white/90"
              >
                Visit Live Demo
              </Button>
            </Link>
            <Link
              href="https://codecanyon.net/item/propertypro-property-tenant-management-software-nextjs-mongodb/60300696"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full cursor-pointer border-white/40 bg-transparent px-6 text-lg font-bold text-white hover:bg-white/10"
              >
                Purchase Now
              </Button>
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80">
            {["35+ ready screens", "TypeScript first", "One-time license"].map(
              (item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <HugeiconsIcon
                    icon={CheckmarkCircle02FreeIcons}
                    className="size-4"
                  />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}

function PersonaPill({
  label,
  dotClass,
  position,
}: {
  label: string;
  dotClass: string;
  position: string;
}) {
  return (
    <div
      className={`${position} flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 shadow-sm`}
    >
      <span className={`size-2 rounded-full ${dotClass}`} />
      <span className="text-xs font-medium text-slate-700">{label}</span>
    </div>
  );
}

function OnboardingMock() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-100 via-sky-50 to-white p-5 shadow-xl shadow-blue-900/10">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
        {/* App chrome */}
        <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-rose-300" />
          <span className="size-2.5 rounded-full bg-amber-300" />
          <span className="size-2.5 rounded-full bg-emerald-300" />
        </div>

        <div className="grid grid-cols-[140px_1fr]">
          {/* Sidebar */}
          <aside className="border-r border-slate-100 bg-slate-50/60 p-3">
            <div className="mb-3 flex items-center gap-1.5">
              <div className="flex size-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-cyan-500">
                <HugeiconsIcon
                  icon={HomeFreeIcons}
                  className="size-3.5 text-white"
                />
              </div>
              <span className="text-[11px] font-bold text-slate-900">
                PropertyPro
              </span>
            </div>
            <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
              Dashboards
            </p>
            <ul className="space-y-1 text-[10px] font-medium">
              {[
                { label: "Inbox", count: "4", active: true },
                { label: "Files", count: "23" },
                { label: "Properties", count: "" },
                { label: "Updates", count: "" },
                { label: "Analytics", count: "2" },
                { label: "Tenants", count: "" },
                { label: "Leases", count: "" },
                { label: "Payments", count: "" },
              ].map((item) => (
                <li
                  key={item.label}
                  className={`flex items-center justify-between rounded-md px-2 py-1 ${
                    item.active ? "bg-blue-100 text-blue-700" : "text-slate-600"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.count && (
                    <span className="text-[9px] text-slate-400">
                      {item.count}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          {/* Body */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-900">
                Property Boards
              </p>
              <span className="text-[10px] text-slate-400">···</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="rounded-md border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                Board View
              </span>
              <span className="rounded-md border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                List View
              </span>
            </div>

            <div className="mt-3 rounded-lg bg-slate-50 p-2.5">
              <p className="text-[10px] font-semibold text-slate-700">Vacant</p>
              <div className="mt-2 rounded-md bg-white p-2.5 shadow-sm">
                <span className="inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[8px] font-semibold text-amber-700">
                  Listing
                </span>
                <p className="mt-1.5 text-[10px] font-semibold text-slate-900">
                  Maple Heights · 4B
                </p>
                <p className="mt-0.5 text-[9px] leading-snug text-slate-500">
                  Awaiting tenant application review.
                </p>
                <div className="mt-2 flex items-center justify-between text-[8px] text-slate-400">
                  <div className="flex -space-x-0.5">
                    <div className="size-3 rounded-full bg-blue-400 ring-1 ring-white" />
                    <div className="size-3 rounded-full bg-emerald-400 ring-1 ring-white" />
                  </div>
                  <span>3 files</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
