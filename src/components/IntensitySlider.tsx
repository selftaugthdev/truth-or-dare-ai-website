"use client";

import { getIntensityMeta } from "@/lib/intensity";

type IntensitySliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export default function IntensitySlider({ value, onChange, min = 1, max = 10, className = "" }: IntensitySliderProps) {
  const meta = getIntensityMeta(value);

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-display font-bold text-white">Intensity</span>
        <span className="font-display font-bold" style={{ color: meta.color }}>
          {value}/10 &middot; {meta.label}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ accentColor: meta.color }}
        className="h-3 w-full cursor-pointer rounded-full bg-white/10"
        aria-label="Intensity level"
      />
    </div>
  );
}
