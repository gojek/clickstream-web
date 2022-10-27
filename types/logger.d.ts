export namespace logLevels {
    const ERROR: number;
    const INFO: number;
}
export function isValidLogLevel(value: any): boolean;
export default class Logger {
    set logLevel(arg: any);
    error(message: any): void;
    info(message: any): void;
    log(message: any): void;
    #private;
}
//# sourceMappingURL=logger.d.ts.map