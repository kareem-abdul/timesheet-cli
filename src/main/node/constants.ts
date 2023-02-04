import chalk from 'chalk';

export const constants = {
    HELP_COMMAND_DESC: 'Get help for the cli and commands',
    START_COMMAND_DESC: 'Start a time entry',
    STOP_COMMAND_DESC: 'Stops the active time entry',
    UPDATE_COMMAND_DESC: 'Update the active time entry',
    CONFIGURE_COMMAND_DESC: 'Configure the app',
    LIST_COMMAND_DESC: 'Lists previous time entries',
    SYNC_COMMAND_DESCRIPTION: 'Syncs local cache with remote',
    
    HOUR_FORMAT: 'hh:mm',

    DONE: `${chalk.green.inverse.bold(' DONE ')}`
};
