export namespace ErrorCodes {
    const CLICKSTREAM_ERROR: string;
    const VALIDATION_ERROR: string;
    const DATABASE_ERROR: string;
    const NETWORK_ERROR: string;
    const TRACKING_ERROR: string;
    const CLEANUP_ERROR: string;
}
export namespace ErrorNames {
    const CLICKSTREAM_ERROR_1: string;
    export { CLICKSTREAM_ERROR_1 as CLICKSTREAM_ERROR };
    const VALIDATION_ERROR_1: string;
    export { VALIDATION_ERROR_1 as VALIDATION_ERROR };
    const DATABASE_ERROR_1: string;
    export { DATABASE_ERROR_1 as DATABASE_ERROR };
    const NETWORK_ERROR_1: string;
    export { NETWORK_ERROR_1 as NETWORK_ERROR };
    const TRACKING_ERROR_1: string;
    export { TRACKING_ERROR_1 as TRACKING_ERROR };
    const CLEANUP_ERROR_1: string;
    export { CLEANUP_ERROR_1 as CLEANUP_ERROR };
}
export class ClickstreamError extends Error {
    constructor(message: any, options: any);
    name: any;
    code: any;
}
export class ValidationError extends ClickstreamError {
    name: string;
    code: string;
}
export class DatabaseError extends ClickstreamError {
    name: string;
    code: string;
}
export class NetworkError extends ClickstreamError {
    name: string;
    code: string;
}
//# sourceMappingURL=error.d.ts.map