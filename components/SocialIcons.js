const OFFICIAL_ICONS = {
  githubDark: "https://cdn.simpleicons.org/github/white",
  githubLight: "https://cdn.simpleicons.org/github/181717",
  linkedin: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-plain.svg",
  instagram: "https://cdn.simpleicons.org/instagram/E4405F",
  email: "https://cdn.simpleicons.org/gmail/ea4335",
  whatsapp: "https://cdn.simpleicons.org/whatsapp/25D366",
};

export function GitHubIcon({ className = "w-4 h-4", theme = "dark" }) {
  return (
    <img
      src={theme === "light" ? OFFICIAL_ICONS.githubLight : OFFICIAL_ICONS.githubDark}
      alt="GitHub official logo"
      className={`${className} object-contain shrink-0`}
      width={16}
      height={16}
      loading="lazy"
    />
  );
}

export function LinkedInIcon({ className = "w-4 h-4" }) {
  return (
    <img
      src={OFFICIAL_ICONS.linkedin}
      alt="LinkedIn official logo"
      className={`${className} object-contain shrink-0`}
      width={16}
      height={16}
      loading="lazy"
    />
  );
}

export function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <img
      src={OFFICIAL_ICONS.instagram}
      alt="Instagram official logo"
      className={`${className} object-contain shrink-0`}
      width={16}
      height={16}
      loading="lazy"
    />
  );
}

export function EmailIcon({ className = "w-4 h-4" }) {
  return (
    <img
      src={OFFICIAL_ICONS.email}
      alt="Email official logo"
      className={`${className} object-contain shrink-0`}
      width={16}
      height={16}
      loading="lazy"
    />
  );
}

export function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <img
      src={OFFICIAL_ICONS.whatsapp}
      alt="WhatsApp official logo"
      className={`${className} object-contain shrink-0`}
      width={16}
      height={16}
      loading="lazy"
    />
  );
}

