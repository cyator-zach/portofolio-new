import { NextResponse } from "next/server";

export function resSuccess(data, statusCode = 200) {
    const body = { statusCode, message: "success" };
    if (data !== undefined) body.data = data;
    return NextResponse.json(body, { status: statusCode });
}

export function resBadRequest(message) {
    return NextResponse.json({ statusCode: 400, message }, { status: 400 });
}

export function resNotFound() {
    return NextResponse.json({ statusCode: 404, message: "Data not found" }, { status: 404 });
}

export function resTooManyRequests() {
    return NextResponse.json({ statusCode: 429, message: "Too many requests" }, { status: 429 });
}

export function resInternalError() {
    return NextResponse.json({ statusCode: 500, message: "Internal server error." }, { status: 500 });
}
