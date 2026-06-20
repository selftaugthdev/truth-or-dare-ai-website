import { APP_STORE_URL } from "@/lib/site-config";

type AppStoreBadgeProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const PADDING: Record<NonNullable<AppStoreBadgeProps["size"]>, string> = {
  sm: "px-3 py-2 text-xs gap-2",
  md: "px-5 py-3 text-sm gap-3",
  lg: "px-7 py-4 text-base gap-3",
};

export default function AppStoreBadge({ size = "md", className = "" }: AppStoreBadgeProps) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center rounded-2xl bg-accent ${PADDING[size]} font-display font-bold text-white shadow-lg shadow-accent/30 transition-transform hover:scale-105 active:scale-95 ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" aria-hidden="true">
        <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.557-2.22-2.86-5.63-2.86-8.86 0-4.62 3.06-7.07 6.06-7.07 1.49 0 2.736.95 3.674.95.9 0 2.298-1.01 3.99-1.01.65 0 2.99.06 4.53 2.27-.12.08-2.7 1.55-2.7 4.74 0 3.68 3.34 4.97 3.45 4.99z" />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className="text-[10px] font-sans font-normal uppercase tracking-wide opacity-80">Download on the</span>
        <span>App Store</span>
      </span>
    </a>
  );
}
