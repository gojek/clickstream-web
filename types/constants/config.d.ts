/**
 * @typedef {object} EventConfig - Event configuration
 * @property {{instant: string[]}} classification - event classification
 * @property {string=} group - product group name
 */
/**
 * @typedef {object} BatchConfig - Batch configuration
 * @property {number=} maxTimeBetweenTwoBatches - Maximum wait time betweeen two batches
 * @property {number=} maxBatchSize - Maximum size of a batch
 * @property {string=} dbName - name for indexedDB
 */
/**
 * @typedef {object} NetworkConfig - Network configuration
 * @property {string | URL} url - base url
 * @property {Headers} headers - request headers
 * @property {number=} maxRetries - max retries
 * @property {number=} timeBetweenTwoRetries - time in seconds between two retries
 * @property {number=} timeToResumeRetries - time in seconds to resume retries
 */
/**
 * @typedef {object} Config - Configuration
 * @property {EventConfig=} event - event configurations
 * @property {BatchConfig=} batch - event configurations
 * @property {NetworkConfig} network - event configurations
 */
/** @type {Config} } */
export const defaultConfig: Config;
/**
 * - Event configuration
 */
export type EventConfig = {
    /**
     * - event classification
     */
    classification: {
        instant: string[];
    };
    /**
     * - product group name
     */
    group?: string | undefined;
};
/**
 * - Batch configuration
 */
export type BatchConfig = {
    /**
     * - Maximum wait time betweeen two batches
     */
    maxTimeBetweenTwoBatches?: number | undefined;
    /**
     * - Maximum size of a batch
     */
    maxBatchSize?: number | undefined;
    /**
     * - name for indexedDB
     */
    dbName?: string | undefined;
};
/**
 * - Network configuration
 */
export type NetworkConfig = {
    /**
     * - base url
     */
    url: string | URL;
    /**
     * - request headers
     */
    headers: Headers;
    /**
     * - max retries
     */
    maxRetries?: number | undefined;
    /**
     * - time in seconds between two retries
     */
    timeBetweenTwoRetries?: number | undefined;
    /**
     * - time in seconds to resume retries
     */
    timeToResumeRetries?: number | undefined;
};
/**
 * - Configuration
 */
export type Config = {
    /**
     * - event configurations
     */
    event?: EventConfig | undefined;
    /**
     * - event configurations
     */
    batch?: BatchConfig | undefined;
    /**
     * - event configurations
     */
    network: NetworkConfig;
};
//# sourceMappingURL=config.d.ts.map