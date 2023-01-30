import Table from 'cli-table3';
import { Command } from '@commands/Command';
import { commands } from '@commands';
import { MeowConfig } from '@config';
import { BaseFlag, BaseFlag_ } from '@flags/base.flag';
import Listr from 'listr';

export const asyncForEach = async <T>(array: T[], callBack: (item: T, index?: number, array?: T[]) => Promise<void>) => {
    const promises: Promise<void>[] = [];
    for (let i = 0; i < array.length; i++) {
        promises.push(callBack(array[i], i, array));
    }
    return Promise.all(promises);
};

export const getCommand = (cmd?: string): Command<any> | undefined => {
    if (cmd) {
        if (cmd in commands) {
            return commands[cmd as keyof typeof commands];
        }
        return Object.values(commands).map((c) => c as Command<any>).find((c) => c.alias && c.alias === cmd);
    }
    return undefined;
};

export const parseFlag = <T extends BaseFlag, D extends BaseFlag_<T> = BaseFlag_<T>>(cli: MeowConfig.Cli, flagDesc: D): T => {
    const parsed: T = {} as T;
    const { flags } = cli;
    Object.getOwnPropertyNames(flagDesc).forEach(flag => {
        const f = flag as keyof T;
        parsed[f] = (flags[flag] ?? flagDesc[flag].default) as T[keyof T];
    })
    return parsed;
};

export const run = async <T>(title: string, task: () => Promise<T>, clearLine: boolean = true): Promise<T> => {
    let response: T | undefined = undefined;
    await new Listr([
        {
            task: async () => { response = await task(); },
            title,
        }
    ]).run();
    if (clearLine) {
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine(1);
        process.stdout.cursorTo(0);
    }
    return response!;
}


export const createTable = () => new Table({
    chars: {
        top: '',
        'top-left': '',
        'top-mid': '',
        'top-right': '',
        bottom: '',
        'bottom-left': '',
        'bottom-mid': '',
        'bottom-right': '',
        left: '',
        'left-mid': '',
        right: '',
        'right-mid': '',
        mid: '',
        'mid-mid': '',
        middle: '',
    },
    style: {
        'padding-left': 0,
        'padding-right': 4,
    },
    wordWrap: true,
});
