"use client";

import {
    LayoutGrid,
    ChevronUp,
    ChevronDown,
    Globe,
    ExternalLink,
    RefreshCw,
    LogOut,
} from "lucide-react";

export default function DashboardSidebar({
    activeSection,
    contentModules,
    expandedGroup,
    setExpandedGroup,
    onSelectSection,
    loading,
    onSyncData,
    onLogout,
}) {
    return (
        <aside className="w-60 bg-zinc-50/60 border-r border-zinc-200 flex flex-col justify-between p-3.5 shrink-0 overflow-y-auto">
            <div className="space-y-4">
                {/* Collapsible Modules Box */}
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
                                        onClick={() => onSelectSection(mod.key)}
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
                        onClick={onSyncData}
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
                    onClick={onLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                </button>
            </div>
        </aside>
    );
}

