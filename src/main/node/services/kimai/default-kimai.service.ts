import { ProjectCollection, ActivityCollection, TimesheetApi, ActivityApi, ProjectApi, DefaultApi, UserApi, Configuration, ProjectEntity, UserEntity, TimesheetEditForm, TimesheetEntity, TimesheetApiApiTimesheetsGetRequest, TimesheetEntityExpanded } from '@lib/kimai';
import { configService } from '@services';
import { KimaiService } from '@services/kimai/kimai.service';
import { AppUtils, ObjectUtils } from '@utils';

export class DefaultKimaiService implements KimaiService {

    constructor(
        private readonly configuration = ObjectUtils.lazy(() => this.getConfig()),
        private readonly timesheetApi = ObjectUtils.lazy(() => new TimesheetApi(configuration)),
        private readonly activityApi = ObjectUtils.lazy(() => new ActivityApi(configuration)),
        private readonly projectApi = ObjectUtils.lazy(() => new ProjectApi(configuration)),
        private readonly usersApi = ObjectUtils.lazy(() => new UserApi(configuration)),
        private readonly defaultApi = ObjectUtils.lazy(() => new DefaultApi(configuration)),
    ) {

    }
    async getLoggedInUser() {
        return AppUtils.run("getting logged in user details", () => this.usersApi.apiUsersMeGet().then(data => data.data));
    }

    getProjectById(id: number): Promise<ProjectEntity> {
        return AppUtils.run('fetching project', () => this.projectApi.apiProjectsIdGet({ id: `${id}` }).then(res => res.data));
    }

    getProjects(): Promise<ProjectCollection[]> {
        return AppUtils.run('fetching projects', () => this.projectApi.apiProjectsGet().then(res => res.data));
    }

    getActivities(...projectIds: number[]): Promise<ActivityCollection[]> {
        return AppUtils.run('fethcing activities', () => this.activityApi.apiActivitiesGet({ projects: projectIds && projectIds.length > 0 ? projectIds.join(',') : undefined, }).then(res => res.data));
    }

    getActivityById(id: number): Promise<ActivityCollection> {
        return AppUtils.run('fetching activity', () => this.activityApi.apiActivitiesIdGet({ id }).then(res => res.data));
    }

    async list(filter: Omit<TimesheetApiApiTimesheetsGetRequest, 'full'>): Promise<TimesheetEntityExpanded[]> {
        return AppUtils.run('fetching previous entries', () => this.timesheetApi.apiTimesheetsGet({ ...filter, full: 'true' })).then(data => data.data as unknown as TimesheetEntityExpanded[]);
    }

    create(request: TimesheetEditForm): Promise<TimesheetEntity> {
        return AppUtils.run("starting time entry", async () => this.timesheetApi.apiTimesheetsPost({ body: request }).then(res => res.data));
    }

    update(id: number, request: TimesheetEditForm): Promise<TimesheetEntity> {
        return AppUtils.run('updating active time entry', () => this.timesheetApi.apiTimesheetsIdPatch({ id, body: request }).then(res => res.data));
    }

    stopTimesheet(id: number): Promise<TimesheetEntity> {
        return AppUtils.run("stoping time entry", () => this.timesheetApi.apiTimesheetsIdStopPatch({ id }).then(data => data.data));
    }

    getActive(): Promise<TimesheetEntity> {
        return AppUtils.run('fetching active time entry', () => this.timesheetApi.apiTimesheetsIdGet({ id: parseInt(configService.getConfig().active!) }).then(data => data.data));
    }

    async ping() {
        await this.defaultApi.apiPingGet();
    }


    private getConfig() {
        return new Configuration({
            apiKey: (key: string) => {
                switch (key) {
                    case "X-AUTH-TOKEN": return configService.getConfig().apiKey!;
                    case "X-AUTH-USER": return configService.getConfig().user!;
                    default:
                        throw new Error("invalid header" + key);
                };
            },
            basePath: configService.getConfig()!.baseUrl
        });
    }

}