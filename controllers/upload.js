import { resSuccess, resBadRequest, resInternalError } from "@/utils/response";

export async function uploadFile(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file || typeof file === "string") {
            return resBadRequest("File gambar tidak ditemukan");
        }

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_KEY;
        const bucket = process.env.SUPABASE_BUCKET || "portfolio";

        if (!supabaseUrl || !supabaseKey) {
            return resInternalError("Konfigurasi Supabase Storage belum lengkap");
        }

        const ext = file.name ? file.name.split(".").pop().toLowerCase() : "webp";
        const allowedExts = ["webp", "png", "jpg", "jpeg", "gif"];
        if (!allowedExts.includes(ext)) {
            return resBadRequest("Format file tidak diizinkan. Hanya gambar (WebP, PNG, JPG, GIF) yang diperbolehkan.");
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        if (buffer.length > 1024 * 1024) {
            return resBadRequest("Ukuran file melebihi batas maksimal 1 MB");
        }

        const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
        const encodedBucket = encodeURIComponent(bucket);

        const uploadEndpoint = `${supabaseUrl}/storage/v1/object/${encodedBucket}/${fileName}`;

        const res = await fetch(uploadEndpoint, {
            method: "POST",
            headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                "Content-Type": file.type || "image/webp",
                "x-upsert": "true",
            },
            body: buffer,
        });

        if (!res.ok) {
            const errJson = await res.json().catch(() => ({}));
            return resBadRequest(errJson.message || errJson.error || "Gagal mengunggah gambar ke Supabase Storage");
        }

        const publicUrl = `${supabaseUrl}/storage/v1/object/public/${encodedBucket}/${fileName}`;
        return resSuccess({ url: publicUrl, name: file.name });
    } catch (error) {
        return resInternalError("Terjadi kesalahan saat memproses upload: " + error.message);
    }
}

