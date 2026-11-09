import { db } from "@/lib/knexClient";
import { resSuccess } from "@/utils/response";

export async function getCategory() {
    const data = await db("ref_category").select("id", "name", "slug", "type");
    return resSuccess(data);
}

