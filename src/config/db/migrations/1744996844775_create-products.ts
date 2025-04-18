import { DatabaseSchema } from '@/types';
import { sql, type Kysely } from 'kysely';

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<DatabaseSchema>): Promise<void> {
	await db.schema
		.createTable("public.products")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("name", "varchar(255)", (col) => col.notNull())
		.addColumn("stock", "double precision", (col) => col.notNull())
		.addColumn("price", "double precision", (col) => col.notNull())
		.addColumn("created_at", "timestamp", (col) =>
			col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
		)
		.addColumn("updated_at", "timestamp", (col) =>
			col
				.defaultTo(sql`CURRENT_TIMESTAMP`)
		)
		.addColumn("deleted_at", "timestamp")
		.execute()
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<DatabaseSchema>): Promise<void> {
	await db.schema.dropTable("public.products").execute()
}
