import { produkRepo } from '@/repositories/produk'

export const produkService = {
    async listProduk() {
        return await produkRepo.findAll()
    },

    async beliProduk(nama: string) {
        const produk = await produkRepo.findByName(nama)
        if (!produk) throw new Error('Produk tidak ditemukan')
        if (!produk.isAvailable()) throw new Error('Stok habis')

        produk.decreaseStock(1)
        await produkRepo.decreaseStock(produk.id, 1)

        return produk
    },
}
