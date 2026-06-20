import type { Metadata } from "next";
import PlayWidget from "@/components/PlayWidget";

export const metadata: Metadata = {
  title: "Play Truth or Dare Online Free",
  description:
    "Play truth or dare free in your browser. Switch to would you rather or never have I ever, set the intensity, and pass it around your group. No download.",
};

export default function PlayPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <h1 className="sr-only">Play Truth or Dare, Would You Rather, and Never Have I Ever Free</h1>
      <PlayWidget />
    </div>
  );
}
