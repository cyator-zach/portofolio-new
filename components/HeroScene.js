"use client";

import Image from "next/image";
import Link from "next/link";

const DEFAULT_SKILLS = [
  "Node.js", "Express", "REST API", "PostgreSQL", "MongoDB", "Docker",
  "Redis", "GraphQL", "Microservices", "CI/CD", "AWS", "Linux",
  "Git", "TypeScript", "Python", "System Design"
];

export default function HeroScene({
  skills = DEFAULT_SKILLS,
  activeSkill = "",
  onSelectSkill = () => {},
  whatsappUrl = "https://wa.me/62895600366624"
}) {
  const displaySkills = Array.isArray(skills) && skills.length > 0
    ? skills.map(s => typeof s === "object" ? s.name : s)
    : DEFAULT_SKILLS;

  return (
    <div className="relative min-h-[100dvh] bg-white text-neutral-950 flex flex-col justify-between overflow-hidden">
      {/* ===================== HERO MAIN STAGE (Editorial Layered Typography & Portrait) ===================== */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full px-3 sm:px-8 md:px-12 -mt-8 xs:-mt-12 sm:-mt-8 md:-mt-10 select-none overflow-hidden bg-white">
        
        {/* Layer 1: Background Typography Stage */}
        <div className="w-full max-w-[1500px] mx-auto relative flex flex-col items-center justify-center select-none pointer-events-none cursor-default py-0 z-0" aria-hidden="true">
          
          {/* Top Italic Serif Text ("I'm junior") */}
          <div className="w-full flex items-center justify-center gap-36 xs:gap-44 sm:gap-40 md:gap-52 lg:gap-64 -mb-1.5 xs:-mb-3 sm:-mb-8 md:-mb-12 lg:-mb-16">
            <span className="anim-text-im inline-block">
              <span
                className="font-serif italic font-normal text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] xl:text-[8rem] text-neutral-950 tracking-tight leading-none select-none"
                style={{
                  fontFamily: "var(--font-serif), serif",
                  transform: "perspective(1000px) rotateY(6deg)",
                  transformOrigin: "right center",
                  display: "inline-block",
                }}
              >
                I&apos;m
              </span>
            </span>
            <span className="anim-text-junior inline-block">
              <span
                className="font-serif italic font-normal text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] xl:text-[8rem] text-neutral-950 tracking-tight leading-none select-none"
                style={{
                  fontFamily: "var(--font-serif), serif",
                  transform: "perspective(1000px) rotateY(-6deg)",
                  transformOrigin: "left center",
                  display: "inline-block",
                }}
              >
                software
              </span>
            </span>
          </div>

          {/* Big Display Typography: Row 2 BACK END */}
          <div className="relative w-full flex items-center justify-center [perspective:1200px]">
            <div className="w-full flex items-center justify-center gap-22 xs:gap-26 sm:gap-14 md:gap-20 lg:gap-28 pl-1 sm:pl-6 md:pl-8 lg:pl-10">
              <span className="anim-display-back inline-block">
                <span
                  className="font-black uppercase tracking-tighter text-[#1b44ff] text-[clamp(3.8rem,16.5vw,14.5rem)] xl:text-[16rem] leading-[0.84] sm:leading-[0.84] text-right"
                  style={{
                    transform: "perspective(950px) rotateY(9deg)",
                    transformOrigin: "right center",
                    display: "inline-block",
                  }}
                >
                  BACK
                </span>
              </span>

              <span className="anim-display-end inline-block">
                <span
                  className="font-black uppercase tracking-tighter text-[#1b44ff] text-[clamp(3.8rem,16.5vw,14.5rem)] xl:text-[16rem] leading-[0.84] sm:leading-[0.84] text-left"
                  style={{
                    transform: "perspective(950px) rotateY(-9deg)",
                    transformOrigin: "left center",
                    display: "inline-block",
                  }}
                >
                  END
                </span>
              </span>
            </div>
          </div>

          {/* Underneath: "developer" in Serif Italic */}
          <div className="w-full flex items-center justify-center -mt-3 xs:-mt-5 sm:-mt-8 md:-mt-12 lg:-mt-16">
            <span
              className="anim-text-developer font-serif italic font-normal text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[11rem] text-neutral-950 tracking-tight leading-none text-center select-none"
              style={{
                fontFamily: "var(--font-serif), serif",
                display: "inline-block",
              }}
            >
              developer
            </span>
          </div>
        </div>

        {/* Layer 2: Monochrome Portrait & Action Button */}
        <div className="anim-portrait absolute inset-x-0 bottom-0 flex flex-col items-center justify-end z-10 pointer-events-none">
          <div className="relative h-[53vh] xs:h-[56vh] sm:h-[55vh] md:h-[60vh] lg:h-[63vh] max-h-[580px] aspect-[960/1116]">
            <div className="relative w-full h-full filter drop-shadow-[-12px_4px_18px_rgba(15,23,42,0.28)] sm:drop-shadow-[-16px_4px_22px_rgba(15,23,42,0.32)] drop-shadow-[12px_4px_18px_rgba(15,23,42,0.28)] sm:drop-shadow-[16px_4px_22px_rgba(15,23,42,0.32)] drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)]">
              <Image
                src="/zulfikar_bw_hq.png"
                alt="Zulfikar Achyar - Junior Backend Developer"
                width={960}
                height={1116}
                quality={100}
                priority
                className="w-full h-full object-contain select-none pointer-events-none [mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)]"
              />
            </div>

            {/* Pill Button: "LET'S CHAT" */}
            <div className="anim-button absolute left-1/2 bottom-2.5 sm:bottom-12 md:bottom-14 z-30 pointer-events-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group inline-flex items-center justify-center bg-[#1b44ff] hover:bg-[#1236db] text-white px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full shadow-[-30px_-20px_70px_14px_rgba(27,68,255,0.2),30px_-20px_70px_14px_rgba(27,68,255,0.2),0_-16px_60px_12px_rgba(27,68,255,0.18),0_10px_25px_rgba(27,68,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-2.5">
                  <Image
                    src="/whatsapp-svgrepo-com.svg"
                    alt="WhatsApp"
                    width={22}
                    height={22}
                    className="w-5 h-5 sm:w-[22px] sm:h-[22px] object-contain shrink-0"
                  />
                  <span className="font-black text-[11px] sm:text-sm tracking-wider uppercase">
                    LET&apos;S CHAT
                  </span>
                  <span className="text-xs sm:text-sm font-bold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Layer 3: Foreground Stroke Typography (overlapping portrait) */}
        <div
          className="w-full max-w-[1500px] mx-auto absolute inset-0 px-3 sm:px-8 md:px-12 flex flex-col items-center justify-center select-none pointer-events-none cursor-default py-0 z-20"
          aria-hidden="true"
        >
          <div className="w-full flex items-center justify-center gap-36 xs:gap-44 sm:gap-40 md:gap-52 lg:gap-64 -mb-1.5 xs:-mb-3 sm:-mb-8 md:-mb-12 lg:-mb-16 opacity-0 select-none pointer-events-none">
            <span className="inline-block"><span className="text-3xl">I&apos;m</span></span>
            <span className="inline-block"><span className="text-3xl">software</span></span>
          </div>

          <div className="relative w-full flex items-center justify-center [perspective:1200px] opacity-0 select-none pointer-events-none">
            <div className="w-full flex items-center justify-center gap-22 xs:gap-26 sm:gap-14 md:gap-20 lg:gap-28 pl-1 sm:pl-6 md:pl-8 lg:pl-10">
              <span className="inline-block"><span className="text-[clamp(3.8rem,16.5vw,14.5rem)]">BACK</span></span>
              <span className="inline-block"><span className="text-[clamp(3.8rem,16.5vw,14.5rem)]">END</span></span>
            </div>
          </div>

          <div className="w-full flex items-center justify-center -mt-3 xs:-mt-5 sm:-mt-8 md:-mt-12 lg:-mt-16">
            <span
              className="anim-text-developer font-serif italic font-normal text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[11rem] tracking-tight leading-none text-center select-none"
              style={{ fontFamily: "var(--font-serif), serif", display: "inline-block" }}
            >
              <span className="opacity-0 select-none pointer-events-none">de</span>
              <span
                style={{
                  WebkitTextStrokeWidth: "clamp(0.85px, 0.1vw, 1.25px)",
                  WebkitTextStrokeColor: "#ffffff",
                  color: "transparent",
                  display: "inline-block",
                  filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45))",
                }}
              >
                velop
              </span>
              <span className="opacity-0 select-none pointer-events-none">er</span>
            </span>
          </div>
        </div>
      </div>

      {/* ===================== FOOTER / BOTTOM BAR ===================== */}
      <div className="w-full px-5 sm:px-12 md:px-16 py-2.5 sm:py-5 md:py-6 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-2 sm:gap-6 z-20 shrink-0">
        <div className="anim-footer-left max-w-xs sm:max-w-sm text-center sm:text-left flex flex-col items-center sm:items-start">
          <div className="anim-line-expand w-7 sm:w-8 h-[2px] bg-neutral-900 mb-1.5 sm:mb-2.5" />
          <p className="text-[11px] sm:text-[11px] font-bold tracking-wider text-neutral-900 uppercase leading-[1.45] sm:leading-[1.6]">
            SPECIALIZED IN BACKEND ARCHITECTURE,
            <br className="hidden sm:inline" /> DATABASE DESIGN, AND HIGH
            <br className="hidden sm:inline" /> CONCURRENCY SYSTEMS.
          </p>
        </div>

        <div className="anim-footer-right max-w-xs sm:max-w-sm text-center sm:text-right">
          <p className="text-[11px] sm:text-xs font-normal text-neutral-500 leading-relaxed sm:leading-relaxed">
            Fokus pada arsitektur backend berkinerja tinggi, integrasi perangkat IoT terdistribusi, dan transmisi data aman terenkripsi.
          </p>
        </div>
      </div>

      {/* ===================== SKILL TAGS BAR (Interactive Horizontal Carousel) ===================== */}
      <div id="skills" className="anim-footer-right w-full border-t border-neutral-200 z-20 shrink-0 bg-white">
        <div className="relative w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-3 sm:gap-4 px-5 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 w-max">
            <button
              type="button"
              onClick={() => {
                onSelectSkill("");
                document.getElementById("repositories")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                !activeSkill ? "bg-[#1b44ff] text-white" : "bg-neutral-900 text-white hover:bg-[#1b44ff]"
              }`}
            >
              <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.518-4.674z" />
              </svg>
              Semua Stack
            </button>

            {displaySkills.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => {
                  onSelectSkill(activeSkill === tag ? "" : tag);
                  document.getElementById("repositories")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`inline-flex items-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap cursor-pointer transition-all duration-200 ${
                  activeSkill === tag
                    ? "bg-[#1b44ff] text-white border-[#1b44ff] shadow-md"
                    : "border-neutral-300 text-neutral-700 hover:border-[#1b44ff] hover:text-[#1b44ff] hover:bg-blue-50/50"
                }`}
              >
                {tag}
              </button>
            ))}
            <span className="w-8 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

