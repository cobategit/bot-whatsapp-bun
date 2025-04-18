import { produkService } from '@/services/produk.js';
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
    constructor(private readonly name: string | undefined) { }

    async execute(from: string, messageService: MessageService): Promise<void> {
        if (!this.name || this.name?.length === 0) {
            await messageService.sendMessage(from, '❌ Mohon masukkan nama produk yang ingin dibeli.\n\nFormat: !beli <nama_produk>')
            return
        }

        const nama = this.name
        try {
            const produk = await produkService.beliProduk(nama)
            await messageService.sendMessage(from, `✅ Berhasil membeli ${produk.name}. Stok tersisa: ${produk.stock}`)
        } catch (error: unknown) {
            const err = error as Error
            await messageService.sendMessage(from, `❌ ${err.message}`)
        }
    }
}