"use client";

import { useState } from "react";
import ExperiencePopover from "@/components/ExperiencePopover";
import ExperienceMobileCard from "@/components/ExperienceMobileCard";

export default function ExperienceSection({ experiences = [] }) {
  const [selectedExp, setSelectedExp] = useState(null);

  if (!experiences || experiences.length === 0) return null;

  // Urutkan kronologis dari awal karir hingga posisi terkini (kiri ke kanan)
  const items = [...experiences].sort((a, b) => new Date(a.start_date || 0) - new Date(b.start_date || 0));
  const n = items.length;

  // Hitung koordinat gelombang jalan (Wavy Road) 100% dinamis sesuai jumlah data dari DB
  const points = items.map((exp, i) => {
    const x = Math.round(((i + 1) / (n + 1)) * 1000);
    const isTop = i % 2 === 0;
    const y = isTop ? 120 : 260;
    return { ...exp, x, y, isTop };
  });

  // Susun path SVG kurva jalan aspal secara dinamis
  let roadPath = "M 0 190";
  let prevX = 0;
  let prevY = 190;
  for (const p of points) {
    const midX = Math.round((prevX + p.x) / 2);
    roadPath += ` C ${midX} ${prevY}, ${midX} ${p.y}, ${p.x} ${p.y}`;
    prevX = p.x;
    prevY = p.y;
  }
  roadPath += ` C ${Math.round((prevX + 1000) / 2)} ${prevY}, ${Math.round((prevX + 1000) / 2)} 190, 1000 190`;

  return (
    <section id="experience" className="relative w-full bg-white font-sans py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-neutral-200 scroll-mt-6 overflow-hidden">
      {/* Abstract Modern Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 [background-image:radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)] opacity-40" />
      <div className="absolute top-1/4 -right-24 w-80 h-80 bg-[#1b44ff]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight mt-1.5">
              Riwayat <span className="font-serif italic font-normal text-[#1b44ff]">Pekerjaan</span>.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-neutral-600 max-w-2xl font-normal leading-relaxed">
              Jejak langkah profesional dari infrastruktur jaringan lapangan, integrasi sistem tertanam, hingga arsitektur backend berkeamanan tinggi.
            </p>
          </div>
        </div>

        {/* Wavy Road Timeline Desktop */}
        <div className="relative w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-8">
          <div className="min-w-[960px] lg:min-w-[1100px] relative h-[500px] flex items-center justify-center select-none">
            
            {/* SVG Winding Road Track */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 380"
              preserveAspectRatio="none"
              fill="none"
            >
              <path d={roadPath} stroke="#27272a" strokeWidth="28" strokeLinecap="round" fill="none" />
              <path d={roadPath} stroke="#09090b" strokeWidth="24" strokeLinecap="round" fill="none" />
              <path d={roadPath} stroke="#ffffff" strokeWidth="2.5" strokeDasharray="9 9" fill="none" opacity="0.9" />
            </svg>

            {/* Milestones: Pin Badges & Cars */}
            {points.map((exp, idx) => {
              const year = exp.start_date ? exp.start_date.slice(0, 4) : "-";

              return (
                <div
                  key={exp.id || idx}
                  className="absolute"
                  style={{
                    left: `${(exp.x / 1000) * 100}%`,
                    top: `${(exp.y / 380) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Mobil Icon */}
                  <button
                    type="button"
                    onClick={() => setSelectedExp(selectedExp?.id === exp.id ? null : exp)}
                    className="relative z-20 cursor-pointer group hover:scale-110 transition-transform duration-300 focus:outline-none"
                    title={`Lihat detail: ${exp.role_title}`}
                  >
                    <img
                      src="/drivee-in-the-car_1751365041.svg"
                      alt="Car"
                      className="w-16 sm:w-20 h-auto object-contain drop-shadow-md"
                      style={{ transform: "scaleX(-1)" }}
                    />
                  </button>

                  {/* Milestone Info */}
                  <div
                    onClick={() => setSelectedExp(selectedExp?.id === exp.id ? null : exp)}
                    className={`absolute z-30 w-60 sm:w-72 text-center cursor-pointer group transition-transform duration-200 hover:scale-105 ${
                      exp.isTop
                        ? "bottom-20 sm:bottom-22 -translate-x-1/2 left-1/2"
                        : "top-20 sm:top-22 -translate-x-1/2 left-1/2"
                    }`}
                  >
                    <div className="font-serif italic font-normal text-2xl sm:text-3xl text-neutral-950 group-hover:text-[#1b44ff] transition-colors tracking-tight leading-none">
                      {year}
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-neutral-900 uppercase tracking-wider mt-2 group-hover:text-[#1b44ff] transition-colors leading-snug">
                      {exp.role_title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-neutral-500 font-normal leading-relaxed mt-1 max-w-[240px] mx-auto">
                      {exp.company_name}
                    </p>
                  </div>

                  {/* Floating Speech Bubble Popover */}
                  {selectedExp?.id === exp.id && (
                    <ExperiencePopover exp={exp} onClose={() => setSelectedExp(null)} />
                  )}
                </div>
              );
            })}

          </div>
        </div>

        {/* Mobile Fallback Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden pt-4">
          {items.map((exp) => (
            <ExperienceMobileCard
              key={exp.id}
              exp={exp}
              isSelected={selectedExp?.id === exp.id}
              onToggle={() => setSelectedExp(selectedExp?.id === exp.id ? null : exp)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
