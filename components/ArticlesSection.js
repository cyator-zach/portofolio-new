"use client";

import { useState } from "react";

export default function ArticlesSection({
  articles = [],
  onSelectArticle = () => {},
}) {
  return (
    <section id="articles" className="w-full bg-[#f8fafc] font-sans py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-neutral-200 scroll-mt-6">
      <div className="max-w-[1400px] mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1b44ff] font-mono">
              RISET & PUBLIKASI TEKNIK
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight mt-1.5">
              Artikel & Jurnal Ilmiah<span className="text-[#1b44ff]">.</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-neutral-600 max-w-2xl font-normal leading-relaxed">
              Kajian mendalam tentang optimasi sistem, IoT embedded, dan arsitektur data yang dipublikasikan secara akademik dan profesional.
            </p>
          </div>
        </div>

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="group flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 hover:border-neutral-400 p-6 sm:p-8 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1b44ff] font-bold text-[10px] uppercase">
                    {art.category_name || "JURNAL ILMIAH"}
                  </span>
                  <span>
                    {art.created_at ? new Date(art.created_at).toLocaleDateString("id-ID", { dateStyle: "medium" }) : "Publikasi"}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight group-hover:text-[#1b44ff] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal line-clamp-3">
                  {art.summary || "Klik untuk membaca selengkapnya mengenai metodologi dan hasil pengujian riset ini..."}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#1b44ff]">
                <span>Baca Selengkapnya ↗</span>
                {art.canonical_url && (
                  <span className="text-neutral-400 font-mono text-[11px] font-normal">
                    Sinkron Jurnal Resmi
                  </span>
                )}
              </div>
            </div>
          ))}

          {articles.length === 0 && (
            <div className="col-span-2 py-12 text-center text-sm text-neutral-400">
              Belum ada artikel publikasi terdaftar.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

