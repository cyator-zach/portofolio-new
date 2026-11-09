import { db } from "../lib/knexClient.js";

async function setup() {
  console.log("Checking mst_faq table...");
  const hasFaq = await db.schema.hasTable("mst_faq");
  if (!hasFaq) {
    await db.schema.createTable("mst_faq", (table) => {
      table.uuid("id").primary();
      table.text("question").notNullable();
      table.text("answer").notNullable();
      table.integer("order_index").defaultTo(0);
      table.boolean("is_active").defaultTo(true);
      table.timestamp("created_at").defaultTo(db.fn.now());
      table.timestamp("updated_at").defaultTo(db.fn.now());
    });
    console.log("Created mst_faq table!");
  }

  // Seed FAQ
  const count = await db("mst_faq").count("id as total").first();
  if (parseInt(count?.total || 0, 10) === 0) {
    const initialFaqs = [
      {
        id: crypto.randomUUID(),
        question: "Tech stack backend apa yang menjadi fokus utama Anda?",
        answer: "Fokus utama saya adalah ekosistem JavaScript & TypeScript (Node.js, Express), database relasional (PostgreSQL, MySQL) dengan Knex.js, arsitektur REST API berkeamanan tinggi, serta integrasi hardware IoT berbasis mikrokontroler (ESP32/ESP8266) via MQTT.",
        order_index: 1,
        is_active: true
      },
      {
        id: crypto.randomUUID(),
        question: "Apakah Anda menerima proyek freelance, kontrak, atau full-time?",
        answer: "Ya, saya terbuka untuk peluang kerja full-time, kontrak remote, maupun proyek freelance untuk perancangan backend, optimasi query database, API payload encryption, dan sistem IoT terintegrasi.",
        order_index: 2,
        is_active: true
      },
      {
        id: crypto.randomUUID(),
        question: "Bagaimana standar keamanan dan arsitektur yang Anda terapkan?",
        answer: "Setiap backend dirancang dengan otentikasi JWT, validasi skema request yang ketat, enkripsi payload response dokumen konfidensial, rate limiting untuk mitigasi abuse, serta transaksi database terisolasi.",
        order_index: 3,
        is_active: true
      },
      {
        id: crypto.randomUUID(),
        question: "Apakah Anda berpengalaman menghubungkan perangkat IoT ke cloud?",
        answer: "Ya, saya berpengalaman mengintegrasikan mikrokontroler ESP32/ESP8266 dan access control terminal ke server web secara real-time untuk absensi otomatis, event-driven logging, dan sinkronisasi sensor.",
        order_index: 4,
        is_active: true
      },
      {
        id: crypto.randomUUID(),
        question: "Bagaimana cara memulai diskusi atau berkolaborasi dalam proyek?",
        answer: "Anda dapat menghubungi saya langsung melalui tombol WhatsApp di website ini (+62 895 6003 66624), email, atau melihat kompilasi kode saya di repositori GitHub.",
        order_index: 5,
        is_active: true
      }
    ];
    await db("mst_faq").insert(initialFaqs);
    console.log("Seeded initial FAQs!");
  }

  // Check sys_app_config
  const hasConfig = await db.schema.hasTable("sys_app_config");
  if (!hasConfig) {
    await db.schema.createTable("sys_app_config", (table) => {
      table.uuid("id").primary();
      table.string("config_key", 50).unique().notNullable();
      table.text("config_value").notNullable();
      table.timestamp("updated_at").defaultTo(db.fn.now());
    });
    console.log("Created sys_app_config table!");
  }

  const defaultConfigs = [
    { config_key: "whatsapp_number", config_value: "62895600366624" },
    { config_key: "github_url", config_value: "https://github.com/cyator-zach" },
    { config_key: "linkedin_url", config_value: "https://www.linkedin.com/in/zulfikar-achyar/" },
    { config_key: "instagram_url", config_value: "https://www.instagram.com/zulfikar_achyar/" },
    { config_key: "email_address", config_value: "zulfikarachyar@gmail.com" },
  ];

  for (const cfg of defaultConfigs) {
    const existing = await db("sys_app_config").where({ config_key: cfg.config_key }).first();
    if (!existing) {
      await db("sys_app_config").insert({
        id: crypto.randomUUID(),
        config_key: cfg.config_key,
        config_value: cfg.config_value
      });
      console.log(`Seeded config: ${cfg.config_key}`);
    }
  }

  console.log("Setup completed successfully!");
  process.exit(0);
}

setup().catch((err) => {
  console.error("Setup error:", err);
  process.exit(1);
});

