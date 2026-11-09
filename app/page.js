"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroScene from "@/components/HeroScene";
import LearningApproachSection from "@/components/LearningApproachSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArticlesSection from "@/components/ArticlesSection";
import Footer from "@/components/Footer";
import { X, ArrowUpRight, Globe } from "lucide-react";

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [articles, setArticles] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [activeSkill, setActiveSkill] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/project").then((r) => r.json()).catch(() => ({ data: [] })),
      fetch("/api/article").then((r) => r.json()).catch(() => ({ data: [] })),
      fetch("/api/experience").then((r) => r.json()).catch(() => ({ data: [] })),
      fetch("/api/skill").then((r) => r.json()).catch(() => ({ data: [] })),
    ]).then(([p, a, e, s]) => {
      setProjects(p.data || []);
      setArticles(a.data || []);
      setExperiences(e.data || []);
      setSkills(s.data || []);
    });
  }, []);

  function renderMarkdown(md = "") {
    const html = md
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-neutral-900 my-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-neutral-950 my-2.5">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-black text-neutral-950 my-3">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-neutral-950">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic text-neutral-700">$1</em>')
      .replace(/^(&gt;|>)\s?(.*$)/gim, '<blockquote class="border-l-2 border-[#1b44ff] pl-3 italic text-neutral-600 my-2 leading-relaxed">$2</blockquote>')
      .replace(/`([^`]+)`/gim, '<code class="bg-neutral-100 px-1.5 py-0.5 rounded font-mono text-xs text-[#1b44ff] font-semibold">$1</code>')
      .replace(/\n/gim, '<br />');
    return { __html: html };
  }

  return (
    <div className="w-full bg-white selection:bg-[#1b44ff] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar />

      {/* 2. Hero Stage dengan Tipografi Editorial & Foto B&W */}
      <HeroScene
        skills={skills}
        activeSkill={activeSkill}
        onSelectSkill={setActiveSkill}
      />

      {/* 3. Bento Grid: Pendekatan Belajar & Karir */}
      <LearningApproachSection experiences={experiences} />

      {/* 4. Open Source Repositories & Proyek */}
      <ProjectsSection projects={projects} filterKeyword={activeSkill} />

      {/* 5. Publikasi & Artikel Riset */}
      <ArticlesSection articles={articles} onSelectArticle={setActiveArticle} />

      {/* 6. Footer */}
      <Footer />

      {/* 7. Modal Baca Artikel */}
      {activeArticle && (
        <div
          onClick={() => setActiveArticle(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#1b44ff] uppercase tracking-wider">
                  Publikasi Ilmiah
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-neutral-950 mt-1 leading-snug">
                  {activeArticle.title}
                </h2>
                <span className="text-[11px] text-neutral-400 font-mono mt-1 block">
                  /{activeArticle.slug}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeArticle.thumbnail_url && (
              <img
                src={activeArticle.thumbnail_url}
                alt={activeArticle.title}
                className="w-full max-h-72 object-cover rounded-xl border border-neutral-200"
              />
            )}

            <div
              className="text-sm text-neutral-700 leading-relaxed space-y-3 font-normal"
              dangerouslySetInnerHTML={renderMarkdown(activeArticle.content || activeArticle.summary || "")}
            />

            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
              {activeArticle.canonical_url ? (
                <a
                  href={activeArticle.canonical_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1b44ff] border border-blue-200 text-xs font-bold transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Buka Jurnal Resmi (Sinkron)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ) : <div />}
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition-colors cursor-pointer"
              >
                Tutup Bacaan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
