import meow, { AnyFlag, Result } from 'meow';
import { commands } from '@commands';
import { Command } from '@commands/Command';

export type Flag = AnyFlag & { desc: string };
export type Cli = Result<Record<string, Flag>>;

export const config = (command: Command<any>) => meow(commands.help.generateHelp(), {
    inferType: true,
    description: false,
    flags: command.flags,
    argv: process.argv.slice(3),
    allowUnknownFlags: false,
});
