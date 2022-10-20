export namespace errorCode {
    const VALIDATION_ERROR: string;
    const DATABASE_ERROR: string;
    const NETWORK_ERROR: string;
}
export namespace errorName {
    export const CLICKSTREAM_ERROR: string;
    const VALIDATION_ERROR_1: string;
    export { VALIDATION_ERROR_1 as VALIDATION_ERROR };
    const DATABASE_ERROR_1: string;
    export { DATABASE_ERROR_1 as DATABASE_ERROR };
    const NETWORK_ERROR_1: string;
    export { NETWORK_ERROR_1 as NETWORK_ERROR };
}
export class ClickstreamError extends Error {
    constructor(message: any, options: any);
}
export class ValidationError extends ClickstreamError {
    code: string;
}
export class DatabaseError extends ClickstreamError {
    code: string;
}
export class NetworkError extends ClickstreamError {
    code: string;
}
//# sourceMappingURL=error.d.ts.map