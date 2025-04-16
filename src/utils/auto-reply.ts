import { AutoRepiesParams } from "@/types/command"

export const autoReplies = [
    { keyword: ['jam buka', 'jam buka warung', 'toko buka', 'buka jam berapa'], reply: 'Kami buka setiap hari pukul 08:00 - 20:00 WIB.' },
    { keyword: ['assalamualaikum', 'assalamualaikum warahmatullahi wabarakatuh', 'salam'], reply: 'Waalaikumsalam Warahmatullahi Wabarakatuh, gimana kabar?' },
    { keyword: ['selamat pagi', 'pagi', 'morning', 'good morning'], reply: 'Selamat pagi! Semoga harimu menyenangkan!' },
]

export class AutoReplyCommand {
    private readonly autoReplies: AutoRepiesParams[]

    constructor() {
        this.autoReplies = autoReplies
    }

    getReply(message: string): string | null {
        const lower = message.toLowerCase()
        const found = autoReplies.find(entry => entry.keyword.some(keyword => lower.toLowerCase().includes(keyword.toLowerCase())))
        return found?.reply ?? null
    }
}