import { Command } from '@commands/Command';
import { log } from '@config';
import { Cli } from '@config/meow.config';
import { constants } from '@constants';
import { BaseFlag } from '@flags/base.flag';
import { timesheetService } from '@services';
import { DateTime, Duration } from 'luxon';

export class StopCommand implements Command<BaseFlag> {

    constructor(
        readonly desc = constants.STOP_COMMAND_DESC,
        readonly flags = {},
    ) {}


    async run(cli: Cli): Promise<any> {
        const entry = await timesheetService.stop();
        const duration = Duration.fromObject({ seconds: entry.duration }).toFormat(constants.HOUR_FORMAT);
        log.print(`${constants.DONE} stopped. Total hours - ${duration}hr`)
    }
}