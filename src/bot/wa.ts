import { AutoReplyCommand } from '@/utils/auto-reply.js'
import { Boom } from '@hapi/boom'
import { DisconnectReason, makeWASocket, proto, useMultiFileAuthState } from '@whiskeysockets/baileys'
import chalk from 'chalk'
import { pino } from 'pino'
import readline from 'readline'
import { MessageService } from '../services/message-service.js'
import { NSFWFilter } from '../utils/nsfw.js'
import { CommandParser } from '../utils/parse-command.js'


const usePairingCode = true

async function question(promt: string): Promise<string> {
    process.stdout.write(promt)
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise((resolve) => r1.question("", (ans) => {
        r1.close()
        resolve(ans)
    }))

}

async function checkPairingWhatsApp(sock: any) {
    if (usePairingCode && !sock.authState.creds.registered) {
        console.log(chalk.green("☘  Masukkan Nomor Dengan Awal 62"))
        const phoneNumber = await question("> ")
        const code = await sock.requestPairingCode(process.env.PHONE_NUMBER ?? phoneNumber.trim())
        console.log(chalk.cyan(`🎁  Pairing Code Whatsapp : ${code}`))
    }
}

async function conversation(body: string, sender: string | undefined, msg: proto.IWebMessageInfo, messageService: MessageService, autoReplyCommand: AutoReplyCommand, nsfwFilter: NSFWFilter, commandParser: CommandParser) {
    if (msg.message?.conversation && !msg.key.fromMe) {
        const cmdParser = commandParser.parse(body)

        if (nsfwFilter.containsNSFW(body)) {
            await messageService.sendMessage(sender!, 'Pesan anda mengandung konten berbahaya.')
            return
        }

        if (autoReplyCommand.getReply(body)) {
            await messageService.sendMessage(sender!, autoReplyCommand.getReply(body) ?? '')
            return
        }

        if (cmdParser) {
            await cmdParser.execute(sender!, messageService)
        } else {
            await messageService.sendMessage(sender!, 'Maaf, Saya tidak mengerti perintah anda.')
        }
    }
}

export async function startWhatsappBot() {
    console.log(chalk.blue("🎁 Memulai Koneksi Ke WhatsApp"))

    const { state, saveCreds } = await useMultiFileAuthState('auth/wa')
    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: !usePairingCode,
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        version: [2, 3000, 1015901307]
    })

    await checkPairingWhatsApp(sock)

    sock.ev.on('creds.update', saveCreds)

    const commandParser = new CommandParser()
    const messageService = new MessageService(sock)
    const autoReplyCommand = new AutoReplyCommand()
    const nsfwFilter = new NSFWFilter()

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const listColor = [chalk.red, chalk.green, chalk.yellow, chalk.magenta, chalk.cyan, chalk.white, chalk.blue]
        const randomColor = listColor[Math.floor(Math.random() * listColor.length)] || chalk.white

        const msg = messages[0]
        if (!msg?.message) return

        const body = msg.message.conversation ?? msg.message.extendedTextMessage?.text ?? ""
        const sender = msg.key.remoteJid
        const pushname = msg.pushName ?? "Cobate"

        console.log(
            chalk.yellow.bold("Credit : Cobate"),
            chalk.green.bold("[ WhatsApp ]"),
            randomColor(pushname),
            randomColor(" : "),
            chalk.white(body)
        )

        await conversation(body, sender!, msg, messageService, autoReplyCommand, nsfwFilter, commandParser)
    })

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            if (shouldReconnect) startWhatsappBot()
        } else if (connection === 'open') {
            console.log('✅ WhatsApp bot ready!')
        }
    })
}
