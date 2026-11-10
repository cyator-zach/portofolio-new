"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon, InstagramIcon, EmailIcon, WhatsAppIcon } from "./SocialIcons";

const DEFAULT_NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Riwayat Pekerjaan", href: "#experience" },
  { label: "Proyek & Repositori", href: "#repositories" },
  { label: "FAQ", href: "#faq" },
  { label: "Portal Admin", href: "/login" },
];

export default function Navbar({ items = DEFAULT_NAV_ITEMS, configs = {} }) {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    { title: "GitHub", href: configs.github_url || "https://github.com/cyator-zach", icon: <GitHubIcon className="w-5 h-5" theme="light" /> },
    { title: "LinkedIn", href: configs.linkedin_url || "https://www.linkedin.com/in/zulfikar-achyar-79b15b257/", icon: <LinkedInIcon className="w-5 h-5" /> },
    { title: "Instagram", href: configs.instagram_url || "https://www.instagram.com/zulfikar_achyar/", icon: <InstagramIcon className="w-5 h-5" /> },
    { title: "Email", href: configs.email_address ? `mailto:${configs.email_address}` : "mailto:zulfikaerachyar@gmail.com", icon: <EmailIcon className="w-5 h-5" /> },
    { title: "WhatsApp", href: configs.whatsapp_number ? `https://wa.me/${configs.whatsapp_number}` : "https://wa.me/62895600366624", icon: <WhatsAppIcon className="w-5 h-5" /> },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* ===================== MAIN HEADER BAR ===================== */}
      <header className="anim-nav-drop w-full px-5 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 flex items-center justify-between z-50 shrink-0 relative bg-white/90 backdrop-blur-md">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950 hover:opacity-80 transition-opacity"
        >
          ZULFIKAR ACHYAR<span className="text-[#1b44ff]">.</span>
        </Link>

        {/* Minimal 2-Line Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={isOpen}
          className="group flex flex-col justify-center items-end gap-1.5 w-10 h-10 p-2 cursor-pointer focus:outline-none"
        >
          <span
            className={`h-[2px] bg-neutral-950 transition-all duration-300 ease-in-out origin-center ${
              isOpen
                ? "w-7 translate-y-[4px] rotate-45"
                : "w-7 group-hover:w-8 group-hover:bg-[#1b44ff]"
            }`}
          />
          <span
            className={`h-[2px] bg-neutral-950 transition-all duration-300 ease-in-out origin-center ${
              isOpen
                ? "w-7 -translate-y-[4px] -rotate-45"
                : "w-7 group-hover:w-5 group-hover:bg-[#1b44ff]"
            }`}
          />
        </button>
      </header>

      {/* ===================== FULL-SCREEN EDITORIAL MENU DRAWER ===================== */}
      <div
        className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between px-5 sm:px-12 md:px-16 pt-20 sm:pt-24 pb-6 sm:pb-8 ${
          isOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
      >
        <nav className="w-full max-w-[1400px] mx-auto my-auto py-6">
          <ul className="flex flex-col gap-3 sm:gap-5 md:gap-7">
            {items.map((item, idx) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-baseline gap-4 sm:gap-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-neutral-950 hover:text-[#1b44ff] transition-all duration-300"
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-neutral-400 group-hover:text-[#1b44ff] transition-colors font-mono">
                    0{idx + 1}
                  </span>
                  <span className="inline-block transform group-hover:translate-x-3 transition-transform duration-300">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer Bottom Bar: Social Icons & Contact */}
        <div className="w-full max-w-[1400px] mx-auto border-t border-neutral-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-neutral-600">
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.title}
                href={s.href}
                target={s.title !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="hover:opacity-75 transition-opacity"
                title={s.title}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <p className="text-neutral-400 text-[11px]">
            © {new Date().getFullYear()} Zulfikar Achyar. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

