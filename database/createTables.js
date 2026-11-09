import { db } from "../lib/knexClient.js";

async function createTable(name, callback) {
  if (!(await db.schema.hasTable(name))) {
    await db.schema.createTable(name, callback);
  }
}

async function createTables() {
  await createTable("sys_user", (table) => {
    table.uuid("id").primary();
    table.string("name", 100).notNullable();
    table.string("email", 150).unique().notNullable();
    table.text("password_hash").notNullable();
    table.boolean("is_active").defaultTo(true);
    table.timestamp("last_login_at");
    table.timestamp("created_at").defaultTo(db.fn.now());
  });

  await createTable("sys_app_config", (table) => {
    table.uuid("id").primary();
    table.string("config_key", 50).unique().notNullable();
    table.text("config_value").notNullable();
    table.timestamp("updated_at").defaultTo(db.fn.now());
  });

  await createTable("sys_seo_config", (table) => {
    table.uuid("id").primary();
    table.string("site_name", 100).notNullable();
    table.string("default_meta_description", 160).notNullable();
    table.text("default_og_image");
    table.string("twitter_handle", 50);
  });

  await createTable("ref_category", (table) => {
    table.uuid("id").primary();
    table.string("name", 50).notNullable();
    table.string("slug", 60).unique().notNullable();
    table.string("type", 20).notNullable();
  });

  await createTable("ref_skill", (table) => {
    table.uuid("id").primary();
    table.string("name", 50).notNullable();
    table.text("icon_url");
  });

  await createTable("ref_tag", (table) => {
    table.uuid("id").primary();
    table.string("name", 50).notNullable();
    table.string("slug", 60).unique().notNullable();
  });

  await createTable("mst_project", (table) => {
    table.uuid("id").primary();
    table.uuid("category_id").references("id").inTable("ref_category");
    table.string("title", 150).notNullable();
    table.string("slug", 180).unique().notNullable();
    table.text("description").notNullable();
    table.text("thumbnail_url");
    table.text("demo_url");
    table.text("repo_url");
    table.boolean("is_featured").defaultTo(false);
    table.string("meta_title", 70);
    table.string("meta_description", 160);
    table.text("og_image_url");
    table.boolean("is_active").defaultTo(true);
    table.timestamp("created_at").defaultTo(db.fn.now());
    table.timestamp("updated_at").defaultTo(db.fn.now());
    table.timestamp("deleted_at");
  });

  await createTable("map_project_skill", (table) => {
    table.uuid("id").primary();
    table.uuid("project_id").references("id").inTable("mst_project");
    table.uuid("skill_id").references("id").inTable("ref_skill");
    table.unique(["project_id", "skill_id"]);
  });

  await createTable("mst_article", (table) => {
    table.uuid("id").primary();
    table.uuid("category_id").references("id").inTable("ref_category");
    table.string("title", 200).notNullable();
    table.string("slug", 220).unique().notNullable();
    table.text("summary").notNullable();
    table.text("content").notNullable();
    table.text("thumbnail_url");
    table.boolean("is_published").defaultTo(false);
    table.timestamp("published_at");
    table.string("meta_title", 70);
    table.string("meta_description", 160);
    table.text("og_image_url");
    table.text("canonical_url");
    table.boolean("is_index").defaultTo(true);
    table.integer("reading_time");
    table.boolean("is_active").defaultTo(true);
    table.timestamp("created_at").defaultTo(db.fn.now());
    table.timestamp("updated_at").defaultTo(db.fn.now());
    table.timestamp("deleted_at");
  });

  await createTable("map_article_tag", (table) => {
    table.uuid("id").primary();
    table.uuid("article_id").references("id").inTable("mst_article");
    table.uuid("tag_id").references("id").inTable("ref_tag");
    table.unique(["article_id", "tag_id"]);
  });

  await createTable("mst_experience", (table) => {
    table.uuid("id").primary();
    table.string("company_name", 100).notNullable();
    table.string("role_title", 100).notNullable();
    table.date("start_date").notNullable();
    table.date("end_date");
    table.text("description").notNullable();
    table.boolean("is_active").defaultTo(true);
  });

  await db.raw(`
    DO $$
    DECLARE r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
      LOOP
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.tablename) || ' ENABLE ROW LEVEL SECURITY;';
      END LOOP;
    END $$;
  `);

  console.log("Semua tabel berhasil dibuat dan RLS aktif!");
  process.exit(0);
}

createTables();
