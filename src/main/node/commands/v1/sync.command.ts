import { Command } from '@commands/Command';
import { Cli } from '@config/meow.config';
import { constants } from '@constants';
import { BaseFlag } from '@flags/base.flag';
import { configService, kimaiService, timesheetService } from '@services';

export class SyncCommand implements Command<BaseFlag> {
    constructor(
        readonly desc = constants.SYNC_COMMAND_DESCRIPTION,
        readonly flags = {},
    ) { }

    async run(cli: Cli): Promise<any> {
        const active = await kimaiService.getActive();
        if (active && active.length > 0) {
            const config = configService.getConfig();
            if (config.active !== `${active[0].id}`) {
                configService.setConfig({ active: `${active[0].id}` })
            }
        } else {
            configService.setConfig({ active: undefined });
        }
        const user = await kimaiService.getLoggedInUser();
        configService.setConfig({ timezone: user.timezone });
    }
}