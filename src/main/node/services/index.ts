import { DefaultTimesheetService } from '@services/timesheet/default-timesheet.service';
import { TimesheetService } from '@services/timesheet/timesheet.service';
import { ObjectUtils } from '@utils';

export const timesheetService: TimesheetService = ObjectUtils.lazy(() => new DefaultTimesheetService());