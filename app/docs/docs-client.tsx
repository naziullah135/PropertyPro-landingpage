"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
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
  Location01FreeIcons,
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
      "PropertyPro is a complete property management application built with Next.js 16, React 19, and MongoDB. Version 3.0 adds a public marketing website with online rental applications. This documentation covers everything from your first install to deploying in production.",
    icon: RocketFreeIcons,
    accent: "blue",
    bullets: [
      {
        icon: Book02FreeIcons,
        title: "What's in the package",
        body: "Full source code, database schema, seed data, a PWA-ready dashboard, and a public marketing site with a rental application checkout.",
      },
      {
        icon: ShieldFreeIcons,
        title: "License",
        body: "One regular license per end product. Lifetime updates within the same major version.",
      },
      {
        icon: SparklesFreeIcons,
        title: "Stack",
        body: "Next.js 16, React 19 + Compiler, TypeScript, Tailwind CSS v4, MongoDB, Better Auth, Stripe.",
      },
      {
        icon: CustomerSupportFreeIcons,
        title: "Support",
        body: "6 months of buyer support included. Renewable from your CodeCanyon account.",
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "Upgrading from v2.x? Run the migration first",
        body: "v3.0 replaces NextAuth with Better Auth and needs a one-time database migration — pnpm db:migrate-better-auth. Until it runs, every API call returns 503 and sign-in reports \"Invalid email or password\". See Upgrading to v3.0 before you do anything else.",
      },
      {
        tone: "tip",
        title: "Looking for end-user docs?",
        body: "If you're configuring tenants, leases, and day-to-day workflows, head to the User Manual instead.",
      },
    ],
  },
  {
    id: "upgrade-v3",
    label: "Upgrading to v3.0",
    title: "v2.x → v3.0: run the auth migration",
    intro:
      "Fresh install? Skip this section entirely. Upgrading from any 2.x version? v3.0 replaces NextAuth with Better Auth and needs a one-time database migration. The app refuses to serve requests until it has run.",
    icon: RefreshFreeIcons,
    accent: "rose",
    codes: [
      {
        lang: "bash",
        title: "The one command that matters",
        body: `# 1. Preview — writes nothing
pnpm db:migrate-better-auth --dry-run

# 2. Run it
pnpm db:migrate-better-auth`,
      },
    ],
    steps: [
      {
        title: "Back up first",
        body: "Settings → Backups → Create backup, or run mongodump. This is the entire rollback plan — do not skip it.",
        code: {
          lang: "bash",
          body: 'mongodump --uri="$MONGODB_URI" --archive=pre-v3-upgrade.archive --gzip',
        },
      },
      {
        title: "Copy the v3.0 files and install",
        body: "Preserve .env.local and your local ./uploads directory.",
        code: {
          lang: "bash",
          body: "pnpm install",
        },
      },
      {
        title: "Leave your environment alone",
        body: "No change is required. v3.0 reads BETTER_AUTH_SECRET first and falls back to AUTH_SECRET, then NEXTAUTH_SECRET. If you switch to the new names, copy the same value across — a new secret signs everyone out.",
      },
      {
        title: "Run the migration",
        body: "Additive and safe to re-run: it copies password hashes rather than moving them, and skips anything already migrated. If it is interrupted, just run it again.",
        code: {
          lang: "bash",
          body: "pnpm db:migrate-better-auth --dry-run   # preview\npnpm db:migrate-better-auth             # apply",
        },
      },
      {
        title: "Rebuild and verify",
        body: "Sign in with an existing account and its existing password, check that Settings → Security lists your session, and confirm terminating a session signs that device out.",
        code: {
          lang: "bash",
          body: "pnpm build\npnpm start",
        },
      },
      {
        title: "Run the optional migrations",
        body: "Not required to boot, but each fixes something. db:migrate-email-index lets you re-create a tenant whose account was deleted; db:backfill-coordinates puts pre-3.0 properties on the new maps.",
        code: {
          lang: "bash",
          body: "pnpm db:migrate-email-index\npnpm db:backfill-coordinates",
        },
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "Until the migration runs, every API call returns 503",
        body: "\"This deployment is running database schema v0 but the application requires v1.\" That is deliberate — v3.0 refuses to serve an un-migrated database rather than answering correct passwords with \"invalid credentials\". Sign-in is not covered by the gate, so it reports \"Invalid email or password\" instead; same cause, same fix.",
      },
      {
        tone: "note",
        title: "What the upgrade does and does not touch",
        body: "Passwords are unchanged — nobody has to reset anything. Users, properties, leases, payments, and tenants are untouched. Everyone is signed out once, because pre-3.0 logins were JWT-based and have no server-side record to convert.",
      },
      {
        tone: "warn",
        title: "Customized files: one import moved",
        body: "v3.0 changed 74 files mechanically. If you edited any of them, change next-auth/react to @/lib/auth-client — useSession, signIn, and signOut keep the same signatures. The old next-auth package is still installed so your build doesn't break, but it is scheduled for removal in v3.1.",
      },
      {
        tone: "tip",
        title: "Contacting support about an upgrade?",
        body: "Include the output of pnpm db:migrate-better-auth --dry-run. It identifies the state of your database immediately. The bundled UPGRADE.md has the full reference, including rollback.",
      },
    ],
  },
  {
    id: "quickstart",
    label: "Quickstart",
    title: "Get running in 5 minutes",
    intro:
      "If you're already comfortable with Node, pnpm, and MongoDB, this is the express path. Each step is expanded later in the docs.",
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
        body: "Duplicate the example env, then set MONGODB_URI and generate an auth secret. Everything else has a working default.",
        code: {
          lang: "bash",
          body: "cp .env.example .env.local\nopenssl rand -base64 32   # paste as BETTER_AUTH_SECRET",
        },
      },
      {
        title: "Load sample data (optional)",
        body: "Seeds demo properties, units, and tenants so the dashboard isn't empty. It creates no login.",
        code: {
          lang: "bash",
          body: "pnpm db:seed",
        },
      },
      {
        title: "Start the dev server",
        body: "Runs on http://localhost:3000. Leave it running for the next step.",
        code: {
          lang: "bash",
          body: "pnpm dev",
        },
      },
      {
        title: "Create your first administrator",
        body: "Add SETUP_SECRET to .env.local, restart, then call the one-time bootstrap endpoint. Remove the secret afterwards.",
        code: {
          lang: "bash",
          body: 'curl -X POST http://localhost:3000/api/setup/create-admin \\\n  -H "Content-Type: application/json" \\\n  -H "x-setup-secret: $SETUP_SECRET" \\\n  -d \'{"email":"you@example.com","password":"<strong password>","firstName":"Your","lastName":"Name"}\'',
        },
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "No default login ships with PropertyPro",
        body: "As of 3.0 there is no built-in admin account and no hardcoded password. The bootstrap endpoint above is the only way to create your first administrator, and it refuses to run once one exists.",
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
        title: "Node.js 20.19.28+",
        body: "Enforced by the package engines field. Use 20 LTS or 22 — Node 18 is not supported due to React Compiler dependencies.",
      },
      {
        icon: TaskAdd02FreeIcons,
        title: "pnpm 9+",
        body: "Required. Install with corepack enable && corepack prepare pnpm@latest --activate.",
      },
      {
        icon: Database02FreeIcons,
        title: "MongoDB 6+",
        body: "MongoDB Atlas is recommended. Self-hosted MongoDB works when MONGODB_URI points to your server.",
      },
      {
        icon: CloudUploadFreeIcons,
        title: "File storage",
        body: "Local disk by default (./uploads). Switch UPLOAD_STORAGE_PROVIDER to cloud for Cloudflare R2 — recommended on serverless hosts, where local disk does not persist.",
      },
    ],
    callouts: [
      {
        tone: "note",
        title: "Hosting suggestion",
        body: "For most buyers, Vercel + MongoDB Atlas is the fastest path. The full deploy guide covers VPS and Docker too.",
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
          body: "unzip propertypro-v3.0.0.zip -d ~/projects/\ncd ~/projects/propertypro",
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
          body: "npx tsc --noEmit\npnpm lint",
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
      "All secrets live in .env.local. The included .env.example documents every key — only the core block is needed to boot. Payment gateways, SMTP, and maps are normally configured in the admin panel and stored in the database; the matching env values are used only as a fallback when the admin field is empty.",
    icon: CodeFreeIcons,
    accent: "sky",
    codes: [
      {
        lang: "bash",
        title: ".env.local",
        body: `# ---- Required: core --------------------------------------------------
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster0.kbnje.mongodb.net/propertypro
# Self-hosted alternative
# MONGODB_URI=mongodb://mongo:password@your_ip_address:27017/propertypro
# MONGODB_DB=propertypro

# Public base URL, no trailing slash
BETTER_AUTH_URL=http://localhost:3000
# Generate with: openssl rand -base64 32
BETTER_AUTH_SECRET=replace-with-a-long-random-string

# Upgrading from v2.x? The old names are still read as a fallback
# (BETTER_AUTH_SECRET -> AUTH_SECRET -> NEXTAUTH_SECRET). Keep the SAME
# value — changing the secret signs everyone out.
# NEXTAUTH_SECRET=

# ---- First admin (delete after use) ----------------------------------
# Unlocks POST /api/setup/create-admin. Generate: openssl rand -hex 32
# SETUP_SECRET=

# ---- Application -----------------------------------------------------
APP_NAME=PropertyPro
APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
SUPPORT_EMAIL=support@example.com

# ---- File storage ----------------------------------------------------
# "local" (default, ./uploads) or "cloud" (Cloudflare R2)
UPLOAD_STORAGE_PROVIDER=local
# R2_ACCOUNT_ID=
# R2_ACCESS_KEY_ID=
# R2_SECRET_ACCESS_KEY=
# R2_BUCKET_NAME=
# R2_PUBLIC_URL=https://files.example.com
# NEXT_PUBLIC_R2_PUBLIC_URL=https://files.example.com

# ---- Maps (normally set in Settings -> Maps) -------------------------
# "leaflet" (OpenStreetMap, free, no key — default), "google", "disabled"
# MAPS_PROVIDER=leaflet
# Browser key: Maps JavaScript API + Places API, restrict by HTTP referrer
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
# Server key for db:backfill-coordinates: Geocoding API, restrict by IP
# GOOGLE_GEOCODING_API_KEY=

# ---- Stripe (fallback for the admin panel) ---------------------------
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ---- Email / SMTP (fallback for the admin panel) ---------------------
# EMAIL_SERVER_HOST=smtp.gmail.com
# EMAIL_SERVER_PORT=587
# EMAIL_SERVER_USER=you@example.com
# EMAIL_SERVER_PASSWORD=your-app-password
# EMAIL_FROM=PropertyPro <noreply@example.com>
ENABLE_EMAIL_NOTIFICATIONS=true

# ---- Web Push (VAPID) ------------------------------------------------
# npx web-push generate-vapid-keys
# NEXT_PUBLIC_VAPID_PUBLIC_KEY=
# VAPID_PRIVATE_KEY=
# VAPID_SUBJECT=mailto:support@example.com

# ---- Encryption ------------------------------------------------------
# Required before storing SSNs. 32+ chars, keep stable across deploys.
# DATA_ENCRYPTION_KEY=`,
      },
    ],
    envTable: [
      {
        key: "MONGODB_URI",
        required: true,
        description: "MongoDB Atlas or self-hosted connection string. In development it falls back to mongodb://localhost:27017/PropertyPro when omitted.",
      },
      {
        key: "MONGODB_DB",
        required: false,
        description: "Database name override, only used to build the localhost URI when MONGODB_URI is unset.",
      },
      {
        key: "BETTER_AUTH_SECRET",
        required: true,
        description: "Signs sessions and tokens. Generate with openssl rand -base64 32. Falls back to AUTH_SECRET then NEXTAUTH_SECRET, so v2.x deployments keep working untouched.",
      },
      {
        key: "BETTER_AUTH_URL",
        required: true,
        description: "Public base URL with no trailing slash, used for callbacks and links in email. Falls back to NEXTAUTH_URL then NEXT_PUBLIC_APP_URL.",
      },
      {
        key: "SETUP_SECRET",
        required: false,
        description: "Unlocks the one-time POST /api/setup/create-admin bootstrap. The endpoint is disabled while unset and refuses to run once any administrator exists. Remove it after creating your first admin.",
      },
      {
        key: "UPLOAD_STORAGE_PROVIDER",
        required: false,
        description: "local (default, writes to ./uploads) or cloud (Cloudflare R2). Serverless hosts need cloud — their filesystem does not persist between requests.",
      },
      {
        key: "R2_*",
        required: false,
        description: "Account ID, access key, secret, bucket, and public URL. Required only when UPLOAD_STORAGE_PROVIDER=cloud.",
      },
      {
        key: "MAPS_PROVIDER",
        required: false,
        description: "leaflet (OpenStreetMap, the default, needs no key), google, or disabled. Only a fallback — once a settings document exists, Settings → Maps wins.",
      },
      {
        key: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY",
        required: false,
        description: "Browser key for the Google provider, with Maps JavaScript API and Places API enabled. It is served to the browser and cannot be kept secret, so restrict it by HTTP referrer and set a quota cap.",
      },
      {
        key: "GOOGLE_GEOCODING_API_KEY",
        required: false,
        description: "Separate server-side key with the Geocoding API enabled, used only by db:backfill-coordinates. Restrict it by IP — a referrer-restricted key is rejected.",
      },
      {
        key: "STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET",
        required: false,
        description: "Fallback for the admin payment settings. The webhook secret belongs to the specific endpoint, not your account.",
      },
      {
        key: "EMAIL_SERVER_*",
        required: false,
        description: "Outbound SMTP for invites, receipts, reminders, and the new inquiry and application emails. SMTP_* names are accepted as aliases. Fallback for the admin email settings.",
      },
      {
        key: "NEXT_PUBLIC_DEMO_MODE",
        required: false,
        description: "Showcase deployments only. Renders the one-click demo login panel, and each row appears only if its NEXT_PUBLIC_DEMO_*_PASSWORD is also set. Never enable on a deployment holding real data.",
      },
      {
        key: "VAPID_*",
        required: false,
        description: "Required only for web push notifications. Generate with npx web-push generate-vapid-keys.",
      },
      {
        key: "DATA_ENCRYPTION_KEY",
        required: false,
        description: "Required before storing SSNs or other encrypted tenant identity data. At least 32 characters, and it must stay stable across deployments.",
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "Upgrading from v2.x? Keep your existing secret",
        body: "BETTER_AUTH_SECRET falls back to AUTH_SECRET and then NEXTAUTH_SECRET, so no env change is required. If you do switch to the new names, copy the same value across — generating a new secret signs every user out.",
      },
      {
        tone: "tip",
        title: "Generate a secret fast",
        body: "Run openssl rand -base64 32 for BETTER_AUTH_SECRET, and openssl rand -hex 32 for SETUP_SECRET.",
      },
    ],
  },
  {
    id: "database",
    label: "Database Setup",
    title: "Connect MongoDB & seed data",
    intro:
      "PropertyPro stores application data in MongoDB. Create a MongoDB Atlas cluster or self-hosted database, then point MONGODB_URI at it before starting the app.",
    icon: Database02FreeIcons,
    accent: "emerald",
    steps: [
      {
        title: "Create a MongoDB database",
        body: "Create a MongoDB Atlas cluster and database named propertypro, or prepare a self-hosted MongoDB instance.",
        code: {
          lang: "bash",
          body: "# MongoDB Atlas example\nMONGODB_URI=mongodb+srv://username:password@cluster0.kbnje.mongodb.net/propertypro",
        },
      },
      {
        title: "Allow network access",
        body: "In MongoDB Atlas, add your local IP address for development and your hosting provider's outbound IPs for production.",
        code: {
          lang: "txt",
          body: "Atlas → Network Access → Add IP Address",
        },
      },
      {
        title: "Seed demo data (optional)",
        body: "Loads demo properties, units, and tenants so the dashboard isn't empty. It creates no login — use the setup endpoint for that.",
        code: {
          lang: "bash",
          body: "pnpm db:seed",
        },
      },
      {
        title: "Run migrations when upgrading",
        body: "Fresh installs need none of these. Upgrading from v2.x requires the Better Auth migration — the app returns 503 on every request until it has run. Preview any of them with --dry-run.",
        code: {
          lang: "bash",
          body: "pnpm db:migrate-better-auth --dry-run   # preview, writes nothing\npnpm db:migrate-better-auth             # required, v2.x -> v3.0\npnpm db:migrate-email-index             # allows re-creating deleted tenants\npnpm db:backfill-coordinates            # puts pre-3.0 properties on the map",
        },
      },
      {
        title: "Inspect with MongoDB Compass",
        body: "Use MongoDB Compass or the Atlas Data Explorer to browse collections and verify seeded records.",
        code: {
          lang: "txt",
          body: "mongodb+srv://username:password@cluster0.kbnje.mongodb.net/propertypro",
        },
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "Production: skip the seed",
        body: "Never run pnpm db:seed against a live database — it inserts demo records intended for evaluation. Migrations are safe to re-run; they skip anything already done.",
      },
      {
        tone: "note",
        title: "db:backfill-coordinates is a dry run by default",
        body: "It lists what it would geocode, makes no API calls, and writes nothing. To apply, re-run with GEOCODE_APPLY=1 GEOCODE_CONFIRM=BACKFILL_COORDINATES and a GOOGLE_GEOCODING_API_KEY set — the script has no OpenStreetMap path, so it needs a Google key even on Leaflet installs.",
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
        title: "Visit the public site and the dashboard",
        body: "The site root is now the public marketing homepage, not a redirect to sign-in. The dashboard lives behind /auth/signin.",
        code: {
          lang: "txt",
          body: "Public site:  http://localhost:3000\nProperties:   http://localhost:3000/properties\nDashboard:    http://localhost:3000/dashboard",
        },
      },
    ],
    callouts: [
      {
        tone: "note",
        title: "No account yet?",
        body: "PropertyPro ships without any login. Create your first administrator with the SETUP_SECRET bootstrap covered in Quickstart and Admin & Roles.",
      },
      {
        tone: "tip",
        title: "Turn the public site off",
        body: "If you only want the management dashboard, open Dashboard → Public Site and switch the master toggle off. The root URL then behaves as it did in v2.x — sign-in for guests, dashboard for signed-in users.",
      },
    ],
  },
  {
    id: "cloudflare-r2",
    label: "Cloudflare R2",
    title: "Configure file storage with Cloudflare R2",
    intro:
      "PropertyPro uses Cloudflare R2 for property images, tenant documents, and other uploaded files. Configure one private write path through R2 API credentials and one public read URL for displaying saved files.",
    icon: FolderFileStorageFreeIcons,
    accent: "cyan",
    steps: [
      {
        title: "Create an R2 bucket",
        body: "In Cloudflare, open Storage & databases -> R2 and create a bucket for PropertyPro uploads. Use a lowercase bucket name with numbers and hyphens only, then place that exact bucket name in R2_BUCKET_NAME.",
        code: {
          lang: "bash",
          body: "R2_BUCKET_NAME=your-r2-bucket-name",
        },
      },
      {
        title: "Create a scoped R2 API token",
        body: "From the R2 overview, open Manage API Tokens, create an API token with Object Read & Write permission, and scope it to the PropertyPro bucket. Copy the Access Key ID, Secret Access Key, and account ID before leaving the confirmation screen.",
        code: {
          lang: "bash",
          body: `R2_ACCOUNT_ID=your-r2-account-id
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=your-r2-bucket-name`,
        },
      },
      {
        title: "Enable public file delivery",
        body: "For production, connect a custom domain such as assets.yourdomain.com to the bucket. For local testing only, you may enable the Cloudflare-managed r2.dev public development URL. Set both public URL variables to the exact origin with no trailing slash.",
        code: {
          lang: "bash",
          body: `# Production custom domain
R2_PUBLIC_URL=https://your-custom-domain.com
NEXT_PUBLIC_R2_PUBLIC_URL=https://your-custom-domain.com

# Local or staging with R2 public development URL
# R2_PUBLIC_URL=https://pub-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.dev
# NEXT_PUBLIC_R2_PUBLIC_URL=https://pub-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.dev`,
        },
      },
      {
        title: "Allow the image host in Next.js",
        body: "The bundled next.config.ts already allows r2.dev and r2.cloudflarestorage.com image hosts. If you use a custom R2 domain and render uploaded images through next/image, add that hostname to images.remotePatterns, then rebuild.",
        code: {
          lang: "ts",
          title: "next.config.ts",
          body: `images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "assets.yourdomain.com",
      port: "",
      pathname: "/**",
      search: "",
    },
  ],
}`,
        },
      },
      {
        title: "Verify uploads",
        body: "Restart the app after changing environment variables, upload a property image or tenant document, then open the saved file URL. If the upload succeeds but previews fail, check the public bucket URL and image remote pattern first.",
      },
    ],
    codes: [
      {
        lang: "txt",
        title: "R2 S3 endpoint format",
        body: "https://<ACCOUNT_ID>.r2.cloudflarestorage.com",
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "Keep write credentials server-only",
        body: "Never expose R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY in NEXT_PUBLIC_* variables. Only NEXT_PUBLIC_R2_PUBLIC_URL should be readable by the browser.",
      },
      {
        tone: "note",
        title: "Use custom domains in production",
        body: "Cloudflare's r2.dev public development URLs are intended for non-production traffic. A custom domain gives you normal Cloudflare cache, access control, WAF, and bot-management options.",
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
        body: "Easiest for new buyers. Free tier covers most small portfolios. EMAIL_SERVER_HOST=smtp.resend.com, EMAIL_SERVER_USER=resend.",
      },
      {
        icon: Mail01FreeIcons,
        title: "SendGrid",
        body: "Higher limits and better deliverability for large portfolios. EMAIL_SERVER_HOST=smtp.sendgrid.net.",
      },
      {
        icon: Mail01FreeIcons,
        title: "Postmark",
        body: "Best for transactional-only email. EMAIL_SERVER_HOST=smtp.postmarkapp.com.",
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
        body: "Always set up SPF, DKIM, and DMARC for EMAIL_FROM's domain — without it, emails land in spam.",
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
        body: "Project Settings → Environment Variables. Paste every key from your .env.local. Set APP_URL, NEXTAUTH_URL, and AUTH_URL to your Vercel URL.",
      },
      {
        title: "Connect MongoDB Atlas",
        body: "Add Vercel's outbound access to MongoDB Atlas Network Access, then set MONGODB_URI in Vercel before deploying.",
        code: {
          lang: "bash",
          body: "MONGODB_URI=mongodb+srv://username:password@cluster0.kbnje.mongodb.net/propertypro",
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
      "If you'd rather run on a VPS, PropertyPro ships with a production-ready Dockerfile and a sample docker-compose.yml that can run MongoDB alongside the app.",
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
    environment:
      MONGODB_URI: mongodb://propertypro:change-me@mongo:27017/propertypro?authSource=admin
    depends_on: [mongo]
  mongo:
    image: mongo:7
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: propertypro
      MONGO_INITDB_ROOT_PASSWORD: change-me
    volumes:
      - mongodata:/data/db
    ports: ["27017:27017"]

volumes:
  mongodata:`,
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
        title: "Seed demo data inside the container",
        body: "Load demo records only when you are setting up a test or evaluation instance.",
        code: {
          lang: "bash",
          body: "docker compose exec app pnpm db:seed",
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
        body: "Self-hosting MongoDB works but you'll own backups, replication, and upgrades. MongoDB Atlas offloads that work.",
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
        title: "Update application URLs",
        body: "Switch APP_URL, NEXTAUTH_URL, and AUTH_URL to https://yourdomain.com and redeploy. These are used in emails and auth callbacks.",
      },
    ],
  },
  {
    id: "admin-setup",
    label: "Admin & Roles",
    title: "Set up your team",
    intro:
      "PropertyPro ships with no accounts at all. Create the first administrator through the one-time bootstrap endpoint, then invite your team with scoped permissions.",
    icon: UserSettings01FreeIcons,
    accent: "indigo",
    steps: [
      {
        title: "Create the first administrator",
        body: "Add SETUP_SECRET to your environment and restart, then POST once to the bootstrap endpoint. It is disabled while the secret is unset and refuses to run once any administrator exists, so it cannot be replayed.",
        code: {
          lang: "bash",
          body: 'openssl rand -hex 32   # use as SETUP_SECRET\n\ncurl -X POST https://your-domain.com/api/setup/create-admin \\\n  -H "Content-Type: application/json" \\\n  -H "x-setup-secret: $SETUP_SECRET" \\\n  -d \'{"email":"you@example.com","password":"<strong password>","firstName":"Your","lastName":"Name"}\'',
        },
      },
      {
        title: "Remove the setup secret",
        body: "Delete SETUP_SECRET from your environment and redeploy. Its job is done.",
      },
      {
        title: "Invite your team",
        body: "Settings → Team → Invite. Each invitee gets an email with a one-time setup link and chooses their own password — minimum 8 characters as of 3.0.",
      },
      {
        title: "Assign roles",
        body: "Built-in roles are Admin, Manager, and Tenant. Manager and Tenant are now editable; Admin stays locked because it is the only guaranteed holder of role_management. Create custom roles under Settings → Roles.",
      },
      {
        title: "Grant delete rights explicitly",
        body: "New in 3.0: lease_delete, tenant_delete, payment_delete, document_delete, property_delete, and user_delete are separate permissions and are never implied by the matching edit grant. The built-in Manager ships without them, so managers cannot delete until you grant them. Bulk deletes also need bulk_operations.",
      },
      {
        title: "Audit log",
        body: "Every sensitive action is recorded, including public-site edits. Review under Settings → Activity.",
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "Never use seed:demo to create a real admin",
        body: "That script exists to populate public showcase deployments at well-known email addresses. It refuses to run under NODE_ENV=production unless ALLOW_PRODUCTION_SEED is set, and it will not run at all without demo passwords in the environment.",
      },
      {
        tone: "note",
        title: "Reserved role names",
        body: "Custom roles can no longer be named after a built-in role or its aliases (super_admin, landlord, owner, property_manager, and similar). Before 3.0 such a role was created but silently granted the full built-in permission set — check any custom roles created on an older version.",
      },
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
      "PropertyPro ships minor updates monthly. Your data survives every release. v3.0 is the one upgrade that needs a database migration — the bundled UPGRADE.md covers it in full, including rollback.",
    icon: RefreshFreeIcons,
    accent: "teal",
    steps: [
      {
        title: "Back up first",
        body: "Settings → Backups → Create backup, or run mongodump. On the v3.0 upgrade this is the entire rollback plan.",
      },
      {
        title: "Download the latest build",
        body: "From your CodeCanyon downloads. Compare the version against the Changelog to plan the update.",
      },
      {
        title: "Diff and merge",
        body: "Use git or your favorite diff tool to merge the new files, preserving .env.local and your local ./uploads directory.",
      },
      {
        title: "Install and rebuild",
        body: "Install dependencies and run a production build after merging each release.",
        code: {
          lang: "bash",
          body: "pnpm install\npnpm build",
        },
      },
      {
        title: "v2.x → v3.0 only: run the auth migration",
        body: "v3.0 replaces NextAuth with Better Auth. Passwords, properties, leases, payments, and tenants are untouched, but every user is signed out once because the old JWT logins have no server-side record to convert. The migration is additive and safe to re-run.",
        code: {
          lang: "bash",
          body: "pnpm db:migrate-better-auth --dry-run   # preview\npnpm db:migrate-better-auth",
        },
      },
      {
        title: "v2.x → v3.0 only: verify",
        body: "Sign in with an existing account and its existing password, confirm Settings → Security lists your session, and check that terminating a session signs that device out.",
      },
      {
        title: "Schedule database backups",
        body: "Use MongoDB Atlas automated backups or set up nightly mongodump on a VPS.",
        code: {
          lang: "bash",
          body: "# Cron: nightly backup at 02:00\n0 2 * * * mongodump --uri=\"$MONGODB_URI\" --archive=/backups/propertypro-$(date +\\%F).archive --gzip",
        },
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "Customized files and the v3.0 upgrade",
        body: "v3.0 changed 74 files mechanically. If you edited any of them, your copy is preserved and then out of step with the rest of the app. The usual fix is one import: next-auth/react becomes @/lib/auth-client, with useSession, signIn, and signOut keeping the same signatures. The old next-auth package is still installed so customized files don't break your build, but it is scheduled for removal in v3.1.",
      },
      {
        tone: "note",
        title: "Rolling back v3.0",
        body: "The migration copies password hashes rather than moving them, so restoring the v2.3 files works as long as nobody has changed their password since upgrading. Anyone who has must reset, or you restore the backup.",
      },
    ],
  },
  {
    id: "maps",
    label: "Maps & Geocoding",
    title: "Put your properties on the map",
    intro:
      "New in 3.0. Maps are a pluggable provider chosen in the app, not in a build step — the database setting wins over the environment, so switching provider needs no redeploy.",
    icon: Location01FreeIcons,
    accent: "emerald",
    steps: [
      {
        title: "Pick a provider",
        body: "Dashboard → Settings → Maps offers OpenStreetMap, Google Maps, or no maps. The same form is embedded in Public Site → Settings; both write the same setting.",
      },
      {
        title: "OpenStreetMap — the default, no setup",
        body: "Works on a fresh install with no API key, no Google Cloud account, and no credit card. Address search uses Nominatim, debounced and limited to queries of 3 characters or more to respect the OSM usage policy.",
      },
      {
        title: "Google Maps — optional",
        body: "Reveals an API key field. Enable Maps JavaScript API and Places API on the key, and restrict it by HTTP referrer. Google Maps requires a Cloud billing account.",
        code: {
          lang: "bash",
          body: "# Fallback only — Settings -> Maps takes precedence\nMAPS_PROVIDER=google\nNEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-browser-key",
        },
      },
      {
        title: "Geocode your existing properties",
        body: "Properties created before 3.0 have no coordinates and stay off the maps until you backfill them. Dry run by default: it lists what it would do, makes no API calls, and writes nothing.",
        code: {
          lang: "bash",
          body: "pnpm db:backfill-coordinates\n\n# Apply for real\nGEOCODE_APPLY=1 GEOCODE_CONFIRM=BACKFILL_COORDINATES \\\n  GOOGLE_GEOCODING_API_KEY=your-server-key \\\n  pnpm db:backfill-coordinates",
        },
      },
    ],
    callouts: [
      {
        tone: "warn",
        title: "The browser key is public — restrict it",
        body: "A Google Maps browser key is served to every visitor by design and cannot be kept secret. Restrict it by HTTP referrer to your own domains and set a daily quota cap in the Cloud console, or an unrestricted key can be lifted and billed against your account.",
      },
      {
        tone: "note",
        title: "The backfill needs a Google key either way",
        body: "It geocodes through Google only — there is no Nominatim path — so it needs a separate server-side, IP-restricted key with the Geocoding API enabled, even on installs running the free OpenStreetMap provider. It skips properties that already have coordinates, so an interrupted run can simply be re-run.",
      },
      {
        tone: "tip",
        title: "Heavy traffic? Move off the public OSM servers",
        body: "The Leaflet default points at OSM's shared tile and Nominatim infrastructure, which their usage policy says is unsuitable for production traffic. A busy install should switch to its own or a commercial tile and geocoding host.",
      },
    ],
  },
  {
    id: "public-site",
    label: "Public Site",
    title: "Control the public marketing website",
    intro:
      "New in 3.0. PropertyPro serves a public home page, properties browser, property and unit detail pages, and a contact page from the same install — all of it switchable and editable from Dashboard → Public Site.",
    icon: Globe02FreeIcons,
    accent: "fuchsia",
    steps: [
      {
        title: "Switch pages on or off",
        body: "A master toggle plus per-page switches for Home, Properties, Property detail, and Contact. A page is live only when both its own switch and the master switch are on, and toggles save the moment you flip them.",
      },
      {
        title: "Edit the copy",
        body: "Five editors cover Brand & navigation, Home, Properties, Contact, and FAQ — wordmark, logo, header and footer links, hero headline and background, feature cards, how-it-works steps, FAQ categories, contact methods, and per-page SEO and social share metadata.",
      },
      {
        title: "Accept rental applications",
        body: "With Property detail on, visitors can apply for a unit through the checkout: lease terms, occupants, income, and screening consent, filed as a rental application. No payment is taken. Switch that page off and both checkout URLs redirect instead of accepting applications.",
      },
      {
        title: "Grant access to the module",
        body: "The new public_site_management permission controls it. Built-in Admin has it, and existing custom admin roles holding system_settings keep access without any change.",
      },
      {
        title: "Reset to defaults",
        body: "Public Site → Module settings restores any single section, or the whole public site, to the copy the app shipped with, behind a confirmation dialog.",
      },
    ],
    callouts: [
      {
        tone: "note",
        title: "Switching a page off never deletes anything",
        body: "Signed-out visitors are redirected to /auth/signin and signed-in users to /dashboard — both targets editable, and both must be paths inside the app. Your stored copy comes back untouched when you switch the page on again.",
      },
      {
        tone: "tip",
        title: "Changes go live immediately",
        body: "The public routes render per request rather than from a build-time prerender, and every save clears the public route cache, so shared header and footer edits land on every page at once.",
      },
      {
        tone: "warn",
        title: "Image fields are paths, not uploads",
        body: "The hero background, feature card, and how-it-works images are path entry with a live preview. Put the file under /public first, then reference it — the editor warns when the path does not load.",
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
        icon: RefreshFreeIcons,
        title: "Every request returns 503 \"database schema v0 but the application requires v1\"",
        body: "The v3.0 auth migration has not run, or did not finish. Run pnpm db:migrate-better-auth. This message is deliberate — v3.0 refuses to serve an un-migrated database rather than answering correct passwords with \"invalid credentials\".",
      },
      {
        icon: ShieldFreeIcons,
        title: "\"Invalid email or password\" for a password you know is right",
        body: "Same cause as the 503 — sign-in is not covered by the schema gate. Run pnpm db:migrate-better-auth. If the migration has run, check that BETTER_AUTH_SECRET still holds your old NEXTAUTH_SECRET value; changing it signs everyone out.",
      },
      {
        icon: CodeFreeIcons,
        title: "Build fails on next-auth/react",
        body: "A file you customised still imports the old auth client. Change it to @/lib/auth-client — useSession, signIn, and signOut keep the same signatures and return shapes.",
      },
      {
        icon: Location01FreeIcons,
        title: "Properties don't appear on the map",
        body: "Properties created before 3.0 have no coordinates. Run pnpm db:backfill-coordinates with GEOCODE_APPLY=1 and a GOOGLE_GEOCODING_API_KEY. New properties get coordinates from the address autocomplete on the property form.",
      },
      {
        icon: UserSettings01FreeIcons,
        title: "Managers can no longer delete leases or tenants",
        body: "Expected in 3.0 — deleting now needs lease_delete, tenant_delete, payment_delete, document_delete, or user_delete, which no longer ride along with the edit grant. Edit the built-in Manager role or create a custom role to grant them.",
      },
      {
        icon: Database02FreeIcons,
        title: "MONGODB_URI connection refused",
        body: "Check the username, password, database name, and Atlas Network Access allowlist. For self-hosted MongoDB, confirm the authSource value.",
      },
      {
        icon: Mail01FreeIcons,
        title: "Inquiry and application emails never arrive",
        body: "Everything email-shaped depends on SMTP under Settings → Email. Without it inquiries and applications are still stored and still badge the sidebar, but acknowledgements and staff alerts are not sent and dashboard replies are filed with an \"Email failed\" badge.",
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
        body: "Check R2_* variables, NEXT_PUBLIC_R2_PUBLIC_URL, upload limits, and whether your Cloudflare R2 bucket allows public reads from the configured URL.",
      },
    ],
  },
];

const navGroups: { label: string; ids: string[] }[] = [
  {
    label: "Get Started",
    ids: ["overview", "upgrade-v3", "quickstart", "requirements"],
  },
  {
    label: "Installation",
    ids: ["download", "env", "database", "running"],
  },
  {
    label: "Configuration",
    ids: [
      "cloudflare-r2",
      "stripe",
      "email",
      "push",
      "maps",
      "public-site",
      "branding",
      "languages",
    ],
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
            <Link
              href="/changelog"
              className="inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-700"
            >
              Read changelog
              <HugeiconsIcon icon={ArrowUpRight01FreeIcons} className="size-3" />
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
              <span>Last updated May 2, 2026</span>
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
              <Link
                href="/user-manual"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <HugeiconsIcon icon={Book02FreeIcons} className="size-3.5" />
                User Manual
              </Link>
              <Link
                href="/changelog"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <HugeiconsIcon icon={CommandFreeIcons} className="size-3.5" />
                Changelog
              </Link>
              <Link
                href="/#faq"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                <HugeiconsIcon icon={HelpCircleFreeIcons} className="size-3.5" />
                FAQ
              </Link>
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
