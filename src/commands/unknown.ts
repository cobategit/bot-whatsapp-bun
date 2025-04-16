import { Command } from '@/types/command.js'
import { MessageService } from '../services/message-service.js'

export class CommandUnknown implements Command {
    async execute(from: string, messageService: MessageService) {
        await messageService.sendMessage(from, 'Saya tidak mengenali perintah anda. Silakan coba lagi.\n\nPerintah Bot Adalah !\n\nContoh : !help')
    }
}
