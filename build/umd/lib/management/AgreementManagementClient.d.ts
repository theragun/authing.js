import { ManagementClientOptions, AgreementInput, AgreementDetail, AgreementList } from './types';
import { GraphqlClient } from '../common/GraphqlClient';
import { HttpClient } from '../common/HttpClient';
import { ManagementTokenProvider } from './ManagementTokenProvider';
/**
 * @class AgreementManagementClient 管理多因素认证
 * @description 用于管理注册协议
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
 * managementClient.applications.listAgreement("APP_ID") // 获取某个应用的注册协议列表
 * \`\`\`
 *
 * @name AgreementManagementClient
 */
export declare class AgreementManagementClient {
    options: ManagementClientOptions;
    graphqlClient: GraphqlClient;
    tokenProvider: ManagementTokenProvider;
    httpClient: HttpClient;
    constructor(options: ManagementClientOptions, graphqlClient: GraphqlClient, httpClient: HttpClient, tokenProvider: ManagementTokenProvider);
    /**
     * @description 在某个应用下创建注册协议
     * @param {object} appId 应用 ID
     * @param {object} agreement
     * @param {string} agreement.title 协议标题，可以包含 HTML A 标签
     * @param {boolean} [agreement.required] 是否必须才允许注册，默认为 true
     * @param {lang} [agreement.lang] 协议标题语言，可选 zh-CN, en-US，默认为 zh-CN，在托管登录页面中会根据界面语言展示协议
     */
    create(appId: string, agreement: AgreementInput): Promise<AgreementDetail>;
    /**
     * @description 获取应用注册协议列表
     * @param {string} appId 应用 ID
     */
    list(appId: string): Promise<AgreementList>;
    /**
     * @description 删除应用下某个注册协议
     * @param {string} appId 应用 ID
     * @param {number} agreementId 协议 ID
     */
    delete(appId: string, agreementId: number): Promise<boolean>;
    /**
     * @description 修改应用下某个注册协议
     * @param {string} appId 应用 ID
     * @param {number} agreementId 协议 ID
     * @param {object} updates 更新内容
     * @param {string} [updates.title] 协议标题，可以包含 HTML A 标签
     * @param {boolean} [updates.required] 是否必须才允许注册，默认为 true
     * @param {lang} [updates.lang] 协议标题语言，可选 zh-CN, en-US，默认为 zh-CN，在托管登录页面中会根据界面语言展示协议
     */
    modify(appId: string, agreementId: number, updates: AgreementInput): Promise<AgreementDetail>;
    /**
     * @description 对某个应用下的注册协议进行排序
     * @param {string} appId 应用 ID
     * @param {number[]} order 应用下所有协议的 ID 列表，按需要的顺序排列
     */
    sort(appId: string, order: number[]): Promise<boolean>;
}
