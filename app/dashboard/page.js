"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    LayoutGrid,
    Folder,
    FileText,
    Briefcase,
    Zap,
    LogOut,
    Search,
    Plus,
    ExternalLink,
    ChevronUp,
    ChevronDown,
    Bold,
    Italic,
    Heading2,
    ListOrdered,
    Quote,
    Code,
    Trash2,
    Info,
    Sun,
    Moon,
    CheckCircle2,
    Database,
    ShieldCheck,
    RefreshCw,
    Link as LinkIcon,
    Globe,
    Calendar,
    ChevronLeft,
    ChevronRight,
    UploadCloud,
    Image as ImageIcon,
} from "lucide-react";
import { compressImage } from "@/utils/compressImage";

function generateSlug(text = "") {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function DatePicker({ value, onChange, placeholder = "YYYY-MM-DD", alignRight = false }) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const d = value ? new Date(value) : new Date();
    const [viewYear, setViewYear] = useState(d.getFullYear() || new Date().getFullYear());
    const [viewMonth, setViewMonth] = useState(d.getMonth() || new Date().getMonth());

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

    function handleSelect(day) {
        const m = String(viewMonth + 1).padStart(2, "0");
        const dayStr = String(day).padStart(2, "0");
        onChange(`${viewYear}-${m}-${dayStr}`);
        setOpen(false);
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full h-9 rounded-lg border border-zinc-200 bg-white px-2.5 text-xs text-zinc-800 flex items-center justify-between outline-none focus:border-[#f7941d] cursor-pointer"
            >
                <span className={value ? "text-zinc-900 font-medium" : "text-zinc-400"}>
                    {value ? value.slice(0, 10) : placeholder}
                </span>
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className={`absolute top-10 ${alignRight ? "right-0" : "left-0"} z-50 w-56 p-2.5 bg-white border border-zinc-200 rounded-xl shadow-xl space-y-2`}>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-900">
                                {monthNames[viewMonth]} {viewYear}
                            </span>
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
                                        else { setViewMonth(viewMonth - 1); }
                                    }}
                                    className="p-1 rounded hover:bg-zinc-100 text-zinc-600 cursor-pointer"
                                >
                                    <ChevronLeft className="w-3 h-3" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
                                        else { setViewMonth(viewMonth + 1); }
                                    }}
                                    className="p-1 rounded hover:bg-zinc-100 text-zinc-600 cursor-pointer"
                                >
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-zinc-400">
                            {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
                                <div key={day} className="py-0.5">{day}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
                            {Array.from({ length: firstDay }).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const dayNum = i + 1;
                                const mStr = String(viewMonth + 1).padStart(2, "0");
                                const dStr = String(dayNum).padStart(2, "0");
                                const isSelected = value && value.slice(0, 10) === `${viewYear}-${mStr}-${dStr}`;

                                return (
                                    <button
                                        key={dayNum}
                                        type="button"
                                        onClick={() => handleSelect(dayNum)}
                                        className={`h-6 w-6 mx-auto rounded text-[11px] flex items-center justify-center cursor-pointer transition-colors ${
                                            isSelected
                                                ? "bg-[#f7941d] text-zinc-950 font-bold"
                                                : "text-zinc-800 hover:bg-zinc-100"
                                        }`}
                                    >
                                        {dayNum}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex justify-between items-center pt-1.5 border-t border-zinc-100 text-[10px]">
                            <button
                                type="button"
                                onClick={() => { onChange(""); setOpen(false); }}
                                className="text-zinc-400 hover:text-red-500 cursor-pointer"
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    const today = new Date();
                                    const y = today.getFullYear();
                                    const m = String(today.getMonth() + 1).padStart(2, "0");
                                    const d = String(today.getDate()).padStart(2, "0");
                                    onChange(`${y}-${m}-${d}`);
                                    setOpen(false);
                                }}
                                className="text-[#f7941d] font-semibold cursor-pointer"
                            >
                                Hari Ini
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default function DashboardPage() {
    const router = useRouter();

    // Navigasi Utama & Sub-Tab Atas
    const [activeSection, setActiveSection] = useState("overview"); // overview | project | article | experience | skill
    const [topTab, setTopTab] = useState("content"); // content | meta | seo
    const [expandedGroup, setExpandedGroup] = useState(true);

    // Data States
    const [projects, setProjects] = useState([]);
    const [articles, setArticles] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [configs, setConfigs] = useState({});
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Workspace & Form State (Tengah + Inspector Kanan)
    const [selectedId, setSelectedId] = useState(null); // null = mode Buat Baru
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
    const [formData, setFormData] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [editorTab, setEditorTab] = useState("write");
    const [isDark, setIsDark] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [errorModal, setErrorModal] = useState("");

    async function handleFileUpload(file, onSuccess) {
        if (!file) return;
        setUploading(true);
        try {
            const compressed = await compressImage(file, 1);
            const data = new FormData();
            data.append("file", compressed);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });
            if (res.status === 401) return router.push("/login");

            const json = await res.json();
            if (res.ok && json.data?.url) {
                onSuccess(json.data.url);
            } else {
                setErrorModal(json.message || "Gagal mengunggah gambar");
            }
        } catch (err) {
            setErrorModal("Gagal koneksi saat upload gambar: " + err.message);
        } finally {
            setUploading(false);
        }
    }

    function toggleTheme(val) {
        const next = typeof val === "boolean" ? val : !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
    }

    function loadData() {
        setLoading(true);
        const fetchJson = (url) =>
            fetch(url)
                .then((r) => {
                    if (r.status === 401) router.push("/login");
                    return r.json();
                })
                .catch(() => ({ data: [] }));

        Promise.all([
            fetchJson("/api/project"),
            fetchJson("/api/article?all=true"),
            fetchJson("/api/experience"),
            fetchJson("/api/skill"),
            fetchJson("/api/category"),
            fetchJson("/api/faq"),
            fetchJson("/api/config"),
        ])
            .then(([p, a, e, s, c, f, cfg]) => {
                setProjects(p.data || []);
                setArticles(a.data || []);
                setExperiences(e.data || []);
                setSkills(s.data || []);
                setCategories(c.data || []);
                setFaqs(f.data || []);
                setConfigs(cfg.data || {});
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        loadData();
        if (document.documentElement.classList.contains("dark")) {
            setIsDark(true);
        }
        function handleKeyDown(e) {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                document.getElementById("dashboard-search")?.focus();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Reset form setiap pindah menu utama
    function handleSelectSection(sectionKey) {
        setActiveSection(sectionKey);
        initNewForm(sectionKey);
    }

    function initNewForm(sectionKey = activeSection) {
        setSelectedId(null);
        setSlugManuallyEdited(false);
        setEditorTab("write");
        if (sectionKey === "config") {
            setFormData({ ...configs });
        } else if (sectionKey === "faq") {
            setFormData({ question: "", answer: "", order_index: faqs.length + 1 });
        } else if (sectionKey === "project" || sectionKey === "article") {
            setFormData({ category_id: categories[0]?.id || "", is_published: true, is_featured: false });
        } else {
            setFormData({});
        }
    }

    function handleSelectItem(item) {
        setSelectedId(item.id);
        setSlugManuallyEdited(true);
        setEditorTab("write");
        setFormData({
            ...item,
            start_date: item.start_date ? item.start_date.slice(0, 10) : "",
            end_date: item.end_date ? item.end_date.slice(0, 10) : "",
        });
    }

    function handleTitleChange(val) {
        const next = { ...formData, title: val };
        if (!slugManuallyEdited) {
            next.slug = generateSlug(val);
        }
        setFormData(next);
    }

    function insertFormat(prefix, suffix = "") {
        const textarea = document.getElementById("article-content-input");
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const current = textarea.value || "";
        const selected = current.substring(start, end) || (prefix.includes("```") ? "console.log('hello');" : "teks");

        const replacement = `${prefix}${selected}${suffix}`;
        const nextValue = current.substring(0, start) + replacement + current.substring(end);

        setFormData({ ...formData, content: nextValue });

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
        }, 0);
    }

    function renderMarkdown(md = "") {
        const html = md
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-zinc-900 my-1.5">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-base font-bold text-zinc-900 my-2">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-lg font-bold text-zinc-900 my-2">$1</h1>')
            .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-zinc-900">$1</strong>')
            .replace(/\*(.*?)\*/gim, '<em class="italic text-zinc-700">$1</em>')
            .replace(/!\[(.*?)\]\((.*?)\)/gim, (_, alt, src) => {
                const s = (src || "").replace(/["'<>]/g, "");
                const a = (alt || "").replace(/["'<>]/g, "");
                return `<img src="${s}" alt="${a}" class="rounded-lg my-2 max-h-72 object-contain border border-zinc-200" />`;
            })
            .replace(/^(&gt;|>)\s?(.*$)/gim, '<blockquote class="border-l-2 border-[#f7941d] pl-3 italic text-zinc-600 my-1.5 leading-relaxed">$2</blockquote>')
            .replace(/```([\s\S]*?)```/gim, '<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-3 font-mono text-xs text-zinc-200 my-2 overflow-x-auto leading-normal"><code>$1</code></pre>')
            .replace(/`([^`]+)`/gim, '<code class="bg-zinc-200 px-1.5 py-0.5 rounded font-mono text-xs text-[#f7941d]">$1</code>')
            .replace(/^\d+\.\s(.*$)/gim, '<li class="ml-4 list-decimal text-zinc-700 my-0.5 leading-relaxed">$1</li>')
            .replace(/\n/gim, '<br />');

        return { __html: html };
    }

    async function handleLogout() {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    }

    async function handleDelete(type, id) {
        if (!confirm(`Hapus ${type} ini secara permanen?`)) return;
        const res = await fetch(`/api/${type}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (res.status === 401) return router.push("/login");
        if (res.ok) {
            if (selectedId === id) initNewForm();
            loadData();
        } else {
            const json = await res.json();
            setErrorModal(json.message || "Gagal menghapus data");
        }
    }

    async function handleSubmit(e) {
        if (e && e.preventDefault) e.preventDefault();
        if (activeSection === "overview") return;

        if (activeSection === "project" && (!formData.title || !formData.slug)) {
            setErrorModal("Harap lengkapi Title dan Slug project!");
            return;
        }
        if (activeSection === "article" && (!formData.title || !formData.content)) {
            setErrorModal("Harap lengkapi Title dan Content artikel!");
            return;
        }
        if (activeSection === "experience" && (!formData.company_name || !formData.role_title || !formData.start_date)) {
            setErrorModal("Harap lengkapi Company Name, Role Title, dan Start Date!");
            return;
        }
        if (activeSection === "skill" && !formData.name) {
            setErrorModal("Harap lengkapi Skill Name!");
            return;
        }
        if (activeSection === "faq" && (!formData.question || !formData.answer)) {
            setErrorModal("Harap lengkapi Pertanyaan dan Jawaban FAQ!");
            return;
        }

        if (activeSection === "config") {
            setSubmitting(true);
            try {
                const res = await fetch("/api/config", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                if (res.status === 401) return router.push("/login");
                const json = await res.json();
                if (res.ok) {
                    setConfigs(json.data || {});
                    loadData();
                } else {
                    setErrorModal(json.message || "Gagal menyimpan kontak");
                }
            } finally {
                setSubmitting(false);
            }
            return;
        }

        setSubmitting(true);

        const payload = { ...formData };
        if (selectedId) payload.id = selectedId;

        if ((activeSection === "project" || activeSection === "article") && !payload.category_id && categories.length > 0) {
            payload.category_id = categories[0].id;
        }

        delete payload.created_at;
        delete payload.updated_at;
        delete payload.deleted_at;

        try {
            const res = await fetch(`/api/${activeSection}`, {
                method: selectedId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (res.status === 401) return router.push("/login");

            const json = await res.json();
            if (res.ok) {
                initNewForm();
                loadData();
            } else {
                setErrorModal(json.message || "Gagal menyimpan data");
            }
        } finally {
            setSubmitting(false);
        }
    }

    // Daftar item aktif sesuai tab untuk ditampilkan di bawah Canvas / Tabel Cepat
    const currentList = useMemo(() => {
        const q = searchQuery.toLowerCase();
        if (activeSection === "project") {
            return projects.filter((i) => i.title?.toLowerCase().includes(q) || i.slug?.toLowerCase().includes(q));
        }
        if (activeSection === "article") {
            return articles.filter((i) => i.title?.toLowerCase().includes(q) || i.slug?.toLowerCase().includes(q));
        }
        if (activeSection === "experience") {
            return experiences.filter((i) => i.company_name?.toLowerCase().includes(q) || i.role_title?.toLowerCase().includes(q));
        }
        if (activeSection === "skill") {
            return skills.filter((i) => i.name?.toLowerCase().includes(q));
        }
        if (activeSection === "faq") {
            return faqs.filter((i) => i.question?.toLowerCase().includes(q) || i.answer?.toLowerCase().includes(q));
        }
        return [];
    }, [activeSection, projects, articles, experiences, skills, faqs, searchQuery]);

    const contentModules = [
        { key: "overview", label: "Overview", count: null },
        { key: "project", label: "Projects", count: projects.length },
        { key: "article", label: "Articles", count: articles.length },
        { key: "experience", label: "Experiences", count: experiences.length },
        { key: "skill", label: "Skills", count: skills.length },
        { key: "faq", label: "FAQ", count: faqs.length },
        { key: "config", label: "Kontak & Sosial", count: null },
    ];

    return (
        <div className="h-screen flex flex-col bg-white text-zinc-900 font-sans antialiased overflow-hidden select-none">
            {/* ==================== 1. TOP BAR (Bitewise Style) ==================== */}
            <header className="h-14 bg-white border-b border-zinc-200 px-5 flex items-center justify-between shrink-0 z-30">
                <div className="flex items-center gap-10">
                    {/* Brand */}
                    <div
                        onClick={() => handleSelectSection("overview")}
                        className="flex items-center gap-2.5 cursor-pointer group"
                    >
                        <img
                            src="/logo.webp"
                            alt="Logo"
                            className="w-7 h-7 object-contain group-hover:scale-105 transition-transform"
                        />
                        <span className="font-bold text-sm text-zinc-900 tracking-tight">
                            ZulStudio <span className="text-[#f7941d] font-medium">CMS</span>
                        </span>
                    </div>

                    {/* Top Center-Left Sub-Tabs (Content | Meta | SEO) */}
                    <div className="hidden md:flex items-center gap-1">
                        {[
                            { id: "content", label: "Content" },
                            { id: "meta", label: "Database" },
                            { id: "seo", label: "SEO & Status" },
                        ].map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTopTab(t.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                    topTab === t.id
                                        ? "bg-amber-500/10 text-amber-600 dark:text-[#f7941d] font-semibold border border-[#f7941d]/30"
                                        : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Search & Theme Toggle */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 bg-zinc-50 border border-zinc-200 focus-within:border-[#f7941d] focus-within:bg-white rounded-lg px-3 h-8 w-64 transition-all">
                        <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <input
                            id="dashboard-search"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-[13px] text-zinc-800 placeholder-zinc-400 w-full"
                        />
                        <kbd className="text-[10px] font-mono text-zinc-400 border border-zinc-200 rounded px-1 bg-white">
                            ⌘K
                        </kbd>
                    </div>

                    {/* Light/Dark Pill Indicator */}
                    <div className="flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
                        <button
                            type="button"
                            onClick={() => toggleTheme(false)}
                            title="Light Mode"
                            className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                                !isDark ? "bg-white text-[#f7941d] shadow-2xs" : "text-zinc-400 hover:text-zinc-700"
                            }`}
                        >
                            <Sun className="w-3.5 h-3.5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleTheme(true)}
                            title="Dark Mode"
                            className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                                isDark ? "bg-white text-[#f7941d] shadow-2xs" : "text-zinc-400 hover:text-zinc-700"
                            }`}
                        >
                            <Moon className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ==================== 2. 3-COLUMN STUDIO BODY ==================== */}
            <div className="flex-1 flex overflow-x-auto overflow-y-hidden">
                {/* ---------- KOLOM KIRI: TREE NAVIGATION SIDEBAR ---------- */}
                <aside className="w-60 bg-zinc-50/60 border-r border-zinc-200 flex flex-col justify-between p-3.5 shrink-0 overflow-y-auto">
                    <div className="space-y-4">
                        {/* Collapsible Box (Mirip kotak "Pages" di referensi) */}
                        <div className="bg-white border border-zinc-200/90 rounded-xl p-2 shadow-2xs">
                            <button
                                onClick={() => setExpandedGroup(!expandedGroup)}
                                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg bg-zinc-100/80 text-xs font-semibold text-zinc-900 cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <LayoutGrid className="w-3.5 h-3.5 text-zinc-600" />
                                    <span>Modules</span>
                                </div>
                                {expandedGroup ? (
                                    <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
                                ) : (
                                    <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                                )}
                            </button>

                            {expandedGroup && (
                                <div className="mt-1.5 space-y-0.5 pl-2">
                                    {contentModules.map((mod) => {
                                        const isActive = activeSection === mod.key;
                                        return (
                                            <button
                                                key={mod.key}
                                                onClick={() => handleSelectSection(mod.key)}
                                                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                                                    isActive
                                                        ? "text-zinc-900 font-semibold bg-zinc-50"
                                                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50/50"
                                                }`}
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-xs transition-colors ${
                                                            isActive ? "bg-[#f7941d]" : "bg-transparent"
                                                        }`}
                                                    />
                                                    <span>{mod.label}</span>
                                                </div>
                                                {mod.count !== null && (
                                                    <span className="text-[10px] font-mono text-zinc-400">
                                                        {mod.count}
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Secondary Menu Links */}
                        <div className="space-y-1 px-1">
                            <button
                                onClick={() => window.open("/", "_blank")}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-2.5">
                                    <Globe className="w-4 h-4 text-zinc-400" />
                                    <span>Live Portfolio</span>
                                </div>
                                <ExternalLink className="w-3 h-3 text-zinc-400" />
                            </button>

                            <button
                                onClick={loadData}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-2.5">
                                    <RefreshCw className={`w-4 h-4 text-zinc-400 ${loading ? "animate-spin text-[#f7941d]" : ""}`} />
                                    <span>Sync Database</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Bottom Logout */}
                    <div className="pt-3 border-t border-zinc-200/80">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Log Out</span>
                        </button>
                    </div>
                </aside>

                {/* ---------- KOLOM TENGAH: MAIN WORKSPACE CANVAS ---------- */}
                <main className="flex-1 overflow-y-auto p-7 bg-white">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* Workspace Title Bar */}
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                            <div>
                                <h1 className="text-lg font-bold text-zinc-900 capitalize">
                                    {activeSection === "overview" ? "System Overview" : `${activeSection} Workspace`}
                                </h1>
                                <p className="text-xs text-zinc-400 mt-0.5">
                                    {activeSection === "overview"
                                        ? "Ringkasan metrik dan status layanan portofolio"
                                        : selectedId
                                        ? `Mengedit item #${selectedId}`
                                        : `Buat entri ${activeSection} baru atau pilih dari daftar di bawah`}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                {activeSection !== "overview" && selectedId && (
                                    <button
                                        onClick={() => initNewForm()}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-950 bg-[#f7941d] hover:bg-[#e08213] h-8 px-3 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Buat Baru
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* JIKA TOP TAB CONTENT */}
                        {topTab === "content" && (
                            <>
                                {/* JIKA OVERVIEW */}
                                {activeSection === "overview" && (
                            <div className="space-y-6">
                                {/* Fieldset Box dengan Floating Tab Label ala Bitewise */}
                                <div className="relative border border-zinc-200 rounded-xl p-5 pt-6 bg-zinc-50/30 space-y-4">
                                    <span className="absolute -top-2.5 left-4 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded text-[11px] font-semibold text-zinc-600">
                                        Metrics & Content Summary
                                    </span>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                                        {[
                                            { key: "project", label: "Projects", count: projects.length, icon: Folder, badge: "bg-amber-500/10 text-amber-600 dark:text-[#f7941d] border-amber-500/20" },
                                            { key: "article", label: "Articles", count: articles.length, icon: FileText, badge: "bg-zinc-100 text-zinc-700 border-zinc-200" },
                                            { key: "experience", label: "Experiences", count: experiences.length, icon: Briefcase, badge: "bg-zinc-100 text-zinc-700 border-zinc-200" },
                                            { key: "skill", label: "Skills", count: skills.length, icon: Zap, badge: "bg-amber-500/10 text-amber-600 dark:text-[#f7941d] border-amber-500/20" },
                                        ].map(({ key, label, count, icon: Icon, badge }) => (
                                            <div
                                                key={key}
                                                onClick={() => handleSelectSection(key)}
                                                className="bg-white border border-zinc-200/90 hover:border-[#f7941d] rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                                            >
                                                <div className="flex items-center justify-between mb-2.5">
                                                    <div className={`p-2 rounded-lg border ${badge}`}>
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-[10px] font-medium text-zinc-400 group-hover:text-[#f7941d] transition-colors">
                                                        Manage →
                                                    </span>
                                                </div>
                                                <div className="text-2xl font-bold text-zinc-900 tracking-tight">{count}</div>
                                                <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Items Quick Preview */}
                                <div className="relative border border-zinc-200 rounded-xl p-5 pt-6 bg-white space-y-3">
                                    <span className="absolute -top-2.5 left-4 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded text-[11px] font-semibold text-zinc-600">
                                        Recent Projects & Articles
                                    </span>

                                    <div className="divide-y divide-zinc-100 text-xs">
                                        {projects.slice(0, 3).map((p) => (
                                            <div key={p.id} className="py-2.5 flex items-center justify-between">
                                                <div>
                                                    <span className="font-semibold text-zinc-800">{p.title}</span>
                                                    <span className="ml-2 font-mono text-zinc-400">/{p.slug}</span>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setActiveSection("project");
                                                        handleSelectItem(p);
                                                    }}
                                                    className="text-amber-600 dark:text-[#f7941d] hover:underline font-medium cursor-pointer"
                                                >
                                                    Buka di Editor
                                                </button>
                                            </div>
                                        ))}
                                        {projects.length === 0 && (
                                            <p className="text-zinc-400 py-3">Belum ada project terdaftar.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* JIKA EDITOR MODULE (PROJECT / ARTICLE / EXPERIENCE / SKILL) */}
                        {activeSection !== "overview" && (
                            <>
                                {/* Canvas Editor Box (Persis Kotak "Header" di Bitewise) */}
                                <div className="relative border border-zinc-200 rounded-xl p-5 pt-6 bg-zinc-50/20 space-y-4">
                                    <span className="absolute -top-2.5 left-4 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded text-[11px] font-semibold text-zinc-600 capitalize">
                                        {selectedId ? `Edit ${activeSection}` : `New ${activeSection} Entry`}
                                    </span>

                                    {/* Form Project */}
                                    {activeSection === "project" && (
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-zinc-800">Project Title (H1)</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.title || ""}
                                                    onChange={(e) => handleTitleChange(e.target.value)}
                                                    placeholder="Embrace Limitless Cloud Storage"
                                                    className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 placeholder-zinc-400 focus:border-[#f7941d] outline-none transition-all"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-zinc-800">Live Demo URL</label>
                                                    <input
                                                        type="url"
                                                        value={formData.demo_url || ""}
                                                        onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                                                        placeholder="https://..."
                                                        className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 placeholder-zinc-400 focus:border-[#f7941d] outline-none transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-zinc-800">Repository URL</label>
                                                    <input
                                                        type="url"
                                                        value={formData.repo_url || ""}
                                                        onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
                                                        placeholder="https://github.com/..."
                                                        className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 placeholder-zinc-400 focus:border-[#f7941d] outline-none transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Form Article dengan Rich Toolbar ala Bitewise */}
                                    {activeSection === "article" && (
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-zinc-800">Article Headline (H1)</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.title || ""}
                                                    onChange={(e) => handleTitleChange(e.target.value)}
                                                    placeholder="Judul artikel teknis..."
                                                    className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 placeholder-zinc-400 focus:border-[#f7941d] outline-none transition-all"
                                                />
                                            </div>

                                            {/* Integrated Toolbar + Textarea Box */}
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-xs font-semibold text-zinc-800">Body Content (Markdown)</label>
                                                    <div className="flex gap-1 text-[11px]">
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditorTab("write")}
                                                            className={`px-2 py-0.5 rounded cursor-pointer ${
                                                                editorTab === "write" ? "bg-zinc-900 text-white font-semibold" : "text-zinc-500"
                                                            }`}
                                                        >
                                                            Write
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditorTab("preview")}
                                                            className={`px-2 py-0.5 rounded cursor-pointer ${
                                                                editorTab === "preview" ? "bg-zinc-900 text-white font-semibold" : "text-zinc-500"
                                                            }`}
                                                        >
                                                            Preview
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white focus-within:border-[#f7941d] transition-colors">
                                                    {/* Toolbar Bar */}
                                                    <div className="bg-zinc-50 border-b border-zinc-200 px-3 py-2 flex items-center justify-between">
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-[11px] text-zinc-500 pr-2 border-r border-zinc-200 mr-1">
                                                                Markdown
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => insertFormat("**", "**")}
                                                                className="p-1.5 rounded hover:bg-zinc-200/70 text-zinc-700 cursor-pointer"
                                                                title="Bold"
                                                            >
                                                                <Bold className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => insertFormat("*", "*")}
                                                                className="p-1.5 rounded hover:bg-zinc-200/70 text-zinc-700 cursor-pointer"
                                                                title="Italic"
                                                            >
                                                                <Italic className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => insertFormat("## ")}
                                                                className="p-1.5 rounded hover:bg-zinc-200/70 text-zinc-700 cursor-pointer"
                                                                title="Heading 2"
                                                            >
                                                                <Heading2 className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => insertFormat("1. ")}
                                                                className="p-1.5 rounded hover:bg-zinc-200/70 text-zinc-700 cursor-pointer"
                                                                title="Ordered List"
                                                            >
                                                                <ListOrdered className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => insertFormat("> ")}
                                                                className="p-1.5 rounded hover:bg-zinc-200/70 text-zinc-700 cursor-pointer"
                                                                title="Quote"
                                                            >
                                                                <Quote className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => insertFormat("```javascript\n", "\n```")}
                                                                className="p-1.5 rounded hover:bg-zinc-200/70 text-[#f7941d] cursor-pointer"
                                                                title="Code Block"
                                                            >
                                                                <Code className="w-3.5 h-3.5" />
                                                            </button>
                                                            <label
                                                                className="p-1.5 rounded hover:bg-zinc-200/70 text-zinc-700 cursor-pointer"
                                                                title="Upload & Sisipkan Gambar (<1MB)"
                                                            >
                                                                <ImageIcon className="w-3.5 h-3.5" />
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    disabled={uploading}
                                                                    className="hidden"
                                                                    onChange={(e) => {
                                                                        const file = e.target.files?.[0];
                                                                        if (file) {
                                                                            handleFileUpload(file, (url) => {
                                                                                insertFormat(`\n![${file.name.replace(/\.[^.]+$/, "")}](${url})\n`);
                                                                            });
                                                                        }
                                                                    }}
                                                                />
                                                            </label>
                                                        </div>
                                                        <span className="text-[10px] font-mono text-zinc-400">
                                                            {(formData.content || "").length} chars
                                                        </span>
                                                    </div>

                                                    {editorTab === "write" ? (
                                                        <textarea
                                                            id="article-content-input"
                                                            value={formData.content || ""}
                                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                                            placeholder="Tuliskan isi artikel di sini..."
                                                            className="w-full p-3.5 text-[13px] font-mono leading-relaxed text-zinc-800 placeholder-zinc-400 outline-none h-56 resize-none bg-white"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="p-4 text-[13px] text-zinc-700 min-h-[224px] max-h-72 overflow-y-auto leading-relaxed"
                                                            dangerouslySetInnerHTML={renderMarkdown(formData.content || "*Belum ada konten...*")}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Form Experience */}
                                    {activeSection === "experience" && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-zinc-800">Company Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.company_name || ""}
                                                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                                        placeholder="e.g. Tokopedia"
                                                        className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d]"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-zinc-800">Role Title</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.role_title || ""}
                                                        onChange={(e) => setFormData({ ...formData, role_title: e.target.value })}
                                                        placeholder="e.g. Embedded Systems Engineer"
                                                        className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Form Skill */}
                                    {activeSection === "skill" && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-zinc-800">Skill / Tech Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name || ""}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="e.g. Next.js, MQTT, PostgreSQL"
                                                    className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d]"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-zinc-800">Icon / Logo (URL atau Upload)</label>
                                                <div className="flex gap-2 items-center">
                                                    {formData.icon_url && (
                                                        <img src={formData.icon_url} alt="Icon" className="w-9 h-9 rounded-lg border border-zinc-200 object-contain p-1 bg-white shrink-0" />
                                                    )}
                                                    <input
                                                        type="url"
                                                        value={formData.icon_url || ""}
                                                        onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
                                                        placeholder="https://... atau klik Upload"
                                                        className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d]"
                                                    />
                                                    <label className="h-9 px-3 rounded-lg border border-zinc-200 hover:border-[#f7941d] bg-white hover:bg-amber-500/10 text-xs font-semibold text-zinc-700 hover:text-[#f7941d] flex items-center justify-center gap-1.5 shrink-0 cursor-pointer transition-colors">
                                                        <UploadCloud className="w-3.5 h-3.5" />
                                                        <span>{uploading ? "..." : "Upload"}</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            disabled={uploading}
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) handleFileUpload(file, (url) => setFormData({ ...formData, icon_url: url }));
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Form FAQ */}
                                    {activeSection === "faq" && (
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-zinc-800">Pertanyaan (Question)</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.question || ""}
                                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                                    placeholder="Tuliskan pertanyaan di sini..."
                                                    className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d]"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-zinc-800">Jawaban (Answer)</label>
                                                <textarea
                                                    required
                                                    rows={4}
                                                    value={formData.answer || ""}
                                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                                    placeholder="Tuliskan jawaban lengkap di sini..."
                                                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white p-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d] resize-none"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Form Kontak & Sosial */}
                                    {activeSection === "config" && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-zinc-800">Nomor WhatsApp (Cth: 62895600366624)</label>
                                                    <input
                                                        type="text"
                                                        value={formData.whatsapp_number || ""}
                                                        onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                                                        placeholder="62895600366624"
                                                        className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d]"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-zinc-800">Email Address</label>
                                                    <input
                                                        type="email"
                                                        value={formData.email_address || ""}
                                                        onChange={(e) => setFormData({ ...formData, email_address: e.target.value })}
                                                        placeholder="name@example.com"
                                                        className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-zinc-800">GitHub URL</label>
                                                <input
                                                    type="url"
                                                    value={formData.github_url || ""}
                                                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                                    placeholder="https://github.com/username"
                                                    className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d]"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-zinc-800">LinkedIn URL</label>
                                                <input
                                                    type="url"
                                                    value={formData.linkedin_url || ""}
                                                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                                    placeholder="https://www.linkedin.com/in/..."
                                                    className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d]"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-zinc-800">Instagram URL</label>
                                                <input
                                                    type="url"
                                                    value={formData.instagram_url || ""}
                                                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                                                    placeholder="https://www.instagram.com/..."
                                                    className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d]"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Daftar Item Tersimpan (Mirip "Partner Company Logos" pills/list di bagian bawah referensi) */}
                                {activeSection !== "config" && (
                                <div className="space-y-2.5 pt-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xs font-semibold text-zinc-700 capitalize">
                                            Existing {activeSection}s ({currentList.length})
                                        </h3>
                                        <span className="text-[11px] text-zinc-400">Klik item untuk mengedit</span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {currentList.map((item) => {
                                            const isSelected = selectedId === item.id;
                                            const title = item.title || item.company_name || item.name || item.question;
                                            const sub = item.slug ? `/${item.slug}` : item.role_title || (item.answer ? item.answer.slice(0, 45) + "..." : "Active Item");

                                            return (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleSelectItem(item)}
                                                    className={`group relative flex items-center justify-between p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                                                        isSelected
                                                            ? "border-[#f7941d] bg-amber-500/10"
                                                            : "border-zinc-200 bg-zinc-50/50 hover:bg-white hover:border-zinc-300"
                                                    }`}
                                                >
                                                    <div className="truncate pr-4 flex-1">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="font-bold text-zinc-900 truncate">{title}</span>
                                                            {activeSection === "article" && (
                                                                item.is_published ? (
                                                                    <span className="px-1.5 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-700 border border-zinc-200 shrink-0">Pub</span>
                                                                ) : (
                                                                    <span className="px-1.5 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-600 dark:text-[#f7941d] border border-amber-200/60 shrink-0">Draft</span>
                                                                )
                                                            )}
                                                            {activeSection === "project" && item.is_featured && (
                                                                <span className="px-1.5 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-600 dark:text-[#f7941d] border border-amber-200/60 shrink-0">Featured</span>
                                                            )}
                                                        </div>
                                                        <div className="text-[11px] text-zinc-400 font-mono truncate">{sub}</div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(activeSection, item.id);
                                                        }}
                                                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            );
                                        })}

                                        <button
                                            type="button"
                                            onClick={() => initNewForm()}
                                            className="flex items-center justify-center gap-1.5 p-3 rounded-xl border border-dashed border-zinc-300 text-xs font-semibold text-zinc-500 hover:border-[#f7941d] hover:text-[#f7941d] transition-colors cursor-pointer"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            <span>Add New</span>
                                        </button>
                                    </div>
                                </div>
                                )}
                            </>
                        )}
                    </>
                )}

                {/* JIKA TOP TAB DATABASE (META) */}
                {topTab === "meta" && (
                    <div className="relative border border-zinc-200 rounded-xl p-5 pt-6 bg-zinc-50/20 space-y-4">
                        <span className="absolute -top-2.5 left-4 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded text-[11px] font-semibold text-zinc-600">
                            Database & Tables Overview
                        </span>
                        <div className="divide-y divide-zinc-200 text-xs">
                            <div className="py-2.5 flex items-center justify-between">
                                <span className="font-mono text-zinc-700">mst_project</span>
                                <span className="text-zinc-500 font-mono">{projects.length} rows</span>
                            </div>
                            <div className="py-2.5 flex items-center justify-between">
                                <span className="font-mono text-zinc-700">mst_article</span>
                                <span className="text-zinc-500 font-mono">{articles.length} rows</span>
                            </div>
                            <div className="py-2.5 flex items-center justify-between">
                                <span className="font-mono text-zinc-700">mst_experience</span>
                                <span className="text-zinc-500 font-mono">{experiences.length} rows</span>
                            </div>
                            <div className="py-2.5 flex items-center justify-between">
                                <span className="font-mono text-zinc-700">ref_skill</span>
                                <span className="text-zinc-500 font-mono">{skills.length} rows</span>
                            </div>
                            <div className="py-2.5 flex items-center justify-between">
                                <span className="font-mono text-zinc-700">ref_category</span>
                                <span className="text-zinc-500 font-mono">{categories.length} rows</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* JIKA TOP TAB SEO */}
                {topTab === "seo" && (
                    <div className="relative border border-zinc-200 rounded-xl p-5 pt-6 bg-zinc-50/20 space-y-4">
                        <span className="absolute -top-2.5 left-4 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded text-[11px] font-semibold text-zinc-600">
                            Search Engine Optimization (SEO)
                        </span>
                        {(activeSection === "project" || activeSection === "article") ? (
                            <div className="space-y-4 text-xs">
                                <div className="space-y-1.5">
                                    <label className="font-semibold text-zinc-800">Meta Title</label>
                                    <input
                                        type="text"
                                        value={formData.meta_title || ""}
                                        onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                                        placeholder="Judul SEO untuk search engine..."
                                        className="w-full h-9 rounded-lg border border-zinc-200 bg-white px-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d]"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="font-semibold text-zinc-800">Meta Description</label>
                                    <textarea
                                        value={formData.meta_description || ""}
                                        onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                        placeholder="Deskripsi ringkas untuk snippet search engine..."
                                        rows={3}
                                        className="w-full rounded-lg border border-zinc-200 bg-white p-3 text-[13px] leading-relaxed text-zinc-900 outline-none focus:border-[#f7941d] resize-none"
                                    />
                                </div>
                            </div>
                        ) : (
                            <p className="text-xs text-zinc-500 py-3">
                                Metadata SEO dapat dikonfigurasi saat modul <strong>Projects</strong> atau <strong>Articles</strong> dipilih.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </main>

                {/* ---------- KOLOM KANAN: INSPECTOR & PROPERTIES PANEL ---------- */}
                <aside className="w-80 bg-zinc-50/60 border-l border-zinc-200 p-5 flex flex-col justify-between shrink-0 overflow-y-auto">
                    <div className="space-y-6">
                        {/* Visual Mode Card (Persis "Appearance" di gambar referensi) */}
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between text-xs font-semibold text-zinc-800">
                                <span>Workspace Mode</span>
                                <Info className="w-3.5 h-3.5 text-zinc-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                <div
                                    onClick={() => toggleTheme(false)}
                                    className={`rounded-xl p-2.5 border-2 transition-all cursor-pointer ${
                                        !isDark
                                            ? "border-[#f7941d] bg-white shadow-2xs"
                                            : "border-zinc-200 bg-zinc-100 opacity-60 hover:opacity-100"
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[11px] font-bold text-[#f7941d]">
                                            {!isDark ? "ACTIVE" : "LIGHT"}
                                        </span>
                                        {!isDark && (
                                            <span className="w-4 h-4 rounded bg-[#f7941d] text-zinc-950 flex items-center justify-center text-[10px] font-bold">✓</span>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="h-2 w-12 bg-zinc-200 rounded" />
                                        <div className="h-6 w-full bg-zinc-100 rounded border border-zinc-200" />
                                    </div>
                                    <div className="text-[11px] font-medium text-zinc-700 mt-2">Light Studio</div>
                                </div>

                                <div
                                    onClick={() => toggleTheme(true)}
                                    className={`rounded-xl p-2.5 border-2 transition-all cursor-pointer ${
                                        isDark
                                            ? "border-[#f7941d] bg-zinc-900 shadow-2xs"
                                            : "border-zinc-200 bg-zinc-900 opacity-60 hover:opacity-100"
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-[11px] font-bold ${isDark ? "text-[#f7941d]" : "text-zinc-400"}`}>
                                            {isDark ? "ACTIVE" : "DARK"}
                                        </span>
                                        {isDark && (
                                            <span className="w-4 h-4 rounded bg-[#f7941d] text-zinc-950 flex items-center justify-center text-[10px] font-bold">✓</span>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="h-2 w-12 bg-zinc-700 rounded" />
                                        <div className="h-6 w-full bg-zinc-800 rounded border border-zinc-700" />
                                    </div>
                                    <div className="text-[11px] font-medium text-zinc-300 mt-2">Dark Studio</div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-zinc-200" />

                        {/* Inspector Properties Sesuai Konteks Tab */}
                        {activeSection === "overview" ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-xs font-semibold text-zinc-800">
                                    <span>System Diagnostics</span>
                                    <Info className="w-3.5 h-3.5 text-zinc-400" />
                                </div>

                                <div className="space-y-2.5">
                                    <div className="bg-white border border-zinc-200 rounded-xl p-3 flex items-center justify-between text-xs">
                                        <span className="text-zinc-500">PageSpeed Score</span>
                                        <span className="font-mono font-bold text-[#f7941d] bg-amber-50 px-2 py-0.5 rounded">98 / 100</span>
                                    </div>
                                    <div className="bg-white border border-zinc-200 rounded-xl p-3 flex items-center justify-between text-xs">
                                        <span className="text-zinc-500">Database Engine</span>
                                        <span className="font-mono text-zinc-800">PostgreSQL</span>
                                    </div>
                                    <div className="bg-white border border-zinc-200 rounded-xl p-3 flex items-center justify-between text-xs">
                                        <span className="text-zinc-500">Categories</span>
                                        <span className="font-mono text-zinc-800">{categories.length} registered</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-xs font-semibold text-zinc-800">
                                    <span>Entry Metadata</span>
                                    <Info className="w-3.5 h-3.5 text-zinc-400" />
                                </div>

                                {/* Slug & Category (Project / Article) */}
                                {(activeSection === "project" || activeSection === "article") && (
                                    <>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] text-zinc-500 font-medium">URL Slug</label>
                                            <div className="flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs">
                                                <input
                                                    type="text"
                                                    value={formData.slug || ""}
                                                    onChange={(e) => {
                                                        setSlugManuallyEdited(true);
                                                        setFormData({ ...formData, slug: e.target.value });
                                                    }}
                                                    placeholder="auto-generated"
                                                    className="w-full bg-transparent outline-none font-mono text-zinc-800 text-xs"
                                                />
                                                <span className="text-[10px] font-mono text-zinc-400 ml-1">URI</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] text-zinc-500 font-medium">Category</label>
                                            <select
                                                value={formData.category_id || (categories[0]?.id || "")}
                                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                                className="w-full h-9 rounded-lg border border-zinc-200 bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-[#f7941d]"
                                            >
                                                {categories.map((c) => (
                                                    <option key={c.id} value={c.id}>
                                                        {c.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {activeSection === "article" && (
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] text-zinc-500 font-medium">Canonical / Jurnal URL</label>
                                                <input
                                                    type="url"
                                                    value={formData.canonical_url || ""}
                                                    onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                                                    placeholder="https://jurnal.polgan.ac.id/..."
                                                    className="w-full h-9 rounded-lg border border-zinc-200 bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-[#f7941d]"
                                                />
                                            </div>
                                        )}

                                        {/* Thumbnail / Cover Image Upload */}
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[11px] text-zinc-500 font-medium">Cover / Thumbnail</label>
                                                {formData.thumbnail_url && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, thumbnail_url: "" })}
                                                        className="text-[10px] text-red-500 hover:underline cursor-pointer"
                                                    >
                                                        Hapus
                                                    </button>
                                                )}
                                            </div>
                                            {formData.thumbnail_url ? (
                                                <div className="relative rounded-lg overflow-hidden border border-zinc-200 group aspect-video bg-zinc-100 flex items-center justify-center">
                                                    <img src={formData.thumbnail_url} alt="Cover" className="w-full h-full object-cover" />
                                                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[11px] font-semibold cursor-pointer transition-opacity">
                                                        <UploadCloud className="w-4 h-4 mb-1" />
                                                        <span>Ganti Gambar</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            disabled={uploading}
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) handleFileUpload(file, (url) => setFormData({ ...formData, thumbnail_url: url }));
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                            ) : (
                                                <label className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl border border-dashed border-zinc-300 hover:border-[#f7941d] bg-zinc-50/50 hover:bg-amber-500/10 text-zinc-500 hover:text-[#f7941d] transition-all cursor-pointer">
                                                    <UploadCloud className="w-5 h-5" />
                                                    <span className="text-[11px] font-semibold">
                                                        {uploading ? "Mengompres & Upload..." : "Upload Thumbnail (<1MB)"}
                                                    </span>
                                                    <span className="text-[9px] text-zinc-400">Auto-compress ke WebP</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        disabled={uploading}
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleFileUpload(file, (url) => setFormData({ ...formData, thumbnail_url: url }));
                                                        }}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Toggles (Visibility / Featured) */}
                                {activeSection === "project" && (
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] text-zinc-500 font-medium">Highlight</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, is_featured: true })}
                                                className={`h-8 rounded-lg border text-xs font-semibold cursor-pointer ${
                                                    formData.is_featured
                                                        ? "border-[#f7941d] bg-amber-500/10 text-[#f7941d]"
                                                        : "border-zinc-200 bg-white text-zinc-500"
                                                }`}
                                            >
                                                Featured
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, is_featured: false })}
                                                className={`h-8 rounded-lg border text-xs font-semibold cursor-pointer ${
                                                    !formData.is_featured
                                                        ? "border-[#f7941d] bg-amber-500/10 text-[#f7941d]"
                                                        : "border-zinc-200 bg-white text-zinc-500"
                                                }`}
                                            >
                                                Standard
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeSection === "article" && (
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] text-zinc-500 font-medium">Publish Status</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, is_published: true })}
                                                className={`h-8 rounded-lg border text-xs font-semibold cursor-pointer ${
                                                    formData.is_published ?? true
                                                        ? "border-[#f7941d] bg-amber-500/10 text-[#f7941d]"
                                                        : "border-zinc-200 bg-white text-zinc-500"
                                                }`}
                                            >
                                                Published
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, is_published: false })}
                                                className={`h-8 rounded-lg border text-xs font-semibold cursor-pointer ${
                                                    formData.is_published === false
                                                        ? "border-[#f7941d] bg-amber-500/10 text-[#f7941d]"
                                                        : "border-zinc-200 bg-white text-zinc-500"
                                                }`}
                                            >
                                                Draft
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Experience Dates di Inspector Kanan */}
                                {activeSection === "experience" && (
                                    <div className="grid grid-cols-2 gap-2.5">
                                        <div className="space-y-1">
                                            <label className="text-[11px] text-zinc-500 font-medium">Start Date</label>
                                            <DatePicker
                                                value={formData.start_date || ""}
                                                onChange={(val) => setFormData({ ...formData, start_date: val })}
                                                placeholder="YYYY-MM-DD"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[11px] text-zinc-500 font-medium">End Date</label>
                                            <DatePicker
                                                value={formData.end_date || ""}
                                                onChange={(val) => setFormData({ ...formData, end_date: val })}
                                                placeholder="Present"
                                                alignRight={true}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* FAQ Order Index di Inspector Kanan */}
                                {activeSection === "faq" && (
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] text-zinc-500 font-medium">Urutan Tampil (Order Index)</label>
                                        <input
                                            type="number"
                                            value={formData.order_index ?? 0}
                                            onChange={(e) => setFormData({ ...formData, order_index: Number(e.target.value) })}
                                            className="w-full h-9 rounded-lg border border-zinc-200 bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-[#f7941d]"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Tombol Update di Bawah Inspector (Persis tombol "Update" di gambar) */}
                    {activeSection !== "overview" && (
                        <div className="pt-4 border-t border-zinc-200">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="w-full h-10 rounded-xl bg-[#f7941d] hover:bg-[#e08213] text-zinc-950 text-sm font-bold transition-all cursor-pointer disabled:opacity-50 shadow-sm shadow-[#f7941d]/20 active:scale-[0.98] flex items-center justify-center"
                            >
                                {submitting
                                    ? "Saving..."
                                    : activeSection === "config"
                                    ? "Simpan Pengaturan Kontak"
                                    : selectedId
                                    ? `Update ${activeSection}`
                                    : `Create ${activeSection}`}
                            </button>
                        </div>
                    )}
                </aside>
            </div>

            {/* Center Error / Validation Popup Modal */}
            {errorModal && (
                <div onClick={() => setErrorModal("")} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                    <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-center shadow-2xl space-y-4">
                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                            <Info className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-zinc-100">Pemberitahuan</h3>
                            <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">{errorModal}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setErrorModal("")}
                            className="w-full h-9 rounded-xl bg-[#f7941d] hover:bg-[#e08213] text-zinc-950 text-xs font-bold transition-all cursor-pointer"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}