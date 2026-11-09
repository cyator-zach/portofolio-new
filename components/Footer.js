"use client";

import Link from "next/link";
import { GitHubIcon, LinkedInIcon, InstagramIcon, EmailIcon, WhatsAppIcon } from "./SocialIcons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-neutral-950 text-white font-sans border-t border-neutral-900 pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12 sm:pb-16 border-b border-neutral-800/80">
          
          {/* Brand & Bio (6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="text-2xl sm:text-3xl font-black tracking-tight text-white hover:text-[#1b44ff] transition-colors"
              >
                ZULFIKAR ACHYAR<span className="text-[#1b44ff]">.</span>
              </Link>
              <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-normal max-w-md leading-relaxed">
                Junior Backend Developer yang berfokus pada arsitektur sistem berkonkurensi tinggi, optimalisasi database, dan skalabilitas microservices.
              </p>
            </div>
          </div>

          {/* Navigation (3 cols) */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Beranda
                </button>
              </li>
              <li>
                <a href="#learning-approach" className="text-neutral-400 hover:text-white transition-colors">
                  Pendekatan Belajar & Karir
                </a>
              </li>
              <li>
                <a href="#repositories" className="text-neutral-400 hover:text-white transition-colors">
                  Open Source Repositories
                </a>
              </li>
              <li>
                <a href="#articles" className="text-neutral-400 hover:text-white transition-colors">
                  Artikel & Publikasi
                </a>
              </li>
              <li>
                <a href="/login" className="text-neutral-400 hover:text-[#1b44ff] transition-colors">
                  Portal Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Connect (3 cols) */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Terhubung
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href="https://github.com/cyator-zach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <GitHubIcon className="w-4 h-4" theme="dark" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/zulfikar-achyar-79b15b257/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/zulfikar_achyar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:zulfikaerachyar@gmail.com"
                  className="group inline-flex items-center gap-2.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <EmailIcon className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/62895600366624"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-neutral-400 hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Zulfikar Achyar. All rights reserved.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Kembali ke Atas</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

