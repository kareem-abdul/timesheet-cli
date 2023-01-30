import { BaseFlag, BaseFlag_ } from '@flags/base.flag';

export interface StartFlag extends BaseFlag {
    description: string;
    notBillable: boolean;
    noCache: boolean;
}

export const StartFlag_: BaseFlag_<StartFlag> = {
    description: { type: 'string', alias: 'd', isRequired: false, desc: 'description about the started time entry' },
    notBillable: { type: 'boolean', default: false, desc: 'make the started time entry not billable'},
    noCache: { type: 'boolean', default: false, desc: 'dont cache project and activity for the folder'},
};