interface PlaceholderProps {
  label: string;
  aspectRatio?: "video" | "square" | "wide" | "tall";
  tone?: "light" | "dark";
  className?: string;
}

const aspectMap = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  tall: "aspect-[3/4]",
};

const toneMap = {
  light: {
    frame: "bg-white border-slate-200 shadow-sm",
    bar: "bg-slate-50 border-slate-200",
    dot: "bg-slate-300",
    body: "bg-gradient-to-br from-slate-50 to-slate-100",
    iconWrap: "bg-teal-100 text-teal-500",
    label: "text-slate-400",
  },
  dark: {
    frame: "bg-white/5 border-white/10 shadow-lg shadow-black/20 backdrop-blur-sm",
    bar: "bg-white/5 border-white/10",
    dot: "bg-white/25",
    body: "bg-gradient-to-br from-white/[0.03] to-transparent",
    iconWrap: "bg-teal-400/15 text-teal-300",
    label: "text-slate-400",
  },
};

export default function Placeholder({
  label,
  aspectRatio = "video",
  tone = "light",
  className = "",
}: PlaceholderProps) {
  const t = toneMap[tone];

  return (
    <div
      className={`w-full rounded-xl border overflow-hidden ${t.frame} ${className}`}
    >
      {/* Barra de ventana */}
      <div className={`flex items-center gap-1.5 px-3 h-7 border-b ${t.bar}`}>
        <span className={`w-2 h-2 rounded-full ${t.dot}`} />
        <span className={`w-2 h-2 rounded-full ${t.dot}`} />
        <span className={`w-2 h-2 rounded-full ${t.dot}`} />
      </div>

      {/* Cuerpo */}
      <div
        className={`${aspectMap[aspectRatio]} w-full flex flex-col items-center justify-center gap-3 p-6 ${t.body}`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${t.iconWrap}`}
        >
          <svg
            className="w-5 h-5"
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
        <p
          className={`text-xs font-mono text-center uppercase tracking-wide ${t.label}`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
