import Link from "next/link";
import { CATEGORIES, SITE_NAME } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-base-soft">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-extrabold text-white">
              {SITE_NAME.replace(" AI", "")} <span className="text-accent">AI</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-white/60">
              The party game for your group. Truth or dare, would you rather, never have
              I ever, all in one app.
            </p>
          </div>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-white/40">Play</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <Link href="/play" className="transition-colors hover:text-white">
                  Play in browser
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-white/40">Questions</p>
            <ul className="mt-3 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link href={`/${category.slug}`} className="transition-colors hover:text-white">
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-xs text-white/30">
          © {new Date().getFullYear()} {SITE_NAME}. Not affiliated with Apple Inc.
        </p>
      </div>
    </footer>
  );
}
