import { BaseFlag, BaseFlag_ } from '@flags/base.flag';

export interface ConfigFlag extends BaseFlag {
    ignore: boolean;
}

export const ConfigFlag_: BaseFlag_<ConfigFlag> = {
    ignore: {
        type: 'boolean', default: false, desc: 'ignore existing configuration'
    }
}