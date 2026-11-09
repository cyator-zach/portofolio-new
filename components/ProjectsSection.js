"use client";

import { useState } from "react";
import LanguageIcon from "./LanguageIcon";

const DEFAULT_REPOSITORIES = [
  {
    id: "lms-microservices-core",
    name: "lms-microservices-core",
    fullName: "cyator-zach/lms-microservices-core",
    category: "Microservices",
    description: "Arsitektur microservices terdistribusi untuk platform LMS skala enterprise dengan Event-Driven Communication, CQRS pattern, dan idempotency keys.",
    language: "TypeScript",
    stars: 128,
    forks: 34,
    metrics: "12k req/s • p99 < 15ms",
    stack: ["Node.js", "TypeScript", "PostgreSQL", "RabbitMQ", "Docker", "Redis"],
    cloneUrl: "https://github.com/cyator-zach/lms-microservices-core.git",
    githubUrl: "https://github.com/cyator-zach",
    featured: true,
  },
  {
    id: "high-concurrency-rate-limiter",
    name: "high-concurrency-rate-limiter",
    fullName: "cyator-zach/high-concurrency-rate-limiter",
    category: "Backend API",
    description: "Distributed Rate Limiter performa tinggi berbasis algoritma Token Bucket dan Sliding Window Counter menggunakan Redis cluster dan atomic Lua scripts.",
    language: "Go",
    stars: 214,
    forks: 48,
    metrics: "25k req/s • Zero Race Condition",
    stack: ["Go", "Redis Cluster", "Lua", "Prometheus", "Grafana"],
    cloneUrl: "https://github.com/cyator-zach/high-concurrency-rate-limiter.git",
    githubUrl: "https://github.com/cyator-zach",
    featured: true,
  },
  {
    id: "scalable-auth-vault",
    name: "scalable-auth-vault",
    fullName: "cyator-zach/scalable-auth-vault",
    category: "Backend API",
    description: "Layanan autentikasi & otorisasi enterprise dengan hybrid JWT + Redis token revocation, RBAC granular, OAuth2 provider integration, dan Argon2id hashing.",
    language: "TypeScript",
    stars: 176,
    forks: 41,
    metrics: "Argon2id • OWASP Compliant",
    stack: ["Node.js", "Express", "PostgreSQL", "Redis", "Jest"],
    cloneUrl: "https://github.com/cyator-zach/scalable-auth-vault.git",
    githubUrl: "https://github.com/cyator-zach",
    featured: false,
  },
  {
    id: "realtime-event-gateway",
    name: "realtime-event-gateway",
    fullName: "cyator-zach/realtime-event-gateway",
    category: "Microservices",
    description: "Real-time WebSocket pub/sub gateway dengan horizontal cluster scaling, automatic reconnection buffer, dan heartbeat latency tracking.",
    language: "JavaScript",
    stars: 96,
    forks: 22,
    metrics: "50k concurrent sockets",
    stack: ["Node.js", "WebSocket", "Redis Pub/Sub", "MongoDB", "Docker"],
    cloneUrl: "https://github.com/cyator-zach/realtime-event-gateway.git",
    githubUrl: "https://github.com/cyator-zach",
    featured: false,
  },
];

export default function ProjectsSection({
  projects = [],
  filterKeyword = "",
}) {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [copiedId, setCopiedId] = useState(null);

  // Normalise database projects or fallback
  const rawList = projects.length > 0
    ? projects.map(p => {
        const parts = p.description?.includes(". ") ? p.description.split(". ") : null;
        const stackFromDesc = parts && parts[0].includes(",") ? parts[0].split(", ") : null;
        return {
          id: String(p.id),
          name: p.title || p.name,
          fullName: p.repo_url?.replace("https://github.com/", "") || `cyator-zach/${p.slug || p.title?.toLowerCase().replace(/\s+/g, "-")}`,
          category: p.category_name || (p.is_featured ? "Featured" : "Backend API"),
          description: stackFromDesc ? parts.slice(1).join(". ") : p.description,
          language: "JavaScript",
          stars: 42,
          forks: 12,
          metrics: p.demo_url ? "Live Demo" : "Production Grade",
          stack: p.tech_stack ? (Array.isArray(p.tech_stack) ? p.tech_stack : p.tech_stack.split(",")) : (stackFromDesc || ["Node.js", "PostgreSQL"]),
          cloneUrl: p.repo_url ? `${p.repo_url}.git` : `https://github.com/cyator-zach/${p.slug || "project"}.git`,
          githubUrl: p.repo_url || "https://github.com/cyator-zach",
          demoUrl: p.demo_url,
          thumbnailUrl: p.thumbnail_url,
          featured: Boolean(p.is_featured),
        };
      })
    : DEFAULT_REPOSITORIES;

  // Filter categories
  const categories = ["Semua", ...new Set(rawList.map(r => r.category).filter(Boolean))];

  const filtered = rawList.filter(repo => {
    const matchCategory = selectedCategory === "Semua" || repo.category === selectedCategory;
    const matchKeyword = !filterKeyword || 
      repo.name.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      repo.description?.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      repo.stack?.some(s => s.toLowerCase().includes(filterKeyword.toLowerCase()));
    return matchCategory && matchKeyword;
  });

  const handleCopy = (repo) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(repo.cloneUrl);
      setCopiedId(repo.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="repositories" className="w-full bg-white font-sans py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-neutral-200 scroll-mt-6">
      <div className="max-w-[1400px] mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1b44ff] font-mono">
              KATALOG REKAYASA & KODE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight mt-1.5">
              Open Source Repositories<span className="text-[#1b44ff]">.</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-neutral-600 max-w-2xl font-normal leading-relaxed">
              Kompilasi proyek backend, microservices terdistribusi, dan infrastruktur sistem yang siap produksi dengan arsitektur teruji.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-neutral-950 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-950"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Repositories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((repo) => (
            <div
              key={repo.id}
              className="group relative flex flex-col justify-between bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 hover:border-neutral-400 p-6 sm:p-8 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
            >
              <div className="space-y-4">
                {/* Card Top: Category & Stats */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <LanguageIcon language={repo.language} className="w-4 h-4" />
                    <span className="text-[11px] font-mono font-semibold text-neutral-500 uppercase tracking-wider">
                      {repo.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    {repo.featured && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 font-bold border border-amber-500/20">
                        Featured
                      </span>
                    )}
                    <span className="text-neutral-400">
                      {repo.demoUrl ? "● Live Demo" : "● Open Source"}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight group-hover:text-[#1b44ff] transition-colors">
                  {repo.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {repo.description}
                </p>

                {/* Metrics Pill */}
                {repo.metrics && (
                  <div className="inline-block px-3 py-1 rounded-md bg-blue-50/80 border border-blue-100 text-[#1b44ff] text-[11px] font-mono font-bold">
                    ⚡ {repo.metrics}
                  </div>
                )}

                {/* Tech Stack Tags */}
                {repo.stack && repo.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {repo.stack.map((st, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-[11px] font-medium"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Clone URL & Links */}
              <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleCopy(repo)}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono font-medium transition-colors cursor-pointer text-left overflow-hidden"
                  title="Klik untuk menyalin clone URL git"
                >
                  <span className="truncate max-w-[200px] text-[11px]">{repo.cloneUrl}</span>
                  <span className="text-[10px] font-bold text-[#1b44ff] shrink-0">
                    {copiedId === repo.id ? "✓ Tersalin!" : "Salin"}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  {repo.demoUrl && (
                    <a
                      href={repo.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#1b44ff] hover:bg-[#1236db] text-white text-xs font-bold transition-all text-center"
                    >
                      Demo ↗
                    </a>
                  )}
                  {repo.githubUrl && (
                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl border border-neutral-200 hover:border-neutral-950 text-neutral-900 text-xs font-bold transition-all text-center"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-2 py-12 text-center text-sm text-neutral-400">
              Tidak ada repositori yang cocok dengan kata kunci.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

