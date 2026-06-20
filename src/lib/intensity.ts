// Shared 1-10 intensity -> color/label ramp, used by IntensitySlider and
// QuestionCard so both always agree on what "level 8" looks like.

export interface IntensityMeta {
  label: string;
  color: string; // hex, used for inline styles (slider thumb/track)
  textClass: string; // tailwind text color class, matches `color`
}

const STOPS: { max: number; meta: IntensityMeta }[] = [
  { max: 2, meta: { label: "Chill", color: "#34d399", textClass: "text-emerald-400" } },
  { max: 4, meta: { label: "Easy", color: "#a3e635", textClass: "text-lime-400" } },
  { max: 6, meta: { label: "Heating Up", color: "#fb923c", textClass: "text-orange-400" } },
  { max: 8, meta: { label: "Spicy", color: "#ff2f87", textClass: "text-accent" } },
  { max: 10, meta: { label: "Savage", color: "#dc2626", textClass: "text-red-600" } },
];

export function getIntensityMeta(intensity: number): IntensityMeta {
  return STOPS.find((stop) => intensity <= stop.max)?.meta ?? STOPS[STOPS.length - 1].meta;
}
