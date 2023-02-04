#!/usr/bin/env node

import Observable from 'zen-observable';

(global as any).Observable = Observable;
require('any-observable/register')('global.Observable');

import { handleUnhandledErrors } from '@app/middleware/error-handler';
handleUnhandledErrors();
import { log, MeowConfig } from '@config';
import { AppUtils } from '@utils';
import { commands } from '@commands';

import inquirer, { prompts } from 'inquirer';
import DatePrompt from "inquirer-date-prompt";

inquirer.registerPrompt('date', DatePrompt as prompts.PromptConstructor);


(async () => {
    const args = process.argv;
    const command = args.length >= 3 ? AppUtils.getCommand(args[2]) : undefined;

    if (command) {
        const cli = MeowConfig.config(command);
        if(!command.allowInput && cli.input && cli.input.length > 0) {
            log.error(`invalid ${args[2]} command`);
            commands.help.showHelp(command);
            process.exit(0);
        }
        await command.run(cli);
        process.exit(0);
    }
    throw new Error('command not found');
})();

