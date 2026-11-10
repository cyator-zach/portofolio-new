// Centralized Frontend API Service Layer
// Memisahkan fungsi komunikasi Backend dari komponen Frontend

const fetchJson = async (endpoint, options = {}) => {
  const res = await fetch(endpoint, options);
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, ...data };
};

export const api = {
  // Public Data (Landing Page)
  getPortfolioData: async () => {
    const [p, e, s, f, c] = await Promise.all([
      fetchJson("/api/project"),
      fetchJson("/api/experience"),
      fetchJson("/api/skill"),
      fetchJson("/api/faq"),
      fetchJson("/api/config"),
    ]);
    return {
      projects: p.data || [],
      experiences: e.data || [],
      skills: s.data || [],
      faqs: f.data || [],
      configs: c.data || {},
    };
  },

  // Auth
  login: (email, password) =>
    fetchJson("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }),

  logout: () => fetchJson("/api/auth/logout", { method: "POST" }),

  // Dashboard Data
  getDashboardData: () =>
    Promise.all([
      fetchJson("/api/project"),
      fetchJson("/api/article?all=true"),
      fetchJson("/api/experience"),
      fetchJson("/api/skill"),
      fetchJson("/api/category"),
      fetchJson("/api/faq"),
      fetchJson("/api/config"),
    ]),

  // Mutations
  saveItem: (type, data, isUpdate) =>
    fetchJson(`/api/${type}`, {
      method: isUpdate ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  deleteItem: (type, id) =>
    fetchJson(`/api/${type}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }),

  upload: (formData) =>
    fetchJson("/api/upload", {
      method: "POST",
      body: formData,
    }),
};

