import { Produk } from '@/domains/produk'
import { produkRepo } from '@/repositories/produk'

export const produkService = {
    async listProduk() {
        return await produkRepo.findAll()
    },

    async beliProduk(nama: string, quantity: number): Promise<Produk> {
        const produk = await produkRepo.findByName(nama)
        const checkStock = await produkRepo.checkStock(produk?.id ?? 0, quantity)
        if (!produk) throw new Error('Produk tidak ditemukan')
        if (!produk.isAvailable()) throw new Error('Stok habis')
        if (!checkStock) throw new Error('Stok tidak cukup')

        produk.decreaseStock(quantity)
        await produkRepo.decreaseStock(produk.id, quantity)

        return produk
    },

    async checkStock(id: number, qty: number): Promise<boolean> {
        return await produkRepo.checkStock(id, qty)
    }
}
