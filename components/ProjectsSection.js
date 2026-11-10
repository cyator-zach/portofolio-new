"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export default function ProjectsSection({
  projects = [],
  filterKeyword = "",
}) {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const categories = ["Semua", ...new Set(projects.map((p) => p.category_name).filter(Boolean))];

  const filtered = projects.filter((repo) => {
    const matchCategory = selectedCategory === "Semua" || repo.category_name === selectedCategory;
    const matchKeyword =
      !filterKeyword ||
      repo.title?.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      repo.description?.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      (Array.isArray(repo.tech_stack) ? repo.tech_stack.join(" ") : repo.tech_stack || "")
        .toLowerCase()
        .includes(filterKeyword.toLowerCase());
    return matchCategory && matchKeyword;
  });

  return (
    <section id="repositories" className="relative w-full bg-white font-sans py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-neutral-200 scroll-mt-6 overflow-hidden">
      {/* Abstract Modern Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)] opacity-50" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#1b44ff]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight mt-1.5">
              Open Source <span className="font-serif italic font-normal text-[#1b44ff]">Repositories</span>.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-neutral-600 max-w-2xl font-normal leading-relaxed">
              Kompilasi proyek backend, microservices terdistribusi, dan infrastruktur sistem yang siap produksi dengan arsitektur teruji.
            </p>
            <a
              href="https://github.com/cyator-zach"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#1b44ff] underline underline-offset-4 mt-3 transition-colors"
            >
              Kunjungi semua di GitHub →
            </a>
          </div>

          {/* Right Header Controls (Category Filters & Carousel Arrows) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-neutral-950 text-white shadow-xs"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-950"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Left & Right Scroll Arrows */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="w-9 h-9 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-800 transition-colors cursor-pointer shadow-xs"
                title="Geser ke kiri"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="w-9 h-9 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-800 transition-colors cursor-pointer shadow-xs"
                title="Geser ke kanan"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {filtered.map((repo) => (
            <a
              key={repo.id}
              href={repo.demo_url || repo.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-[280px] sm:w-[340px] md:w-[380px] shrink-0 flex flex-col cursor-pointer"
            >
              <div className="aspect-[4/3] w-full rounded-2xl border border-neutral-200 bg-neutral-100 overflow-hidden relative group-hover:border-neutral-900 transition-all duration-300 shadow-xs group-hover:shadow-lg flex items-center justify-center">
                {repo.thumbnail_url ? (
                  <>
                    <img
                      src={repo.thumbnail_url}
                      alt={repo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/20 pointer-events-none" />
                  </>
                ) : (
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100/90 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />
                  </div>
                )}

                {/* macOS 3 Dots */}
                <div className={`absolute top-4 left-4 flex items-center gap-1.5 z-10 ${
                  repo.thumbnail_url ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] bg-black/25 backdrop-blur-xs px-2 py-1 rounded-full border border-white/15" : ""
                }`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>

                {/* Arrow Link Icon */}
                <div className={`absolute bottom-4 right-4 z-10 ${
                  repo.thumbnail_url ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] bg-black/25 backdrop-blur-xs p-1.5 rounded-full border border-white/15" : ""
                }`}>
                  <ArrowUpRight className={`w-4 h-4 transition-colors ${
                    repo.thumbnail_url ? "text-white group-hover:text-[#1b44ff]" : "text-neutral-400 group-hover:text-[#1b44ff]"
                  }`} />
                </div>
              </div>
              <div className="mt-3.5">
                <span className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-neutral-950 underline underline-offset-4 decoration-neutral-300 group-hover:decoration-[#1b44ff] group-hover:text-[#1b44ff] transition-colors leading-snug">
                  {repo.title} →
                </span>
              </div>
            </a>
          ))}

          {filtered.length === 0 && (
            <div className="w-full py-12 text-center text-sm text-neutral-400">
              Tidak ada repositori yang cocok dengan kata kunci.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

