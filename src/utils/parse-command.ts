import { CommandBeli, CommandList } from '@/commands/produk.js'
import { Command } from '@/types/command.js'
import { CommandHelp } from '../commands/help.js'
import { CommandUnknown } from '../commands/unknown.js'

export class CommandParser {
    private readonly commands: Map<string, Command>

    constructor(private readonly msg: string) {
        this.commands = new Map<string, Command>()
        // Register commands
        this.commands.set('!help', new CommandHelp())
        this.commands.set('!list-produk', new CommandList())
        this.commands.set('!beli', new CommandBeli(this.msg.split(' ')[1]!))
    }

    parse(message: string): Command | null {
        const commandName = message.split(' ')[0]!.trim().toLowerCase() ?? message.trim().toLowerCase()
        return this.commands.get(commandName) ?? new CommandUnknown()
    }
}
