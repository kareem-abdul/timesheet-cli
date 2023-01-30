import { TimeEntry } from '@app/dto/time-entry';
import { TimeSheetConfig } from '@app/dto/timesheet-config';
import { ConfigFlag } from '@flags/config.flag';
import { ListFlag } from '@flags/list.flag';
import { StartFlag } from '@flags/start.flag';

export interface TimesheetService {
    configure(flag: ConfigFlag): Promise<TimeSheetConfig & { path: string }>;
    start(flag: StartFlag): Promise<TimeEntry>;
    stop(id?: string): Promise<TimeEntry>;
    update(flag: StartFlag, id?: string): Promise<TimeEntry>;

    list(flag: ListFlag): Promise<TimeEntry[]>;
}