import { db } from "@/lib/knexClient";
import { resSuccess, resBadRequest } from "@/utils/response";
import { validateRequired } from "@/utils/validator";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function login(req) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is missing");
    }

    const body = await req.json();
    const err = validateRequired(body, ["email", "password"]);
    if (err) return resBadRequest(err);

    const user = await db("sys_user").where({ email: body.email, is_active: true }).first();
    if (!user) {
        return resBadRequest("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
        return resBadRequest("Invalid email or password");
    }

    await db("sys_user").where({ id: user.id }).update({ last_login_at: db.fn.now() });

    const token = jwt.sign(
        { id: user.id, email: user.email, name: user.nama },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    const response = NextResponse.json({
        statusCode: 200,
        message: "success",
        data: { id: user.id, name: user.nama, email: user.email },
    });

    response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60,
    });

    return response;
}

export async function refresh(req) {
    const token = req.cookies.get("token")?.value;
    if (!token) return resBadRequest("Token not found");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const newToken = jwt.sign(
            { id: decoded.id, email: decoded.email, name: decoded.name },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const response = NextResponse.json({ statusCode: 200, message: "success" });
        response.cookies.set({
            name: "token",
            value: newToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 15 * 60,
        });
        return response;
    } catch {
        return resBadRequest("Token tidak valid atau telah kedaluwarsa");
    }
}

export async function logout() {
    const response = NextResponse.json({ statusCode: 200, message: "success" });
    response.cookies.delete("token");
    return response;
}
