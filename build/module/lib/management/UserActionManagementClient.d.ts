import { ManagementClientOptions, UserActions } from './types';
import { ManagementTokenProvider } from './ManagementTokenProvider';
import { HttpClient } from '../common/HttpClient';
/**
 * @class UserActionManagementClient 审计管理
 * @name UserActionManagementClient
 * @description 应用管理
 *
 * @example
 *
 * 请使用以下方式使用该模块：
 * \`\`\`javascript
 * import { UserActionManagementClient } from "authing-js-sdk"
 * const managementClient = new ManagementClient({
 *    userPoolId: "YOUR_USERPOOL_ID",
 *    secret: "YOUR_USERPOOL_SECRET",
 * })
 * managementClient.userAction.list    // 列表查询
 * managementClient.userAction.export // 日志导出
 * \`\`\`
 *
 */
export declare class UserActionManagementClient {
    options: ManagementClientOptions;
    httpClient: HttpClient;
    tokenProvider: ManagementTokenProvider;
    constructor(options: ManagementClientOptions, httpClient: HttpClient, tokenProvider: ManagementTokenProvider);
    /**
     * 审计日志列表
     * @param options.page 当前页数
     * @param options.limit 每页显示条数
     * @param options.clientIp 客户端 IP 地址
     * @param options.operationName 操作类型
     * @param options.operatoArn 用户 Arn 通过 searchUser 方法获得
     * @returns Promise<UserActions>
     */
    list(options?: {
        page?: number;
        limit?: number;
        clientIp?: string;
        operationName?: string;
        operatoArn?: string;
    }): Promise<UserActions>;
}
