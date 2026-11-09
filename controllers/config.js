import { db } from "@/lib/knexClient";
import { resSuccess, resBadRequest } from "@/utils/response";

export async function getConfig() {
    const rows = await db("sys_app_config").select("config_key", "config_value");
    const configMap = {};
    for (const r of rows) {
        configMap[r.config_key] = r.config_value;
    }
    return resSuccess(configMap);
}

export async function updateConfig(req) {
    const body = await req.json();
    if (!body || typeof body !== "object") {
        return resBadRequest("Invalid config payload");
    }

    for (const [key, val] of Object.entries(body)) {
        const existing = await db("sys_app_config").where({ config_key: key }).first();
        if (existing) {
            await db("sys_app_config")
                .where({ config_key: key })
                .update({ config_value: String(val ?? ""), updated_at: db.fn.now() });
        } else {
            await db("sys_app_config").insert({
                id: crypto.randomUUID(),
                config_key: key,
                config_value: String(val ?? ""),
            });
        }
    }

    const rows = await db("sys_app_config").select("config_key", "config_value");
    const configMap = {};
    for (const r of rows) {
        configMap[r.config_key] = r.config_value;
    }
    return resSuccess(configMap);
}

