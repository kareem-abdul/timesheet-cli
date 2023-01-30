import { Command } from '@commands/Command';
import { log } from '@config';
import { Cli } from '@config/meow.config';
import { constants } from '@constants';
import { BaseFlag } from '@flags/base.flag';
import { UpdateFlag, UpdateFlag_ } from '@flags/update.flag';
import { timesheetService } from '@services';
import { AppUtils } from '@utils';

export class UpdateCommand implements Command<UpdateFlag> {

    constructor(
        readonly flags = UpdateFlag_,
        readonly desc = constants.UPDATE_COMMAND_DESC,
    ) { }

    async run(cli: Cli): Promise<any> {
        const flag = AppUtils.parseFlag<UpdateFlag>(cli, this.flags);
        await timesheetService.update(flag);
        log.print(`${constants.DONE} updated`)
    }

    
}