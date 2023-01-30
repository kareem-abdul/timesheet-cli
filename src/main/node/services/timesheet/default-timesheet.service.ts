import { TimeEntry } from '@app/dto/time-entry';
import { TimeSheetConfig } from '@app/dto/timesheet-config';
import { ConfigFlag } from '@flags/config.flag';
import { ListFlag } from '@flags/list.flag';
import { StartFlag } from '@flags/start.flag';
import { ActivityApi, ActivityCollection, Configuration, DefaultApi, ProjectApi, ProjectCollection, TimesheetApi, TimesheetEntity, TimesheetEntityExpanded, UserApi } from '@lib/kimai';
import { properties } from '@properties';
import { TimesheetService } from '@services/timesheet/timesheet.service';
import { AppUtils, ObjectUtils } from '@utils';
import chalk from 'chalk';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import inquirer from 'inquirer';
import { DateTime } from 'luxon';
import { homedir } from 'os';
import { resolve } from 'path';
import validator from 'validator';


export class DefaultTimesheetService implements TimesheetService {

    private readonly timesheetApi: TimesheetApi;
    private readonly projectApi: ProjectApi;
    private readonly activityApi: ActivityApi;
    private readonly usersApi: UserApi;
    private readonly defaultApi: DefaultApi;

    private configPath!: string;
    private config!: TimeSheetConfig;

    constructor() {
        const configFolder = resolve(homedir(), properties.kimai.configPath);
        if (!existsSync(configFolder)) {
            mkdirSync(configFolder);
        }
        this.configPath = resolve(configFolder, 'config.json');
        this.config = this.readConfig() as TimeSheetConfig;
        if (!this.config) {
            this.config = ObjectUtils.lazy(() => {
                throw new Error("app not configured. see help command");
            }, { loadOn: 'get' });
        }
        const configuration = ObjectUtils.lazy(() => this.getConfig())
        this.timesheetApi = ObjectUtils.lazy(() => new TimesheetApi(configuration));
        this.activityApi = ObjectUtils.lazy(() => new ActivityApi(configuration));
        this.projectApi = ObjectUtils.lazy(() => new ProjectApi(configuration));
        this.usersApi = ObjectUtils.lazy(() => new UserApi(configuration));
        this.defaultApi = ObjectUtils.lazy(() => new DefaultApi(configuration));
    }

    async start(flag: StartFlag): Promise<TimeEntry> {
        if (this.config.active) {
            throw new Error("stop existing time entry, before starting new one.");
        }
        const cwd = process.cwd();
        const cache = !flag.noCache && this.config.paths ? this.config.paths[cwd] : undefined;
        const project = cache ? cache.project : `${(await this.chooseProject()).id}`;
        const activity = cache ? cache.activity : `${(await this.chooseActivity(parseInt(project!))).id}`;
        const timezone = await this.getTimezone(!flag.noCache);
        const entry = (await AppUtils.run("starting time entry", async () => {
            return this.timesheetApi.apiTimesheetsPost({
                body: {
                    begin: DateTime.now().setZone(timezone).toISO(),
                    activity: parseInt(activity!),
                    project: parseInt(project!),
                    billable: !flag.notBillable,
                    description: flag.description
                },
            })
        })).data;
        if (!flag.noCache) {
            this.setConfig({
                active: `${entry.id}`,
                paths: {
                    ...this.config.paths,
                    [process.cwd()]: {
                        project: `${entry.project}`,
                        activity: `${entry.activity}`
                    }
                }
            });
        }
        return this.map(entry);
    }

    async stop(id: string | undefined = this.config.active): Promise<TimeEntry> {
        if (!id) {
            throw new Error("no active time entry found");
        }
        const entry = await AppUtils.run(
            "stoping time entry",
            () => this.timesheetApi.apiTimesheetsIdStopPatch({ id: parseInt(id) }).then(data => data.data)
        );
        this.setConfig({ active: undefined });
        return this.map(entry);
    }

    async update(flag: StartFlag, id: string | undefined = this.config.active): Promise<TimeEntry> {
        if (!id) {
            throw new Error("no active time entry found");
        }

        const project = (await this.chooseProject());
        const activity = (await this.chooseActivity(project!.id!));
        const activeEntry = await this.getActiveEntry();
        if (!activeEntry) {
            throw new Error("no active time entry found");
        }

        const entry = (await AppUtils.run(
            'updating active time entry',
            () => this.timesheetApi.apiTimesheetsIdPatch({
                id: parseInt(id),
                body: {
                    begin: activeEntry.begin,
                    activity: activity.id as number,
                    project: project.id as number,
                    billable: !flag.notBillable,
                    description: flag.description
                }
            })
        )).data

        if (!flag.noCache) {
            this.setConfig({
                active: `${entry.id}`,
                paths: {
                    ...this.config.paths,
                    [process.cwd()]: {
                        project: `${entry.project}`,
                        activity: `${entry.activity}`
                    }
                }
            });
        }
        return this.map(entry, project, activity);
    }

    async list(flag: ListFlag): Promise<TimeEntry[]> {
        let projects = [] as number[];
        if (flag.project) {
            projects = (
                await inquirer.prompt(
                    {
                        type: 'checkbox',
                        message: 'filter by project (use spacebar to select)',
                        name: 'projects',
                        choices: (await this.getProjects()).map(project => ({ name: project.name, value: project.id }))
                    }
                )
            ).projects;
        }

        let activities = [] as number[];
        if (flag.activity) {
            activities = (
                await inquirer.prompt(
                    {
                        type: 'checkbox',
                        message: 'filter by activities (use spacebar to select)',
                        name: 'activities',
                        choices: (await this.getActivities()).map(activity => ({ name: activity.name, value: activity.id }))
                    }
                )
            ).activities;
        }
        const entires = await AppUtils.run(
            'fetching previous entries',
            () => this.timesheetApi.apiTimesheetsGet({
                activities: activities.length > 0 ? activities.join(',') : undefined,
                projects: projects.length > 0 ? projects.join(',') : undefined,
                full: 'true',
            })
        ).then(data => data.data as unknown as TimesheetEntityExpanded[]);
        return Promise.all(entires.map(async entry => this.mapExpanded(entry)));
    }

    async configure(flag: ConfigFlag): Promise<TimeSheetConfig & { path: string }> {
        if (ObjectUtils.isProxy(this.config)) {
            this.config = {};
        }
        if (flag.ignore) {
            this.config = {};
        }

        const data = await inquirer.prompt([
            {
                type: 'input',
                name: 'baseUrl',
                message: 'enter base url?',
                when: !this.config.baseUrl,
                default: properties.kimai.baseUrl,
                transformer: (input: string, answers, flags) => input.endsWith('/') ? input.substring(0, input.lastIndexOf('/')) : input,
            },
            {
                type: 'input',
                name: 'user',
                message: 'enter your email address.',
                when: !this.config?.user,
                default: this.config?.user,
                validate: (input) => !validator.isEmpty(input) && validator.isEmail(input)
            },
            {
                type: 'password',
                name: 'apiKey',
                message: (answers) => `enter your api token. \n${chalk.white.dim(`( this can be set up in ${answers.baseUrl}/en/profile/${answers.user}/api-token )`)}\n`,
                default: this.config?.apiKey,
                when: !this.config?.apiKey,
            },
        ]);

        this.setConfig({
            baseUrl: data.baseUrl ?? this.config?.baseUrl,
            apiKey: data.apiKey ?? this.config?.apiKey,
            user: data.user ?? this.config?.user,
            active: this.config?.active ?? undefined,
            paths: this.config?.paths ?? {},
        })
        await AppUtils.run("checking connection", () => this.ping());
        const user = await this.getLoggedInUser();
        if (user.username !== this.config.user) {
            this.setConfig({});
            throw new Error("user emails do not match for the provided api token");
        }
        this.setConfig({ timezone: user.timezone });
        return this.config && { path: this.configPath };
    }

    private getConfig() {
        return new Configuration({
            apiKey: (key: string) => {
                switch (key) {
                    case "X-AUTH-TOKEN": return this.config.apiKey!;
                    case "X-AUTH-USER": return this.config.user!;
                    default:
                        throw new Error("invalid header" + key);
                };
            },
            basePath: this.config!.baseUrl
        });
    }

    private async getActiveEntry() {
        if (!this.config?.active) {
            return undefined;
        }
        return AppUtils.run(
            'fetching active time entry',
            () => this.timesheetApi.apiTimesheetsIdGet({ id: parseInt(this.config.active!) }).then(data => data.data)
        );
    }

    private async getActivities(...projects: number[]) {
        return AppUtils.run<ActivityCollection[]>(
            'fetching activities',
            () => this.activityApi.apiActivitiesGet({
                projects: projects && projects.length > 0 ? projects.join(',') : undefined,
            }).then(data => data.data)
        );
    }

    private async getProjects() {
        return AppUtils.run<ProjectCollection[]>(
            'fetching projects',
            () => this.projectApi.apiProjectsGet().then(data => data.data)
        );
    }

    private async chooseProject(): Promise<ProjectCollection> {
        const projects = await this.getProjects();
        const { project } = await inquirer.prompt<Record<string, ProjectCollection>>({
            type: 'list',
            message: 'choose a project',
            choices: projects.map(val => ({ name: val.name, value: val })),
            name: 'project'
        });
        return project;
    }

    private async chooseActivity(projectId: number): Promise<ActivityCollection> {
        const activities = await this.getActivities(projectId);
        const { activity } = await inquirer.prompt({
            type: 'list',
            message: 'choose an activity',
            choices: activities.map(val => ({ name: val.name, value: val })),
            name: 'activity'
        });
        return activity;
    }

    private async fetchProject(id: string) {
        return AppUtils.run("fetching project", () => this.projectApi.apiProjectsIdGet({ id }).then(data => data.data));
    }

    private async fetchActivity(id: number) {
        return AppUtils.run("fetching activity", () => this.activityApi.apiActivitiesIdGet({ id }).then(data => data.data));
    }

    private async mapExpanded(entry: TimesheetEntityExpanded) {
        return {
            id: `${entry.id}`,
            begin: entry.begin,
            end: entry.end,
            description: entry.description,
            duration: entry.duration ?? 0,
            project: entry.project.name,
            activity: entry.activity.name,
        };
    }

    private async map(entry: TimesheetEntity, project?: ProjectCollection, activity?: ActivityCollection): Promise<TimeEntry> {
        return {
            id: `${entry.id}`,
            begin: entry.begin,
            end: entry.end,
            description: entry.description,
            duration: entry.duration ?? 0,
            project: project?.name ?? (await this.fetchProject(`${entry.project}`)).name,
            activity: activity?.name ??  (await this.fetchActivity(entry.activity!)).name,
        };
    }

    private async ping() {
        return await this.defaultApi.apiPingGet();
    }

    private async getTimezone(cache: boolean) {
        return cache && this.config?.timezone ? this.config.timezone : (await this.getLoggedInUser()).timezone;
    }

    private async getLoggedInUser() {
        return AppUtils.run("getting logged in user details", () => this.usersApi.apiUsersMeGet().then(data => data.data));
    }

    private readConfig() {
        if (!existsSync(this.configPath)) {
            return undefined;
        }
        try {
            return JSON.parse(readFileSync(this.configPath, 'utf-8')) as TimeSheetConfig;
        } catch (err) {
            throw new Error("invalid config file", {
                cause: err as Error
            });
        }
    }

    private setConfig(config: Partial<TimeSheetConfig>) {
        Object.assign(this.config, config);
        writeFileSync(this.configPath, JSON.stringify(this.config, null, ' '))
    }
}