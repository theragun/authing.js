import { GraphqlClient } from './../common/GraphqlClient';
import { ManagementTokenProvider } from './ManagementTokenProvider';
import { IAppAccessPolicy, IAppAccessPolicyQueryFilter, IApplication, IApplicationAccessPolicies, IResourceDto, IResourceQueryFilter, IResourceResponse, IResourceUpdateDto, ManagementClientOptions, Namespace, Namespaces, ProgrammaticAccessAccount, ProgrammaticAccessAccountList } from './types';
import { AuthorizeResourceOpt, CommonMessage, PaginatedAuthorizedResources, PolicyAssignmentTargetType, ResourceType } from '../../types/graphql.v2';
import { HttpClient } from '../common/HttpClient';
/**
 * @class AclManagementClient 管理权限、访问控制
 * @description Authing 基于 PBAC（Policy Based Access Control，基于策略的访问控制）构建权限模型，
 * 可以和 RBAC （Role Based Access Control，基于角色的访问控制）结合，实现非常灵活、精细化的权限控制。
 * 此模块将此模型抽象成了两个方法: allow, isAllowed。
 *
 * @example
 *
 * 请使用以下方式使用该模块，而不要直接初始化该模块：
 *
 * \`\`\`javascript
 * import { ManagementClient } from "authing-js-sdk"
 * const managementClient = new ManagementClient({
 *    userPoolId: "YOUR_USERPOOL_ID",
 *    secret: "YOUR_USERPOOL_SECRET",
 * })
 * managementClient.acl.allow // 允许某个用户对某个资源进行某个操作
 * managementClient.acl.isAllowed // 判断某个用户是否对某个资源有某个操作权限
 * \`\`\`
 *
 * @name AclManagementClient
 */
export declare class AclManagementClient {
    options: ManagementClientOptions;
    graphqlClient: GraphqlClient;
    httpClient: HttpClient;
    tokenProvider: ManagementTokenProvider;
    constructor(options: ManagementClientOptions, graphqlClient: GraphqlClient, httpClient: HttpClient, tokenProvider: ManagementTokenProvider);
    /**
     * 生成随机字符串
     * @param randomLenth 随机长度
     * @returns string
     */
    static randomString(randomLenth?: number): string;
    /**
     * @name allow
     * @name_zh 允许某个用户对某个资源进行某个操作
     *
     * @description 允许某个用户对某个资源进行某个操作
     *
     * @param {string} userId 用户 ID
     * @param {string} action 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`
     * @param {string} resource 资源名称, 必须为 \<resourceType\>:\<resourceId\> 格式或者为 *, 如 `*`, `books:123`, `books:*`
     * @example
     * managementClient.acl.allow('USERID1', 'books:123', 'books:read')
     * managementClient.acl.isAllowed('USERID1', 'books:123', 'books:read') // true
     * managementClient.acl.isAllowed('USERID1', 'books:123', 'books:edit') // false
     *
     * @example
     * managementClient.acl.allow('USERID2', 'books:*', 'books:*')
     * managementClient.acl.isAllowed('USERID2', 'books:123', 'books:read') // true
     * managementClient.acl.isAllowed('USERID2', 'books:124', 'books:edit') // true
     *
     * @returns {Promise<CommonMessage>}
     * @memberof AclManagementClient
     */
    allow(userId: string, resource: string, action: string, namespace: string): Promise<CommonMessage>;
    /**
     * @name isAllowed
     * @name_zh 判断某个用户是否对某个资源有某个操作权限
     *
     * @description 判断某个用户是否对某个资源有某个操作权限
     *
     * @param {string} userId 用户ID
     * @param {string} action 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`
     * @param {string} resource 资源名称, 必须为 \<resourceType\>:\<resourceId\> 格式或者为 *, 如 `*`, `books:123`, `books:*`
     * @example
     * managementClient.acl.isAllowed('USERID', 'books:*', 'books:edit')
     *
     * @returns {Promise<boolean>} 是否具备操作权限
     * @memberof AclManagementClient
     *
     */
    isAllowed(userId: string, resource: string, action: string, opts?: {
        namespace?: string;
    }): Promise<boolean>;
    /**
     * @description 获取用户被授权的所有资源
     *
     * @param userId
     * @param namespace
     */
    listAuthorizedResources(targetType: PolicyAssignmentTargetType, targetIdentifier: string, namespace: string, options?: {
        resourceType?: ResourceType;
    }): Promise<PaginatedAuthorizedResources>;
    /**
     * @description 将一个（类）资源授权给用户、角色、分组、组织机构，且可以分别指定不同的操作权限。
     *
     */
    authorizeResource(params: {
        namespace: string;
        resource: string;
        opts: AuthorizeResourceOpt[];
    }): Promise<CommonMessage>;
    revokeResource(params: {
        namespace: string;
        resource: string;
        opts: {
            targetType: PolicyAssignmentTargetType;
            targetIdentifier: string;
        }[];
    }): Promise<void>;
    /**
     * @description 获取具备某个（类）资源操作权限的用户、分组、角色、组织机构。
     * @param namespace {string} 权限分组标识
     * @param resource {string} 资源标识
     * @param actions {string[]} 资源操作标识
     * @param targetType {string} 筛选项，指定返回主体的类型，可选值为 'USER'、'ROLE'、'ORG'、'GROUP'
     */
    getAuthorizedTargets(options: {
        namespace: string;
        resource: string;
        resourceType: 'BUTTON' | 'UI' | 'MENU' | 'API' | 'DATA';
        actions?: {
            op: 'AND' | 'OR';
            list: string[];
        };
        targetType?: 'USER' | 'ROLE' | 'ORG' | 'GROUP';
    }): Promise<{
        totalCount?: number;
        list?: {
            targetType?: PolicyAssignmentTargetType;
            targetIdentifier?: string;
            actions?: string[];
        }[];
    }>;
    listResources(options?: IResourceQueryFilter): Promise<any>;
    getResourceById(id: string): Promise<any>;
    getResourceByCode(options: {
        namespace: string;
        code: string;
    }): Promise<any>;
    /**
     * @deprecated use listResources
     * @param options
     */
    getResources(options?: IResourceQueryFilter): Promise<any>;
    createResource(options: IResourceDto): Promise<IResourceResponse>;
    updateResource(code: string, options: IResourceUpdateDto): Promise<IResourceResponse>;
    deleteResource(code: string, namespace: string): Promise<boolean>;
    getApplicationAccessPolicies(options: IAppAccessPolicyQueryFilter): Promise<IApplicationAccessPolicies>;
    enableApplicationAccessPolicy(options: IAppAccessPolicy): Promise<{
        code: number;
        message: string;
    }>;
    disableApplicationAccessPolicy(options: IAppAccessPolicy): Promise<{
        code: number;
        message: string;
    }>;
    deleteApplicationAccessPolicy(options: IAppAccessPolicy): Promise<{
        code: number;
        message: string;
    }>;
    allowAccessApplication(options: IAppAccessPolicy): Promise<{
        code: number;
        message: string;
    }>;
    denyAccessApplication(options: IAppAccessPolicy): Promise<{
        code: number;
        message: string;
    }>;
    updateDefaultApplicationAccessPolicy(options: {
        defaultStrategy: 'ALLOW_ALL' | 'DENY_ALL';
        appId: string;
    }): Promise<IApplication>;
    /**
     * 编程访问账号列表
     * @param appId 应用 ID
     * @param page 当前页数
     * @param limit 每页显示条数
     * @returns Promise<ProgrammaticAccessAccountList>
     */
    programmaticAccessAccountList(appId: string, page?: number, limit?: number): Promise<ProgrammaticAccessAccountList>;
    /**
     * 添加编程访问账号
     * @param appId 应用 ID
     * @param options.tokenLifetime AccessToken 过期时间（秒）
     * @param options.remarks 备注
     * @returns Promise<ProgrammaticAccessAccount>
     */
    createProgrammaticAccessAccount(appId: string, options?: {
        tokenLifetime: number;
        remarks?: string;
    }): Promise<ProgrammaticAccessAccount>;
    /**
     * 添加编程访问账号
     * @param programmaticAccessAccountId 编程访问账号 ID
     * @returns Promise<boolean>
     */
    deleteProgrammaticAccessAccount(programmaticAccessAccountId: string): Promise<boolean>;
    /**
     * 刷新编程访问账号密钥
     * @param programmaticAccessAccountId 编程访问账号 ID
     * @param programmaticAccessAccountSecret 编程访问账号 Secret
     * @returns Promise<ProgrammaticAccessAccount>
     */
    refreshProgrammaticAccessAccountSecret(programmaticAccessAccountId: string, programmaticAccessAccountSecret?: string): Promise<ProgrammaticAccessAccount>;
    /**
     * 启用编程访问账号
     * @param programmaticAccessAccountId 编程访问账号 ID
     * @returns Promise<ProgrammaticAccessAccount>
     */
    enableProgrammaticAccessAccount(programmaticAccessAccountId: string): Promise<ProgrammaticAccessAccount>;
    /**
     * 禁用编程访问账号
     * @param programmaticAccessAccountId 编程访问账号 ID
     * @returns Promise<ProgrammaticAccessAccount>
     */
    disableProgrammaticAccessAccount(programmaticAccessAccountId: string): Promise<ProgrammaticAccessAccount>;
    /**
     * 权限分组列表
     * @param page 当前页数
     * @param limit 每页显示条数
     * @returns Promise<Resources>
     */
    listNamespaces(page?: number, limit?: number): Promise<Namespaces>;
    /**
     * 删除权限分组
     * @param code 权限分组 Code
     * @returns Promise<boolean>
     */
    deleteNamespace(code: string): Promise<boolean>;
    /**
     * 创建权限分组
     * @param code 权限分组 Code
     * @param name 权限分组名称
     * @param description 权限分组描述
     * @returns Promise<boolean>
     */
    createNamespace(code: string, name: string, description?: string): Promise<Namespace>;
    /**
     * 修改权限分组
     * @param code 权限分组 Code
     * @param name 权限分组名称
     * @param code 权限分组 Code
     * @param description 权限分组描述
     * @returns Promise<boolean>
     */
    updateNamespace(code: string, updates: {
        name?: string;
        code?: string;
        description?: string;
    }): Promise<Namespace>;
}
