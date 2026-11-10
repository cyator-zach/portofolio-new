"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    Sun,
    Moon,
    Folder,
    FileText,
    Briefcase,
    Zap,
    Plus,
    Info,
} from "lucide-react";
import { compressImage } from "@/utils/compressImage";
import { api } from "@/services/api";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardInspector from "@/components/dashboard/DashboardInspector";
import DashboardForms from "@/components/dashboard/DashboardForms";

function generateSlug(text = "") {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export default function DashboardPage() {
    const router = useRouter();

    // Navigasi Utama & Sub-Tab Atas
    const [activeSection, setActiveSection] = useState("overview"); // overview | project | article | experience | skill | faq | config
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

    // Workspace & Form State
    const [selectedId, setSelectedId] = useState(null);
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

            const json = await api.upload(data);
            if (json.status === 401) return router.push("/login");

            if (json.ok && json.data?.url) {
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
        api.getDashboardData()
            .then(([p, a, e, s, c, f, cfg]) => {
                if ([p, a, e, s, c, f, cfg].some(r => r.status === 401)) {
                    return router.push("/login");
                }
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
        await api.logout();
        router.push("/login");
    }

    async function handleDelete(type, id) {
        if (!confirm(`Hapus ${type} ini secara permanen?`)) return;
        const res = await api.deleteItem(type, id);
        if (res.status === 401) return router.push("/login");
        if (res.ok) {
            if (selectedId === id) initNewForm();
            loadData();
        } else {
            setErrorModal(res.message || "Gagal menghapus data");
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
                const json = await api.saveItem("config", formData, true);
                if (json.status === 401) return router.push("/login");
                if (json.ok) {
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
            const json = await api.saveItem(activeSection, payload, selectedId);
            if (json.status === 401) return router.push("/login");

            if (json.ok) {
                initNewForm();
                loadData();
            } else {
                setErrorModal(json.message || "Gagal menyimpan data");
            }
        } finally {
            setSubmitting(false);
        }
    }

    // Filter pencarian
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
            {/* Top Bar */}
            <header className="h-14 bg-white border-b border-zinc-200 px-5 flex items-center justify-between shrink-0 z-30">
                <div className="flex items-center gap-10">
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

            {/* 3-Column Studio Body */}
            <div className="flex-1 flex overflow-x-auto overflow-y-hidden">
                {/* Kolom Kiri: Sidebar */}
                <DashboardSidebar
                    activeSection={activeSection}
                    contentModules={contentModules}
                    expandedGroup={expandedGroup}
                    setExpandedGroup={setExpandedGroup}
                    onSelectSection={handleSelectSection}
                    loading={loading}
                    onSyncData={loadData}
                    onLogout={handleLogout}
                />

                {/* Kolom Tengah: Main Workspace Canvas */}
                <main className="flex-1 overflow-y-auto p-7 bg-white">
                    <div className="max-w-3xl mx-auto space-y-6">
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

                        {/* Top Tab Content */}
                        {topTab === "content" && (
                            <>
                                {activeSection === "overview" && (
                                    <div className="space-y-6">
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

                                {activeSection !== "overview" && (
                                    <DashboardForms
                                        activeSection={activeSection}
                                        formData={formData}
                                        setFormData={setFormData}
                                        handleTitleChange={handleTitleChange}
                                        editorTab={editorTab}
                                        setEditorTab={setEditorTab}
                                        insertFormat={insertFormat}
                                        renderMarkdown={renderMarkdown}
                                        uploading={uploading}
                                        handleFileUpload={handleFileUpload}
                                        currentList={currentList}
                                        selectedId={selectedId}
                                        handleSelectItem={handleSelectItem}
                                        handleDelete={handleDelete}
                                        initNewForm={initNewForm}
                                    />
                                )}
                            </>
                        )}

                        {/* Top Tab Meta */}
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
                                    <div className="py-2.5 flex items-center justify-between">
                                        <span className="font-mono text-zinc-700">mst_faq</span>
                                        <span className="text-zinc-500 font-mono">{faqs.length} rows</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Top Tab SEO */}
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

                {/* Kolom Kanan: Inspector & Properties Panel */}
                <DashboardInspector
                    activeSection={activeSection}
                    categories={categories}
                    formData={formData}
                    setFormData={setFormData}
                    setSlugManuallyEdited={setSlugManuallyEdited}
                    uploading={uploading}
                    handleFileUpload={handleFileUpload}
                    submitting={submitting}
                    selectedId={selectedId}
                    onSubmit={handleSubmit}
                    isDark={isDark}
                    toggleTheme={toggleTheme}
                />
            </div>

            {/* Error / Validation Modal */}
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
