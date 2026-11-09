import { db } from "@/lib/knexClient";
import { resSuccess, resBadRequest, resNotFound } from "@/utils/response";
import { validateRequired } from "@/utils/validator";

export async function getProject(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (id || slug) {
        const project = await db("mst_project")
            .where({ is_active: true })
            .andWhere((builder) => {
                if (id) builder.where({ id });
                if (slug) builder.orWhere({ slug });
            })
            .first();

        if (!project) return resNotFound();

        const skill = await db("map_project_skill as mps")
            .join("ref_skill as s", "mps.skill_id", "s.id")
            .where("mps.project_id", project.id)
            .select("s.name", "s.icon_url");

        return resSuccess({ ...project, skill });
    }

    const data = await db("mst_project as p")
        .leftJoin("ref_category as c", "p.category_id", "c.id")
        .where("p.is_active", true)
        .select("p.*", "c.name as category_name")
        .orderBy("p.created_at", "desc");
    return resSuccess(data);
}

export async function createProject(req) {
    const body = await req.json();
    const err = validateRequired(body, ["title", "slug", "category_id"]);
    if (err) return resBadRequest(err);

    const [project] = await db("mst_project")
        .insert({
            id: crypto.randomUUID(),
            category_id: body.category_id,
            title: body.title,
            slug: body.slug,
            description: body.description || "",
            thumbnail_url: body.thumbnail_url || null,
            demo_url: body.demo_url || null,
            repo_url: body.repo_url || null,
            is_featured: body.is_featured || false,
            meta_title: body.meta_title || null,
            meta_description: body.meta_description || null,
            og_image_url: body.og_image_url || null,
        })
        .returning("*");

    return resSuccess(project, 201);
}

export async function updateProject(req) {
    const body = await req.json();
    const err = validateRequired(body, ["id"]);
    if (err) return resBadRequest(err);

    const { id } = body;
    const allowed = ["category_id", "title", "slug", "description", "thumbnail_url", "demo_url", "repo_url", "is_featured", "meta_title", "meta_description", "og_image_url"];
    const data = {};
    for (const key of allowed) {
        if (body[key] !== undefined) data[key] = body[key];
    }
    data.updated_at = db.fn.now();

    const [project] = await db("mst_project").where({ id }).update(data).returning("*");
    if (!project) return resNotFound();

    return resSuccess(project);
}

export async function deleteProject(req) {
    const body = await req.json();
    const err = validateRequired(body, ["id"]);
    if (err) return resBadRequest(err);

    const count = await db("mst_project")
        .where({ id: body.id })
        .update({ is_active: false, deleted_at: db.fn.now() });

    if (!count) return resNotFound();

    return resSuccess();
}
