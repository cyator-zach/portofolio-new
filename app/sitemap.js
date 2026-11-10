import { db } from "@/lib/knexClient";

export default async function sitemap() {
  const cfg = await db("sys_app_config").where({ config_key: "last_updated" }).first().catch(() => null);
  const baseUrl = "https://zulfikarachyar.my.id";
  return [
    {
      url: baseUrl,
      lastModified: cfg?.config_value ? new Date(cfg.config_value) : new Date("2026-11-10"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

