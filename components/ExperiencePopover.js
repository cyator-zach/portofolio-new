"use client";

import { X } from "lucide-react";

export default function ExperiencePopover({ exp, onClose }) {
  if (!exp) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute z-50 w-72 sm:w-80 p-4 rounded-2xl bg-white border border-neutral-900 shadow-2xl transition-all duration-200 -translate-x-1/2 left-1/2 ${
        exp.isTop ? "top-12 sm:top-14" : "bottom-12 sm:bottom-14"
      }`}
    >
      {/* Triangle Pointer / Speech Bubble Arrow */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent ${
          exp.isTop
            ? "-top-2 border-b-8 border-b-neutral-900"
            : "-bottom-2 border-t-8 border-t-neutral-900"
        }`}
      />

      <div className="flex items-start justify-between gap-2 pb-2 border-b border-neutral-100">
        <div className="pr-2">
          <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider leading-snug">
            {exp.role_title}
          </h4>
          <span className="text-[10px] font-mono text-[#1b44ff] font-semibold mt-0.5 block">
            {exp.start_date?.slice(0, 7)} — {exp.end_date ? exp.end_date.slice(0, 7) : "Present"}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
          title="Tutup"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-2.5 space-y-1.5 text-left">
        {exp.description ? (
          exp.description.split("\n").slice(0, 3).map((line, lIdx) => {
            const cleanLine = line.replace(/^[•\-\*]\s*/, "").trim();
            if (!cleanLine) return null;
            return (
              <div key={lIdx} className="flex items-start gap-2 text-[11px] text-neutral-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1b44ff] shrink-0 mt-1.5" />
                <span>{cleanLine}</span>
              </div>
            );
          })
        ) : (
          <p className="text-[11px] text-neutral-400 italic">Rincian kontribusi aktif.</p>
        )}
      </div>
    </div>
  );
}

