import { DatabaseSchema } from '@/types';
import { sql, type Kysely } from 'kysely';

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<DatabaseSchema>): Promise<void> {
	await db.schema
		.createTable("transactions")
		.addColumn("id", "serial", (col) => col.primaryKey())
		.addColumn("product_id", "integer", (col) => col.notNull())
		.addColumn("product_name", "varchar(255)", (col) => col.notNull())
		.addColumn("user_phone", "varchar(50)", (col) => col.notNull())
		.addColumn("price", "double precision", (col) => col.notNull())
		.addColumn("quantity", "integer", (col) => col.notNull())
		.addColumn("total_price", "double precision", (col) => col.notNull())
		.addColumn("status", "varchar(50)", (col) => col.notNull())
		.addColumn("payment_method", "varchar(50)")
		.addColumn("payment_status", "smallint")
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
	await db.schema.dropTable("transactions").execute()
}
