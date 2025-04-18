import { Command } from "@/types/command.js";
import { MessageService } from "../services/message-service.js";

export class CommandHelp implements Command {
    async execute(from: string, messageService: MessageService): Promise<void> {
        await messageService.sendMessage(from, `*Daftar Perintah Bot:*\n\n`
            + `*. !help - Menampilkan daftar perintah yang tersedia.\n`
            + `*. !ping - Menguji koneksi bot.\n`
            + `*. !bye - Mengakhiri percakapan dengan bot.\n`
            + `*. !list-produk - Menampilkan daftar produk yang tersedia.\n`
            + `*. !beli <nama-produk>* - Membeli produk yang tersedia.\n`
        )
    }
}