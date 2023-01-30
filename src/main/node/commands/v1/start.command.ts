import { Command } from '@commands/Command';
import { log } from '@config';
import { Cli } from '@config/meow.config';
import { constants } from '@constants';
import { StartFlag, StartFlag_ } from '@flags/start.flag';
import { timesheetService } from '@services';
import { AppUtils } from '@utils';
import chalk from 'chalk';


export class StartCommand implements Command<StartFlag> {
    constructor(
        readonly desc: string = constants.START_COMMAND_DESC,
        readonly usage: string = `${chalk.cyan('start')}`,
        readonly flags = StartFlag_
    ) { }

    async run(cli: Cli): Promise<any> {
        const flags = AppUtils.parseFlag<StartFlag>(cli, StartFlag_);
        await timesheetService.start(flags);
        log.print(`${constants.DONE} started`);
    }

}