import { Roboto, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { db } from "@/lib/knexClient";
import "./globals.css";

const roboto = Roboto({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

const playfairDisplay = Playfair_Display({
    variable: "--font-serif",
    subsets: ["latin"],
    style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    weight: ["400", "600"],
});

const SITE = {
    url: "https://zulfikarachyar.my.id",
    name: "Zulfikar Achyar",
    title: "Zulfikar Achyar | Backend & Software Engineer",
    creator: "@cyator_zach",
};

async function getConfigMap() {
    const rows = await db("sys_app_config").select("config_key", "config_value").catch(() => []);
    return Object.fromEntries(rows.map((r) => [r.config_key, r.config_value]));
}

export async function generateMetadata() {
    const cfg = await getConfigMap();
    const desc = cfg.site_description || `Portfolio of ${SITE.name}. Specialized in backend architecture, IoT integrations, and relational database systems.`;
    const lastMod = cfg.last_updated ? `${cfg.last_updated}T00:00:00Z` : "2026-11-10T00:00:00Z";

    return {
        metadataBase: new URL(SITE.url),
        title: {
            default: SITE.title,
            template: `%s | ${SITE.name}`,
        },
        description: desc,
        keywords: [SITE.name, "Backend Engineer", "Software Engineer", "Node.js", "PostgreSQL", "Next.js", "IoT Systems", "Portfolio"],
        authors: [{ name: SITE.name, url: SITE.url }],
        creator: SITE.name,
        alternates: { canonical: "/" },
        openGraph: {
            title: SITE.title,
            description: desc,
            url: SITE.url,
            siteName: `${SITE.name} Portfolio`,
            locale: "id_ID",
            type: "profile",
        },
        twitter: {
            card: "summary_large_image",
            title: SITE.title,
            description: desc,
            creator: SITE.creator,
        },
        icons: {
            icon: [
                { url: "/favicon.ico" },
                { url: "/logo-256.png", sizes: "256x256", type: "image/png" },
            ],
            shortcut: "/favicon.ico",
            apple: "/logo-128.png",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        other: {
            "article:modified_time": lastMod,
            "article:published_time": "2024-01-01T00:00:00Z",
        },
    };
}

export default async function RootLayout({ children }) {
    const cfg = await getConfigMap();
    const lastMod = cfg.last_updated ? `${cfg.last_updated}T00:00:00Z` : "2026-11-10T00:00:00Z";
    const sameAs = [cfg.github_url, cfg.linkedin_url, cfg.instagram_url].filter(Boolean);

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${SITE.url}/#webpage`,
                url: SITE.url,
                name: SITE.title,
                description: cfg.site_description,
                dateModified: lastMod,
                inLanguage: "id-ID",
                isPartOf: {
                    "@type": "WebSite",
                    "@id": `${SITE.url}/#website`,
                    name: `${SITE.name} Portfolio`,
                    url: SITE.url,
                },
            },
            {
                "@type": "ProfilePage",
                "@id": `${SITE.url}/#profilepage`,
                url: SITE.url,
                dateModified: lastMod,
                mainEntity: {
                    "@type": "Person",
                    name: SITE.name,
                    alternateName: ["cyator-zach", "Zulfikar"],
                    jobTitle: "Backend & Software Engineer",
                    url: SITE.url,
                    sameAs: sameAs.length > 0 ? sameAs : undefined,
                    knowsAbout: ["Backend Engineering", "Node.js", "PostgreSQL", "Next.js", "IoT", "REST APIs", "MQTT"],
                },
            },
        ],
    };

    return (
        <html lang="id" className={`${roboto.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} h-full antialiased`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900 overflow-x-hidden selection:bg-[#1b44ff] selection:text-white">
                {children}
            </body>
        </html>
    );
}
