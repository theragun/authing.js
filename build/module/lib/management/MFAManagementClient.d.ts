import { ISetTotpResp, ManagementClientOptions, UserMfaType } from './types';
import { GraphqlClient } from '../common/GraphqlClient';
import { HttpClient } from '../common/HttpClient';
import { ManagementTokenProvider } from './ManagementTokenProvider';
/**
 * @class MFAManagementClient 管理多因素认证
 * @description 用于管理用户的 TOTP、人脸等 MFA信息
 *
 * @example
 *
 * 请使用以下方式使用该模块：
 * \`\`\`javascript
 * import { ManagementClient } from "authing-js-sdk"
 * const managementClient = new ManagementClient({
 *    userPoolId: "YOUR_USERPOOL_ID",
 *    secret: "YOUR_USERPOOL_SECRET",
 * })
 * managementClient.mfa.getStatus("USER_ID") // 获取用户 MFA 绑定状态
 * \`\`\`
 *
 * @name MFAManagementClient
 */
export declare class MFAManagementClient {
    options: ManagementClientOptions;
    graphqlClient: GraphqlClient;
    tokenProvider: ManagementTokenProvider;
    httpClient: HttpClient;
    constructor(options: ManagementClientOptions, graphqlClient: GraphqlClient, httpClient: HttpClient, tokenProvider: ManagementTokenProvider);
    /**
     * @name getStatus
     * @name_zh 获取用户 MFA 绑定状态
     * @description 获取用户 MFA 绑定状态。
     *
     * @param {string} userId 用户 ID
     *
     * @example
     *
     * const mfaStatus = await managementClient.mfa.getStatus('USER_ID');
     *
     * @memberof MFAManagementClient
     */
    getStatus(userId: string): Promise<Record<UserMfaType, boolean>>;
    /**
     * @name unAssociateMfa
     * @name_zh 解绑用户 MFA
     * @description 解绑用户 MFA。
     *
     * @param {string} userId 用户 ID
     * @param {string} type 解绑类型，可选值有 'FACE', 'OTP'
     *
     * @example
     *
     * const mfaStatus = await managementClient.mfa.unAssociateMfa('USER_ID', 'FACE');
     *
     * @memberof MFAManagementClient
     */
    unAssociateMfa(userId: string, type: UserMfaType): Promise<boolean>;
    /**
     * @name importTotp
     * @name_zh 将已有的 TOTP 的 secret 和恢复代码导入到 Authing，并为用户开启 TOTP 多因素认证
     * @description 设置用户 TOTP 的 secret 和恢复代码，并自动启用 MFA
     *
     * @param {string} userId 用户 ID
     * @param {string} secret TOTP 密钥
     * @param {string} recoveryCode 恢复代码
     *
     * @example
     *
     * const result = await managementClient.mfa.setTotp('USER_ID', 'SECRET', 'RECOVERY_CODE');
     *
     * @memberof MFAManagementClient
     */
    importTotp(userId: string, secret: string, recoveryCode?: string): Promise<ISetTotpResp>;
}
