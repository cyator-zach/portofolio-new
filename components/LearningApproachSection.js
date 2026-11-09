"use client";

import Image from "next/image";

export default function LearningApproachSection({
  title = "Arsitektur Sistem & Rekam Jejak Rekayasa.",
  subtitleHighlight = "Rekam Jejak Rekayasa",
  features = [
    {
      title: "Enkripsi & Keamanan Payload API",
      desc: "Implementasi proteksi data end-to-end dengan enkripsi payload response, validasi akses endpoint JWT, dan dekripsi terverifikasi pada dokumen konfidensial.",
    },
    {
      title: "Integrasi Hardware IoT & Event Logging",
      desc: "Menghubungkan mikrokontroler ESP32/ESP8266 dan terminal Access Control System ke backend web untuk autentikasi fisik real-time.",
    },
    {
      title: "Optimasi Query Relasional Knex & Postgres",
      desc: "Merancang skema database enterprise yang terstruktur, transaksi terisolasi via connection pooler, dan query relasional berkinerja tinggi.",
    },
    {
      title: "Otomatisasi Linux Server & PAM Hardening",
      desc: "Konfigurasi dan pemeliharaan server staging/production berbasis Linux dengan Pluggable Authentication Modules dan automated release.",
    },
    {
      title: "Computer Vision & Edge AI Deployment",
      desc: "Pengembangan inferensi cerdas YOLOv8 terdistribusi melalui tunneling Cloudflare dan sinkronisasi kontrol sinyal real-time.",
    },
  ],
  bannerText = "Berpengalaman dalam integrasi mikrokontroler real-time, API security, dan sistem backend teruji produksi.",
  experiences = [],
}) {
  const displayFeatures = experiences.length > 0
    ? [
        ...experiences.slice(0, 5).map(e => ({
          title: `${e.role_title} @ ${e.company_name}`,
          desc: e.description ? e.description.split("\n")[0].replace(/^[•\-\*]\s*/, "") : `${e.start_date?.slice(0, 7)} — ${e.end_date?.slice(0, 7) || "Present"}`
        })),
        ...features
      ].slice(0, 5)
    : features;

  return (
    <section id="learning-approach" className="w-full bg-[#f8fafc] font-sans py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-neutral-200 scroll-mt-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ===================== LEFT SIDE BENTO GRID ===================== */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            {/* Header: Title */}
            <div className="p-6 sm:p-8 lg:p-10 border-b border-neutral-200">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 tracking-tight leading-tight">
                Arsitektur Sistem &{" "}
                <span className="font-serif italic font-normal text-[#1b44ff]">{subtitleHighlight}</span>.
              </h2>
            </div>

            {/* Row 1: 3 Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 border-b border-neutral-200">
              {displayFeatures.slice(0, 3).map((f, i) => (
                <div key={i} className="p-7 sm:p-9 lg:p-10 flex flex-col justify-start group hover:bg-neutral-50/80 transition-colors duration-200">
                  <h3 className="font-bold text-lg sm:text-xl text-neutral-950 mb-3 leading-snug tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 2: 2 Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
              {displayFeatures.slice(3, 5).map((f, i) => (
                <div key={i} className="p-7 sm:p-9 lg:p-10 flex flex-col justify-start group hover:bg-neutral-50/80 transition-colors duration-200">
                  <h3 className="font-bold text-lg sm:text-xl text-neutral-950 mb-3 leading-snug tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 3: Blue Banner Footer */}
            <div className="bg-[#1b44ff] text-white p-5 sm:p-6 lg:p-7">
              <p className="font-bold text-sm sm:text-base leading-snug tracking-wide">
                {bannerText}
              </p>
            </div>
          </div>

          {/* ===================== RIGHT SIDE STATS CARD WITH PHOTO ===================== */}
          <div className="lg:col-span-4 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] min-h-[560px] flex flex-col justify-end p-6 sm:p-8 lg:p-9 text-white group">
            <div className="absolute inset-0 z-0">
              <Image
                src="/learning-office.jpg"
                alt="Modern Tech Academy Learning Space"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
            </div>

            <div className="relative z-10 space-y-4">
              <span className="px-3 py-1 rounded-full bg-[#1b44ff] text-white text-[11px] font-bold uppercase tracking-wider inline-block">
                Dedikasi Rekayasa
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Backend Architecture & Real-World Impact
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                Mengintegrasikan protokol IoT real-time, optimasi query basis data relational, dan arsitektur microservices teruji produksi.
              </p>

              {experiences.length > 0 && (
                <div className="pt-2 border-t border-neutral-800 space-y-2">
                  <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Rekam Jejak Profesional</p>
                  <p className="text-xs font-semibold text-white">
                    {experiences[0].role_title} @ {experiences[0].company_name}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

