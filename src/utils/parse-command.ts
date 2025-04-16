import { Command } from '@/types/command.js'
import { CommandHelp } from '../commands/help.js'
import { CommandUnknown } from '../commands/unknown.js'

export class CommandParser {
    private readonly commands: Map<string, Command>

    constructor() {
        this.commands = new Map<string, Command>()
        // Register commands
        this.commands.set('!help', new CommandHelp())
    }

    parse(message: string): Command | null {
        const commandName = message.trim().toLowerCase()
        return this.commands.get(commandName) ?? new CommandUnknown()
    }
}
