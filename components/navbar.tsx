"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  HomeFreeIcons,
  ArrowDown01FreeIcons,
  Moon02FreeIcons,
  Download04FreeIcons,
  Settings01FreeIcons,
  SourceCodeFreeIcons,
  Layout01FreeIcons,
  SmartPhone01FreeIcons,
  CloudFreeIcons,
  Book02FreeIcons,
  FileEditFreeIcons,
  File01FreeIcons,
  CustomerSupportFreeIcons,
  ShoppingCart01FreeIcons,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { IconSvgElement } from "@hugeicons/react";

type MenuItem = {
  title: string;
  description: string;
  icon: IconSvgElement;
  href: string;
  badge?: string;
};

type MenuConfig =
  | { label: string; href: string }
  | { label: string; items: MenuItem[]; columns?: 1 | 2 };

const NAV: MenuConfig[] = [
  { label: "Features", href: "#features" },
  {
    label: "Products",
    columns: 2,
    items: [
      {
        title: "PropertyPro Web",
        description: "Full-featured web dashboard for managers",
        icon: HomeFreeIcons,
        href: "/user-manual#dashboard",
      },
      {
        title: "PropertyPro Mobile",
        description: "Native iOS & Android tenant apps",
        icon: SmartPhone01FreeIcons,
        href: "/user-manual#mobile",
      },
      {
        title: "PropertyPro API",
        description: "Headless integrations for custom flows",
        icon: SourceCodeFreeIcons,
        href: "/docs#overview",
      },
      {
        title: "Marketplace",
        description: "Listings & online rentals",
        icon: ShoppingCart01FreeIcons,
        href: "/changelog",
        badge: "Coming Soon",
      },
    ],
  },
  {
    label: "Services",
    columns: 2,
    items: [
      {
        title: "Installation",
        description: "Professional setup & deployment",
        icon: Download04FreeIcons,
        href: "/docs#quickstart",
      },
      {
        title: "Customization",
        description: "Tailored solutions for your needs",
        icon: Settings01FreeIcons,
        href: "/docs#branding",
      },
      {
        title: "Web Development",
        description: "Custom websites & web apps",
        icon: SourceCodeFreeIcons,
        href: "/docs#deploy-vercel",
      },
      {
        title: "UI/UX Service",
        description: "User-centered design & prototyping",
        icon: Layout01FreeIcons,
        href: "/docs#branding",
      },
      {
        title: "Mobile App Development",
        description: "iOS & Android native and cross-platform",
        icon: SmartPhone01FreeIcons,
        href: "/user-manual#mobile",
      },
      {
        title: "SaaS Development",
        description: "Scalable cloud-based products",
        icon: CloudFreeIcons,
        href: "/docs#deploy-vps",
      },
    ],
  },
  {
    label: "Resources",
    columns: 2,
    items: [
      {
        title: "Documentation",
        description: "Guides, API references & tutorials",
        icon: Book02FreeIcons,
        href: "/docs",
      },
      {
        title: "Changelog",
        description: "Latest updates & release notes",
        icon: FileEditFreeIcons,
        href: "/changelog",
      },
      {
        title: "User Manual",
        description: "Step-by-step usage instructions",
        icon: File01FreeIcons,
        href: "/user-manual",
      },
      {
        title: "Support",
        description: "Get help from our team",
        icon: CustomerSupportFreeIcons,
        href: "https://support.neurolightstudio.com/",
      },
    ],
  },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenIndex(i);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenIndex(null), 120);
  };

  const toggleMenu = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo-light.png"
            alt="PropertyPro"
            width={200}
            height={100}
          />
        </Link>

        {/* Center nav */}
        <nav className="hidden md:block" onMouseLeave={scheduleClose}>
          <ul className="flex items-center gap-1">
            {NAV.map((item, i) => {
              const isDropdown = "items" in item;
              const isOpen = openIndex === i;
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => isDropdown && openMenu(i)}
                >
                  {isDropdown ? (
                    <button
                      type="button"
                      onClick={() => toggleMenu(i)}
                      aria-expanded={isOpen}
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isOpen
                          ? "text-blue-600"
                          : "text-slate-600 hover:text-slate-900",
                      )}
                    >
                      {item.label}
                      <HugeiconsIcon
                        icon={ArrowDown01FreeIcons}
                        className={cn(
                          "size-3.5 transition-transform duration-200",
                          isOpen ? "-rotate-180" : "rotate-0",
                        )}
                      />
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                    >
                      {item.label}
                    </a>
                  )}

                  {isDropdown && isOpen && (
                    <MegaMenu items={item.items} columns={item.columns ?? 2} />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href="https://codecanyon.net/item/propertypro-property-tenant-management-software-nextjs-mongodb/60300696"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="hidden h-10 rounded-full border-slate-200 bg-white px-5 text-sm font-medium text-slate-900 hover:bg-slate-50 sm:inline-flex"
            >
              Buy Now
            </Button>
          </Link>

          <Link
            href="https://propertypro-live.neurolightstudio.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="h-10 cursor-pointer text-center rounded-full bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-700">
              Live Preview
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function MegaMenu({ items, columns }: { items: MenuItem[]; columns: 1 | 2 }) {
  return (
    <div
      className={cn(
        "absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-2xl shadow-blue-900/10",
        columns === 2 ? "w-[640px]" : "w-[320px]",
      )}
    >
      <ul
        className={cn(
          "grid gap-1",
          columns === 2 ? "grid-cols-2" : "grid-cols-1",
        )}
      >
        {items.map((item) => (
          <li key={item.title}>
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-blue-50/60"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                <HugeiconsIcon icon={item.icon} className="size-4" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  {item.badge && (
                    <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs leading-snug text-slate-500">
                  {item.description}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
