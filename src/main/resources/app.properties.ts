export const properties = {
    kimai: {
        configPath: '.config/timesheet',
        baseUrl: 'https://timesheet.flycatchtech.com'
    },
    app: {
        name: 'timesheet',
        desc: 'a command line tool for managing timesheet',
    },
    log: {
        level: process.env.LOG_LEVEL || 'debug',
    },
};
