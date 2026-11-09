import { db } from "@/lib/knexClient";
import { resSuccess, resBadRequest, resNotFound } from "@/utils/response";
import { validateRequired } from "@/utils/validator";

export async function getFaq() {
    const data = await db("mst_faq").where({ is_active: true }).orderBy("order_index", "asc");
    return resSuccess(data);
}

export async function createFaq(req) {
    const body = await req.json();
    const err = validateRequired(body, ["question", "answer"]);
    if (err) return resBadRequest(err);

    const [faq] = await db("mst_faq")
        .insert({
            id: crypto.randomUUID(),
            question: body.question,
            answer: body.answer,
            order_index: body.order_index || 0,
            is_active: body.is_active !== undefined ? body.is_active : true,
        })
        .returning("*");

    return resSuccess(faq, 201);
}

export async function updateFaq(req) {
    const body = await req.json();
    const err = validateRequired(body, ["id"]);
    if (err) return resBadRequest(err);

    const { id } = body;
    const allowed = ["question", "answer", "order_index", "is_active"];
    const data = { updated_at: db.fn.now() };
    for (const key of allowed) {
        if (body[key] !== undefined) data[key] = body[key];
    }

    const [faq] = await db("mst_faq").where({ id }).update(data).returning("*");
    if (!faq) return resNotFound();

    return resSuccess(faq);
}

export async function deleteFaq(req) {
    const body = await req.json();
    const err = validateRequired(body, ["id"]);
    if (err) return resBadRequest(err);

    const count = await db("mst_faq").where({ id: body.id }).del();
    if (!count) return resNotFound();

    return resSuccess();
}

