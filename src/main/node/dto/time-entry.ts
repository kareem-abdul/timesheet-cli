export interface TimeEntry {
    id: string;
    begin: string;
    end?: string;
    description?: string;
    duration: number;
    activity: string;
    project: string;
}