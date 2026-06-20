import { getIntensityMeta } from "@/lib/intensity";

type QuestionCardProps =
  | {
      mode: "truth" | "dare" | "never-have-i-ever";
      text: string;
      intensity?: number;
      className?: string;
    }
  | {
      mode: "would-you-rather";
      optionA: string;
      optionB: string;
      intensity?: number;
      className?: string;
    };

const LABELS: Record<QuestionCardProps["mode"], string> = {
  truth: "Truth",
  dare: "Dare",
  "never-have-i-ever": "Never Have I Ever",
  "would-you-rather": "Would You Rather",
};

export default function QuestionCard(props: QuestionCardProps) {
  const label = LABELS[props.mode];
  const intensityMeta = props.intensity ? getIntensityMeta(props.intensity) : null;

  return (
    <div
      className={`rounded-3xl bg-card p-7 text-card-ink shadow-2xl shadow-black/40 sm:p-8 ${props.className ?? ""}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-dark">
          {label}
        </span>
        {intensityMeta && (
          <span className={`text-xs font-bold uppercase tracking-wide ${intensityMeta.textClass}`}>
            {intensityMeta.label}
          </span>
        )}
      </div>

      {props.mode === "would-you-rather" ? (
        <div className="mt-5 space-y-3">
          <p className="font-display text-xl font-bold leading-snug sm:text-2xl">{props.optionA}</p>
          <div className="flex items-center gap-3 text-sm font-bold uppercase text-card-ink/40">
            <span className="h-px flex-1 bg-card-ink/10" />
            or
            <span className="h-px flex-1 bg-card-ink/10" />
          </div>
          <p className="font-display text-xl font-bold leading-snug sm:text-2xl">{props.optionB}</p>
        </div>
      ) : (
        <p className="mt-5 font-display text-xl font-bold leading-snug sm:text-2xl">{props.text}</p>
      )}
    </div>
  );
}
