import { TimeEntry } from '@app/dto/time-entry';
import { ListFlag } from '@flags/list.flag';
import { StartFlag } from '@flags/start.flag';

export interface TimesheetService {
    start(flag: StartFlag): Promise<TimeEntry>;
    stop(id?: string): Promise<TimeEntry>;
    update(flag: StartFlag, id?: string): Promise<TimeEntry>;
    list(flag: ListFlag): Promise<TimeEntry[]>;
}