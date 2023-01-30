import { BaseFlag, BaseFlag_ } from '@flags/base.flag';

export interface ListFlag extends BaseFlag {
    project: boolean;
    activity: boolean;
}

export const ListFlag_: BaseFlag_<ListFlag> = {
    project: { type: 'boolean', alias: 'p', default: false, desc: 'filter by projects' },
    activity: { type: 'boolean', alias: 'a', default: false, desc: 'filter by activities' }
};
