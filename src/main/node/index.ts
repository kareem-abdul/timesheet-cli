#!/usr/bin/env node

import Observable from 'zen-observable';

(global as any).Observable = Observable;
require('any-observable/register')('global.Observable');

import { handleUnhandledErrors } from '@app/middleware/error-handler';
handleUnhandledErrors();

import { MeowConfig } from '@config';
import { AppUtils } from '@utils';

(async () => {
    const args = process.argv;
    const command = args.length >= 3 ? AppUtils.getCommand(args[2]) : undefined;

    if (command) {
        const cli = MeowConfig.config(command);
        await command.run(cli);
        process.exit(0);
    }
    throw new Error('command not found');
})();

