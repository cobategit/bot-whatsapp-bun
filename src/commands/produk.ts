import { Transaksi } from '@/domains/transaksi.js';
import { produkService } from '@/services/produk.js';
import { TransaksiService } from '@/services/transaksi.js';
import { Command } from "@/types/command.js";
import { MessageService } from "../services/message-service.js";

export class CommandList implements Command {
    async execute(from: string, messageService: MessageService): Promise<void> {
        const list = await produkService.listProduk()
        if (list.length === 0) {
            await messageService.sendMessage(from, '📦 Belum ada produk.')
            return
        }

        const teks = list.map((p) => `• ${p.name} - ${p.stock} stok - Rp${p.price}`).join('\n')
        await messageService.sendMessage(from, `📦 Daftar Produk:\n\n${teks}`)
    }
}

export class CommandBeli implements Command {
    constructor(private readonly msg: string | undefined, private readonly args: string | undefined, private readonly transaksiService: TransaksiService) { }

    async execute(from: string, messageService: MessageService): Promise<void> {
        const name = this.msg?.split(' ')[1]
        const quantity = this.msg?.split(' ')[2]
        if ((!name || name?.length === 0) && (!quantity || Number(quantity) === 0)) {
            await messageService.sendMessage(from, '❌ Mohon masukkan nama produk yang ingin dibeli.\n\nFormat: !beli <nama_produk> <quantity>')
            return
        }

        try {
            const produk = await produkService.beliProduk(name!, Number(quantity!))
            await this.transaksiService.record(new Transaksi(undefined, this.args!, produk.id, produk.name, produk.price, 1, produk.price * 1, 'pending'))
            await messageService.sendMessage(from, `✅ Berhasil membeli ${produk.name}. Stok tersisa: ${produk.stock}`)
        } catch (error: unknown) {
            const err = error as Error
            await messageService.sendMessage(from, `❌ ${err.message}`)
        }
    }
}