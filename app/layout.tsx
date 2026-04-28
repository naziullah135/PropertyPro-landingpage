import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import type { ScriptHTMLAttributes } from "react";
import { Geist, Geist_Mono, Figtree } from "next/font/google";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const plausibleScriptProps: ScriptHTMLAttributes<HTMLScriptElement> & {
  "data-domain": string;
} = {
  "data-domain": "propertypro.neurolightstudio.com",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PropertyPro - Property Management Software",
  description:
    "Manage your property business with PropertyPro - the all-in-one solution for property management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <PlausibleProvider
          src="https://analytics.neurolightstudio.com/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
          scriptProps={plausibleScriptProps}
          enabled={true}
        >
          {children}
        </PlausibleProvider>
      </body>
    </html>
  );
}
