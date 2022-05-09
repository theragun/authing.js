import { AdminLogsInfo, ManagementClientOptions, UserLogsInfo } from './types';
import { ManagementTokenProvider } from './ManagementTokenProvider';
import { HttpClient } from '../common/HttpClient';
/**
 * @class StatisticsManagementClient 管理日志统计信息
 * @name StatisticsManagementClient
 * @description 管理日志统计信息
 *
 * @example
 *
 * 请使用以下方式使用该模块：
 * \`\`\`javascript
 * import { StatisticsManagementClient } from "authing-js-sdk"
 * const managementClient = new ManagementClient({
 *    userPoolId: "YOUR_USERPOOL_ID",
 *    secret: "YOUR_USERPOOL_SECRET",
 * })
 * managementClient.statistics.listUserActions // 查看用户操作日志
 * managementClient.statistics.listAuditLogs // 查看审计日志
 * \`\`\`
 *
 */
export declare class StatisticsManagementClient {
    options: ManagementClientOptions;
    httpClient: HttpClient;
    tokenProvider: ManagementTokenProvider;
    constructor(options: ManagementClientOptions, httpClient: HttpClient, tokenProvider: ManagementTokenProvider);
    /**
     * 查看用户操作日志
     * @param options.operationNames SupportedUserActionEnum
     */
    listUserActions(options?: {
        clientIp?: string;
        operationNames?: string[];
        userIds?: string[];
        page?: number;
        limit?: number;
        excludeNonAppRecords?: boolean;
        appIds?: string[];
        start?: number;
        end?: number;
    }): Promise<{
        totalCount: number;
        list: UserLogsInfo[];
    }>;
    /**
     * 查看审计日志
     * @param options.operationNames  SupportedAdminActionEnum
     */
    listAuditLogs(options?: {
        /**
         * @description 客户端 IP
         */
        clientIp?: string;
        /**
         * @description 操作名称
         */
        operationNames?: string[];
        /**
         * @description 用户 ID 列表
         */
        userIds?: string[];
        /**
         * @description 应用 ID 列表，默认获取所有应用
         */
        appIds?: string[];
        page?: number;
        limit?: number;
    }): Promise<{
        list: AdminLogsInfo[];
        totalCount: number;
    }>;
}
