import { Command } from "@/types/command.js";
import { MessageService } from "../services/message-service.js";

export class CommandHelp implements Command {
    async execute(from: string, messageService: MessageService): Promise<void> {
        await messageService.sendMessage(from, `*Daftar Perintah Bot:*\n\n` + `*. !start* - Memulai percakapan dengan bot.\n`
            + `*. !help* - Menampilkan daftar perintah yang tersedia.\n`
            + `*. !ping* - Menguji koneksi bot.\n`
            + `*. !bye* - Mengakhiri percakapan dengan bot.\n`
            + `*. !ping-admin* - Menghubungi admin bot.\n`
            + `*. !weather* - Menampilkan informasi cuaca terkini.\n`
            + `*. !news* - Menampilkan berita terkini.\n`
            + `*. !translate* - Menerjemahkan teks ke bahasa lain.\n`
            + `*. !joke* - Mengirimkan lelucon acak.\n`)
    }
}