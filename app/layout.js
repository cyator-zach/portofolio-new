import { Roboto, Playfair_Display, JetBrains_Mono } from "next/font/google";
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

export const metadata = {
    title: "Zulfikar Achyar | Backend & Software Engineer",
    description: "Portfolio of Zulfikar Achyar, Software & Backend Engineer. Specialized in backend architecture, IoT integrations, and relational database systems.",
    icons: {
        icon: "/logo-32.png",
        shortcut: "/logo.png",
        apple: "/logo-128.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="id" className={`${roboto.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900 overflow-x-hidden selection:bg-[#1b44ff] selection:text-white">
                {children}
            </body>
        </html>
    );
}
