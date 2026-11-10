"use client";

import Link from "next/link";
import { GitHubIcon, LinkedInIcon, InstagramIcon, EmailIcon, WhatsAppIcon } from "./SocialIcons";

export default function Footer({ configs = {} }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Beranda", onClick: scrollToTop },
    { label: "Riwayat Pekerjaan", href: "#experience" },
    { label: "Open Source Repositories", href: "#repositories" },
    { label: "FAQ", href: "#faq" },
    { label: "Portal Admin", href: "/login", isSpecial: true },
  ];

  const socials = [
    { label: "GitHub", href: configs.github_url || "https://github.com/cyator-zach", icon: <GitHubIcon className="w-4 h-4" theme="dark" /> },
    { label: "LinkedIn", href: configs.linkedin_url || "https://www.linkedin.com/in/zulfikar-achyar-79b15b257/", icon: <LinkedInIcon className="w-4 h-4" /> },
    { label: "Instagram", href: configs.instagram_url || "https://www.instagram.com/zulfikar_achyar/", icon: <InstagramIcon className="w-4 h-4" /> },
    { label: "Email", href: configs.email_address ? `mailto:${configs.email_address}` : "mailto:zulfikaerachyar@gmail.com", icon: <EmailIcon className="w-4 h-4" /> },
    { label: "WhatsApp", href: configs.whatsapp_number ? `https://wa.me/${configs.whatsapp_number}` : "https://wa.me/62895600366624", icon: <WhatsAppIcon className="w-4 h-4" /> },
  ];

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
                {configs.site_description || "Software Engineer & Backend Specialist yang berfokus pada arsitektur sistem berkonkurensi tinggi, optimalisasi database, dan transmisi data terenkripsi."}
              </p>
            </div>
          </div>

          {/* Navigation (3 cols) */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((item) => (
                <li key={item.label}>
                  {item.onClick ? (
                    <button
                      type="button"
                      onClick={item.onClick}
                      className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className={`transition-colors ${
                        item.isSpecial
                          ? "text-neutral-400 hover:text-[#1b44ff]"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Connect (3 cols) */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Terhubung
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-neutral-400 hover:text-white transition-colors"
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
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

