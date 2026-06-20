import Link from "next/link";
import { CATEGORIES } from "@/lib/site-config";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          href={`/${category.slug}`}
          className="group rounded-2xl border border-surface-border bg-surface p-5 transition-colors hover:border-accent/50"
        >
          <span className="text-3xl">{category.emoji}</span>
          <p className="mt-3 font-display font-bold text-white">{category.occasionLabel}</p>
          <p className="mt-1 text-sm text-white/60">{category.hook}</p>
        </Link>
      ))}
    </div>
  );
}
