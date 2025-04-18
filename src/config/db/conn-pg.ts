import { DatabaseSchema } from '@/types/index.js'
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
})

export const db = new Kysely<DatabaseSchema>({ dialect })
