import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            404
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
            Page not found
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-500 md:text-lg">
            This page may have moved, or the link may be out of date.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/">
              <Button className="h-11 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700">
                Back to homepage
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
