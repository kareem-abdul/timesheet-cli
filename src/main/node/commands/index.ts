import { ConfigureCommand } from '@commands/v1/configure.command';
import { HelpCommand } from '@commands/v1/help.command';
import { ListCommand } from '@commands/v1/list.command';
import { StartCommand } from '@commands/v1/start.command';
import { StopCommand } from '@commands/v1/stop.command';
import { UpdateCommand } from '@commands/v1/update.command';

export const commands = {
    help: new HelpCommand(),
    start: new StartCommand(),
    stop: new StopCommand(),
    update: new UpdateCommand(),
    configure: new ConfigureCommand(),
    list: new ListCommand(),
} as const;
