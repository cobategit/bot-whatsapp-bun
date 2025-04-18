import { defineConfig } from "kysely-ctl"
import { Pool } from "pg"

export default defineConfig({
    dialect: "pg",
    dialectConfig: {
        pool: new Pool({
            database: process.env.DB_NAME as string,
            host: process.env.DB_HOST as string,
            user: process.env.DB_USER as string,
            port: Number(process.env.DB_PORT) || 5432,
            password: process.env.DB_PASSWORD as string,
            connectionLimit: 10,
        }),
    },
    migrations: {
        migrationFolder: "./src/config/db/migrations",
    },
    seeds: {
        seedFolder: "./src/config/db/views",
    },
    plugins: [],
})
