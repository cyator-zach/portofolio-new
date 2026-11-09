import { db } from "@/lib/knexClient";
import { resSuccess, resBadRequest, resNotFound } from "@/utils/response";
import { validateRequired } from "@/utils/validator";
import jwt from "jsonwebtoken";

export async function getArticle(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");
    const all = searchParams.get("all");

    let isAdmin = false;
    const token = req.cookies?.get("token")?.value || req.headers?.get("authorization")?.replace("Bearer ", "");
    if (token && process.env.JWT_SECRET) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            isAdmin = true;
        } catch {}
    }

    if (id || slug) {
        const query = db("mst_article").where({ is_active: true });
        if (!isAdmin) query.andWhere({ is_published: true });
        const article = await query
            .andWhere((builder) => {
                if (id) builder.where({ id });
                if (slug) builder.orWhere({ slug });
            })
            .first();

        if (!article) return resNotFound();

        const tag = await db("map_article_tag as mat")
            .join("ref_tag as t", "mat.tag_id", "t.id")
            .where("mat.article_id", article.id)
            .select("t.name", "t.slug");

        return resSuccess({ ...article, tag });
    }

    const query = db("mst_article as a")
        .leftJoin("ref_category as c", "a.category_id", "c.id")
        .where("a.is_active", true)
        .select("a.*", "c.name as category_name");
    if (!all || !isAdmin) query.andWhere("a.is_published", true);
    const data = await query.orderBy("a.created_at", "desc");
    return resSuccess(data);
}

export async function createArticle(req) {
    const body = await req.json();
    const err = validateRequired(body, ["title", "slug", "category_id", "content"]);
    if (err) return resBadRequest(err);

    const is_published = body.is_published ?? true;
    const [article] = await db("mst_article")
        .insert({
            id: crypto.randomUUID(),
            category_id: body.category_id,
            title: body.title,
            slug: body.slug,
            summary: body.summary || "",
            content: body.content,
            thumbnail_url: body.thumbnail_url || null,
            is_published,
            published_at: is_published ? db.fn.now() : null,
            meta_title: body.meta_title || null,
            meta_description: body.meta_description || null,
            og_image_url: body.og_image_url || null,
            canonical_url: body.canonical_url || null,
            reading_time: body.reading_time || null,
        })
        .returning("*");

    return resSuccess(article, 201);
}

export async function updateArticle(req) {
    const body = await req.json();
    const err = validateRequired(body, ["id"]);
    if (err) return resBadRequest(err);

    const { id } = body;
    const allowed = ["category_id", "title", "slug", "summary", "content", "thumbnail_url", "is_published", "meta_title", "meta_description", "og_image_url", "canonical_url", "reading_time"];
    const data = {};
    for (const key of allowed) {
        if (body[key] !== undefined) data[key] = body[key];
    }
    if (body.is_published !== undefined) {
        data.published_at = body.is_published ? db.fn.now() : null;
    }
    data.updated_at = db.fn.now();

    const [article] = await db("mst_article").where({ id }).update(data).returning("*");
    if (!article) return resNotFound();

    return resSuccess(article);
}

export async function deleteArticle(req) {
    const body = await req.json();
    const err = validateRequired(body, ["id"]);
    if (err) return resBadRequest(err);

    const count = await db("mst_article")
        .where({ id: body.id })
        .update({ is_active: false, deleted_at: db.fn.now() });

    if (!count) return resNotFound();

    return resSuccess();
}
