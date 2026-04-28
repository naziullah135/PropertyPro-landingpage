"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  ArrowRight01FreeIcons,
  ArrowRight02FreeIcons,
  ArrowUpRight01FreeIcons,
  SearchFreeIcons,
  Cancel01FreeIcons,
  InformationCircleFreeIcons,
  CheckmarkCircle02FreeIcons,
  Alert02FreeIcons,
  Sun03FreeIcons,
  ComputerFreeIcons,
  Moon02FreeIcons,
  Book02FreeIcons,
  SparklesFreeIcons,
  Copy01FreeIcons,
  TaskDone01FreeIcons,
  HomeFreeIcons,
  // Section icons
  RocketFreeIcons,
  Download04FreeIcons,
  ServerStack01FreeIcons,
  CloudUploadFreeIcons,
  ShieldFreeIcons,
  HelpCircleFreeIcons,
  // Specific section icons
  PlayCircleFreeIcons,
  TaskAdd02FreeIcons,
  Database02FreeIcons,
  CodeFreeIcons,
  CreditCardFreeIcons,
  Mail01FreeIcons,
  Notification01FreeIcons,
  PaintBrush02FreeIcons,
  TranslateFreeIcons,
  Globe02FreeIcons,
  CommandFreeIcons,
  ContainerFreeIcons,
  CertificateFreeIcons,
  UserSettings01FreeIcons,
  RefreshFreeIcons,
  BugFreeIcons,
  CustomerSupportFreeIcons,
  SmileFreeIcons,
  NeutralFreeIcons,
  SadFreeIcons,
  PencilEdit02FreeIcons,
  TerminalFreeIcons,
  FolderFileStorageFreeIcons,
  ShoppingBagAddFreeIcons,
} from "@hugeicons/core-free-icons";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

type CodeSnippet = { lang?: string; title?: string; body: string };
type Step = { title: string; body: string; code?: CodeSnippet };
type Bullet = { icon: IconSvgElement; title: string; body: string };
type Callout = { tone: "tip" | "note" | "warn"; title: string; body: string };
type EnvRow = { key: string; required: boolean; description: string };

type Section = {
  id: string;
  label: string;
  title: string;
  intro: string;
  icon: IconSvgElement;
  accent: AccentKey;
  steps?: Step[];
  bullets?: Bullet[];
  callouts?: Callout[];
  codes?: CodeSnippet[];
  envTable?: EnvRow[];
};

const sections: Section[] = [
  {
    id: "overview",
    label: "Overview",
    title: "Welcome to PropertyPro",
    intro:
      "PropertyPro is a complete property management application built with Next.js 16, React 19, and PostgreSQL. This documentation covers everything from your first install to deploying in production.",
    icon: RocketFreeIcons,
    accent: "blue",
    bullets: [
      {
        icon: Book02FreeIcons,
        title: "What's in the package",
        body: "Full source code, database schema, seed data, and a self-contained PWA-ready Next.js app.",
      },
      {
        icon: ShieldFreeIcons,
        title: "License",
        body: "One regular license per end product. Lifetime updates within the same major version.",
      },
      {
        icon: SparklesFreeIcons,
        title: "Stack",
        body: "Next.js 16, React 19 + Compiler, TypeScript, Tailwind CSS v4, PostgreSQL, Stripe.",
      },
      {
        icon: CustomerSupportFreeIcons,
        title: "Support",
        body: "6 months of buyer support included. Renewable from your CodeCanyon account.",
      },
    ],
    callouts: [
      {
        tone: "tip",
        title: "Looking for end-user docs?",
        body: "If you're configuring tenants, leases, and day-to-day workflows, head to the User Manual instead.",
      },
    ],
  },
  {
    id: "quickstart",
    label: "Quickstart",
    title: "Get running in 5 minutes",
    intro:
      "If you're already comfortable with Node, pnpm, and Postgres, this is the express path. Each step is expanded later in the docs.",
    icon: PlayCircleFreeIcons,
    accent: "violet",
    steps: [
      {
        title: "Install dependencies",
        body: "From the unzipped folder, install all packages with pnpm.",
        code: {
          lang: "bash",
          body: "cd propertypro\npnpm install",
        },
      },
      {
        title: "Copy env file",
        body: "Duplicate the example env and fill in your database, Stripe, and SMTP credentials.",
        code: {
          lang: "bash",
          body: "cp .env.example .env.local",
        },
      },
      {
        title: "Run migrations & seed",
        body: "Create the schema and load demo data so you can log in immediately.",
        code: {
          lang: "bash",
          body: "pnpm db:migrate\npnpm db:seed",
        },
      },
      {
        title: "Start the dev server",
        body: "Open http://localhost:3000 — the demo admin is admin@propertypro.app / admin1234.",
        code: {
          lang: "bash",
          body: "pnpm dev",
        },
      },
    ],
  },
  {
    id: "requirements",
    label: "Requirements",
    title: "System & runtime requirements",
    intro:
      "PropertyPro runs anywhere Node.js does. These versions are tested in CI — older versions may work but aren't supported.",
    icon: ServerStack01FreeIcons,
    accent: "teal",
    bullets: [
      {
        icon: TerminalFreeIcons,
        title: "Node.js 20.11+",
        body: "Use 20 LTS or 22. We do not support Node 18 due to React Compiler dependencies.",
      },
      {
        icon: TaskAdd02FreeIcons,
        title: "pnpm 9+",
        body: "Required. Install with corepack enable && corepack prepare pnpm@latest --activate.",
      },
      {
        icon: Database02FreeIcons,
        title: "PostgreSQL 14+",
        body: "Local Postgres, Supabase, Neon, or any managed Postgres provider works.",
      },
      {
        icon: CloudUploadFreeIcons,
        title: "Object storage (optional)",
        body: "S3, Cloudflare R2, or local disk for property photos and tenant documents.",
      },
    ],
    callouts: [
      {
        tone: "note",
        title: "Hosting suggestion",
        body: "For most buyers, Vercel + Supabase is the fastest path. The full deploy guide covers VPS and Docker too.",
      },
    ],
  },
  {
    id: "download",
    label: "Download & Setup",
    title: "Get the source running locally",
    intro:
      "Download from CodeCanyon, unzip, and install. PropertyPro ships as a ready-to-run Next.js project — no build steps required to start dev.",
    icon: Download04FreeIcons,
    accent: "indigo",
    steps: [
      {
        title: "Download from CodeCanyon",
        body: "Sign in to CodeCanyon → Downloads → PropertyPro. Choose 'All files & documentation'.",
      },
      {
        title: "Unzip the package",
        body: "Extract the archive to a permanent location. The main folder is /propertypro.",
        code: {
          lang: "bash",
          body: "unzip propertypro-v2.0.0.zip -d ~/projects/\ncd ~/projects/propertypro",
        },
      },
      {
        title: "Install dependencies",
        body: "We use pnpm for fast, deterministic installs. Run this once after every download or update.",
        code: {
          lang: "bash",
          body: "pnpm install",
        },
      },
      {
        title: "Verify the install",
        body: "A quick smoke test confirms everything resolved correctly.",
        code: {
          lang: "bash",
          body: "pnpm typecheck\npnpm lint",
        },
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "Don't use npm or yarn",
        body: "The lockfile is pnpm-only. Mixing package managers will corrupt resolutions — stick to pnpm.",
      },
    ],
  },
  {
    id: "env",
    label: "Environment Variables",
    title: "Configure .env.local",
    intro:
      "All secrets live in .env.local. The included .env.example documents every key. Below is the minimum required set.",
    icon: CodeFreeIcons,
    accent: "sky",
    codes: [
      {
        lang: "bash",
        title: ".env.local",
        body: `# Core
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://user:pass@localhost:5432/propertypro
AUTH_SECRET=run \\\`openssl rand -base64 32\\\`

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Email (SMTP)
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASSWORD=re_...
SMTP_FROM="PropertyPro <noreply@yourdomain.com>"

# Push notifications (VAPID)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=B...
VAPID_PRIVATE_KEY=...

# Storage (optional)
S3_ENDPOINT=https://s3.amazonaws.com
S3_BUCKET=propertypro
S3_ACCESS_KEY=...
S3_SECRET_KEY=...`,
      },
    ],
    envTable: [
      {
        key: "DATABASE_URL",
        required: true,
        description: "PostgreSQL connection string. Include ?sslmode=require for hosted DBs.",
      },
      {
        key: "AUTH_SECRET",
        required: true,
        description: "Random 32-byte secret used to sign session tokens. Never commit this.",
      },
      {
        key: "NEXT_PUBLIC_APP_URL",
        required: true,
        description: "Public URL of your deployment, used in emails and OAuth redirects.",
      },
      {
        key: "STRIPE_SECRET_KEY",
        required: true,
        description: "Server-side Stripe key. Use test keys in development.",
      },
      {
        key: "STRIPE_WEBHOOK_SECRET",
        required: true,
        description: "Signing secret for the /api/webhooks/stripe endpoint.",
      },
      {
        key: "SMTP_*",
        required: true,
        description: "Outbound email credentials for invites, receipts, and reminders.",
      },
      {
        key: "VAPID_*",
        required: false,
        description: "Required only if you want web push notifications. Generate with pnpm gen:vapid.",
      },
      {
        key: "S3_*",
        required: false,
        description: "If unset, uploads fall back to /public/uploads on local disk.",
      },
    ],
    callouts: [
      {
        tone: "tip",
        title: "Generate AUTH_SECRET fast",
        body: "Run openssl rand -base64 32 in your terminal and paste the output as the value.",
      },
    ],
  },
  {
    id: "database",
    label: "Database Setup",
    title: "Create the schema & seed data",
    intro:
      "PropertyPro uses Drizzle migrations. After pointing DATABASE_URL at an empty database, the schema is created in a single command.",
    icon: Database02FreeIcons,
    accent: "emerald",
    steps: [
      {
        title: "Create an empty database",
        body: "Use psql or any GUI to create a fresh database for PropertyPro to own.",
        code: {
          lang: "bash",
          body: 'createdb propertypro\n# or via psql:\npsql -c "CREATE DATABASE propertypro;"',
        },
      },
      {
        title: "Run migrations",
        body: "Applies all schema migrations bundled with the release.",
        code: {
          lang: "bash",
          body: "pnpm db:migrate",
        },
      },
      {
        title: "Seed demo data (optional)",
        body: "Loads two demo properties, ten units, three tenants, and an admin account so you can explore immediately.",
        code: {
          lang: "bash",
          body: "pnpm db:seed",
        },
      },
      {
        title: "Inspect with Drizzle Studio",
        body: "Open a local web UI to browse and edit data. Useful for debugging.",
        code: {
          lang: "bash",
          body: "pnpm db:studio",
        },
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "Production: skip the seed",
        body: "Never run pnpm db:seed against a live database — it inserts demo records with predictable IDs.",
      },
    ],
  },
  {
    id: "running",
    label: "Running Locally",
    title: "Start the dev server",
    intro:
      "Two scripts cover 99% of dev work: dev and build. The PWA service worker is disabled in dev to keep iteration fast.",
    icon: TerminalFreeIcons,
    accent: "amber",
    steps: [
      {
        title: "Start in development",
        body: "Hot-reload, fast refresh, and source maps. Defaults to port 3000.",
        code: {
          lang: "bash",
          body: "pnpm dev",
        },
      },
      {
        title: "Run a production build",
        body: "Compiles, treeshakes, and runs Next.js production server. Use this to validate before deploying.",
        code: {
          lang: "bash",
          body: "pnpm build\npnpm start",
        },
      },
      {
        title: "Sign in with the demo admin",
        body: "If you ran the seed, an admin account exists out of the box.",
        code: {
          lang: "txt",
          body: "Email:    admin@propertypro.app\nPassword: admin1234",
        },
      },
    ],
    callouts: [
      {
        tone: "note",
        title: "Change the demo password",
        body: "First action in production: log in, open Settings → Profile, and rotate the seeded password.",
      },
    ],
  },
  {
    id: "stripe",
    label: "Stripe Payments",
    title: "Accept rent payments online",
    intro:
      "PropertyPro uses Stripe Checkout for one-time invoices and Stripe Customer Portal for tenant self-service. Both work with test keys out of the box.",
    icon: CreditCardFreeIcons,
    accent: "fuchsia",
    steps: [
      {
        title: "Get your API keys",
        body: "Stripe Dashboard → Developers → API keys. Copy the secret and publishable keys into .env.local.",
      },
      {
        title: "Create a webhook endpoint",
        body: "Point Stripe at /api/webhooks/stripe on your deployed URL. Subscribe to checkout.session.completed and invoice.payment_succeeded.",
        code: {
          lang: "bash",
          body: "# Webhook URL\nhttps://yourdomain.com/api/webhooks/stripe",
        },
      },
      {
        title: "Test webhooks locally",
        body: "Use the Stripe CLI to forward events to your dev server while developing.",
        code: {
          lang: "bash",
          body: "stripe listen --forward-to localhost:3000/api/webhooks/stripe",
        },
      },
      {
        title: "Switch to live mode",
        body: "When ready, swap test keys (sk_test_*, pk_test_*) for live keys (sk_live_*, pk_live_*) and re-create the webhook in live mode.",
      },
    ],
  },
  {
    id: "email",
    label: "Email / SMTP",
    title: "Wire up transactional email",
    intro:
      "Lease reminders, payment receipts, password resets, and tenant invites all go through one SMTP transport. We've tested Resend, SendGrid, Postmark, and standard SMTP servers.",
    icon: Mail01FreeIcons,
    accent: "rose",
    bullets: [
      {
        icon: Mail01FreeIcons,
        title: "Resend (recommended)",
        body: "Easiest for new buyers. Free tier covers most small portfolios. SMTP_HOST=smtp.resend.com, SMTP_USER=resend.",
      },
      {
        icon: Mail01FreeIcons,
        title: "SendGrid",
        body: "Higher limits and better deliverability for large portfolios. SMTP_HOST=smtp.sendgrid.net.",
      },
      {
        icon: Mail01FreeIcons,
        title: "Postmark",
        body: "Best for transactional-only email. SMTP_HOST=smtp.postmarkapp.com.",
      },
      {
        icon: Mail01FreeIcons,
        title: "Gmail / generic SMTP",
        body: "Works for testing but rate-limited. Not recommended for production.",
      },
    ],
    callouts: [
      {
        tone: "tip",
        title: "Verify your sender domain",
        body: "Always set up SPF, DKIM, and DMARC for SMTP_FROM's domain — without it, emails land in spam.",
      },
    ],
  },
  {
    id: "push",
    label: "Push Notifications",
    title: "Enable web push",
    intro:
      "Push notifications use the Web Push API with VAPID keys. Tenants and admins get instant alerts for payments, requests, and chats.",
    icon: Notification01FreeIcons,
    accent: "indigo",
    steps: [
      {
        title: "Generate VAPID keys",
        body: "Run the bundled generator. Copy both keys into .env.local.",
        code: {
          lang: "bash",
          body: "pnpm gen:vapid",
        },
      },
      {
        title: "Set NEXT_PUBLIC_VAPID_PUBLIC_KEY",
        body: "The client uses this public key to subscribe browsers to the push service.",
      },
      {
        title: "Set VAPID_PRIVATE_KEY",
        body: "The server uses this to sign push payloads. Never expose it to the browser.",
      },
      {
        title: "Test from the dashboard",
        body: "Sign in, allow notifications when prompted, then go to Settings → Notifications → Send test.",
      },
    ],
  },
  {
    id: "branding",
    label: "Branding & Theme",
    title: "Make it yours",
    intro:
      "All brand assets live under /public and the color palette is defined as Tailwind CSS variables. No code changes required for a basic rebrand.",
    icon: PaintBrush02FreeIcons,
    accent: "violet",
    steps: [
      {
        title: "Replace the logo",
        body: "Drop your SVG logo at /public/logo.svg. The dashboard reads from this path automatically.",
      },
      {
        title: "Update the favicon & PWA icons",
        body: "Replace /public/favicon.ico and the icons under /public/icons/ (sizes 192, 256, 384, 512).",
      },
      {
        title: "Tweak brand colors",
        body: "Edit the --brand-* tokens in app/globals.css. Tailwind picks them up across the app.",
        code: {
          lang: "css",
          title: "app/globals.css",
          body: `:root {
  --brand-50:  oklch(0.97 0.02 230);
  --brand-500: oklch(0.62 0.18 230);
  --brand-700: oklch(0.45 0.18 230);
}`,
        },
      },
      {
        title: "Update site metadata",
        body: "Edit app/layout.tsx to change the default title, description, and OG image.",
      },
    ],
  },
  {
    id: "languages",
    label: "Multi-language",
    title: "Add or edit languages",
    intro:
      "PropertyPro ships with English, Arabic, French, Spanish, and Bengali. Locales live as JSON files under /messages and are loaded with next-intl.",
    icon: TranslateFreeIcons,
    accent: "cyan",
    steps: [
      {
        title: "Edit existing strings",
        body: "Open /messages/<locale>.json and edit values directly. Changes hot-reload in dev.",
      },
      {
        title: "Add a new language",
        body: "Copy /messages/en.json to /messages/<your-locale>.json and translate values. Then register it in lib/i18n.ts.",
        code: {
          lang: "ts",
          title: "lib/i18n.ts",
          body: `export const locales = ["en", "ar", "fr", "es", "bn", "de"] as const;
export const defaultLocale = "en";`,
        },
      },
      {
        title: "RTL support",
        body: "Arabic is enabled by default and switches the layout direction automatically. Add other RTL locales in lib/i18n.ts → rtlLocales.",
      },
    ],
  },
  {
    id: "deploy-vercel",
    label: "Deploy to Vercel",
    title: "One-click deploy (recommended)",
    intro:
      "Vercel is the fastest path to production. The whole flow takes under 10 minutes once your environment variables are ready.",
    icon: Globe02FreeIcons,
    accent: "blue",
    steps: [
      {
        title: "Push to a GitHub repo",
        body: "Create a private GitHub repo and push the source. Vercel will pull from it.",
        code: {
          lang: "bash",
          body: "git init\ngit add .\ngit commit -m \"Initial PropertyPro setup\"\ngit remote add origin git@github.com:you/propertypro.git\ngit push -u origin main",
        },
      },
      {
        title: "Import the repo into Vercel",
        body: "vercel.com → New Project → Import. Vercel auto-detects Next.js — no build config needed.",
      },
      {
        title: "Add environment variables",
        body: "Project Settings → Environment Variables. Paste every key from your .env.local. Set NEXT_PUBLIC_APP_URL to your Vercel URL.",
      },
      {
        title: "Run migrations against production",
        body: "From your local machine, point DATABASE_URL at the production DB and run migrations once.",
        code: {
          lang: "bash",
          body: "DATABASE_URL=postgres://prod-url pnpm db:migrate",
        },
      },
      {
        title: "Add your custom domain",
        body: "Project Settings → Domains. SSL is provisioned automatically.",
      },
    ],
  },
  {
    id: "deploy-vps",
    label: "Deploy to VPS / Docker",
    title: "Self-host on your own server",
    intro:
      "If you'd rather run on a VPS, PropertyPro ships with a production-ready Dockerfile and a sample docker-compose.yml that bundles Postgres.",
    icon: ContainerFreeIcons,
    accent: "slate",
    codes: [
      {
        lang: "yaml",
        title: "docker-compose.yml",
        body: `services:
  app:
    build: .
    ports: ["3000:3000"]
    env_file: .env.local
    depends_on: [db]
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: propertypro
      POSTGRES_PASSWORD: change-me
      POSTGRES_DB: propertypro
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports: ["5432:5432"]

volumes:
  pgdata:`,
      },
    ],
    steps: [
      {
        title: "Build & start the stack",
        body: "From the project root, build the images and run them in the background.",
        code: {
          lang: "bash",
          body: "docker compose up -d --build",
        },
      },
      {
        title: "Run migrations inside the container",
        body: "Schema needs to be applied once on first boot.",
        code: {
          lang: "bash",
          body: "docker compose exec app pnpm db:migrate",
        },
      },
      {
        title: "Front with nginx + SSL",
        body: "Use nginx (or Caddy) to terminate TLS and proxy to localhost:3000. Caddy will provision Let's Encrypt automatically.",
        code: {
          lang: "nginx",
          title: "Caddyfile",
          body: `propertypro.yourdomain.com {
  reverse_proxy localhost:3000
}`,
        },
      },
    ],
    callouts: [
      {
        tone: "tip",
        title: "Use a managed database",
        body: "Self-hosting Postgres works but you'll own backups, replication, and upgrades. Supabase or Neon offload that work.",
      },
    ],
  },
  {
    id: "ssl",
    label: "Custom Domain & SSL",
    title: "Point your domain at PropertyPro",
    intro:
      "Once your app is live, route a custom domain to it. Both Vercel and Caddy provision SSL certificates for free.",
    icon: CertificateFreeIcons,
    accent: "emerald",
    steps: [
      {
        title: "Add an A or CNAME record",
        body: "For Vercel, add a CNAME pointing to cname.vercel-dns.com. For your VPS, point an A record at the server IP.",
      },
      {
        title: "Verify in Vercel / Caddy",
        body: "Vercel auto-verifies once DNS propagates. Caddy reissues the certificate on the next request.",
      },
      {
        title: "Update NEXT_PUBLIC_APP_URL",
        body: "Switch the env var to https://yourdomain.com and redeploy. This is used in emails and OAuth callbacks.",
      },
    ],
  },
  {
    id: "admin-setup",
    label: "Admin & Roles",
    title: "Set up your team",
    intro:
      "After your first deploy, lock down the demo admin and create real users with scoped permissions.",
    icon: UserSettings01FreeIcons,
    accent: "indigo",
    steps: [
      {
        title: "Sign in & rotate the demo password",
        body: "Log in as admin@propertypro.app, open Settings → Profile, and set a strong password.",
      },
      {
        title: "Invite your team",
        body: "Settings → Team → Invite. Each invitee gets an email with a one-time setup link.",
      },
      {
        title: "Assign roles",
        body: "Built-in roles: Admin, Manager, Accountant, Inspector, Tenant. Create custom roles under Settings → Roles.",
      },
      {
        title: "Audit log",
        body: "Every sensitive action is recorded. Review under Settings → Activity.",
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "Don't share admin accounts",
        body: "Shared logins break audit trails. Always invite a new user — even for short-term contractors.",
      },
    ],
  },
  {
    id: "updates",
    label: "Updates & Backups",
    title: "Stay current and recoverable",
    intro:
      "PropertyPro ships minor updates monthly. Every release is non-destructive — your data and customizations stay intact.",
    icon: RefreshFreeIcons,
    accent: "teal",
    steps: [
      {
        title: "Download the latest build",
        body: "From your CodeCanyon downloads. Compare the version against the Changelog to plan the update.",
      },
      {
        title: "Diff and merge",
        body: "Use git or your favorite diff tool to merge the new files. Your /messages and /public assets are safe to keep as-is.",
      },
      {
        title: "Run migrations",
        body: "Each release that touches the schema includes new migrations. Apply them once.",
        code: {
          lang: "bash",
          body: "pnpm install\npnpm db:migrate\npnpm build",
        },
      },
      {
        title: "Schedule database backups",
        body: "Use your hosting provider's automated backups (Supabase / Neon / RDS) or set up nightly pg_dump on a VPS.",
        code: {
          lang: "bash",
          body: "# Cron: nightly backup at 02:00\n0 2 * * * pg_dump $DATABASE_URL > /backups/propertypro-$(date +\\%F).sql",
        },
      },
    ],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    title: "Fix common issues",
    intro:
      "Most install problems fall into the same handful of buckets. Walk through these before opening a support ticket.",
    icon: BugFreeIcons,
    accent: "amber",
    bullets: [
      {
        icon: Database02FreeIcons,
        title: "DATABASE_URL refused / SSL required",
        body: "Add ?sslmode=require to your connection string when using Supabase, Neon, or RDS.",
      },
      {
        icon: CreditCardFreeIcons,
        title: "Stripe webhook signature invalid",
        body: "Make sure STRIPE_WEBHOOK_SECRET matches the secret of the specific endpoint, not your account secret.",
      },
      {
        icon: Mail01FreeIcons,
        title: "Emails landing in spam",
        body: "Set up SPF, DKIM, and DMARC for your sender domain. Resend & SendGrid have step-by-step UIs for this.",
      },
      {
        icon: Notification01FreeIcons,
        title: "Push notifications not arriving",
        body: "iOS Safari requires the PWA to be installed via Add to Home Screen first. Web push is unavailable in Incognito mode.",
      },
      {
        icon: ShoppingBagAddFreeIcons,
        title: "pnpm install fails",
        body: "Delete node_modules and pnpm-lock.yaml, run corepack enable, then pnpm install fresh.",
      },
      {
        icon: FolderFileStorageFreeIcons,
        title: "File uploads silently fail",
        body: "Check S3_* variables, or ensure /public/uploads is writable when using local-disk fallback.",
      },
    ],
  },
];

const navGroups: { label: string; ids: string[] }[] = [
  { label: "Get Started", ids: ["overview", "quickstart", "requirements"] },
  {
    label: "Installation",
    ids: ["download", "env", "database", "running"],
  },
  {
    label: "Configuration",
    ids: ["stripe", "email", "push", "branding", "languages"],
  },
  {
    label: "Deployment",
    ids: ["deploy-vercel", "deploy-vps", "ssl"],
  },
  { label: "Operations", ids: ["admin-setup", "updates"] },
  { label: "Help", ids: ["troubleshooting"] },
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
  { label: "Documentation", href: "/docs", active: true },
  { label: "User Manual", href: "/user-manual" },
  { label: "Changelog", href: "/changelog" },
  { label: "FAQ", href: "/#faq" },
];

const sectionById = Object.fromEntries(sections.map((s) => [s.id, s]));

function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-sm">
      {(snippet.title || snippet.lang) && (
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/40 px-3.5 py-2">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-rose-400/70" />
            <span className="size-2 rounded-full bg-amber-400/70" />
            <span className="size-2 rounded-full bg-emerald-400/70" />
            {snippet.title && (
              <span className="ml-2 font-mono text-xs text-slate-400">
                {snippet.title}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {snippet.lang && (
              <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-400 uppercase">
                {snippet.lang}
              </span>
            )}
            <button
              type="button"
              onClick={onCopy}
              aria-label="Copy code"
              className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
            >
              <HugeiconsIcon
                icon={copied ? TaskDone01FreeIcons : Copy01FreeIcons}
                className="size-3"
              />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed">
        <code className="font-mono text-slate-100">{snippet.body}</code>
      </pre>
    </div>
  );
}

export default function DocsPage() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [theme, setTheme] = useState<"light" | "system" | "dark">("light");
  const [feedback, setFeedback] = useState<"good" | "ok" | "bad" | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

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
            ...(s.steps ?? []).flatMap((x) => [x.title, x.body, x.code?.body ?? ""]),
            ...(s.bullets ?? []).flatMap((x) => [x.title, x.body]),
            ...(s.callouts ?? []).flatMap((x) => [x.title, x.body]),
            ...(s.codes ?? []).flatMap((x) => [x.title ?? "", x.body]),
            ...(s.envTable ?? []).flatMap((x) => [x.key, x.description]),
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
              <span className="font-medium text-slate-900">v2.0.0</span> is out —
              finance module, support tickets, push notifications.
            </span>
            <a
              href="/changelog"
              className="inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-700"
            >
              Read changelog
              <HugeiconsIcon icon={ArrowUpRight01FreeIcons} className="size-3" />
            </a>
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

      {/* Docs sub-header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 md:px-12">
          <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-6">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <HugeiconsIcon icon={Book02FreeIcons} className="size-4" />
              <span>Docs</span>
              <HugeiconsIcon
                icon={ArrowRight01FreeIcons}
                className="size-3 text-slate-300"
              />
              <span className="text-slate-900">Documentation</span>
              <span className="ml-2 hidden rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500 md:inline-block">
                v2.0
              </span>
            </div>

            <div className="relative flex-1">
              <HugeiconsIcon
                icon={SearchFreeIcons}
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                placeholder="Search the docs — try 'env', 'stripe', 'docker'…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pr-16 pl-10 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
              <kbd className="absolute top-1/2 right-3 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-slate-400">
                ⌘ K
              </kbd>
            </div>

            <Button className="h-10 shrink-0 rounded-full bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800">
              <HugeiconsIcon icon={SparklesFreeIcons} className="size-4" />
              Ask AI
            </Button>
          </div>

          <nav className="mt-4 -mb-px flex flex-wrap items-center gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <a
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
              </a>
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
                              <HugeiconsIcon icon={s.icon} className="size-3.5" />
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

            <div className="border-t border-slate-200 px-5 py-4">
              <a
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
              </a>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <article className="min-w-0 px-6 py-10 md:px-12 md:py-14">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold tracking-wider text-slate-600 uppercase">
              Documentation
            </span>
            <span className="text-slate-300">·</span>
            <span>Setup & installation</span>
          </div>

          <h1 className="mt-4 flex items-center gap-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            <span className="text-blue-600">
              <HugeiconsIcon icon={Book02FreeIcons} className="size-7" />
            </span>
            Setup & Installation
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Everything you need to install, configure, and deploy PropertyPro —
            from your first <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">pnpm install</code> to a custom domain on production.
          </p>

          {/* Featured cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {featuredCards.map((s) => {
              const a = accentClass[s.accent];
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
                >
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
                      Read section
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

          {/* All sections */}
          <div className="mt-20 space-y-16">
            {sections.map((s, idx) => {
              const a = accentClass[s.accent];
              const next = sections[idx + 1];
              return (
                <section key={s.id} id={s.id} className="scroll-mt-24">
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
                        Chapter {String(idx + 1).padStart(2, "0")} · {s.label}
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
                      <HugeiconsIcon icon={Copy01FreeIcons} className="size-3.5" />
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
                          className="rounded-xl border border-slate-200 bg-white p-4 md:p-5"
                        >
                          <div className="flex gap-4">
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
                              {step.code && (
                                <div className="mt-3">
                                  <CodeBlock snippet={step.code} />
                                </div>
                              )}
                            </div>
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

                  {/* Standalone code blocks */}
                  {s.codes && (
                    <div className="mt-8 space-y-4">
                      {s.codes.map((c, i) => (
                        <CodeBlock key={i} snippet={c} />
                      ))}
                    </div>
                  )}

                  {/* Env table */}
                  {s.envTable && (
                    <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase">
                          <tr>
                            <th className="px-4 py-3 tracking-wider">Key</th>
                            <th className="px-4 py-3 tracking-wider">Required</th>
                            <th className="px-4 py-3 tracking-wider">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {s.envTable.map((row) => (
                            <tr
                              key={row.key}
                              className="bg-white transition-colors hover:bg-slate-50/60"
                            >
                              <td className="px-4 py-3">
                                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-800">
                                  {row.key}
                                </code>
                              </td>
                              <td className="px-4 py-3">
                                {row.required ? (
                                  <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700">
                                    Required
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                                    Optional
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-slate-600">
                                {row.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
                              <HugeiconsIcon icon={cs.icon} className="size-4" />
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
              <a
                href="/docs#updates"
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <HugeiconsIcon icon={PencilEdit02FreeIcons} className="size-3.5" />
                Updates
              </a>
              <span className="text-slate-300">·</span>
              <span>Last updated April 28, 2026</span>
            </div>
            <a
              href="#overview"
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
                Need a hand installing?
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                We offer paid installation and customization services — typical
                turnaround is 24 hours.
              </p>
              <a
                href="/docs#quickstart"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Get installation help
                <HugeiconsIcon icon={ArrowRight02FreeIcons} className="size-3" />
              </a>
            </div>

            {/* Quick links */}
            <div className="mt-6 space-y-1">
              <p className="px-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                Related
              </p>
              <a
                href="/user-manual"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <HugeiconsIcon icon={Book02FreeIcons} className="size-3.5" />
                User Manual
              </a>
              <a
                href="/changelog"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <HugeiconsIcon icon={CommandFreeIcons} className="size-3.5" />
                Changelog
              </a>
              <a
                href="/#faq"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <HugeiconsIcon icon={HelpCircleFreeIcons} className="size-3.5" />
                FAQ
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
