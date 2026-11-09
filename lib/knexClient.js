import knex from "knex";

if (!process.env.DIRECT_URL) {
    process.loadEnvFile?.();
}

export const db = knex({
    client: "pg",
    connection: {
        connectionString: process.env.DIRECT_URL,
    },
});
