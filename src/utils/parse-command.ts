import { CommandBeli, CommandList } from '@/commands/produk.js'
import { TransaksiRepo } from '@/repositories/transaksi.js'
import { TransaksiService } from '@/services/transaksi.js'
import { Command } from '@/types/command.js'
import { CommandHelp } from '../commands/help.js'
import { CommandUnknown } from '../commands/unknown.js'

export class CommandParser {
    private readonly commands: Map<string, Command>

    constructor(private readonly msg: string, private readonly args: string | undefined) {
        this.commands = new Map<string, Command>()
        // Register commands
        this.commands.set('!help', new CommandHelp())
        this.commands.set('!list-produk', new CommandList())
        this.commands.set('!beli', new CommandBeli(this.msg, this.args, new TransaksiService(new TransaksiRepo())))
    }

    parse(message: string): Command | null {
        const commandName = message.split(' ')[0]!.trim().toLowerCase() ?? message.trim().toLowerCase()
        return this.commands.get(commandName) ?? new CommandUnknown()
    }
}
