import { Command } from '@commands/Command';
import { log } from '@config';
import { Cli } from '@config/meow.config';
import { constants } from '@constants';
import { ConfigFlag, ConfigFlag_ } from '@flags/config.flag';
import { timesheetService } from '@services';
import { AppUtils } from '@utils';

export class ConfigureCommand implements Command<ConfigFlag> {

    constructor(
        readonly desc = constants.CONFIGURE_COMMAND_DESC,
        readonly flags = ConfigFlag_,
    ) { }


    async run(cli: Cli): Promise<any> {
        const flag = AppUtils.parseFlag<ConfigFlag>(cli, this.flags);
        const config = await timesheetService.configure(flag);
        log.print(`${constants.DONE} configured. see ${config.path}.`)
    }
}