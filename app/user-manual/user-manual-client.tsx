"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  ArrowRight01FreeIcons,
  ArrowRight02FreeIcons,
  SearchFreeIcons,
  Login01FreeIcons,
  DashboardSquare02FreeIcons,
  Building03FreeIcons,
  UserMultiple02FreeIcons,
  ContractsFreeIcons,
  WrenchFreeIcons,
  CreditCardFreeIcons,
  MessageMultiple02FreeIcons,
  ChartLineData02FreeIcons,
  Settings01FreeIcons,
  SmartPhone01FreeIcons,
  HelpCircleFreeIcons,
  CheckmarkCircle02FreeIcons,
  Alert02FreeIcons,
  InformationCircleFreeIcons,
  TaskDone01FreeIcons,
  InvoiceFreeIcons,
  Money02FreeIcons,
  Notification01FreeIcons,
  CustomerSupportFreeIcons,
  Megaphone02FreeIcons,
  ChartFreeIcons,
  UserSettings01FreeIcons,
  LockedFreeIcons,
  TranslateFreeIcons,
  Moon02FreeIcons,
  Download04FreeIcons,
  Book02FreeIcons,
  Copy01FreeIcons,
  KeyboardFreeIcons,
  ShieldFreeIcons,
  Sun03FreeIcons,
  ComputerFreeIcons,
  ArrowUpRight01FreeIcons,
  Cancel01FreeIcons,
  SmileFreeIcons,
  NeutralFreeIcons,
  SadFreeIcons,
  PencilEdit02FreeIcons,
  HomeFreeIcons,
  SparklesFreeIcons,
  Globe02FreeIcons,
  Mail01FreeIcons,
  FileValidationFreeIcons,
} from "@hugeicons/core-free-icons";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Step = { title: string; body: string };
type Callout = { tone: "tip" | "note" | "warn"; title: string; body: string };

type Section = {
  id: string;
  label: string;
  title: string;
  intro: string;
  icon: IconSvgElement;
  accent: AccentKey;
  steps?: Step[];
  bullets?: { icon: IconSvgElement; title: string; body: string }[];
  callouts?: Callout[];
};

type AccentKey =
  | "blue"
  | "violet"
  | "teal"
  | "indigo"
  | "sky"
  | "amber"
  | "emerald"
  | "fuchsia"
  | "rose"
  | "slate"
  | "cyan";

const sections: Section[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    title: "Sign in & first-run setup",
    intro:
      "Get into PropertyPro in under a minute. New workspaces ship with sensible defaults so you can start managing properties on day one.",
    icon: Login01FreeIcons,
    accent: "blue",
    steps: [
      {
        title: "Open the dashboard",
        body: "Visit /dashboard from any browser or install PropertyPro as a PWA from the address bar for an app-like experience. As of 3.0 the site root is your public website, not the sign-in page.",
      },
      {
        title: "Sign in with your credentials",
        body: "Use the email and password provided by your workspace admin. Tenants receive their invite from the manager during onboarding, or sign up themselves through your public website. Passwords are a minimum of 8 characters.",
      },
      {
        title: "Complete your profile",
        body: "Add your photo, contact number, and notification preferences from Settings → Profile so teammates can reach you.",
      },
      {
        title: "Choose your theme & language",
        body: "Switch between light and dark mode in the topbar, and change the workspace language from Settings → Preferences.",
      },
    ],
    callouts: [
      {
        tone: "tip",
        title: "Pro tip",
        body: "Bookmark /dashboard or install the PWA — you'll get push notifications and offline access automatically.",
      },
      {
        tone: "note",
        title: "Applied through the website and can't sign in?",
        body: "That's expected. A rental application has to be approved by staff before the account becomes active, and sign-in stays blocked while it's pending or after it's been rejected. The sign-in page says which of the two applies.",
      },
      {
        tone: "warn",
        title: "Signed out after an upgrade to 3.0?",
        body: "Also expected, and it happens once. 3.0 rebuilt the sign-in system, so everyone logs back in — with the same password as before. Nobody needs to reset anything.",
      },
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Your daily command center",
    intro:
      "The dashboard surfaces everything that needs your attention today — occupancy, overdue invoices, open maintenance tickets, and unread messages.",
    icon: DashboardSquare02FreeIcons,
    accent: "violet",
    bullets: [
      {
        icon: ChartLineData02FreeIcons,
        title: "Live KPI cards",
        body: "Total properties, active tenants, monthly revenue, and pending tasks update in real time.",
      },
      {
        icon: ChartFreeIcons,
        title: "Revenue & occupancy charts",
        body: "Compare current month against last month with accurate, drill-downable graphs.",
      },
      {
        icon: Notification01FreeIcons,
        title: "Activity feed",
        body: "Recent payments, new requests, and system alerts — all in one stream.",
      },
      {
        icon: SearchFreeIcons,
        title: "Global search",
        body: "Press / anywhere to jump to a tenant, unit, lease, or invoice.",
      },
    ],
  },
  {
    id: "public-site",
    label: "Public Website",
    title: "Your listings, live on the web",
    intro:
      "New in 3.0. PropertyPro now serves a public marketing website from the same install — a home page, a searchable properties browser, property and unit detail pages, and a contact page. Everything on it is switchable and editable from Dashboard → Public Site.",
    icon: Globe02FreeIcons,
    accent: "fuchsia",
    steps: [
      {
        title: "Decide which pages are live",
        body: "Public Site → Page switches. A master toggle turns the whole site on or off, and each page (Home, Properties, Property detail, Contact) has its own switch. A page is live only when both are on, and toggles save the moment you flip them.",
      },
      {
        title: "Set your brand",
        body: "Public Site → Brand & navigation. Wordmark, logo, tagline, header links, footer columns, legal links, social icons, and the copyright line — which accepts a {year} token that fills itself in.",
      },
      {
        title: "Write the home page",
        body: "Public Site → Home. Hero headline, sub-heading, background image, the search bar labels, how many featured listings to show (1–24), up to six feature cards, and up to six how-it-works steps.",
      },
      {
        title: "Tune the properties and contact pages",
        body: "Set the browser's heading and empty state, the property-detail units and nearby headings, the booking button label, and the contact page's methods, form copy, and confirmation message.",
      },
      {
        title: "Add FAQs",
        body: "Public Site → FAQ. Up to 12 categories of 20 question-and-answer pairs each, rendered as a filterable accordion on the home page.",
      },
    ],
    callouts: [
      {
        tone: "tip",
        title: "Changes go live immediately",
        body: "The public pages render fresh on every request, and each save clears the cache — so a header or footer edit lands on every page at once. No rebuild, no redeploy.",
      },
      {
        tone: "note",
        title: "Switching a page off never deletes anything",
        body: "Visitors are redirected to sign-in (or the dashboard, if they're signed in) and your copy comes back untouched when you switch it on again. Turn the master switch off entirely and the site root behaves as it did in 2.x.",
      },
      {
        tone: "warn",
        title: "Images are paths, not uploads",
        body: "Hero, feature, and how-it-works images are entered as paths with a live preview. Put the file under /public first, then reference it — the editor warns you when a path doesn't load.",
      },
    ],
  },
  {
    id: "properties",
    label: "Properties & Units",
    title: "Build your portfolio",
    intro:
      "Organize buildings, units, amenities, and photos in one place. Every unit gets its own dedicated page with full history.",
    icon: Building03FreeIcons,
    accent: "teal",
    steps: [
      {
        title: "Add a property",
        body: "Go to Properties → New. Enter the address, type (residential / commercial / mixed), and a cover photo.",
      },
      {
        title: "Find the address on the map",
        body: "New in 3.0: start typing in the Search address box and pick a suggestion — street, city, state, ZIP, and country fill themselves in and the location is saved. A small map appears with a draggable pin so you can nudge the exact spot without editing any text.",
      },
      {
        title: "Create units inside the property",
        body: "Open the property and use the Units tab. Add rooms, square footage, rent, and status (vacant / occupied / under maintenance).",
      },
      {
        title: "Upload a unit gallery",
        body: "Each unit supports multiple images — drag & drop into the gallery card to upload in bulk. On the public site these open in a full-screen lightbox with arrow-key navigation.",
      },
      {
        title: "Add a video tour",
        body: "New in 3.0: the property form has a Video Tour field, and each unit can have its own. Paste a YouTube or Vimeo link, or a direct .mp4 / .webm / .mov file URL. Units without their own tour fall back to the building's.",
      },
      {
        title: "Define features & amenities",
        body: "Tag amenities (parking, pool, balcony, AC) so they appear on listings and tenant-facing pages. Pet-friendly amenities also control whether applicants can add pets at checkout.",
      },
    ],
    callouts: [
      {
        tone: "note",
        title: "Status matters",
        body: "A unit must be marked Vacant before you can attach a new lease — PropertyPro prevents accidental double-bookings.",
      },
      {
        tone: "tip",
        title: "Properties added before 3.0 aren't on the map yet",
        body: "They have no saved coordinates, so they show the fallback artwork instead of a real map. Ask your administrator to run the one-time coordinate backfill, or simply re-save each property using the address search.",
      },
    ],
  },
  {
    id: "applications",
    label: "Applications",
    title: "Rent a unit online, end to end",
    intro:
      "New in 3.0. Prospective renters can apply for a unit straight from your public website — no phone call, no email thread, no one touching the dashboard. Applications land in Tenants → Applications for you to review.",
    icon: FileValidationFreeIcons,
    accent: "violet",
    steps: [
      {
        title: "A visitor picks a unit",
        body: "From a property or unit page they set a move-in date, lease term (6, 12, 18, or 24 months), and how many adults, children, and pets. The move-in cost updates live as they change it.",
      },
      {
        title: "They see the real numbers before applying",
        body: "The quote itemizes first month's rent — prorated if they're not moving in on the 1st — plus the security deposit and a pet deposit per animal. Due today reads $0: applying charges nothing.",
      },
      {
        title: "They complete the four-step checkout",
        body: "Contact details, requested lease terms, income and rental history, then screening consent. Applicants without an account get one created from the same form; signed-in visitors just confirm their details.",
      },
      {
        title: "You're notified immediately",
        body: "Every active admin and manager gets an in-app notification and an email with the full application. The applicant gets an acknowledgement carrying an APP- reference number they can quote.",
      },
      {
        title: "Review it in the dashboard",
        body: "Tenants → Applications. The detail page shows a Requested lease card (move-in, term, end date, occupants, pets) and a Quoted at submission card (rent, prorated first month, deposits, due at signing), plus a rent-to-income badge showing whether they meet the 3x guideline.",
      },
      {
        title: "Approve to create the lease",
        body: "Approving an application that came from the public checkout automatically drafts a lease with the requested dates and the quoted rent and deposit. You review and activate it as normal.",
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "Applicants can't sign in until you approve them",
        body: "A pending or rejected application blocks sign-in by design. The confirmation screen and acknowledgement email both say so, so nobody is left guessing why their new password doesn't work.",
      },
      {
        tone: "note",
        title: "PropertyPro guards against the obvious mistakes",
        body: "A second live application for the same home is refused, a unit let while the form was open reports that clearly, move-in dates are capped at 90 days out, and pets are blocked on listings whose amenities don't allow them.",
      },
      {
        tone: "tip",
        title: "Not taking applications yet?",
        body: "Switch Property detail off under Public Site → Page switches. Visitors are redirected instead of reaching the checkout, and your listings stop advertising units you're not ready to lease.",
      },
    ],
  },
  {
    id: "tenants",
    label: "Tenants",
    title: "Onboard & manage tenants",
    intro:
      "Bring tenants on board in minutes with documents, contact details, and a self-service portal of their own.",
    icon: UserMultiple02FreeIcons,
    accent: "indigo",
    steps: [
      {
        title: "Create a tenant profile",
        body: "Tenants → New. Enter name, email, phone, and emergency contact. An invite is sent automatically.",
      },
      {
        title: "Attach documents during onboarding",
        body: "Upload IDs, references, and signed agreements right from the create form — no separate trip required.",
      },
      {
        title: "Assign to a unit",
        body: "Pick a vacant unit. The tenant is linked, and the lease workflow starts automatically.",
      },
      {
        title: "Tenant Portal",
        body: "Tenants log in to view their lease, pay rent, raise maintenance requests, and chat with management.",
      },
    ],
    callouts: [
      {
        tone: "tip",
        title: "Employment details are mostly optional now",
        body: "Within the employment section only Employer is required — position, income, and start date can be left blank, which makes bulk imports and quick entry far less painful. The move-in date is no longer capped to a ±5-year window either.",
      },
      {
        tone: "note",
        title: "Re-leasing to a past tenant",
        body: "A terminated tenant can be moved back into the pipeline (under review, approved, or inactive) instead of being a dead end. The status dropdown now only offers transitions that will actually be accepted.",
      },
    ],
  },
  {
    id: "leases",
    label: "Leases",
    title: "Lease lifecycle, end to end",
    intro:
      "Generate, send, sign, renew, or terminate leases. Every change is versioned and auditable.",
    icon: ContractsFreeIcons,
    accent: "sky",
    steps: [
      {
        title: "Draft a lease",
        body: "Open a tenant or unit and click New Lease. Choose start/end dates, monthly rent, deposit, and recurring fees.",
      },
      {
        title: "Send for review",
        body: "PropertyPro generates a printable PDF you can share with the tenant via email or the portal.",
      },
      {
        title: "Activate",
        body: "Once signed, mark the lease Active. Recurring invoices are scheduled from the start date.",
      },
      {
        title: "Renew or terminate",
        body: "Use Renew to extend with new terms, or Terminate to close it cleanly with a final settlement. As of 3.0 any lease that hasn't already ended can be terminated — active, expired, pending, or pending-signature — from one dialog available on the leases table, the card grid, and the detail page.",
      },
      {
        title: "Edit at any point in the lease's life",
        body: "New in 3.0: leases are no longer editable only as drafts. Property, unit, and tenant lock once the lease claims a unit, and rent and dates lock only once invoices have actually been issued — scheduled-but-unbilled invoices no longer freeze a lease. The edit screen tells you exactly what's locked and why.",
      },
    ],
    callouts: [
      {
        tone: "tip",
        title: "Reminders run for you",
        body: "PropertyPro emails tenants 30 days before lease expiry — no manual chasing required.",
      },
      {
        tone: "note",
        title: "Termination dates are flexible",
        body: "Backdate a move-out that already happened, end an overrun lease past its printed end date, or schedule a future one. Future dates schedule the termination on active leases; every other status takes effect immediately.",
      },
      {
        tone: "warn",
        title: "Deleting a lease needs its own permission",
        body: "Ended leases can now be deleted, taking their invoices, settled payments, deposit, and documents with them (soft-deleted and stamped, so an audit can still tell them apart). Live leases still refuse deletion — terminate first. Deleting requires the lease_delete permission, which managers don't get by default in 3.0.",
      },
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance & Inspections",
    title: "Resolve issues fast",
    intro:
      "Tenants raise requests, you assign work orders, inspectors verify the fix. Nothing falls through the cracks.",
    icon: WrenchFreeIcons,
    accent: "amber",
    steps: [
      {
        title: "Tenant raises a request",
        body: "From the tenant portal, the resident describes the issue, attaches photos, and picks a priority.",
      },
      {
        title: "Triage from the admin queue",
        body: "Open Maintenance → Requests. Assign a technician, set due date, and convert to a work order.",
      },
      {
        title: "Schedule an inspection",
        body: "Use the Inspections module to plan recurring or on-demand checks. Inspectors complete a checklist on mobile.",
      },
      {
        title: "Close the loop",
        body: "Mark resolved, attach proof photos, and the tenant is notified automatically.",
      },
    ],
    callouts: [
      {
        tone: "note",
        title: "Status rules are consistent everywhere now",
        body: "In 3.0 the detail page, the row menu, and bulk actions all follow the same rules. Completing a request requires it to be in progress — the detail page used to allow completing straight from Submitted with nobody assigned — and finishing a job from anywhere now releases the unit from maintenance status.",
      },
      {
        tone: "tip",
        title: "The list handles large portfolios",
        body: "Search, filters, sorting, and pagination now run on the server rather than loading every request into your browser. Summary cards count the whole dataset, not just the rows on screen, and the Overdue card, filter, and per-row day count finally agree with each other.",
      },
      {
        tone: "warn",
        title: "Emergency escalation works again",
        body: "Escalations previously failed with a server error, always reported level 1, and discarded their history. That's fixed — escalation now records its level and log properly, and is refused on completed or cancelled requests and once level 3 is reached.",
      },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    title: "Invoices, payments & reconciliation",
    intro:
      "Bill tenants, accept online payments via Stripe, track expenses, and reconcile deposits without spreadsheets.",
    icon: CreditCardFreeIcons,
    accent: "emerald",
    bullets: [
      {
        icon: InvoiceFreeIcons,
        title: "Auto-generated invoices",
        body: "Recurring rent and one-off charges are created from the lease schedule.",
      },
      {
        icon: Money02FreeIcons,
        title: "Online payments",
        body: "Tenants pay via Stripe. Status updates reflect in the dashboard within seconds.",
      },
      {
        icon: TaskDone01FreeIcons,
        title: "Manual reconciliation",
        body: "Record cash, bank transfers, or cheques against any invoice with full audit trail.",
      },
      {
        icon: ChartLineData02FreeIcons,
        title: "Finance reports",
        body: "Monthly P&L, outstanding balances, and per-property income — exportable as PDF or CSV.",
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "Stripe webhook required",
        body: "Make sure your Stripe webhook URL is configured in Settings → Integrations so payment statuses sync correctly.",
      },
    ],
  },
  {
    id: "communications",
    label: "Communications",
    title: "Chat, updates & website enquiries",
    intro:
      "Stay in sync with tenants, your team, and the people browsing your website — built-in chat, broadcasts, a combined Updates feed, and an inbox for messages from your public contact form.",
    icon: MessageMultiple02FreeIcons,
    accent: "fuchsia",
    bullets: [
      {
        icon: MessageMultiple02FreeIcons,
        title: "Real-time chat",
        body: "1-on-1 and group threads, powered by Server-Sent Events for instant delivery.",
      },
      {
        icon: Mail01FreeIcons,
        title: "Inquiries inbox (new in 3.0)",
        body: "Messages from the public contact form land in Inbox → Inquiries with an INQ- reference. Search, filter by status and topic, and reply without leaving the dashboard.",
      },
      {
        icon: Notification01FreeIcons,
        title: "Updates: one feed (new in 3.0)",
        body: "Announcements and Notifications are now a single Updates entry with a combined unread badge and a tab for each. Your old bookmarks still work — they redirect to the matching tab.",
      },
      {
        icon: Megaphone02FreeIcons,
        title: "Announcements",
        body: "Broadcast to all tenants of a property or building — now the Announcements tab inside Updates.",
      },
      {
        icon: CustomerSupportFreeIcons,
        title: "Support tickets",
        body: "Open a ticket directly with the PropertyPro team for product-level help.",
      },
    ],
    callouts: [
      {
        tone: "tip",
        title: "Replies go out as real email",
        body: "Answering an inquiry emails the prospect with their original message quoted underneath, and sets reply-to to your own address so their answer comes back to you personally. Every reply is kept on the record with its author and timestamp.",
      },
      {
        tone: "note",
        title: "The Inquiries badge is a to-do list, not an unread count",
        body: "Opening an inquiry marks it read and moves it from New to In progress on its own, so the sidebar number means \"nobody has picked this up yet\". Replying to a closed inquiry reopens it as Replied; one marked Spam stays Spam.",
      },
      {
        tone: "warn",
        title: "Email needs SMTP configured",
        body: "Without SMTP set up under Settings → Email, inquiries are still stored and still badge the sidebar, but acknowledgements and staff alerts never send, and a reply is filed with an \"Email failed\" badge instead of being lost.",
      },
    ],
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    title: "Make decisions with data",
    intro:
      "Drill into occupancy, revenue, maintenance turnaround, and tenant satisfaction. Export anything in two clicks.",
    icon: ChartLineData02FreeIcons,
    accent: "rose",
    bullets: [
      {
        icon: ChartFreeIcons,
        title: "Property performance",
        body: "Per-building revenue, vacancy rate, and ROI over any time range.",
      },
      {
        icon: WrenchFreeIcons,
        title: "Maintenance metrics",
        body: "Average time-to-resolve, top issue categories, and technician workload.",
      },
      {
        icon: Money02FreeIcons,
        title: "Financial reports",
        body: "Income statements, ageing receivables, and tax-ready summaries.",
      },
      {
        icon: Download04FreeIcons,
        title: "Export anywhere",
        body: "Every report exports to PDF, CSV, or Excel — share with accountants without copy-paste.",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings & Roles",
    title: "Tune your workspace",
    intro:
      "Manage team members, set granular permissions, switch language, and personalize the look of your dashboard.",
    icon: Settings01FreeIcons,
    accent: "slate",
    bullets: [
      {
        icon: UserSettings01FreeIcons,
        title: "Team & roles",
        body: "Built-in roles are Admin, Manager, and Tenant. New in 3.0: Manager and Tenant are editable, so you can decide locally what a manager may do. Admin stays locked — it's the recovery role. Build anything else as a custom role.",
      },
      {
        icon: LockedFreeIcons,
        title: "Delete rights are separate now",
        body: "New in 3.0: deleting leases, tenants, payments, documents, properties, or users each needs its own permission, and none of them come along with the matching edit right. The built-in Manager ships without them — grant them deliberately.",
      },
      {
        icon: Globe02FreeIcons,
        title: "Public site access",
        body: "The public_site_management permission controls who can edit your website. Admins have it, and existing custom admin roles that hold system settings keep access unchanged.",
      },
      {
        icon: ShieldFreeIcons,
        title: "Sign-in security",
        body: "Passwords are now a minimum of 8 characters. Changing a password — or an admin resetting one — signs that account out everywhere else, and repeated failed sign-ins are rate limited.",
      },
      {
        icon: TranslateFreeIcons,
        title: "Multi-language",
        body: "Switch the entire UI between supported languages — your tenants get their own language too.",
      },
      {
        icon: Moon02FreeIcons,
        title: "Dark mode",
        body: "Toggle in the topbar. Respects your system preference by default — including the operating system's reduce-motion setting, which 3.0 now honours across the app.",
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "Custom roles can't borrow a built-in name",
        body: "Names like super_admin, landlord, owner, or property_manager are reserved. Before 3.0 a role named this way was created but silently granted the full built-in permission set while the screen showed only what you picked — worth re-checking any custom roles made on an older version.",
      },
      {
        tone: "note",
        title: "Managers lost delete rights on upgrade",
        body: "This is intentional, not a bug. If your managers need to delete leases, tenants, or payments, edit the built-in Manager role and grant the specific delete permissions you want them to have.",
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile & PWA",
    title: "Work from anywhere",
    intro:
      "Install PropertyPro to your home screen for an app-like experience with offline access and push notifications.",
    icon: SmartPhone01FreeIcons,
    accent: "cyan",
    steps: [
      {
        title: "Install the PWA",
        body: "On Chrome/Edge, click the install icon in the address bar. On iOS Safari, tap Share → Add to Home Screen.",
      },
      {
        title: "Enable push notifications",
        body: "Allow notifications when prompted to receive instant alerts for payments, requests, and chats.",
      },
      {
        title: "Work offline",
        body: "Recently viewed pages remain accessible without a connection — changes sync once you're back online.",
      },
    ],
    callouts: [
      {
        tone: "tip",
        title: "Tenant-friendly",
        body: "Encourage tenants to install the PWA so they get instant payment reminders and chat replies.",
      },
    ],
  },
  {
    id: "tips",
    label: "Tips & Shortcuts",
    title: "Power-user productivity",
    intro:
      "A few shortcuts and habits that will make you fly through PropertyPro every day.",
    icon: KeyboardFreeIcons,
    accent: "blue",
    bullets: [
      {
        icon: SearchFreeIcons,
        title: "Press / to search",
        body: "Global search jumps to any tenant, unit, lease, or invoice in one keystroke.",
      },
      {
        icon: Copy01FreeIcons,
        title: "Duplicate leases",
        body: "Use the Duplicate action on any lease to spin up a similar one — saves typing for portfolio rollouts.",
      },
      {
        icon: ShieldFreeIcons,
        title: "Use roles religiously",
        body: "Don't share admin accounts. Create per-person roles so audit trails stay meaningful.",
      },
      {
        icon: HelpCircleFreeIcons,
        title: "Need help? Open a ticket",
        body: "Use the in-app support module — we typically respond within one business day.",
      },
    ],
  },
];

const navGroups: { label: string; ids: string[] }[] = [
  { label: "Get Started", ids: ["getting-started", "dashboard", "tips"] },
  {
    label: "Core Modules",
    ids: [
      "properties",
      "applications",
      "tenants",
      "leases",
      "maintenance",
      "finance",
    ],
  },
  { label: "Your Website", ids: ["public-site"] },
  { label: "Insights", ids: ["communications", "reports"] },
  { label: "Configuration", ids: ["settings", "mobile"] },
];

const accentClass: Record<
  AccentKey,
  { bg: string; text: string; ring: string; soft: string; gradient: string }
> = {
  blue: {
    bg: "bg-blue-600",
    text: "text-blue-700",
    ring: "ring-blue-200",
    soft: "bg-blue-50",
    gradient: "from-blue-100 via-blue-50 to-cyan-50",
  },
  violet: {
    bg: "bg-violet-600",
    text: "text-violet-700",
    ring: "ring-violet-200",
    soft: "bg-violet-50",
    gradient: "from-violet-100 via-violet-50 to-fuchsia-50",
  },
  teal: {
    bg: "bg-teal-600",
    text: "text-teal-700",
    ring: "ring-teal-200",
    soft: "bg-teal-50",
    gradient: "from-teal-100 via-teal-50 to-emerald-50",
  },
  indigo: {
    bg: "bg-indigo-600",
    text: "text-indigo-700",
    ring: "ring-indigo-200",
    soft: "bg-indigo-50",
    gradient: "from-indigo-100 via-indigo-50 to-blue-50",
  },
  sky: {
    bg: "bg-sky-600",
    text: "text-sky-700",
    ring: "ring-sky-200",
    soft: "bg-sky-50",
    gradient: "from-sky-100 via-sky-50 to-blue-50",
  },
  amber: {
    bg: "bg-amber-600",
    text: "text-amber-700",
    ring: "ring-amber-200",
    soft: "bg-amber-50",
    gradient: "from-amber-100 via-amber-50 to-orange-50",
  },
  emerald: {
    bg: "bg-emerald-600",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
    soft: "bg-emerald-50",
    gradient: "from-emerald-100 via-emerald-50 to-teal-50",
  },
  fuchsia: {
    bg: "bg-fuchsia-600",
    text: "text-fuchsia-700",
    ring: "ring-fuchsia-200",
    soft: "bg-fuchsia-50",
    gradient: "from-fuchsia-100 via-fuchsia-50 to-pink-50",
  },
  rose: {
    bg: "bg-rose-600",
    text: "text-rose-700",
    ring: "ring-rose-200",
    soft: "bg-rose-50",
    gradient: "from-rose-100 via-rose-50 to-pink-50",
  },
  slate: {
    bg: "bg-slate-700",
    text: "text-slate-700",
    ring: "ring-slate-200",
    soft: "bg-slate-100",
    gradient: "from-slate-100 via-slate-50 to-zinc-50",
  },
  cyan: {
    bg: "bg-cyan-600",
    text: "text-cyan-700",
    ring: "ring-cyan-200",
    soft: "bg-cyan-50",
    gradient: "from-cyan-100 via-cyan-50 to-sky-50",
  },
};

const calloutStyles: Record<
  Callout["tone"],
  { wrap: string; iconWrap: string; icon: IconSvgElement; label: string }
> = {
  tip: {
    wrap: "border-emerald-200 bg-emerald-50/60",
    iconWrap: "bg-emerald-100 text-emerald-700",
    icon: CheckmarkCircle02FreeIcons,
    label: "text-emerald-800",
  },
  note: {
    wrap: "border-sky-200 bg-sky-50/60",
    iconWrap: "bg-sky-100 text-sky-700",
    icon: InformationCircleFreeIcons,
    label: "text-sky-800",
  },
  warn: {
    wrap: "border-amber-200 bg-amber-50/60",
    iconWrap: "bg-amber-100 text-amber-700",
    icon: Alert02FreeIcons,
    label: "text-amber-800",
  },
};

const tabs = [
  { label: "Documentation", href: "/docs" },
  { label: "User Manual", href: "/user-manual", active: true },
  { label: "Changelog", href: "/changelog" },
  { label: "FAQ", href: "/#faq" },
];

const sectionById = Object.fromEntries(sections.map((s) => [s.id, s]));

export default function UserManualPage() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [theme, setTheme] = useState<"light" | "system" | "dark">("light");
  const [feedback, setFeedback] = useState<"good" | "ok" | "bad" | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scrollspy
  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    targets.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return navGroups;
    return navGroups
      .map((g) => ({
        ...g,
        ids: g.ids.filter((id) => {
          const s = sectionById[id];
          if (!s) return false;
          const haystack = [
            s.label,
            s.title,
            s.intro,
            ...(s.steps ?? []).flatMap((x) => [x.title, x.body]),
            ...(s.bullets ?? []).flatMap((x) => [x.title, x.body]),
            ...(s.callouts ?? []).flatMap((x) => [x.title, x.body]),
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        }),
      }))
      .filter((g) => g.ids.length > 0);
  }, [query]);

  const featuredCards = sections.slice(0, 4);

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      {/* Announcement banner */}
      {bannerOpen && (
        <div className="relative border-b border-slate-200 bg-slate-50 px-6 py-2.5 text-center text-xs">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 pr-8 text-slate-600">
            <HugeiconsIcon
              icon={InformationCircleFreeIcons}
              className="size-3.5 text-slate-400"
            />
            <span>
              <span className="font-medium text-slate-900">New:</span> Live
              support tickets are now built into PropertyPro.
            </span>
            <Link
              href="#communications"
              className="inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-700"
            >
              See how it works
              <HugeiconsIcon
                icon={ArrowUpRight01FreeIcons}
                className="size-3"
              />
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setBannerOpen(false)}
            aria-label="Dismiss banner"
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
          >
            <HugeiconsIcon icon={Cancel01FreeIcons} className="size-3.5" />
          </button>
        </div>
      )}

      <Navbar />

      {/* Docs sub-header (logo, search, tabs) */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 md:px-12">
          <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-6">
            {/* Breadcrumb / brand */}
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <HugeiconsIcon icon={Book02FreeIcons} className="size-4" />
              <span>Docs</span>
              <HugeiconsIcon
                icon={ArrowRight01FreeIcons}
                className="size-3 text-slate-300"
              />
              <span className="text-slate-900">User Manual</span>
              <span className="ml-2 hidden rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500 md:inline-block">
                v2.0
              </span>
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <HugeiconsIcon
                icon={SearchFreeIcons}
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                placeholder="Search the manual…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pr-16 pl-10 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
              <kbd className="absolute top-1/2 right-3 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-slate-400">
                ⌘ K
              </kbd>
            </div>

            {/* Ask AI button */}
            <Button className="h-10 shrink-0 rounded-full bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800">
              <HugeiconsIcon icon={SparklesFreeIcons} className="size-4" />
              Ask AI
            </Button>
          </div>

          {/* Tabs */}
          <nav className="mt-4 -mb-px flex flex-wrap items-center gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <Link
                key={t.label}
                href={t.href}
                className={cn(
                  "relative inline-flex h-10 items-center gap-2 px-3 text-sm font-medium whitespace-nowrap transition-colors",
                  t.active
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {t.label}
                {t.active && (
                  <span className="absolute right-3 -bottom-px left-3 h-0.5 rounded-full bg-blue-600" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 3-col layout */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-0 lg:grid-cols-[260px_minmax(0,1fr)_240px]">
        {/* Left sidebar */}
        <aside className="hidden border-r border-slate-200 lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="flex-1 overflow-y-auto px-5 py-8">
              {filteredGroups.length === 0 && (
                <p className="px-2 text-xs text-slate-500">
                  No matches for &ldquo;{query}&rdquo;
                </p>
              )}
              {filteredGroups.map((group) => (
                <div key={group.label} className="mb-7">
                  <p className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                    {group.label}
                  </p>
                  <ul className="space-y-0.5">
                    {group.ids.map((id) => {
                      const s = sectionById[id];
                      if (!s) return null;
                      const a = accentClass[s.accent];
                      const isActive = activeId === id;
                      return (
                        <li key={id}>
                          <a
                            href={`#${id}`}
                            className={cn(
                              "group flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors",
                              isActive
                                ? "bg-blue-50 font-medium text-blue-700"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                          >
                            <span
                              className={cn(
                                "flex size-5 shrink-0 items-center justify-center transition-colors",
                                isActive ? "text-blue-600" : a.text
                              )}
                            >
                              <HugeiconsIcon
                                icon={s.icon}
                                className="size-3.5"
                              />
                            </span>
                            <span className="truncate">{s.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Powered by */}
            <div className="border-t border-slate-200 px-5 py-4">
              <Link
                href="/"
                className="flex items-center gap-2.5 rounded-lg p-2 text-sm transition-colors hover:bg-slate-50"
              >
                <span className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm">
                  <HugeiconsIcon icon={HomeFreeIcons} className="size-3.5" />
                </span>
                <span className="text-xs">
                  <span className="block text-slate-400">Powered by</span>
                  <span className="block font-semibold text-slate-900">
                    PropertyPro
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <article className="min-w-0 px-6 py-10 md:px-12 md:py-14">
          {/* Crumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold tracking-wider text-slate-600 uppercase">
              Get Started
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            <span className="text-blue-600">
              <HugeiconsIcon icon={Book02FreeIcons} className="size-7" />
            </span>
            Overview
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Everything you need to master PropertyPro — from your first login
            to power-user shortcuts. Pick a chapter below or jump straight in.
          </p>

          {/* Featured card grid */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {featuredCards.map((s) => {
              const a = accentClass[s.accent];
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
                >
                  {/* Hero illustration */}
                  <div
                    className={cn(
                      "relative h-40 overflow-hidden bg-gradient-to-br",
                      a.gradient
                    )}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-white/30 blur-2xl"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-12 -left-8 size-32 rounded-full bg-white/40 blur-2xl"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative flex size-20 items-center justify-center rounded-2xl bg-white/70 shadow-lg shadow-slate-900/5 ring-1 ring-white/80 backdrop-blur-sm transition-transform group-hover:scale-105">
                        <span className={a.text}>
                          <HugeiconsIcon icon={s.icon} className="size-8" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-semibold text-slate-900">
                      {s.label}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-500">
                      {s.intro}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-slate-600 transition-colors group-hover:text-blue-600">
                      Read chapter
                      <HugeiconsIcon
                        icon={ArrowRight02FreeIcons}
                        className="size-3 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* All chapters */}
          <div className="mt-20 space-y-16">
            {sections.map((s, idx) => {
              const a = accentClass[s.accent];
              const next = sections[idx + 1];
              return (
                <section
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-24"
                >
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm",
                        a.bg
                      )}
                    >
                      <HugeiconsIcon icon={s.icon} className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-400">
                        Chapter {String(idx + 1).padStart(2, "0")} ·{" "}
                        {s.label}
                      </p>
                      <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                        {s.title}
                      </h2>
                    </div>
                    <a
                      href={`#${s.id}`}
                      aria-label={`Anchor link to ${s.label}`}
                      className="hidden shrink-0 rounded-md p-2 text-slate-300 transition-colors hover:bg-slate-100 hover:text-slate-700 md:inline-flex"
                    >
                      <HugeiconsIcon
                        icon={Copy01FreeIcons}
                        className="size-3.5"
                      />
                    </a>
                  </div>

                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                    {s.intro}
                  </p>

                  {/* Steps */}
                  {s.steps && (
                    <ol className="mt-8 space-y-3">
                      {s.steps.map((step, i) => (
                        <li
                          key={step.title}
                          className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 md:p-5"
                        >
                          <div
                            className={cn(
                              "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm",
                              a.bg
                            )}
                          >
                            {i + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-slate-900 md:text-base">
                              {step.title}
                            </h4>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">
                              {step.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}

                  {/* Bullets */}
                  {s.bullets && (
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <div
                          key={b.title}
                          className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300"
                        >
                          <div
                            className={cn(
                              "flex size-9 items-center justify-center rounded-lg",
                              a.soft,
                              a.text
                            )}
                          >
                            <HugeiconsIcon icon={b.icon} className="size-4" />
                          </div>
                          <h4 className="mt-3 text-sm font-semibold text-slate-900">
                            {b.title}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-slate-500">
                            {b.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Callouts */}
                  {s.callouts && (
                    <div className="mt-6 space-y-3">
                      {s.callouts.map((c, i) => {
                        const cs = calloutStyles[c.tone];
                        return (
                          <div
                            key={i}
                            className={cn(
                              "flex gap-3 rounded-xl border p-4",
                              cs.wrap
                            )}
                          >
                            <span
                              className={cn(
                                "flex size-8 shrink-0 items-center justify-center rounded-lg",
                                cs.iconWrap
                              )}
                            >
                              <HugeiconsIcon
                                icon={cs.icon}
                                className="size-4"
                              />
                            </span>
                            <div className="min-w-0">
                              <p
                                className={cn(
                                  "text-sm font-semibold",
                                  cs.label
                                )}
                              >
                                {c.title}
                              </p>
                              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                                {c.body}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Pager */}
                  {next && (
                    <div className="mt-10 flex justify-end border-t border-slate-100 pt-6">
                      <a
                        href={`#${next.id}`}
                        className="group inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-right transition-colors hover:border-slate-300 hover:bg-slate-50"
                      >
                        <div className="text-right">
                          <p className="text-[11px] font-medium text-slate-400">
                            Next
                          </p>
                          <p className="text-sm font-semibold text-slate-900">
                            {next.label}
                          </p>
                        </div>
                        <HugeiconsIcon
                          icon={ArrowRight02FreeIcons}
                          className="size-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-700"
                        />
                      </a>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <Link
                href="/changelog"
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <HugeiconsIcon icon={PencilEdit02FreeIcons} className="size-3.5" />
                Changelog
              </Link>
              <span className="text-slate-300">·</span>
              <span>Last updated April 28, 2026</span>
            </div>
            <a
              href="#getting-started"
              className="inline-flex items-center gap-1 font-medium text-slate-500 hover:text-slate-900"
            >
              ↑ Back to top
            </a>
          </div>
        </article>

        {/* Right sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 px-6 py-10">
            <p className="text-sm font-semibold text-slate-900">
              Was this helpful?
            </p>
            <div className="mt-3 flex items-center gap-2">
              {(
                [
                  { key: "good", icon: SmileFreeIcons },
                  { key: "ok", icon: NeutralFreeIcons },
                  { key: "bad", icon: SadFreeIcons },
                ] as const
              ).map((opt) => {
                const isActive = feedback === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setFeedback(opt.key)}
                    aria-label={`Feedback: ${opt.key}`}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full border transition-all",
                      isActive
                        ? "border-blue-300 bg-blue-50 text-blue-600 ring-2 ring-blue-100"
                        : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-700"
                    )}
                  >
                    <HugeiconsIcon icon={opt.icon} className="size-4" />
                  </button>
                );
              })}
            </div>
            {feedback && (
              <p className="mt-3 text-xs text-slate-500">
                Thanks for the feedback!
              </p>
            )}

            {/* Help card */}
            <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex size-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
                <HugeiconsIcon
                  icon={CustomerSupportFreeIcons}
                  className="size-4"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">
                Still stuck?
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Open a ticket from inside the dashboard and we&apos;ll respond
                within one business day.
              </p>
              <a
                href="https://support.neurolightstudio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Contact support
                <HugeiconsIcon
                  icon={ArrowRight02FreeIcons}
                  className="size-3"
                />
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Floating theme toggle */}
      <div className="fixed right-6 bottom-6 z-40 hidden items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-lg shadow-slate-900/5 lg:flex">
        {(
          [
            { key: "light", icon: Sun03FreeIcons },
            { key: "system", icon: ComputerFreeIcons },
            { key: "dark", icon: Moon02FreeIcons },
          ] as const
        ).map((opt) => {
          const isActive = theme === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => setTheme(opt.key)}
              aria-label={`${opt.key} theme`}
              className={cn(
                "flex size-8 items-center justify-center rounded-full transition-colors",
                isActive
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
              )}
            >
              <HugeiconsIcon icon={opt.icon} className="size-3.5" />
            </button>
          );
        })}
      </div>
    </main>
  );
}
