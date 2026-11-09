"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FaqSection({ faqs = [] }) {
  const [openIndices, setOpenIndices] = useState([0]);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (idx) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq" className="w-full bg-neutral-950 text-white font-sans py-20 sm:py-24 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-neutral-900 scroll-mt-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Heading */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            Pertanyaan yang{" "}
            <span className="block font-serif italic font-normal text-neutral-400 lowercase tracking-normal mt-1">
              sering diajukan.
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed max-w-md">
            Jawaban ringkas seputar spesialisasi backend engineering, keamanan sistem, integrasi IoT, dan ketersediaan kerja sama proyek.
          </p>
        </div>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={faq.id || idx}
                className="border-b border-neutral-800/80 pb-5 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group py-1"
                >
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#1b44ff] transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ff8a00] text-neutral-950 flex items-center justify-center shrink-0 transition-transform duration-200">
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[3]" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed pr-8">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

