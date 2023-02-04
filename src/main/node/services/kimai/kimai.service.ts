import { ActivityCollection, ProjectCollection, ProjectEntity, TimesheetApiApiTimesheetsGetRequest, TimesheetEditForm, TimesheetEntity, TimesheetEntityExpanded, UserEntity } from '@lib/kimai';

export interface KimaiService {
    getProjects(): Promise<ProjectCollection[]>;
    getProjectById(id : number): Promise<ProjectEntity>; 
    getActivities(...projectId: number[]): Promise<ActivityCollection[]>;
    getActivityById(id: number): Promise<ActivityCollection>;

    list(filter: Omit<TimesheetApiApiTimesheetsGetRequest, 'full'>): Promise<TimesheetEntityExpanded[]>;
    create(request: TimesheetEditForm): Promise<TimesheetEntity>;
    update(id: number, request: TimesheetEditForm): Promise<TimesheetEntity>;

    stopTimesheet(id: number): Promise<TimesheetEntity>;


    getActive(): Promise<TimesheetEntity>;
    

    getLoggedInUser(): Promise<UserEntity>;
    ping(): Promise<void>;
}