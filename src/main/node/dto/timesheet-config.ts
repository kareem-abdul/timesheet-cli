
export interface TimeSheetConfig {
    active?: string;
    apiKey?: string;
    baseUrl?: string;
    user?: string;
    timezone?: string;
    paths?: {
        [key in string]: {
            project: string;
            activity: string;
        }
    }
}