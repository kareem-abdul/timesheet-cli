import { ConfigService } from '@services/config/config.service';
import { DefaultConfigService } from '@services/config/default-config.service';
import { DefaultKimaiService } from '@services/kimai/default-kimai.service';
import { KimaiService } from '@services/kimai/kimai.service';
import { DefaultTimesheetService } from '@services/timesheet/default-timesheet.service';
import { TimesheetService } from '@services/timesheet/timesheet.service';
import { ObjectUtils } from '@utils';

export const timesheetService: TimesheetService = ObjectUtils.lazy(() => new DefaultTimesheetService());
export const configService: ConfigService = ObjectUtils.lazy(() => new DefaultConfigService());
export const kimaiService: KimaiService = ObjectUtils.lazy(() => new DefaultKimaiService());