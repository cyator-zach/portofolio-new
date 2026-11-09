import { NextResponse } from "next/server";
import { resInternalError, resTooManyRequests } from "@/utils/response";
import jwt from "jsonwebtoken";

const rateLimitMap = new Map();

function checkRateLimit(ip, limit) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (rateLimitMap.size > 1000) {
        for (const [key, val] of rateLimitMap) {
            if (now > val.resetAt) rateLimitMap.delete(key);
        }
    }

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
        return false;
    }

    if (entry.count >= limit) return true;
    entry.count++;
    return false;
}

export class Router {
    constructor() {
        this.routes = [];
    }

    get(path, handler) {
        this.routes.push({ method: "GET", path, handler });
    }

    post(path, handler) {
        this.routes.push({ method: "POST", path, handler });
    }

    put(path, handler) {
        this.routes.push({ method: "PUT", path, handler });
    }

    delete(path, handler) {
        this.routes.push({ method: "DELETE", path, handler });
    }

    async handle(request, params) {
        try {
            const pathname = "/" + ((await params)?.slug || []).join("/");
            const method = request.method;

            const ip = request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
            const limit = pathname === "/auth/login" ? 5 : 60;
            if (checkRateLimit(ip, limit)) {
                return resTooManyRequests();
            }

            const isPublic = method === "GET" || pathname.startsWith("/auth/");
            if (!isPublic) {
                const token = request.cookies.get("token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");
                if (!token) {
                    return NextResponse.json({ statusCode: 401, message: "Unauthorized: Silakan login terlebih dahulu" }, { status: 401 });
                }
                try {
                    jwt.verify(token, process.env.JWT_SECRET);
                } catch {
                    return NextResponse.json({ statusCode: 401, message: "Unauthorized: Token tidak valid atau sesi berakhir" }, { status: 401 });
                }
            }

            const route = this.routes.find((r) => r.method === method && r.path === pathname);
            if (route) {
                return await route.handler(request);
            }

            return NextResponse.json({ statusCode: 404, message: "Endpoint not found" }, { status: 404 });
        } catch (err) {
            return resInternalError();
        }
    }
}
