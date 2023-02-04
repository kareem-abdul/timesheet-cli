import { TimeSheetConfig } from '@app/dto/timesheet-config';
import { ConfigFlag } from '@flags/config.flag';

export interface ConfigService {
    getConfig(): TimeSheetConfig;
    setConfig(config: Partial<TimeSheetConfig>): void;
    configure(flag: ConfigFlag): Promise<TimeSheetConfig & { path: string }>;
}

