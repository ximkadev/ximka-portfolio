interface PlaceholderProps {
  label: string;
  aspectRatio?: "video" | "square" | "wide" | "tall";
  className?: string;
}

const aspectMap = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  tall: "aspect-[3/4]",
};

export default function Placeholder({
  label,
  aspectRatio = "video",
  className = "",
}: PlaceholderProps) {
  return (
    <div
      className={`${aspectMap[aspectRatio]} w-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-3 p-6 ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
        <svg
          className="w-5 h-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18"
          />
        </svg>
      </div>
      <p className="text-xs font-mono text-slate-400 text-center uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}
