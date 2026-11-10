"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroScene from "@/components/HeroScene";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { api } from "@/services/api";

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [configs, setConfigs] = useState({});
  const [activeSkill, setActiveSkill] = useState("");

  useEffect(() => {
    api.getPortfolioData().then((data) => {
      setProjects(data.projects);
      setExperiences(data.experiences);
      setSkills(data.skills);
      setFaqs(data.faqs);
      setConfigs(data.configs);
    });
  }, []);

  return (
    <div className="w-full bg-white selection:bg-[#1b44ff] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar configs={configs} />

      {/* 2. Hero Stage dengan Tipografi Editorial & Foto B&W */}
      <HeroScene
        skills={skills}
        activeSkill={activeSkill}
        onSelectSkill={setActiveSkill}
        whatsappUrl={configs.whatsapp_number ? `https://wa.me/${configs.whatsapp_number}` : undefined}
      />

      {/* 3. Wavy Road Career Journey (Riwayat Pekerjaan) */}
      <ExperienceSection experiences={experiences} />

      {/* 4. Open Source Repositories & Proyek */}
      <ProjectsSection projects={projects} filterKeyword={activeSkill} />

      {/* 5. Pertanyaan yang Sering Diajukan (FAQ) */}
      <FaqSection faqs={faqs} />

      {/* 6. Footer */}
      <Footer configs={configs} />
    </div>
  );
}
