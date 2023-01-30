import { log } from '@config/logger.config';
import { AxiosError } from 'axios';

export const handleError = (err: Error | { [key in string]: any } | undefined | null, exit = false) => {
    if (err instanceof AxiosError) {
        log.error(`${err.message} : ${JSON.stringify(err.response?.data)}`)
    } else {
        log.error(`${err?.message}${err?.cause ? ` : caused by ${err.cause.message}` : ''}`);
    }
    if (exit) {
        process.exit(0);
    }
};

export const handleUnhandledErrors = () => {
    process.on('uncaughtException', (err) => {
        handleError(err as Error, true);
    })
    process.on('uncaughtExceptionMonitor', (err) => {
        handleError(err as Error, true);
    })
    process.on('unhandledRejection', (err) => {
        handleError(err as Error, true);
    });
};
