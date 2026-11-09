import { db } from "@/lib/knexClient";
import { resSuccess, resBadRequest, resNotFound } from "@/utils/response";
import { validateRequired } from "@/utils/validator";

export async function getExperience() {
    const data = await db("mst_experience").where({ is_active: true }).orderBy("start_date", "desc");
    return resSuccess(data);
}

export async function createExperience(req) {
    const body = await req.json();
    const err = validateRequired(body, ["company_name", "role_title", "start_date"]);
    if (err) return resBadRequest(err);

    const [experience] = await db("mst_experience")
        .insert({
            id: crypto.randomUUID(),
            company_name: body.company_name,
            role_title: body.role_title,
            start_date: body.start_date,
            end_date: body.end_date || null,
            description: body.description || "",
        })
        .returning("*");

    return resSuccess(experience, 201);
}

export async function updateExperience(req) {
    const body = await req.json();
    const err = validateRequired(body, ["id"]);
    if (err) return resBadRequest(err);

    const { id } = body;
    const allowed = ["company_name", "role_title", "start_date", "end_date", "description"];
    const data = {};
    for (const key of allowed) {
        if (body[key] !== undefined) data[key] = body[key];
    }

    const [experience] = await db("mst_experience").where({ id }).update(data).returning("*");
    if (!experience) return resNotFound();

    return resSuccess(experience);
}

export async function deleteExperience(req) {
    const body = await req.json();
    const err = validateRequired(body, ["id"]);
    if (err) return resBadRequest(err);

    const count = await db("mst_experience").where({ id: body.id }).del();
    if (!count) return resNotFound();

    return resSuccess();
}
