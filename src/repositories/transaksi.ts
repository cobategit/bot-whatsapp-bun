import { db } from '@/config/db/conn-pg'
import { Transaksi } from '@/domains/transaksi'

export class TransaksiRepo {
    async save(tx: Omit<Transaksi, 'id' | 'createdAt'>): Promise<Transaksi> {
        const now = new Date()

        const insert = await db.insertInto('transactions').values({
            product_id: tx.productId,
            product_name: tx.productName,
            user_phone: tx.userPhone,
            price: tx.price,
            quantity: tx.quantity,
            total_price: tx.totalPrice,
            status: tx.status,
            created_at: now,
        }).executeTakeFirst()

        return new Transaksi(Number(insert.insertId), tx.userPhone, tx.productId, tx.productName, tx.price, tx.quantity, tx.totalPrice, tx.status, now)
    }

    async findByUser(user_phone: string): Promise<Transaksi[]> {
        const rows = await db.selectFrom('transactions')
            .where('user_phone', '=', user_phone)
            .selectAll()
            .execute()

        return rows.map(r => new Transaksi(
            r.id,
            r.user_phone,
            r.product_id,
            r.product_name,
            r.price,
            r.quantity,
            r.total_price,
            r.status,
            new Date(r.created_at),
        ))
    }
}
