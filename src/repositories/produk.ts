import { db } from '@/config/db/conn-pg'
import { Produk } from '@/domains/produk'

export const produkRepo = {
    async findAll(): Promise<Produk[]> {
        const rows = await db.selectFrom('products').selectAll().execute()
        return rows.map((r) => new Produk(r.id, r.name, r.stock, r.price))
    },

    async findByName(name: string): Promise<Produk | null> {
        const row = await db.selectFrom('products').where('name', '=', name).selectAll().executeTakeFirst()
        if (!row) return null
        return new Produk(row.id, row.name, row.stock, row.price)
    },

    async decreaseStock(id: number, qty: number) {
        await db
            .updateTable('products')
            .set((eb) => ({
                stock: eb('stock', '-', qty),
            }))
            .where('id', '=', id)
            .execute()
    },

    async addProduk(name: string, stock: number, price: number) {
        await db.insertInto('products').values({ name, stock, price }).execute()
    },

    async checkStock(id: number, qty: number): Promise<boolean> {
        const row = await db
            .selectFrom('products')
            .where('id', '=', id)
            .select('stock')
            .executeTakeFirst()
        if (!row) return false
        return row.stock >= qty
    }
}
