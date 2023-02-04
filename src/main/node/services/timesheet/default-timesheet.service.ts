import { TimeEntry } from '@app/dto/time-entry';
import { ListFlag } from '@flags/list.flag';
import { StartFlag } from '@flags/start.flag';
import { ActivityCollection, ProjectCollection, TimesheetEntity, TimesheetEntityExpanded } from '@lib/kimai';
import { configService, kimaiService } from '@services';
import { TimesheetService } from '@services/timesheet/timesheet.service';
import inquirer from 'inquirer';
import { DateTime } from 'luxon';

export class DefaultTimesheetService implements TimesheetService {

    async start(flag: StartFlag): Promise<TimeEntry> {
        if (configService.getConfig().active) {
            throw new Error("stop existing time entry, before starting new one.");
        }
        if (flag.replace) {
            flag.noCache = true;
        }
        const project = await this.getProject(!flag.noCache);
        const activity = await this.getAcitivity(project.id!, !flag.noCache);
        const timezone = await this.getTimezone(!flag.noCache);
        const begin = await this.getDates(flag.date, timezone!);
        const entry = await kimaiService.create({
            begin,
            activity: activity.id!,
            project: project.id!,
            billable: !flag.notBillable,
            description: flag.description
        });
        const config = {
            active: `${entry.id}`,
            paths: configService.getConfig().paths ?? {}
        };
        if (!flag.noCache) {
            config.paths[process.cwd()] = { project: `${project.id}`, activity: `${activity.id}` }
        }
        configService.setConfig(config);
        return this.map(entry);
    }

    async stop(id: string | undefined = configService.getConfig().active): Promise<TimeEntry> {
        if (!id) {
            throw new Error("no active time entry found");
        }
        const entry = await kimaiService.stopTimesheet(parseInt(id));
        configService.setConfig({ active: undefined });
        return this.map(entry);
    }

    async update(flag: StartFlag, id: string | undefined = configService.getConfig().active): Promise<TimeEntry> {
        if (!id) {
            throw new Error("no active time entry found");
        }

        const project = (await this.chooseProject());
        const activity = (await this.chooseActivity(project!.id!));
        const begin = await this.getDates(flag.date, (await this.getTimezone(!flag.noCache))!)

        const entry = await kimaiService.update(parseInt(id), {
            begin,
            activity: activity.id as number,
            project: project.id as number,
            billable: !flag.notBillable,
            description: flag.description
        });

        const config = {
            active: `${entry.id}`,
            paths: configService.getConfig().paths ?? {}
        };
        if (!flag.noCache) {
            config.paths[process.cwd()] = { project: `${project.id}`, activity: `${activity.id}` }
        }
        configService.setConfig(config);
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
                        choices: (await kimaiService.getProjects()).map(project => ({ name: project.name, value: project.id }))
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
                        choices: (await kimaiService.getActivities()).map(activity => ({ name: activity.name, value: activity.id }))
                    }
                )
            ).activities;
        }
        const entires = await kimaiService.list({ activities: activities.join(','), projects: projects.join(',') });
        return Promise.all(entires.map(async entry => this.mapExpanded(entry)));
    }

    private async getProject(cache: boolean) {
        const cwd = process.cwd();
        const config = configService.getConfig();
        const id = cache && !!config.paths ? config.paths[cwd].project : undefined;
        return !!id ? kimaiService.getProjectById(parseInt(id)) : this.chooseProject();
    }

    private async chooseProject(): Promise<ProjectCollection> {
        const projects = await kimaiService.getProjects();
        const { project } = await inquirer.prompt<Record<string, ProjectCollection>>({
            type: 'list',
            message: 'choose a project',
            choices: projects.map(val => ({ name: val.name, value: val })),
            name: 'project'
        });
        return project;
    }

    private async getAcitivity(projectId: number, cache: boolean) {
        const cwd = process.cwd();
        const config = configService.getConfig();
        const id = cache && !!config.paths ? config.paths[cwd].activity : undefined;
        return !!id ? kimaiService.getActivities(projectId).then(activities => activities[0]) : this.chooseActivity(projectId);
    }

    private async chooseActivity(projectId: number): Promise<ActivityCollection> {
        const activities = await kimaiService.getActivities(projectId);
        const { activity } = await inquirer.prompt({
            type: 'list',
            message: 'choose an activity',
            choices: activities.map(val => ({ name: val.name, value: val })),
            name: 'activity'
        });
        return activity;
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
            project: project?.name ?? (await kimaiService.getProjectById(entry.project!)).name,
            activity: activity?.name ?? (await kimaiService.getActivityById(entry.activity!)).name,
        };
    }

    private async getTimezone(cache: boolean) {
        return cache && configService.getConfig()?.timezone ? configService.getConfig().timezone : (await kimaiService.getLoggedInUser()).timezone;
    }

    private async getDates(prompt: boolean, timezone: string) {
        if (prompt) {
            const { begin } = await inquirer.prompt({
                type: 'date',
                name: 'begin',
                message: 'enter starting time',
                default: new Date()
            });
            return DateTime.fromJSDate(begin, { zone: timezone }).toISO();
        }
        return DateTime.now().setZone(timezone).toISO();
    }
}
