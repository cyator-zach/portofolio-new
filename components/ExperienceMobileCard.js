"use client";

export default function ExperienceMobileCard({ exp, isSelected, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 hover:bg-white hover:border-[#1b44ff] transition-all cursor-pointer shadow-xs space-y-2 group"
    >
      <div className="flex items-center justify-between">
        <span className="font-serif italic font-normal text-xl text-neutral-950">
          {exp.start_date?.slice(0, 4)}
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#1b44ff] font-bold">
          {isSelected ? "Tutup ▲" : "Detail ↗"}
        </span>
      </div>
      <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider group-hover:text-[#1b44ff] transition-colors">
        {exp.role_title}
      </h4>
      <p className="text-xs text-neutral-600 font-medium">
        {exp.company_name}
      </p>

      {isSelected && (
        <div className="pt-3 border-t border-neutral-200 space-y-1.5 text-left">
          {exp.description ? (
            exp.description.split("\n").slice(0, 3).map((line, lIdx) => {
              const cleanLine = line.replace(/^[•\-\*]\s*/, "").trim();
              if (!cleanLine) return null;
              return (
                <div key={lIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b44ff] shrink-0 mt-1.5" />
                  <span>{cleanLine}</span>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-neutral-400 italic">Rincian kontribusi aktif.</p>
          )}
        </div>
      )}
    </div>
  );
}

