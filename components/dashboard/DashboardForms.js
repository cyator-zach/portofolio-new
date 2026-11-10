"use client";

import {
    Bold,
    Italic,
    Heading2,
    ListOrdered,
    Quote,
    Code,
    Trash2,
    Plus,
    UploadCloud,
    Image as ImageIcon,
} from "lucide-react";

export default function DashboardForms({
    activeSection,
    formData,
    setFormData,
    handleTitleChange,
    editorTab,
    setEditorTab,
    insertFormat,
    renderMarkdown,
    uploading,
    handleFileUpload,
    currentList,
    selectedId,
    handleSelectItem,
    handleDelete,
    initNewForm,
}) {
    return (
        <div className="space-y-6">
            <div className="border border-zinc-200 rounded-xl p-5 bg-white shadow-2xs space-y-4">
                {/* Form Project */}
                {activeSection === "project" && (
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-zinc-800">Project Title</label>
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

                {/* Form Article */}
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
                                        rows={10}
                                        required
                                        value={formData.content || ""}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        placeholder="Tulis artikel teknis Anda menggunakan format Markdown..."
                                        className="w-full p-3.5 text-[13px] leading-relaxed text-zinc-900 placeholder-zinc-400 outline-none resize-y font-mono bg-white"
                                    />
                                ) : (
                                    <div
                                        className="p-4 prose prose-sm max-w-none min-h-[220px] bg-zinc-50/50 text-[13px] text-zinc-800 leading-relaxed overflow-y-auto"
                                        dangerouslySetInnerHTML={renderMarkdown(formData.content || "*Belum ada konten ditulis.*")}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-zinc-800">Executive Summary</label>
                            <textarea
                                rows={2}
                                value={formData.summary || ""}
                                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                placeholder="Ringkasan singkat artikel..."
                                className="w-full rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white p-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d] resize-none"
                            />
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
                                    placeholder="e.g. PT. Global Teknologi"
                                    className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d]"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-800">Role / Position Title</label>
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
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-zinc-800">Tanggal Terakhir Update (AEO Freshness)</label>
                            <input
                                type="date"
                                value={formData.last_updated || ""}
                                onChange={(e) => setFormData({ ...formData, last_updated: e.target.value })}
                                className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50/70 focus:bg-white px-3 text-[13px] text-zinc-900 outline-none focus:border-[#f7941d]"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Existing Items Grid List */}
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
        </div>
    );
}

