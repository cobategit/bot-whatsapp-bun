export interface CommandContext {
    userId: string
    platform: 'discord' | 'whatsapp'
    args: string[]
    reply: (text: string) => Promise<void>
}

export interface CommandModule {
    run: (ctx: CommandContext) => Promise<void>
}

export interface Command {
    execute(from: string, messageService: any, body?: string): Promise<void>
}


export interface AutoRepiesParams {
    keyword: string[],
    reply: string
}