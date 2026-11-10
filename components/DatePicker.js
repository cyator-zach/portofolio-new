"use client";

import { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export default function DatePicker({ value, onChange, placeholder = "YYYY-MM-DD", alignRight = false }) {
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

