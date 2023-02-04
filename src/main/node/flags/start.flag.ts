import { BaseFlag, BaseFlag_ } from '@flags/base.flag';

export interface StartFlag extends BaseFlag {
    description: string;
    notBillable: boolean;
    noCache: boolean;
    replace: boolean;
    date: boolean;
}

export const StartFlag_: BaseFlag_<StartFlag> = {
    description: { type: 'string', alias: 'd', isRequired: false, desc: 'description about the started time entry' },
    notBillable: { type: 'boolean', default: false, desc: 'make the started time entry not billable'},
    noCache: { type: 'boolean', default: false, desc: 'dont cache project and activity for the folder'},
    replace: { type: 'boolean', alias: 'r', default: false, desc: 'replace the registered project and activity for the current folder'},
    date: { type: 'boolean', alias: 't', default: false, desc: 'input times manually instead of current timestamp'}
};