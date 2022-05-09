var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { deleteUser, deleteUsers, users, getUserGroups, updateUser, searchUser, createUser, refreshToken, getUserRoles, assignRole, revokeRole, isUserExists, addUserToGroup, removeUserFromGroup, archivedUsers, findUser, getUserDepartments, listUserAuthorizedResources, udv, udfValueBatch, setUdvBatch, removeUdv, setUdfValueBatch, usersWithCustomData, findUserWithCustomData, searchUserWithCustomData, sendFirstLoginVerifyEmail } from '../graphqlapi';
import { UdfTargetType } from '../../types/graphql.v2';
import { convertUdvToKeyValuePair, formatAuthorizedResources } from '../utils';
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
var UsersManagementClient = /** @class */ (function () {
    function UsersManagementClient(options, graphqlClient, httpClient, fastHttpClient, tokenProvider, publickKeyManager) {
        this.options = options;
        this.graphqlClient = graphqlClient;
        this.tokenProvider = tokenProvider;
        this.httpClient = httpClient;
        this.fastHttpClient = fastHttpClient;
        this.publickKeyManager = publickKeyManager;
    }
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
    UsersManagementClient.prototype.create = function (userInfo, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, keepPassword, _c, resetPasswordOnFirstLogin, identity, _d, _e, _f, _g, user;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _a = options || {}, _b = _a.keepPassword, keepPassword = _b === void 0 ? false : _b, _c = _a.resetPasswordOnFirstLogin, resetPasswordOnFirstLogin = _c === void 0 ? false : _c, identity = _a.identity;
                        if (!(userInfo === null || userInfo === void 0 ? void 0 : userInfo.password)) return [3 /*break*/, 3];
                        _d = userInfo;
                        _f = (_e = this.options).encryptFunction;
                        _g = [userInfo.password];
                        return [4 /*yield*/, this.publickKeyManager.getPublicKey()];
                    case 1: return [4 /*yield*/, _f.apply(_e, _g.concat([_h.sent(), this.options.encryption]))];
                    case 2:
                        _d.password = _h.sent();
                        _h.label = 3;
                    case 3: return [4 /*yield*/, createUser(this.graphqlClient, this.tokenProvider, {
                            userInfo: userInfo,
                            keepPassword: keepPassword,
                            resetPasswordOnFirstLogin: resetPasswordOnFirstLogin,
                            identity: identity
                        })];
                    case 4:
                        user = (_h.sent()).createUser;
                        return [2 /*return*/, user];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.update = function (id, updates) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, user;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(updates && updates.password)) return [3 /*break*/, 3];
                        _a = updates;
                        _c = (_b = this.options).encryptFunction;
                        _d = [updates.password];
                        return [4 /*yield*/, this.publickKeyManager.getPublicKey()];
                    case 1: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent(), this.options.encryption]))];
                    case 2:
                        _a.password = _e.sent();
                        _e.label = 3;
                    case 3: return [4 /*yield*/, updateUser(this.graphqlClient, this.tokenProvider, {
                            id: id,
                            input: updates
                        })];
                    case 4:
                        user = (_e.sent()).updateUser;
                        return [2 /*return*/, user];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.detail = function (userId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, withCustomData, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = (options || {}).withCustomData, withCustomData = _a === void 0 ? false : _a;
                        return [4 /*yield*/, this.httpClient.request({
                                url: this.options.host + "/api/v2/users/" + userId,
                                params: { with_custom_data: withCustomData },
                                method: 'GET'
                            })];
                    case 1:
                        data = _b.sent();
                        if (withCustomData && data) {
                            // @ts-ignore
                            data.customData = convertUdvToKeyValuePair(data.customData);
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.delete = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, deleteUser(this.graphqlClient, this.tokenProvider, {
                            id: userId
                        })];
                    case 1:
                        data = (_a.sent()).deleteUser;
                        return [2 /*return*/, data];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.deleteMany = function (userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, deleteUsers(this.graphqlClient, this.tokenProvider, {
                            ids: userIds
                        })];
                    case 1:
                        data = (_a.sent()).deleteUsers;
                        return [2 /*return*/, data];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.batch = function (ids, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, queryField, _c, withCustomData, users;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options || {}, _b = _a.queryField, queryField = _b === void 0 ? 'id' : _b, _c = _a.withCustomData, withCustomData = _c === void 0 ? false : _c;
                        return [4 /*yield*/, this.httpClient.request({
                                url: this.options.host + "/api/v2/users/batch",
                                method: 'POST',
                                data: {
                                    ids: ids,
                                    type: queryField,
                                    withCustomData: withCustomData
                                }
                            })];
                    case 1:
                        users = _d.sent();
                        if (withCustomData) {
                            users.map(function (user) {
                                // @ts-ignore
                                user.customData = convertUdvToKeyValuePair(user.customData);
                                return user;
                            });
                            return [2 /*return*/, users];
                        }
                        return [2 /*return*/, users];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.list = function (page, limit, options) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, withCustomData, _c, excludeUsersInOrg, data, totalCount, list, data;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options || {}, _b = _a.withCustomData, withCustomData = _b === void 0 ? false : _b, _c = _a.excludeUsersInOrg, excludeUsersInOrg = _c === void 0 ? false : _c;
                        if (!withCustomData) return [3 /*break*/, 2];
                        return [4 /*yield*/, usersWithCustomData(this.graphqlClient, this.tokenProvider, {
                                page: page,
                                limit: limit,
                                excludeUsersInOrg: excludeUsersInOrg
                            })];
                    case 1:
                        data = (_d.sent()).users;
                        totalCount = data.totalCount, list = data.list;
                        list = list.map(function (user) {
                            // @ts-ignore
                            user.customData = convertUdvToKeyValuePair(user.customData);
                            return user;
                        });
                        return [2 /*return*/, {
                                totalCount: totalCount,
                                list: list
                            }];
                    case 2: return [4 /*yield*/, users(this.graphqlClient, this.tokenProvider, {
                            page: page,
                            limit: limit,
                            excludeUsersInOrg: excludeUsersInOrg
                        })];
                    case 3:
                        data = (_d.sent()).users;
                        return [2 /*return*/, data];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.filter = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            method: 'POST',
                            url: this.options.host + "/api/v2/users/filter",
                            data: options
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.listArchivedUsers = function (page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, archivedUsers(this.graphqlClient, this.tokenProvider, {
                            page: page,
                            limit: limit
                        })];
                    case 1:
                        data = (_a.sent()).archivedUsers;
                        return [2 /*return*/, data];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.exists = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var username, email, phone, externalId, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = options.username, email = options.email, phone = options.phone, externalId = options.externalId;
                        return [4 /*yield*/, isUserExists(this.graphqlClient, this.tokenProvider, {
                                username: username,
                                email: email,
                                phone: phone,
                                externalId: externalId
                            })];
                    case 1:
                        data = (_a.sent()).isUserExists;
                        return [2 /*return*/, data];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.find = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var username, email, phone, externalId, _a, withCustomData, identity, user, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        username = options.username, email = options.email, phone = options.phone, externalId = options.externalId, _a = options.withCustomData, withCustomData = _a === void 0 ? false : _a, identity = options.identity;
                        if (!withCustomData) return [3 /*break*/, 2];
                        return [4 /*yield*/, findUserWithCustomData(this.graphqlClient, this.tokenProvider, {
                                username: username,
                                email: email,
                                phone: phone,
                                externalId: externalId
                            })];
                    case 1:
                        user = (_b.sent()).findUser;
                        // @ts-ignore
                        user.customData = convertUdvToKeyValuePair(user.customData);
                        return [2 /*return*/, user];
                    case 2: return [4 /*yield*/, findUser(this.graphqlClient, this.tokenProvider, {
                            username: username,
                            email: email,
                            phone: phone,
                            externalId: externalId,
                            identity: identity
                        })];
                    case 3:
                        user = (_b.sent()).findUser;
                        return [2 /*return*/, user];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.search = function (query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var fields, _a, page, _b, limit, departmentOpts, groupOpts, roleOpts, _c, withCustomData, data, data, totalCount, list;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        options = options || {};
                        fields = options.fields, _a = options.page, page = _a === void 0 ? 1 : _a, _b = options.limit, limit = _b === void 0 ? 10 : _b, departmentOpts = options.departmentOpts, groupOpts = options.groupOpts, roleOpts = options.roleOpts, _c = options.withCustomData, withCustomData = _c === void 0 ? false : _c;
                        if (!!withCustomData) return [3 /*break*/, 2];
                        return [4 /*yield*/, searchUser(this.graphqlClient, this.tokenProvider, {
                                query: query,
                                fields: fields,
                                page: page,
                                limit: limit,
                                departmentOpts: departmentOpts,
                                groupOpts: groupOpts,
                                roleOpts: roleOpts
                            })];
                    case 1:
                        data = (_d.sent()).searchUser;
                        return [2 /*return*/, data];
                    case 2: return [4 /*yield*/, searchUserWithCustomData(this.graphqlClient, this.tokenProvider, {
                            query: query,
                            fields: fields,
                            page: page,
                            limit: limit,
                            departmentOpts: departmentOpts,
                            groupOpts: groupOpts,
                            roleOpts: roleOpts
                        })];
                    case 3:
                        data = (_d.sent()).searchUser;
                        totalCount = data.totalCount, list = data.list;
                        list = list.map(function (user) {
                            // @ts-ignore
                            user.customData = convertUdvToKeyValuePair(user.customData);
                            return user;
                        });
                        return [2 /*return*/, {
                                totalCount: totalCount,
                                list: list
                            }];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.refreshToken = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, refreshToken(this.graphqlClient, this.tokenProvider, {
                            id: id
                        })];
                    case 1:
                        data = (_a.sent()).refreshToken;
                        return [2 /*return*/, data];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.listGroups = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getUserGroups(this.graphqlClient, this.tokenProvider, {
                            id: userId
                        })];
                    case 1:
                        user = (_a.sent()).user;
                        return [2 /*return*/, user.groups];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.addGroup = function (userId, group) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, addUserToGroup(this.graphqlClient, this.tokenProvider, {
                            userIds: [userId],
                            code: group
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.addUserToGroup];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.removeGroup = function (userId, group) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, removeUserFromGroup(this.graphqlClient, this.tokenProvider, {
                            code: group,
                            userIds: [userId]
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.removeUserFromGroup];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.listRoles = function (userId, namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getUserRoles(this.graphqlClient, this.tokenProvider, {
                            id: userId,
                            namespace: namespace
                        })];
                    case 1:
                        user = (_a.sent()).user;
                        if (!user) {
                            throw new Error('用户不存在！');
                        }
                        return [2 /*return*/, user.roles];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.addRoles = function (userId, roles, namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, assignRole(this.graphqlClient, this.tokenProvider, {
                            roleCodes: roles,
                            userIds: [userId],
                            namespace: namespace
                        })];
                    case 1:
                        data = (_a.sent()).assignRole;
                        return [2 /*return*/, data];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.removeRoles = function (userId, roles, namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, revokeRole(this.graphqlClient, this.tokenProvider, {
                            roleCodes: roles,
                            userIds: [userId],
                            namespace: namespace
                        })];
                    case 1:
                        data = (_a.sent()).revokeRole;
                        return [2 /*return*/, data];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.listOrgs = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            method: 'GET',
                            url: this.options.host + "/api/v2/users/" + userId + "/orgs"
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.listDepartment = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var departments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getUserDepartments(this.graphqlClient, this.tokenProvider, {
                            id: userId
                        })];
                    case 1:
                        departments = (_a.sent()).user.departments;
                        return [2 /*return*/, departments];
                }
            });
        });
    };
    /**
     * @description 获取用户被授权的所有资源
     *
     * @param userId
     * @param namespace
     */
    UsersManagementClient.prototype.listAuthorizedResources = function (userId, namespace, options) {
        return __awaiter(this, void 0, void 0, function () {
            var resourceType, user, _a, list, totalCount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        resourceType = (options || {}).resourceType;
                        return [4 /*yield*/, listUserAuthorizedResources(this.graphqlClient, this.tokenProvider, {
                                id: userId,
                                namespace: namespace,
                                resourceType: resourceType
                            })];
                    case 1:
                        user = (_b.sent()).user;
                        if (!user) {
                            throw new Error('用户不存在');
                        }
                        _a = user.authorizedResources, list = _a.list, totalCount = _a.totalCount;
                        list = formatAuthorizedResources(list);
                        return [2 /*return*/, {
                                list: list,
                                totalCount: totalCount
                            }];
                }
            });
        });
    };
    /**
     * @description 获取某个用户的所有自定义数据
     * @param userId: 用户 ID
     *
     */
    UsersManagementClient.prototype.getUdfValue = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, udv(this.graphqlClient, this.tokenProvider, {
                            targetType: UdfTargetType.User,
                            targetId: userId
                        })];
                    case 1:
                        list = (_a.sent()).udv;
                        return [2 /*return*/, convertUdvToKeyValuePair(list)];
                }
            });
        });
    };
    /**
     * @description 批量获取多个用户的自定义数据
     *
     * @param userIds: 用户 ID 列表
     */
    UsersManagementClient.prototype.getUdfValueBatch = function (userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var result, ret, _i, result_1, _a, targetId, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (userIds.length === 0) {
                            throw new Error('empty user id list');
                        }
                        return [4 /*yield*/, udfValueBatch(this.graphqlClient, this.tokenProvider, {
                                targetType: UdfTargetType.User,
                                targetIds: userIds
                            })];
                    case 1:
                        result = (_b.sent()).udfValueBatch;
                        ret = {};
                        for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                            _a = result_1[_i], targetId = _a.targetId, data = _a.data;
                            ret[targetId] = convertUdvToKeyValuePair(data);
                        }
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /**
     * @description 设置某个用户的自定义数据
     *
     * @param userId
     * @param data
     */
    UsersManagementClient.prototype.setUdfValue = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Object.keys(data).length === 0) {
                            throw new Error('empty udf value list');
                        }
                        return [4 /*yield*/, setUdvBatch(this.graphqlClient, this.tokenProvider, {
                                targetType: UdfTargetType.User,
                                targetId: userId,
                                udvList: Object.keys(data).map(function (key) { return ({
                                    key: key,
                                    value: JSON.stringify(data[key])
                                }); })
                            })];
                    case 1:
                        result = (_a.sent()).setUdvBatch;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * @description 批量设置自定义数据
     *
     */
    UsersManagementClient.prototype.setUdfValueBatch = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (input.length === 0) {
                            throw new Error('empty input list');
                        }
                        params = [];
                        input.forEach(function (_a) {
                            var userId = _a.userId, data = _a.data;
                            for (var _i = 0, _b = Object.keys(data); _i < _b.length; _i++) {
                                var key = _b[_i];
                                params.push({
                                    targetId: userId,
                                    key: key,
                                    value: JSON.stringify(data[key])
                                });
                            }
                        });
                        return [4 /*yield*/, setUdfValueBatch(this.graphqlClient, this.tokenProvider, {
                                targetType: UdfTargetType.User,
                                input: params
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description 清除用户的自定义数据
     *
     */
    UsersManagementClient.prototype.removeUdfValue = function (userId, key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, removeUdv(this.graphqlClient, this.tokenProvider, {
                            targetType: UdfTargetType.User,
                            targetId: userId,
                            key: key
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 判断用户是否有某个角色
     * @param userId 用户 ID
     * @param roleCode 角色 Code
     * @param namespace 权限分组 ID
     */
    UsersManagementClient.prototype.hasRole = function (userId, roleCode, namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var roleList, hasRole;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.listRoles(userId, namespace)];
                    case 1:
                        roleList = _a.sent();
                        if (roleList.totalCount < 1) {
                            return [2 /*return*/, false];
                        }
                        hasRole = false;
                        roleList.list.forEach(function (item) {
                            if (item.code === roleCode) {
                                hasRole = true;
                            }
                        });
                        return [2 /*return*/, hasRole];
                }
            });
        });
    };
    /**
     * @description 强制一批用户下线
     */
    UsersManagementClient.prototype.kick = function (userIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            url: this.options.host + "/api/v2/users/kick",
                            method: 'POST',
                            data: {
                                userIds: userIds
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { code: 200, message: '强制下线成功' }];
                }
            });
        });
    };
    UsersManagementClient.prototype.logout = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options || !options.userId) {
                            throw new Error('请传入 options.userId，内容为要下线的用户 ID');
                        }
                        return [4 /*yield*/, this.httpClient.request({
                                url: this.options.host + "/logout",
                                method: 'GET',
                                params: {
                                    appId: options.appId,
                                    userId: options.userId
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { code: 200, message: '强制下线成功' }];
                }
            });
        });
    };
    /**
     * @description 查询用户的登录状态
     */
    UsersManagementClient.prototype.checkLoginStatus = function (userId, appId, deviceId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            method: 'GET',
                            url: this.options.host + "/api/v2/users/login-status",
                            params: {
                                userId: userId,
                                appId: appId,
                                deviceId: deviceId
                            }
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 审计日志列表
     * @param options.page 当前页数
     * @param options.limit 每页显示条数
     * @param options.clientIp 客户端 IP 地址
     * @param options.operationName 操作类型
     * @param options.operatoArn 用户 Arn 通过 searchUser 方法获得
     * @returns Promise<UserActions>
     */
    UsersManagementClient.prototype.listUserActions = function (options) {
        var _a;
        if (options === void 0) { options = {
            page: 1,
            limit: 10
        }; }
        return __awaiter(this, void 0, void 0, function () {
            var requestParam, result, list, totalCount;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requestParam = {};
                        if (options === null || options === void 0 ? void 0 : options.clientIp) {
                            requestParam.clientip = options.clientIp;
                        }
                        if (options === null || options === void 0 ? void 0 : options.operationNames) {
                            requestParam.operation_name = options.operationNames;
                        }
                        if ((_a = options === null || options === void 0 ? void 0 : options.userIds) === null || _a === void 0 ? void 0 : _a.length) {
                            requestParam.operator_arn = options.userIds.map(function (userId) {
                                return "arn:cn:authing:" + _this.options.userPoolId + ":user:" + userId;
                            });
                        }
                        if (options === null || options === void 0 ? void 0 : options.page) {
                            requestParam.page = options.page;
                        }
                        if (options === null || options === void 0 ? void 0 : options.limit) {
                            requestParam.limit = options.limit;
                        }
                        if (options === null || options === void 0 ? void 0 : options.excludeNonAppRecords) {
                            requestParam.exclude_non_app_records = '1';
                        }
                        if (options === null || options === void 0 ? void 0 : options.appIds) {
                            requestParam.app_id = options === null || options === void 0 ? void 0 : options.appIds;
                        }
                        if ((options === null || options === void 0 ? void 0 : options.start) !== undefined) {
                            requestParam.start = options === null || options === void 0 ? void 0 : options.start;
                        }
                        if ((options === null || options === void 0 ? void 0 : options.end) !== undefined) {
                            requestParam.end = options === null || options === void 0 ? void 0 : options.end;
                        }
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/analysis/user-action",
                                params: __assign({}, requestParam)
                            })];
                    case 1:
                        result = _b.sent();
                        list = result.list, totalCount = result.totalCount;
                        return [2 /*return*/, {
                                list: list.map(function (log) {
                                    var _a, _b, _c, _d, _e, _f;
                                    return {
                                        userpoolId: log.userpool_id,
                                        userId: (_a = log.user) === null || _a === void 0 ? void 0 : _a.id,
                                        username: (_b = log.user) === null || _b === void 0 ? void 0 : _b.displayName,
                                        cityName: (_c = log.geoip) === null || _c === void 0 ? void 0 : _c.city_name,
                                        regionName: (_d = log.geoip) === null || _d === void 0 ? void 0 : _d.region_name,
                                        clientIp: (_e = log.geoip) === null || _e === void 0 ? void 0 : _e.ip,
                                        operationDesc: log.operation_desc,
                                        operationName: log.operation_name,
                                        timestamp: log.timestamp,
                                        appId: log.app_id,
                                        appName: (_f = log.app) === null || _f === void 0 ? void 0 : _f.name
                                    };
                                }),
                                totalCount: totalCount
                            }];
                }
            });
        });
    };
    /**
     * @description 发送首次登录验证邮件
     *
     */
    UsersManagementClient.prototype.sendFirstLoginVerifyEmail = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sendFirstLoginVerifyEmail(this.graphqlClient, this.tokenProvider, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * @description 获取用户所在租户
     *
     */
    UsersManagementClient.prototype.getUserTenants = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            method: 'GET',
                            url: this.options.host + "/api/v2/users/" + userId + "/tenants"
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * @description 给用户绑定一个身份
     *
     */
    UsersManagementClient.prototype.linkIdentity = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fastHttpClient.request({
                            method: 'POST',
                            url: this.options.host + "/api/v2/users/identity/link",
                            data: __assign({}, options)
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * @description 解除用户某个身份源下的所有身份
     *
     */
    UsersManagementClient.prototype.unlinkIdentity = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fastHttpClient.request({
                            method: 'POST',
                            url: this.options.host + "/api/v2/users/identity/unlink",
                            data: __assign({}, options)
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.getApplicationLoginUserNum = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            method: 'GET',
                            url: this.options.host + "/api/v2/analysis/total-login-count",
                            params: { appId: options.appId }
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
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
    UsersManagementClient.prototype.getUdfFieldUserNum = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            method: 'GET',
                            url: this.options.host + "/api/v2/analysis/exist-defined-field-count",
                            params: {
                                definedFieldKey: options.definedFieldKey,
                                appId: options.appId
                            }
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return UsersManagementClient;
}());
export { UsersManagementClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnNNYW5hZ2VtZW50Q2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1VzZXJzTWFuYWdlbWVudENsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFDTCxVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxhQUFhLEVBQ2IsVUFBVSxFQUNWLFVBQVUsRUFDVixVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsVUFBVSxFQUNWLFlBQVksRUFDWixjQUFjLEVBQ2QsbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixRQUFRLEVBQ1Isa0JBQWtCLEVBQ2xCLDJCQUEyQixFQUMzQixHQUFHLEVBQ0gsYUFBYSxFQUNiLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLG1CQUFtQixFQUNuQixzQkFBc0IsRUFDdEIsd0JBQXdCLEVBQ3hCLHlCQUF5QixFQUMxQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBUUwsYUFBYSxFQUlkLE1BQU0sd0JBQXdCLENBQUM7QUFJaEMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRy9FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0g7SUFRRSwrQkFDRSxPQUFnQyxFQUNoQyxhQUE0QixFQUM1QixVQUFzQixFQUN0QixjQUE4QixFQUM5QixhQUFzQyxFQUN0QyxpQkFBbUM7UUFFbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxD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