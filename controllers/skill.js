import { db } from "@/lib/knexClient";
import { resSuccess, resBadRequest, resNotFound } from "@/utils/response";
import { validateRequired } from "@/utils/validator";

export async function getSkill() {
    const data = await db("ref_skill").orderBy("name", "asc");
    return resSuccess(data);
}

export async function createSkill(req) {
    const body = await req.json();
    const err = validateRequired(body, ["name"]);
    if (err) return resBadRequest(err);

    const [skill] = await db("ref_skill")
        .insert({
            id: crypto.randomUUID(),
            name: body.name,
            icon_url: body.icon_url || null,
        })
        .returning("*");

    return resSuccess(skill, 201);
}

export async function updateSkill(req) {
    const body = await req.json();
    const err = validateRequired(body, ["id", "name"]);
    if (err) return resBadRequest(err);

    const { id, name, icon_url } = body;
    const data = { name };
    if (icon_url !== undefined) data.icon_url = icon_url;

    const [skill] = await db("ref_skill").where({ id }).update(data).returning("*");
    if (!skill) return resNotFound();

    return resSuccess(skill);
}

export async function deleteSkill(req) {
    const body = await req.json();
    const err = validateRequired(body, ["id"]);
    if (err) return resBadRequest(err);

    const count = await db("ref_skill").where({ id: body.id }).del();
    if (!count) return resNotFound();

    return resSuccess();
}
