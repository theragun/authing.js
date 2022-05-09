"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersManagementClient = void 0;
var graphqlapi_1 = require("../graphqlapi");
var graphql_v2_1 = require("../../types/graphql.v2");
var utils_1 = require("../utils");
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
                    case 3: return [4 /*yield*/, graphqlapi_1.createUser(this.graphqlClient, this.tokenProvider, {
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
                    case 3: return [4 /*yield*/, graphqlapi_1.updateUser(this.graphqlClient, this.tokenProvider, {
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
                            data.customData = utils_1.convertUdvToKeyValuePair(data.customData);
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
                    case 0: return [4 /*yield*/, graphqlapi_1.deleteUser(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, graphqlapi_1.deleteUsers(this.graphqlClient, this.tokenProvider, {
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
                                user.customData = utils_1.convertUdvToKeyValuePair(user.customData);
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
                        return [4 /*yield*/, graphqlapi_1.usersWithCustomData(this.graphqlClient, this.tokenProvider, {
                                page: page,
                                limit: limit,
                                excludeUsersInOrg: excludeUsersInOrg
                            })];
                    case 1:
                        data = (_d.sent()).users;
                        totalCount = data.totalCount, list = data.list;
                        list = list.map(function (user) {
                            // @ts-ignore
                            user.customData = utils_1.convertUdvToKeyValuePair(user.customData);
                            return user;
                        });
                        return [2 /*return*/, {
                                totalCount: totalCount,
                                list: list
                            }];
                    case 2: return [4 /*yield*/, graphqlapi_1.users(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, graphqlapi_1.archivedUsers(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, graphqlapi_1.isUserExists(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, graphqlapi_1.findUserWithCustomData(this.graphqlClient, this.tokenProvider, {
                                username: username,
                                email: email,
                                phone: phone,
                                externalId: externalId
                            })];
                    case 1:
                        user = (_b.sent()).findUser;
                        // @ts-ignore
                        user.customData = utils_1.convertUdvToKeyValuePair(user.customData);
                        return [2 /*return*/, user];
                    case 2: return [4 /*yield*/, graphqlapi_1.findUser(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, graphqlapi_1.searchUser(this.graphqlClient, this.tokenProvider, {
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
                    case 2: return [4 /*yield*/, graphqlapi_1.searchUserWithCustomData(this.graphqlClient, this.tokenProvider, {
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
                            user.customData = utils_1.convertUdvToKeyValuePair(user.customData);
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
                    case 0: return [4 /*yield*/, graphqlapi_1.refreshToken(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, graphqlapi_1.getUserGroups(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, graphqlapi_1.addUserToGroup(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, graphqlapi_1.removeUserFromGroup(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, graphqlapi_1.getUserRoles(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, graphqlapi_1.assignRole(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, graphqlapi_1.revokeRole(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, graphqlapi_1.getUserDepartments(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, graphqlapi_1.listUserAuthorizedResources(this.graphqlClient, this.tokenProvider, {
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
                        list = utils_1.formatAuthorizedResources(list);
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
                    case 0: return [4 /*yield*/, graphqlapi_1.udv(this.graphqlClient, this.tokenProvider, {
                            targetType: graphql_v2_1.UdfTargetType.User,
                            targetId: userId
                        })];
                    case 1:
                        list = (_a.sent()).udv;
                        return [2 /*return*/, utils_1.convertUdvToKeyValuePair(list)];
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
                        return [4 /*yield*/, graphqlapi_1.udfValueBatch(this.graphqlClient, this.tokenProvider, {
                                targetType: graphql_v2_1.UdfTargetType.User,
                                targetIds: userIds
                            })];
                    case 1:
                        result = (_b.sent()).udfValueBatch;
                        ret = {};
                        for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                            _a = result_1[_i], targetId = _a.targetId, data = _a.data;
                            ret[targetId] = utils_1.convertUdvToKeyValuePair(data);
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
                        return [4 /*yield*/, graphqlapi_1.setUdvBatch(this.graphqlClient, this.tokenProvider, {
                                targetType: graphql_v2_1.UdfTargetType.User,
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
                        return [4 /*yield*/, graphqlapi_1.setUdfValueBatch(this.graphqlClient, this.tokenProvider, {
                                targetType: graphql_v2_1.UdfTargetType.User,
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
                    case 0: return [4 /*yield*/, graphqlapi_1.removeUdv(this.graphqlClient, this.tokenProvider, {
                            targetType: graphql_v2_1.UdfTargetType.User,
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
                    case 0: return [4 /*yield*/, graphqlapi_1.sendFirstLoginVerifyEmail(this.graphqlClient, this.tokenProvider, options)];
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
exports.UsersManagementClient = UsersManagementClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnNNYW5hZ2VtZW50Q2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1VzZXJzTWFuYWdlbWVudENsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBLDRDQTRCdUI7QUFDdkIscURBWWdDO0FBSWhDLGtDQUErRTtBQUcvRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNIO0lBUUUsK0JBQ0UsT0FBZ0MsRUFDaEMsYUFBNEIsRUFDNUIsVUFBc0IsRUFDdEIsY0FBOEIsRUFDOUIsYUFBc0MsRUFDdEMsaUJBQW1DO1FBRW5DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUVHO0lBQ0csc0NBQU0sR0FBWixVQUNFLFFBQXlCLEVBQ3pCLE9BWUM7Ozs7Ozt3QkFFSyxLQUlGLE9BQU8sSUFBSSxFQUFFLEVBSGYsb0JBQW9CLEVBQXBCLFlBQVksbUJBQUcsS0FBSyxLQUFBLEVBQ3BCLGlDQUFpQyxFQUFqQyx5QkFBeUIsbUJBQUcsS0FBSyxLQUFBLEVBQ2pDLFFBQVEsY0FBQSxDQUNROzZCQUNkLENBQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFFBQVEsQ0FBQSxFQUFsQix3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