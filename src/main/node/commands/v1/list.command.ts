import { Command } from '@commands/Command';
import { log } from '@config';
import { Cli } from '@config/meow.config';
import { constants } from '@constants';
import { ListFlag, ListFlag_ } from '@flags/list.flag';
import { timesheetService } from '@services';
import { AppUtils } from '@utils';
import chalk from 'chalk';
import { Duration } from 'luxon';

export class ListCommand implements Command<ListFlag> {

    constructor(
        readonly desc = constants.LIST_COMMAND_DESC,
        readonly flags = ListFlag_,
    ) { }

    async run(cli: Cli): Promise<any> {
        const flag = AppUtils.parseFlag<ListFlag>(cli, this.flags);
        const list = await timesheetService.list(flag);

        const table = AppUtils.createTable();
        table.push([`${chalk.white.bold('id')}`, `${chalk.white.bold('begin')}`, `${chalk.white.bold('duration')}`, `${chalk.white.bold('project')}`, `${chalk.white.bold('activity')}`])
        list.forEach(entry => {
            table.push(
                [`${chalk.cyan(entry.id)}`, `${chalk.cyan(entry.begin)}`,`${chalk.cyan.bold(Duration.fromObject({ seconds: entry.duration}).toFormat(constants.HOUR_FORMAT))}`, `${entry.project}`, `${entry.activity}`],
            );
        });
        log.print(`${chalk.yellow.inverse.bold(' TIME ENTRIES ')}                     `)
        log.print(table.toString())
    }

    
}