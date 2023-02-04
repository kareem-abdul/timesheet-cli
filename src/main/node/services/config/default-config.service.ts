import { TimeSheetConfig } from '@app/dto/timesheet-config';
import { ConfigFlag } from '@flags/config.flag';
import { properties } from '@properties';
import { ConfigService } from '@services/config/config.service';
import { AppUtils, ObjectUtils } from '@utils';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { resolve } from 'path';
import inquirer from 'inquirer';
import validator from 'validator';
import chalk from 'chalk';
import { kimaiService } from '@services';

export class DefaultConfigService implements ConfigService {

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
    }

    getConfig(): TimeSheetConfig {
        return this.config;
    }

    setConfig(config: Partial<TimeSheetConfig>): void {
        this.writeConfig(config);
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
                transformer: (input: string) => input.endsWith('/') ? input.substring(0, input.lastIndexOf('/')) : input,
            },
            {
                type: 'input',
                name: 'user',
                message: 'enter your email address.',
                when: !this.config?.user,
                default: this.config?.user,
                validate: (input) => !validator.isEmpty(input) && validator.isEmail(input) || 'enter valid email'
            },
            {
                type: 'password',
                name: 'apiKey',
                message: (answers) => `enter your api token. \n${chalk.white.dim(`( this can be set up in ${answers.baseUrl}/en/profile/${answers.user}/api-token )`)}\n`,
                default: this.config?.apiKey,
                when: !this.config?.apiKey,
            },
        ]);
        await AppUtils.run("checking connection", () => kimaiService.ping());
        const user = await kimaiService.getLoggedInUser();
        if (user.username !== this.config.user) {
            throw new Error("user emails do not match for the provided api token");
        }
        this.setConfig({
            baseUrl: data.baseUrl ?? this.config?.baseUrl,
            apiKey: data.apiKey ?? this.config?.apiKey,
            user: data.user ?? this.config?.user,
            active: this.config?.active ?? undefined,
            paths: this.config?.paths ?? {},
            timezone: user.timezone
        })
        return this.config && { path: this.configPath };
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

    private writeConfig(config: Partial<TimeSheetConfig>) {
        Object.assign(this.config, config);
        writeFileSync(this.configPath, JSON.stringify(this.config, null, ' '))
    }


}