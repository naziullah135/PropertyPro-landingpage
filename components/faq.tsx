"use client";

import { Accordion } from "@base-ui/react/accordion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01FreeIcons,
  Cancel01FreeIcons,
  ArrowRight01FreeIcons,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "What is the tech stack used in PropertyPro?",
    a: "PropertyPro is built with Next.js 16, React 19, MongoDB, Tailwind CSS v4, shadcn/ui, and a typed API layer. The stack is tuned for fast property workflows, modern UI, and long-running production deployments.",
  },
  {
    q: "Is installation support included?",
    a: "Yes. Every license includes a guided setup walkthrough, environment checklist, and 6 months of email support so you can ship in days, not weeks.",
  },
  {
    q: "Does it support real-time updates?",
    a: "Tenant messages, payment status, and maintenance tickets update in real time across web and the PWA without manual refreshes.",
  },
  {
    q: "Can I customize the design easily?",
    a: "All UI is composed from Tailwind v4 utilities and shadcn/ui primitives. Brand colors, typography, and layout can be re-themed by editing CSS variables — no fork required.",
  },
  {
    q: "What is the difference between Regular and Extended license?",
    a: "Regular covers a single property business or end client. Extended allows you to use PropertyPro inside a SaaS where multiple paying tenants access the same instance.",
  },
  {
    q: "Will I get future updates?",
    a: "Yes. Lifetime updates are included in both licenses — you'll receive every feature release, security patch, and dependency upgrade through the buyer portal.",
  },
  {
    q: "How do I customize the landing page?",
    a: "The landing page lives in app/page.tsx as plain Tailwind sections. Swap copy, reorder sections, or replace the dashboard mock without touching any framework configuration.",
  },
  {
    q: "How do I get support?",
    a: "Open a ticket from the buyer portal or email support — most replies arrive in under one business day, with priority routing for setup and licensing questions.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
          <span className="size-1.5 rounded-full bg-blue-600" />
          FAQ
        </span>
        <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-balance text-slate-900 md:text-5xl">
          Frequently asked{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            questions
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 md:text-lg">
          Can&apos;t find what you&apos;re looking for? Reach out through the
          support portal and our team will help.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion.Root
          defaultValue={["item-0"]}
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white"
        >
          {faqs.map((item, i) => (
            <Accordion.Item
              key={item.q}
              value={`item-${i}`}
              className="group/item border-b border-slate-100 last:border-b-0"
            >
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50/60">
                  <span className="text-[15px] font-medium text-slate-900">
                    {item.q}
                  </span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors group-data-[open]/item:bg-blue-600 group-data-[open]/item:text-white">
                    <HugeiconsIcon
                      icon={Add01FreeIcons}
                      className="size-4 group-data-[open]/item:hidden"
                    />
                    <HugeiconsIcon
                      icon={Cancel01FreeIcons}
                      className="hidden size-4 group-data-[open]/item:block"
                    />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="overflow-hidden text-sm leading-relaxed text-slate-500 transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0 h-(--accordion-panel-height)">
                <div className="px-6 pb-5 -mt-1">{item.a}</div>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-sm text-slate-500">Still have questions?</p>
          <Button
            variant="outline"
            className="h-11 rounded-full border-slate-200 bg-white px-5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
          >
            Contact support
            <HugeiconsIcon icon={ArrowRight01FreeIcons} className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
