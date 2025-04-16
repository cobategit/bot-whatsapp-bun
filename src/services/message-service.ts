export class MessageService {
    private readonly sock: any

    constructor(sock: any) {
        this.sock = sock
    }

    async sendMessage(to: string, message: string): Promise<void> {
        const messageObject: { text: string } = {
            text: message
        }
        await this.sock.sendMessage(to, messageObject)
    }
}
