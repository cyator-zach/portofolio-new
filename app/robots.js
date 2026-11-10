export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/login", "/api/"],
    },
    sitemap: "https://zulfikarachyar.my.id/sitemap.xml",
  };
}

