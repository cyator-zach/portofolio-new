"use client";

import { Info, UploadCloud } from "lucide-react";
import DatePicker from "@/components/DatePicker";

export default function DashboardInspector({
    activeSection,
    categories,
    formData,
    setFormData,
    setSlugManuallyEdited,
    uploading,
    handleFileUpload,
    submitting,
    selectedId,
    onSubmit,
    isDark,
    toggleTheme,
}) {
    return (
        <aside className="w-80 bg-zinc-50/60 border-l border-zinc-200 p-5 flex flex-col justify-between shrink-0 overflow-y-auto">
            <div className="space-y-6">
                {/* Visual Mode Card */}
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

            {/* Tombol Update di Bawah Inspector */}
            {activeSection !== "overview" && (
                <div className="pt-4 border-t border-zinc-200">
                    <button
                        type="button"
                        onClick={onSubmit}
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
    );
}

