import { BaseFlag, BaseFlag_ } from '@flags/base.flag';
import { StartFlag, StartFlag_ } from '@flags/start.flag';

export interface UpdateFlag extends StartFlag {
    useCurrentTime: boolean;
}

export const UpdateFlag_: BaseFlag_<UpdateFlag> = {
    ...StartFlag_,
    useCurrentTime: {
        type: 'boolean', default: false, desc: 'update the time entry to start from current time'
    }
}