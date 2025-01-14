import { GraphqlClient } from './../common/GraphqlClient';
import { ManagementTokenProvider } from './ManagementTokenProvider';
import { Application, BatchFetchUserTypes, ManagementClientOptions, UserActions } from './types';
import { CreateUserInput, RefreshToken, CommonMessage, UpdateUserInput, PaginatedGroups, PaginatedRoles, PaginatedAuthorizedResources, ResourceType, QuerySearchUserArgs } from '../../types/graphql.v2';
import { FastHttpClient, HttpClient } from '../common/HttpClient';
import { DeepPartial, KeyValuePair, PaginatedUsers } from '../../types/index';
import { PublicKeyManager } from '../common/PublicKeyManager';
import { User } from '../../types/index';
/**
 * @name UsersManagementClient
 * @description Authing 用户管理模块。
 *
 * 此模块可以进行用户目录增删改查、搜索用户、刷新用户 token、管理用户分组、管理用户角色、管理用户策略授权等操作。
 *
 * 该模块发出的所有操作都将以管理员身份进行，所以不需要进行建议短信验证码等操作，如果你希望以普通用户的身份进行操作，请使用 AuthenticationClient 。
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
 *
 * managementClient.users.list // 获取用户列表
 * managementClient.users.create // 创建用户
 * managementClient.users.listRoles // 获取用户角色列表
 * managementClient.users.search // 搜索用户
 * \`\`\`
 *
 * @class UsersManagementClient 管理用户
 */
export declare class UsersManagementClient {
    options: ManagementClientOptions;
    graphqlClient: GraphqlClient;
    httpClient: HttpClient;
    fastHttpClient: FastHttpClient;
    tokenProvider: ManagementTokenProvider;
    publickKeyManager: PublicKeyManager;
    constructor(options: ManagementClientOptions, graphqlClient: GraphqlClient, httpClient: HttpClient, fastHttpClient: FastHttpClient, tokenProvider: ManagementTokenProvider, publickKeyManager: PublicKeyManager);
    /**
     * @name create
     * @name_zh 创建用户
     * @description 此接口将以管理员身份创建用户，不需要进行手机号验证码检验等安全检测。
     *
     * @param {CreateUserInput} userInfo 用户资料
     * @param {string} userInfo.email 邮箱，用户池内唯一
     * @param {boolean} userInfo.emailVerified 邮箱是否已验证
     * @param {string} userInfo.phone 手机号
     * @param {boolean} userInfo.phoneVerified 手机号是否验证
     * @param {string} userInfo.unionid 以社会化登录的用户该字段为用户在第三方社会化登录服务商中的唯一 ID
     * @param {string} userInfo.openid  微信登录返回的 openid
     * @param {string} userInfo.password 密码
     * @param {string} userInfo.registerSource 注册来源，可以多选
     * @param {string} userInfo.username 用户名
     * @param {string} userInfo.nickname 昵称
     * @param {string} userInfo.photo 头像
     * @param {string} userInfo.company 公司
     * @param {string} userInfo.browser 浏览器
     * @param {number} userInfo.loginsCount 登录次数，当你从原有用户系统迁移到 Authing 时可以设置该字段。
     * @param {string} userInfo.lastLogin 上次登录时间, 符合 ISO8601 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
     * @param {string} userInfo.lastIP 用户最近一次登录（或其他活动）的 IP
     * @param {string} userInfo.signedUp 注册时间，符合 ISO8601 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
     * @param {boolean} userInfo.blocked 账号是否被禁用
     * @param {boolean} userInfo.isDeleted 标记账号是否被删除
     * @param {string} userInfo.device 设备
     * @param {string} userInfo.lastIP 最近登录的 IP
     * @param {string} userInfo.name Name
     * @param {string} userInfo.givenName Given Name
     * @param {string} userInfo.familyName Family Name
     * @param {string} userInfo.middleName Middle Name
     * @param {string} userInfo.profile Profile Url
     * @param {string} userInfo.preferredUsername Preferred Name
     * @param {string} userInfo.website 个人网站
     * @param {string} userInfo.gender 性别, F 表示男性、W 表示女性、未知表示 U
     * @param {string} userInfo.birthdate 生日
     * @param {string} userInfo.zoneinfo 时区
     * @param {string} userInfo.locale 语言
     * @param {string} userInfo.address 地址
     * @param {string} userInfo.streetAddress 街道地址
     * @param {string} userInfo.locality
     * @param {string} userInfo.region 地域
     * @param {string} userInfo.postalCode 邮编
     * @param {string} userInfo.city 城市
     * @param {string} userInfo.province 省份
     * @param {string} userInfo.country 国家
     *
     * @example
     *
     * const user = await managementClient.users.create({
     *    username: 'bob',
     *    password: 'passw0rd'
     * })
     *
     * @example
     *
     * const user = await managementClient.users.create({
     *    nickname: 'Nick',
     *    phone: '176xxxx7041', // 由于是管理员操作，所以检验手机号验证码, 如果你需要检验，请使用  AuthenticationClient
     *    loginsCount: 2 // 原有用户系统记录的用户登录次数
     *    signedUp: '2020-10-15T17:55:37+08:00' // 原有用户系统记录的用户注册时间
     * })
     *
     * @returns {Promise<User>}
     * @memberof UsersManagementClient
     */
    create(userInfo: CreateUserInput, options?: {
        keepPassword?: boolean;
        resetPasswordOnFirstLogin?: boolean;
        identity?: {
            provider: string;
            userIdInIdp: string;
            openid?: string;
            isSocial?: boolean;
            connectionId?: string;
            accessToken?: string;
            refreshToken?: string;
        };
    }): Promise<User>;
    /**
     * @name update
     * @name_zh 修改用户资料
     * @description 修改用户资料
     *
     * @param {string} id 用户 ID
     * @param {UpdateUserInput} updates 修改的用户资料
     * @param {string} updates.email 邮箱
     * @param {boolean} updates.emailVerified 邮箱是否已验证
     * @param {string} updates.phone 手机号
     * @param {boolean} updates.phoneVerified 手机号是否验证
     * @param {string} updates.unionid 以社会化登录的用户该字段为用户在第三方社会化登录服务商中的唯一 ID
     * @param {string} updates.openid  微信登录返回的 openid
     * @param {string} updates.password 密码
     * @param {string} updates.registerSource 注册来源，可以多选
     * @param {string} updates.tokenExpiredAt token 过期时间，符合 ISO8601 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")。
     * 将该字段设置为小于当前时间可以让用户的 token 失效。
     * @param {string} updates.username 用户名
     * @param {string} updates.nickname 昵称
     * @param {string} updates.photo 头像
     * @param {string} updates.company 公司
     * @param {string} updates.browser 浏览器
     * @param {number} updates.loginsCount 登录次数，当你从原有用户系统迁移到 Authing 时可以设置该字段。
     * @param {string} updates.lastLogin 上次登录时间, 符合 ISO8601 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
     * @param {string} updates.lastIP 用户最近一次登录（或其他活动）的 IP
     * @param {string} updates.signedUp 注册时间，符合 ISO8601 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
     * @param {boolean} updates.blocked 账号是否被禁用
     * @param {string} updates.device 设备
     * @param {string} updates.lastIP 最近登录的 IP
     * @param {string} updates.name Name
     * @param {string} updates.givenName Given Name
     * @param {string} updates.familyName Family Name
     * @param {string} updates.middleName Middle Name
     * @param {string} updates.profile Profile Url
     * @param {string} updates.preferredUsername Preferred Name
     * @param {string} updates.website 个人网站
     * @param {string} updates.gender 性别, F 表示男性、W 表示女性、未知表示 U
     * @param {string} updates.birthdate 生日
     * @param {string} updates.zoneinfo 时区
     * @param {string} updates.locale 语言
     * @param {string} updates.address 地址
     * @param {string} updates.streetAddress 街道地址
     * @param {string} updates.locality
     * @param {string} updates.region 地域
     * @param {string} updates.postalCode 邮编
     * @param {string} updates.city 城市
     * @param {string} updates.province 省份
     * @param {string} updates.country 国家
     *
     * @example
     *
     * const user = await managementClient.users.update("USERID", {
     *    nickname: "Nick"
     * })
     *
     * @example
     *
     * const user = await managementClient.users.update("USERID" ,{
     *    nickname: 'Nick',
     *    phone: '176xxxx7041', // 由于是管理员操作，所以检验手机号验证码, 如果你需要检验，请使用  AuthenticationClient
     *    tokenExpiredAt: '2020-10-15T17:55:37+08:00'
     * })
     *
     * @returns {Promise<User>}
     * @memberof UsersManagementClient   *
     */
    update(id: string, updates: UpdateUserInput): Promise<User>;
    /**
     * @name detail
     * @name_zh 获取用户详情
     * @description 通过用户 ID 获取用户详情，如果你想通过 token 获取用户详情，请使用 AuthenticationClient SDK 。
     *
     * @param {string} userId 用户 ID
     *
     * @example
     *
     * const user = await managementClient.users.detail('USERID');
     *
     * @returns {Promise<User>}
     * @memberof UsersManagementClient
     */
    detail(userId: string, options?: {
        withCustomData?: boolean;
    }): Promise<User>;
    /**
     * @name delete
     * @name_zh 删除用户
     * @description 删除用户
     *
     * @param {string} userId 用户 ID
     *
     * @example
     *
     * const user = await managementClient.users.delete('USERID');
     *
     * @returns {Promise<CommonMessage>}
     * @memberof UsersManagementClient
     */
    delete(userId: string): Promise<CommonMessage>;
    /**
     * @name deleteMany
     * @name_zh 批量删除用户
     * @description 批量删除用户
     *
     * @param {string[]} userIds 用户 ID 列表
     *
     * @example
     *
     * const user = await managementClient.users.deleteMany(['USERID']);
     *
     * @returns {Promise<CommonMessage>}
     * @memberof UsersManagementClient
     */
    deleteMany(userIds: string[]): Promise<CommonMessage>;
    /**
     * @name batch
     * @name_zh 批量获取用户
     * @description 通过 ID、username、email、phone、email、externalId 批量获取用户详情
     *
     * @param {string[]} identifiers 需要查询的数据列表，如 用户 ID 列表
     * @param {string} [type] 列表类型，可选值为 'id' ,'username' ,'phone' ,'email', 'externalId'，默认为 'id'
     *
     * @example
     *
     * const users = await managementClient.users.batch(['USERID'], options);
     *
     * @returns {Promise<CommonMessage>}
     * @memberof UsersManagementClient
     */
    batch(ids: string[], options?: {
        queryField: BatchFetchUserTypes;
        withCustomData?: boolean;
    }): Promise<User[]>;
    /**
     * @name list
     * @name_zh 获取用户列表
     * @description 获取用户池用户列表
     *
     * @param {number} [page=1] 页码数, 从 1 开始
     * @param {number} [limit=10] 每页包含的用户数
     *
     * @example
     *
     * const user = await managementClient.users.list();
     *
     * @returns
     * @memberof UsersManagementClient
     */
    list(page?: number, limit?: number, options?: {
        withCustomData?: boolean;
        excludeUsersInOrg?: boolean;
    }): Promise<PaginatedUsers>;
    /**
     * @name filter
     * @name_zh 筛选用户列表
     * @description 筛选用户池用户列表
     *
     * @param {number} [page=1] 页码数, 从 1 开始
     * @param {number} [limit=10] 每页包含的用户数
     * @param {[]} [filter=[]] 筛选项
     *
     * @example
     *
     * const user = await managementClient.users.filter();
     *
     * @returns
     * @memberof UsersManagementClient
     */
    filter(options?: {
        page?: number;
        limit?: number;
        filter?: any[];
    }): Promise<PaginatedUsers>;
    /**
     * @name listArchivedUsers
     * @name_zh 获取已归档用户列表
     * @description 获取已归档用户列表
     *
     * @param {number} [page=1] 页码数, 从 1 开始
     * @param {number} [limit=10] 每页包含的用户数
     *
     * @example
     *
     * const user = await managementClient.users.listArchivedUsers();
     *
     * @returns
     * @memberof UsersManagementClient
     */
    listArchivedUsers(page?: number, limit?: number): Promise<PaginatedUsers>;
    /**
     * @name exists
     * @name_zh 检查用户是否存在
     * @description 检查用户是否存在，目前可检测的字段有用户名、邮箱、手机号。
     *
     *
     * @param {Object} options
     * @param {string} [options.username] 用户名，区分大小写。
     * @param {string} [options.email] 邮箱，邮箱不区分大小写。
     * @param {string} [options.phone] 手机号
     *
     * @example
     *
     * const exists = await managementClient.users.exists({
     *    username: "bob"
     * });
     *
     * @returns {Promise<boolean>}
     * @memberof UsersManagementClient
     */
    exists(options: {
        username?: string;
        email?: string;
        phone?: string;
        externalId?: string;
    }): Promise<boolean>;
    /**
     * @name find
     * @name_zh 查找用户
     * @description 通过用户名、邮箱、手机号查找用户
     *
     * @param {Object} options
     * @param {string} [options.username] 用户名，区分大小写。
     * @param {string} [options.email] 邮箱，邮箱不区分大小写。
     * @param {string} [options.phone] 手机号
     * @param {string} [options.externalId] externalId
     *
     * @memberof UsersManagementClient
     */
    find(options: {
        username?: string;
        email?: string;
        phone?: string;
        externalId?: string;
        withCustomData?: boolean;
        identity?: {
            userIdInIdp: string;
            provider: string;
        };
    }): Promise<User>;
    /**
     * @name search
     * @name_zh 搜索用户
     * @description 根据关键字搜索用户
     *
     * @param query 搜索内容
     * @param options 选项
     * @param {string[]} [options.fields] 搜索用户字段，如果不指定，默认会从 username、nickname、email、phone、company、name、givenName、familyName、middleName、profile、preferredUsername 这些字段进行模糊搜索。
     * 如果你需要精确查找，请使用 find 方法。
     * @param {number} [options.page=1]
     * @param {number} [options.limit=10]
     * @param {Object} [options.departmentOpts] 限制条件，用户所在的部门
     * @param {string} [options.departmentOpts.departmentId] 部门 ID
     * @param {string} [options.departmentOpts.includeChildrenDepartments] 是否包含此部门的子部门
     *
     * @example
     *
     * const { totalCount, list } = await managementClient.users.search("Bob");
     *
     * @returns {Promise<PaginatedUsers>}
     * @memberof UsersManagementClient
     */
    search(query: string, options?: {
        fields?: string[];
        page?: number;
        limit?: number;
        departmentOpts?: QuerySearchUserArgs['departmentOpts'];
        groupOpts?: QuerySearchUserArgs['groupOpts'];
        roleOpts?: QuerySearchUserArgs['roleOpts'];
        withCustomData?: boolean;
    }): Promise<PaginatedUsers>;
    /**
     * @name refreshToken
     * @name_zh 刷新用户 token
     * @description 刷新用户 token
     *
     * @param {string} id 用户 ID
     *
     * @example
     *
     * const { token } = await managementClient.users.refreshToken("USERID");
     *
     * // 检测 token 的最新状态，能够获取到该用户对应的 token
     *
     * const data = await managementClient.checkLoginStatus(token, {
     *   fetchUserDetail: true
     * });
     *
     * @returns {Promise<RefreshToken>}
     * @memberof UsersManagementClient
     */
    refreshToken(id: string): Promise<RefreshToken>;
    /**
     * @name listGroups
     * @name_zh 获取用户分组列表
     * @description 获取用户的分组列表
     *
     * @param {string} userId 用户 ID
     *
     * @example
     *
     * const { list, totalCount} = await managementClient.users.listGroups("USERID");
     *
     * @returns {Promise<DeepPartial<PaginatedGroups>>}
     * @memberof UsersManagementClient
     */
    listGroups(userId: string): Promise<DeepPartial<PaginatedGroups>>;
    /**
     * @name addGroup
     * @name_zh 加入分组
     * @description 将用户加入分组
     *
     * @param {string} userId 用户 ID
     * @param {string} group 分组 code
     *
     * @example
     *
     * const { code, message } = await managementClient.users.addGroup("USERID", "GROUP_CODE");
     *
     * @returns {Promise<CommonMessage>}
     * @memberof UsersManagementClient
     */
    addGroup(userId: string, group: string): Promise<CommonMessage>;
    /**
     * @name removeGroup
     * @name_zh 退出分组
     * @description 退出分组
     *
     * @param {string} userId 用户 ID
     * @param {string} group 分组 code
     *
     * @example
     *
     * const { code, message } = await managementClient.users.removeGroup("USERID", "GROUP_CODE");
     *
     * @returns {Promise<CommonMessage>}
     * @memberof UsersManagementClient
     */
    removeGroup(userId: string, group: string): Promise<CommonMessage>;
    /**
     * @name listRoles
     * @name_zh 获取用户角色列表
     * @description 获取用户的角色列表
     *
     * @param {string} userId 用户 ID
     * @param {string} namespace 权限组命名空间
     *
     * @example
     *
     * const { list, totalCount} = await managementClient.users.listRoles("USERID");
     *
     * @returns {Promise<DeepPartial<PaginatedRoles>>}
     * @memberof UsersManagementClient
     */
    listRoles(userId: string, namespace?: string): Promise<DeepPartial<PaginatedRoles>>;
    /**
     * @name addRoles
     * @name_zh 添加角色
     * @description 将用户加入角色
     *
     * @param {string} userId 用户 ID
     * @param {string} roles 角色 code 列表
     * @param {string} namespace 权限组命名空间
     *
     * @example
     *
     * const { code, message } = await managementClient.users.addRoles("USERID", ["ROLEA"]);
     *
     * @returns {Promise<CommonMessage>}
     * @memberof UsersManagementClient
     */
    addRoles(userId: string, roles: string[], namespace?: string): Promise<CommonMessage>;
    /**
     * @name removeRoles
     * @name_zh 移除角色
     * @description 将用户从角色中移除
     *
     * @param {string} userId 用户 ID
     * @param {string} roles 角色 code 列表
     * @param {string} namespace 权限分组 code
     *
     * @example
     *
     * const { code, message } = await managementClient.users.removeRoles("USERID", ["ROLEA"]);
     *
     * @returns {Promise<CommonMessage>}
     * @memberof UsersManagementClient
     */
    removeRoles(userId: string, roles: string[], namespace?: string): Promise<CommonMessage>;
    /**
     * @name listOrg
     * @name_zh 获取用户所在组织机构
     * @description 获取用户所在组织机构，以及他在该组织机构内的的节点路径。
     *
     * @param {string} userId 用户 ID
     *
     * @example
     *
     * const data = await managementClient.users.listOrgs("USERID");
     *
     * @returns {Promise<UserOrgList>}
     *
     * @memberof UsersManagementClient
     */
    listOrgs(userId: string): Promise<any>;
    /**
     * @name listDepartment
     * @name_zh 获取用户所在部门
     * @description 获取用户所在部门列表
     *
     * @param {string} userId 用户 ID
     *
     * @example
     *
     * const data = await managementClient.users.listDepartment("USERID");
     *
     * @returns {Promise<UserDepartmentList>}
     *
     * @memberof UsersManagementClient
     */
    listDepartment(userId: string): Promise<{
        totalCount: number;
        list: {
            isMainDepartment: boolean;
            joinedAt?: string;
            department: {
                id: string;
                orgId?: string;
                name: string;
                nameI18n?: string;
                description?: string;
                descriptionI18n?: string;
                order?: number;
                code?: string;
                root?: boolean;
                depth?: number;
                path: string[];
                codePath: string[];
                namePath: string[];
                createdAt?: string;
                updatedAt?: string;
                children?: string[];
            };
        }[];
    }>;
    /**
     * @description 获取用户被授权的所有资源
     *
     * @param userId
     * @param namespace
     */
    listAuthorizedResources(userId: string, namespace: string, options?: {
        resourceType?: ResourceType;
    }): Promise<PaginatedAuthorizedResources>;
    /**
     * @description 获取某个用户的所有自定义数据
     * @param userId: 用户 ID
     *
     */
    getUdfValue(userId: string): Promise<KeyValuePair>;
    /**
     * @description 批量获取多个用户的自定义数据
     *
     * @param userIds: 用户 ID 列表
     */
    getUdfValueBatch(userIds: string[]): Promise<{
        [x: string]: KeyValuePair;
    }>;
    /**
     * @description 设置某个用户的自定义数据
     *
     * @param userId
     * @param data
     */
    setUdfValue(userId: string, data: KeyValuePair): Promise<{
        key: string;
        dataType: import("../../types/graphql.v2").UdfDataType;
        value: string;
        label?: string;
    }[]>;
    /**
     * @description 批量设置自定义数据
     *
     */
    setUdfValueBatch(input: {
        userId: string;
        data: KeyValuePair;
    }[]): Promise<void>;
    /**
     * @description 清除用户的自定义数据
     *
     */
    removeUdfValue(userId: string, key: string): Promise<void>;
    /**
     * 判断用户是否有某个角色
     * @param userId 用户 ID
     * @param roleCode 角色 Code
     * @param namespace 权限分组 ID
     */
    hasRole(userId: string, roleCode: string, namespace?: string): Promise<boolean>;
    /**
     * @description 强制一批用户下线
     */
    kick(userIds: string[]): Promise<{
        code: number;
        message: string;
    }>;
    logout(options: {
        appId?: string;
        userId: string;
    }): Promise<{
        code: number;
        message: string;
    }>;
    /**
     * @description 查询用户的登录状态
     */
    checkLoginStatus(userId: string, appId?: string, deviceId?: string): Promise<{
        isLogin: boolean;
        user?: User;
        application?: Array<Application>;
    }>;
    /**
     * 审计日志列表
     * @param options.page 当前页数
     * @param options.limit 每页显示条数
     * @param options.clientIp 客户端 IP 地址
     * @param options.operationName 操作类型
     * @param options.operatoArn 用户 Arn 通过 searchUser 方法获得
     * @returns Promise<UserActions>
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
    }): Promise<UserActions>;
    /**
     * @description 发送首次登录验证邮件
     *
     */
    sendFirstLoginVerifyEmail(options: {
        appId: string;
        userId: string;
    }): Promise<boolean>;
    /**
     * @description 获取用户所在租户
     *
     */
    getUserTenants(userId: string): Promise<any>;
    /**
     * @description 给用户绑定一个身份
     *
     */
    linkIdentity(options: {
        userId: string;
        userIdInIdp: string;
        isSocial: boolean;
        type?: string;
        identifier: string;
    }): Promise<any>;
    /**
     * @description 解除用户某个身份源下的所有身份
     *
     */
    unlinkIdentity(options: {
        userId: string;
        isSocial: boolean;
        type?: string;
        identifier: string;
    }): Promise<any>;
    /**
     * @name getApplicationLoginUserNum
     * @name_zh 查询登录过某个应用的用户数量
     * @description 查询登录过某个应用的用户数量
     *
     * @param {string} [appId] 应用 ID
     *
     * @example
     *
     * const user = await managementClient.users.getApplicationLoginUserNum();
     */
    getApplicationLoginUserNum(options: {
        appId: string;
    }): Promise<any>;
    /**
     * @name getUdfFieldUserNum
     * @name_zh 查询应用下使用了某个用户自定义字段的用户数量
     * @description 查询使用了某个用户自定义字段的登录过某个应用的用户数量
     *
     * @param {string} [definedFieldKey] 用户自定义字段
     * @param {string} [appId] 应用 ID
     *
     * @example
     *
     * const user = await managementClient.users.getUdfFieldUserNum();
     */
    getUdfFieldUserNum(options: {
        definedFieldKey: string;
        appId: string;
    }): Promise<any>;
}
