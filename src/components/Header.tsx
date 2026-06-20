import Link from "next/link";
import AppStoreBadge from "./AppStoreBadge";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-base/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-lg font-extrabold tracking-tight text-white">
          Truth or Dare <span className="text-accent">AI</span>
        </Link>

        <nav className="hidden items-center gap-6 font-sans text-sm font-medium text-white/80 md:flex">
          <Link href="/play" className="transition-colors hover:text-white">
            Play Now
          </Link>
          <Link href="/truth-or-dare-questions" className="transition-colors hover:text-white">
            Questions
          </Link>
        </nav>

        <span className="sm:hidden">
          <AppStoreBadge size="sm" />
        </span>
        <span className="hidden sm:inline-block">
          <AppStoreBadge size="md" />
        </span>
      </div>
    </header>
  );
}
