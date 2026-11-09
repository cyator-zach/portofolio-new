const OFFICIAL_LANGUAGE_ICONS = {
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  Go: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "HCL / YAML": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/yaml/yaml-original.svg",
  YAML: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/yaml/yaml-original.svg",
  C: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
};

export default function LanguageIcon({ language, className = "w-4 h-4" }) {
  const iconSrc = OFFICIAL_LANGUAGE_ICONS[language] || OFFICIAL_LANGUAGE_ICONS.TypeScript;

  return (
    <img
      src={iconSrc}
      alt={`${language} logo`}
      className={`${className} object-contain shrink-0`}
      loading="lazy"
      width={16}
      height={16}
    />
  );
}

