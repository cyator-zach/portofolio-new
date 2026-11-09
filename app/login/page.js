"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const json = await res.json();
            if (res.ok) {
                router.push("/dashboard");
            } else {
                setError(json.message || "Invalid credentials");
            }
        } catch (err) {
            setError("Gagal terhubung ke server");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 p-4 text-zinc-100 overflow-hidden">
            {/* Abstract Background Ambient Glow & Grid Pattern */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#f7941d]/15 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#f7941d]/10 blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#f7941d_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-sm space-y-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-7 shadow-2xl backdrop-blur-xl transition-all"
            >
                <div className="flex items-center gap-3.5 pb-1">
                    <img src="/logo.webp" alt="Logo" className="w-9 h-9 object-contain shrink-0" />
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-white leading-tight">
                            Admin <span className="text-[#f7941d]">Login</span>
                        </h1>
                        <p className="text-xs text-zinc-400 mt-0.5">Masuk untuk mengelola portofolio</p>
                    </div>
                </div>

                {error && (
                    <div className="rounded-lg border border-red-900/50 bg-red-950/40 p-2.5 text-xs text-red-400">
                        {error}
                    </div>
                )}

                <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-zinc-300">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@zul.dev"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-[#f7941d] focus:outline-none transition-colors"
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-zinc-300">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-[#f7941d] focus:outline-none transition-colors"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#f7941d] hover:bg-[#e08213] py-2.5 text-sm font-bold text-zinc-950 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-[#f7941d]/20 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></span>
                            <span>Memproses...</span>
                        </>
                    ) : (
                        <span>Masuk ke Dashboard</span>
                    )}
                </button>
            </form>
        </div>
    );
}
