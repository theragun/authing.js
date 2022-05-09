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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../graphqlapi", "../../types/graphql.v2", "../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnNNYW5hZ2VtZW50Q2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1VzZXJzTWFuYWdlbWVudENsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVFBLDRDQTRCdUI7SUFDdkIscURBWWdDO0lBSWhDLGtDQUErRTtJQUcvRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNIO1FBUUUsK0JBQ0UsT0FBZ0MsRUFDaEMsYUFBNEIsRUFDNUIsVUFBc0IsRUFDdEIsY0FBOEIsRUFDOUIsYUFBc0MsRUFDdEMsaUJBQW1DO1lBRW5DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUM3QyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBaUVHO1FBQ0csc0NBQU0sR0FBWixVQUNFLFFBQXlCLEVBQ3pCLE9BWUM7Ozs7Ozs0QkFFSyxLQUlGLE9BQU8sSUFBSSxFQUFFLEVBSGYsb0JBQW9CLEVBQXBCLFlBQVksbUJBQUcsS0FBSyxLQUFBLEVBQ3BCLGlDQUFpQyxFQUFqQyx5QkFBeUIsbUJBQUcsS0FBSyxLQUFBLEVBQ2pDLFFBQVEsY0FBQSxDQUNRO2lDQUNkLENBQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFFBQVEsQ0FBQSxFQUFsQix3QkFBa0I7NEJBQ3BCLEtBQUEsUUFBUSxDQUFBOzRCQUFrQixLQUFBLENBQUEsS0FBQSxJQUFJLENBQUMsT0FBTyxDQUFBLENBQUMsZUFBZSxDQUFBO2tDQUNwRCxRQUFRLENBQUMsUUFBUTs0QkFDakIscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxFQUFBO2dDQUZ6QixxQkFBTSx3QkFFeEIsU0FBMkMsRUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQ3hCLEVBQUE7OzRCQUpELEdBQVMsUUFBUSxHQUFHLFNBSW5CLENBQUM7O2dDQUV5QixxQkFBTSx1QkFBVSxDQUMzQyxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtnQ0FDRSxRQUFRLFVBQUE7Z0NBQ1IsWUFBWSxjQUFBO2dDQUNaLHlCQUF5QiwyQkFBQTtnQ0FDekIsUUFBUSxVQUFBOzZCQUNULENBQ0YsRUFBQTs7NEJBVG1CLElBQUksR0FBSyxDQUFBLFNBUzVCLENBQUEsV0FUdUI7NEJBVXhCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBaUVHO1FBQ0csc0NBQU0sR0FBWixVQUFhLEVBQVUsRUFBRSxPQUF3Qjs7Ozs7O2lDQUMzQyxDQUFBLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFBLEVBQTNCLHdCQUEyQjs0QkFDN0IsS0FBQSxPQUFPLENBQUE7NEJBQWtCLEtBQUEsQ0FBQSxLQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxlQUFlLENBQUE7a0NBQ25ELE9BQU8sQ0FBQyxRQUFROzRCQUNoQixxQkFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLEVBQUE7Z0NBRjFCLHFCQUFNLHdCQUV2QixTQUEyQyxFQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FDeEIsRUFBQTs7NEJBSkQsR0FBUSxRQUFRLEdBQUcsU0FJbEIsQ0FBQzs7Z0NBRXlCLHFCQUFNLHVCQUFVLENBQzNDLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO2dDQUNFLEVBQUUsSUFBQTtnQ0FDRixLQUFLLEVBQUUsT0FBTzs2QkFDZixDQUNGLEVBQUE7OzRCQVBtQixJQUFJLEdBQUssQ0FBQSxTQU81QixDQUFBLFdBUHVCOzRCQVF4QixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVEOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDRyxzQ0FBTSxHQUFaLFVBQ0UsTUFBYyxFQUNkLE9BRUM7Ozs7Ozs0QkFFTyxLQUEyQixDQUFBLE9BQU8sSUFBSSxFQUFFLENBQUEsZUFBbEIsRUFBdEIsY0FBYyxtQkFBRyxLQUFLLEtBQUEsQ0FBbUI7NEJBQ3BDLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO29DQUN6QyxHQUFHLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHNCQUFpQixNQUFRO29DQUNsRCxNQUFNLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUU7b0NBQzVDLE1BQU0sRUFBRSxLQUFLO2lDQUNkLENBQUMsRUFBQTs7NEJBSkksSUFBSSxHQUFHLFNBSVg7NEJBQ0YsSUFBSSxjQUFjLElBQUksSUFBSSxFQUFFO2dDQUMxQixhQUFhO2dDQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0NBQXdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dDQUM1RCxzQkFBTyxJQUFJLEVBQUM7NkJBQ2I7NEJBQ0Qsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0csc0NBQU0sR0FBWixVQUFhLE1BQWM7Ozs7O2dDQUNJLHFCQUFNLHVCQUFVLENBQzNDLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO2dDQUNFLEVBQUUsRUFBRSxNQUFNOzZCQUNYLENBQ0YsRUFBQTs7NEJBTm1CLElBQUksR0FBSyxDQUFBLFNBTTVCLENBQUEsV0FOdUI7NEJBT3hCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNHLDBDQUFVLEdBQWhCLFVBQWlCLE9BQWlCOzs7OztnQ0FDRixxQkFBTSx3QkFBVyxDQUM3QyxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtnQ0FDRSxHQUFHLEVBQUUsT0FBTzs2QkFDYixDQUNGLEVBQUE7OzRCQU5vQixJQUFJLEdBQUssQ0FBQSxTQU03QixDQUFBLFlBTndCOzRCQU96QixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0cscUNBQUssR0FBWCxVQUNFLEdBQWEsRUFDYixPQUdDOzs7Ozs7NEJBRUssS0FBZ0QsT0FBTyxJQUFJLEVBQUUsRUFBM0Qsa0JBQWlCLEVBQWpCLFVBQVUsbUJBQUcsSUFBSSxLQUFBLEVBQUUsc0JBQXNCLEVBQXRCLGNBQWMsbUJBQUcsS0FBSyxLQUFBLENBQW1COzRCQUM5QyxxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztvQ0FDbEQsR0FBRyxFQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSx3QkFBcUI7b0NBQzlDLE1BQU0sRUFBRSxNQUFNO29DQUNkLElBQUksRUFBRTt3Q0FDSixHQUFHLEtBQUE7d0NBQ0gsSUFBSSxFQUFFLFVBQVU7d0NBQ2hCLGNBQWMsZ0JBQUE7cUNBQ2Y7aUNBQ0YsQ0FBQyxFQUFBOzs0QkFSSSxLQUFLLEdBQVcsU0FRcEI7NEJBQ0YsSUFBSSxjQUFjLEVBQUU7Z0NBQ2xCLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO29DQUNaLGFBQWE7b0NBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQ0FBd0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0NBQzVELE9BQU8sSUFBSSxDQUFDO2dDQUNkLENBQUMsQ0FBQyxDQUFDO2dDQUNILHNCQUFPLEtBQUssRUFBQzs2QkFDZDs0QkFDRCxzQkFBTyxLQUFLLEVBQUM7Ozs7U0FDZDtRQUVEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0csb0NBQUksR0FBVixVQUNFLElBQWdCLEVBQ2hCLEtBQWtCLEVBQ2xCLE9BR0M7WUFMRCxxQkFBQSxFQUFBLFFBQWdCO1lBQ2hCLHNCQUFBLEVBQUEsVUFBa0I7Ozs7Ozs0QkFNWixLQUF3RCxPQUFPLElBQUksRUFBRSxFQUFuRSxzQkFBc0IsRUFBdEIsY0FBYyxtQkFBRyxLQUFLLEtBQUEsRUFBRSx5QkFBeUIsRUFBekIsaUJBQWlCLG1CQUFHLEtBQUssS0FBQSxDQUFtQjtpQ0FDeEUsY0FBYyxFQUFkLHdCQUFjOzRCQUNRLHFCQUFNLGdDQUFtQixDQUMvQyxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtvQ0FDRSxJQUFJLE1BQUE7b0NBQ0osS0FBSyxPQUFBO29DQUNMLGlCQUFpQixtQkFBQTtpQ0FDbEIsQ0FDRixFQUFBOzs0QkFSYyxJQUFJLEdBQUssQ0FBQSxTQVF2QixDQUFBLE1BUmtCOzRCQVNiLFVBQVUsR0FBVyxJQUFJLFdBQWYsRUFBRSxJQUFJLEdBQUssSUFBSSxLQUFULENBQVU7NEJBQ2hDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtnQ0FDbEIsYUFBYTtnQ0FDYixJQUFJLENBQUMsVUFBVSxHQUFHLGdDQUF3QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQ0FDNUQsT0FBTyxJQUFJLENBQUM7NEJBQ2QsQ0FBQyxDQUFDLENBQUM7NEJBQ0gsc0JBQU87b0NBQ0wsVUFBVSxZQUFBO29DQUNWLElBQUksTUFBQTtpQ0FDTCxFQUFDO2dDQUVzQixxQkFBTSxrQkFBSyxDQUNqQyxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtnQ0FDRSxJQUFJLE1BQUE7Z0NBQ0osS0FBSyxPQUFBO2dDQUNMLGlCQUFpQixtQkFBQTs2QkFDbEIsQ0FDRixFQUFBOzs0QkFSYyxJQUFJLEdBQUssQ0FBQSxTQVF2QixDQUFBLE1BUmtCOzRCQVNuQixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FFZjtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7V0FlRztRQUNHLHNDQUFNLEdBQVosVUFDRSxPQUlDOzs7OztnQ0FFWSxxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQ0FDekMsTUFBTSxFQUFFLE1BQU07Z0NBQ2QsR0FBRyxFQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSx5QkFBc0I7Z0NBQy9DLElBQUksRUFBRSxPQUFPOzZCQUNkLENBQUMsRUFBQTs7NEJBSkksSUFBSSxHQUFHLFNBSVg7NEJBQ0Ysc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNHLGlEQUFpQixHQUF2QixVQUNFLElBQWdCLEVBQ2hCLEtBQWtCO1lBRGxCLHFCQUFBLEVBQUEsUUFBZ0I7WUFDaEIsc0JBQUEsRUFBQSxVQUFrQjs7Ozs7Z0NBRWMscUJBQU0sMEJBQWEsQ0FDakQsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsSUFBSSxNQUFBO2dDQUNKLEtBQUssT0FBQTs2QkFDTixDQUNGLEVBQUE7OzRCQVBzQixJQUFJLEdBQUssQ0FBQSxTQU8vQixDQUFBLGNBUDBCOzRCQVEzQixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBbUJHO1FBQ0csc0NBQU0sR0FBWixVQUFhLE9BS1o7Ozs7Ozs0QkFDUyxRQUFRLEdBQStCLE9BQU8sU0FBdEMsRUFBRSxLQUFLLEdBQXdCLE9BQU8sTUFBL0IsRUFBRSxLQUFLLEdBQWlCLE9BQU8sTUFBeEIsRUFBRSxVQUFVLEdBQUssT0FBTyxXQUFaLENBQWE7NEJBQ3hCLHFCQUFNLHlCQUFZLENBQy9DLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO29DQUNFLFFBQVEsVUFBQTtvQ0FDUixLQUFLLE9BQUE7b0NBQ0wsS0FBSyxPQUFBO29DQUNMLFVBQVUsWUFBQTtpQ0FDWCxDQUNGLEVBQUE7OzRCQVRxQixJQUFJLEdBQUssQ0FBQSxTQVM5QixDQUFBLGFBVHlCOzRCQVUxQixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNHLG9DQUFJLEdBQVYsVUFBVyxPQVVWOzs7Ozs7NEJBRUcsUUFBUSxHQU1OLE9BQU8sU0FORCxFQUNSLEtBQUssR0FLSCxPQUFPLE1BTEosRUFDTCxLQUFLLEdBSUgsT0FBTyxNQUpKLEVBQ0wsVUFBVSxHQUdSLE9BQU8sV0FIQyxFQUNWLEtBRUUsT0FBTyxlQUZhLEVBQXRCLGNBQWMsbUJBQUcsS0FBSyxLQUFBLEVBQ3RCLFFBQVEsR0FDTixPQUFPLFNBREQsQ0FDRTtpQ0FFUixjQUFjLEVBQWQsd0JBQWM7NEJBQ1cscUJBQU0sbUNBQXNCLENBQ3JELElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO29DQUNFLFFBQVEsVUFBQTtvQ0FDUixLQUFLLE9BQUE7b0NBQ0wsS0FBSyxPQUFBO29DQUNMLFVBQVUsWUFBQTtpQ0FDWCxDQUNGLEVBQUE7OzRCQVRpQixJQUFJLEdBQUssQ0FBQSxTQVMxQixDQUFBLFNBVHFCOzRCQVV0QixhQUFhOzRCQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0NBQXdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUM1RCxzQkFBTyxJQUFJLEVBQUM7Z0NBRWUscUJBQU0scUJBQVEsQ0FDdkMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsUUFBUSxVQUFBO2dDQUNSLEtBQUssT0FBQTtnQ0FDTCxLQUFLLE9BQUE7Z0NBQ0wsVUFBVSxZQUFBO2dDQUNWLFFBQVEsVUFBQTs2QkFDVCxDQUNGLEVBQUE7OzRCQVZpQixJQUFJLEdBQUssQ0FBQSxTQVUxQixDQUFBLFNBVnFCOzRCQVd0QixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FFZjtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FxQkc7UUFDRyxzQ0FBTSxHQUFaLFVBQ0UsS0FBYSxFQUNiLE9BU0M7Ozs7Ozs0QkFFRCxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQzs0QkFFdEIsTUFBTSxHQU9KLE9BQU8sT0FQSCxFQUNOLEtBTUUsT0FBTyxLQU5ELEVBQVIsSUFBSSxtQkFBRyxDQUFDLEtBQUEsRUFDUixLQUtFLE9BQU8sTUFMQyxFQUFWLEtBQUssbUJBQUcsRUFBRSxLQUFBLEVBQ1YsY0FBYyxHQUlaLE9BQU8sZUFKSyxFQUNkLFNBQVMsR0FHUCxPQUFPLFVBSEEsRUFDVCxRQUFRLEdBRU4sT0FBTyxTQUZELEVBQ1IsS0FDRSxPQUFPLGVBRGEsRUFBdEIsY0FBYyxtQkFBRyxLQUFLLEtBQUEsQ0FDWjtpQ0FFUixDQUFDLGNBQWMsRUFBZix3QkFBZTs0QkFDWSxxQkFBTSx1QkFBVSxDQUMzQyxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtvQ0FDRSxLQUFLLE9BQUE7b0NBQ0wsTUFBTSxRQUFBO29DQUNOLElBQUksTUFBQTtvQ0FDSixLQUFLLE9BQUE7b0NBQ0wsY0FBYyxnQkFBQTtvQ0FDZCxTQUFTLFdBQUE7b0NBQ1QsUUFBUSxVQUFBO2lDQUNULENBQ0YsRUFBQTs7NEJBWm1CLElBQUksR0FBSyxDQUFBLFNBWTVCLENBQUEsV0FadUI7NEJBYXhCLHNCQUFPLElBQUksRUFBQztnQ0FFaUIscUJBQU0scUNBQXdCLENBQ3pELElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO2dDQUNFLEtBQUssT0FBQTtnQ0FDTCxNQUFNLFFBQUE7Z0NBQ04sSUFBSSxNQUFBO2dDQUNKLEtBQUssT0FBQTtnQ0FDTCxjQUFjLGdCQUFBO2dDQUNkLFNBQVMsV0FBQTtnQ0FDVCxRQUFRLFVBQUE7NkJBQ1QsQ0FDRixFQUFBOzs0QkFabUIsSUFBSSxHQUFLLENBQUEsU0FZNUIsQ0FBQSxXQVp1Qjs0QkFhbEIsVUFBVSxHQUFXLElBQUksV0FBZixFQUFFLElBQUksR0FBSyxJQUFJLEtBQVQsQ0FBVTs0QkFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO2dDQUNsQixhQUFhO2dDQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0NBQXdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dDQUM1RCxPQUFPLElBQUksQ0FBQzs0QkFDZCxDQUFDLENBQUMsQ0FBQzs0QkFDSCxzQkFBTztvQ0FDTCxVQUFVLFlBQUE7b0NBQ1YsSUFBSSxNQUFBO2lDQUNMLEVBQUM7Ozs7U0FFTDtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBbUJHO1FBQ0csNENBQVksR0FBbEIsVUFBbUIsRUFBVTs7Ozs7Z0NBQ0kscUJBQU0seUJBQVksQ0FDL0MsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsRUFBRSxJQUFBOzZCQUNILENBQ0YsRUFBQTs7NEJBTnFCLElBQUksR0FBSyxDQUFBLFNBTTlCLENBQUEsYUFOeUI7NEJBTzFCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNHLDBDQUFVLEdBQWhCLFVBQWlCLE1BQWM7Ozs7O2dDQUNaLHFCQUFNLDBCQUFhLENBQ2xDLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO2dDQUNFLEVBQUUsRUFBRSxNQUFNOzZCQUNYLENBQ0YsRUFBQTs7NEJBTk8sSUFBSSxHQUFLLENBQUEsU0FNaEIsQ0FBQSxLQU5XOzRCQU9aLHNCQUFPLElBQUksQ0FBQyxNQUFNLEVBQUM7Ozs7U0FDcEI7UUFFRDs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNHLHdDQUFRLEdBQWQsVUFBZSxNQUFjLEVBQUUsS0FBYTs7Ozs7Z0NBQzlCLHFCQUFNLDJCQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO2dDQUN2RSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0NBQ2pCLElBQUksRUFBRSxLQUFLOzZCQUNaLENBQUMsRUFBQTs7NEJBSEksR0FBRyxHQUFHLFNBR1Y7NEJBQ0Ysc0JBQU8sR0FBRyxDQUFDLGNBQWMsRUFBQzs7OztTQUMzQjtRQUVEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0csMkNBQVcsR0FBakIsVUFBa0IsTUFBYyxFQUFFLEtBQWE7Ozs7O2dDQUNqQyxxQkFBTSxnQ0FBbUIsQ0FDbkMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsSUFBSSxFQUFFLEtBQUs7Z0NBQ1gsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDOzZCQUNsQixDQUNGLEVBQUE7OzRCQVBLLEdBQUcsR0FBRyxTQU9YOzRCQUNELHNCQUFPLEdBQUcsQ0FBQyxtQkFBbUIsRUFBQzs7OztTQUNoQztRQUVEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0cseUNBQVMsR0FBZixVQUNFLE1BQWMsRUFDZCxTQUFrQjs7Ozs7Z0NBRUQscUJBQU0seUJBQVksQ0FDakMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsRUFBRSxFQUFFLE1BQU07Z0NBQ1YsU0FBUyxXQUFBOzZCQUNWLENBQ0YsRUFBQTs7NEJBUE8sSUFBSSxHQUFLLENBQUEsU0FPaEIsQ0FBQSxLQVBXOzRCQVFaLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0NBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzs2QkFDM0I7NEJBQ0Qsc0JBQU8sSUFBSSxDQUFDLEtBQUssRUFBQzs7OztTQUNuQjtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7V0FlRztRQUNHLHdDQUFRLEdBQWQsVUFDRSxNQUFjLEVBQ2QsS0FBZSxFQUNmLFNBQWtCOzs7OztnQ0FFVyxxQkFBTSx1QkFBVSxDQUMzQyxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtnQ0FDRSxTQUFTLEVBQUUsS0FBSztnQ0FDaEIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO2dDQUNqQixTQUFTLFdBQUE7NkJBQ1YsQ0FDRixFQUFBOzs0QkFSbUIsSUFBSSxHQUFLLENBQUEsU0FRNUIsQ0FBQSxXQVJ1Qjs0QkFTeEIsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7Ozs7O1dBZUc7UUFDRywyQ0FBVyxHQUFqQixVQUNFLE1BQWMsRUFDZCxLQUFlLEVBQ2YsU0FBa0I7Ozs7O2dDQUVXLHFCQUFNLHVCQUFVLENBQzNDLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO2dDQUNFLFNBQVMsRUFBRSxLQUFLO2dDQUNoQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0NBQ2pCLFNBQVMsV0FBQTs2QkFDVixDQUNGLEVBQUE7OzRCQVJtQixJQUFJLEdBQUssQ0FBQSxTQVE1QixDQUFBLFdBUnVCOzRCQVN4QixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0csd0NBQVEsR0FBZCxVQUFlLE1BQWM7Ozs7Z0NBQ3BCLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUNuQyxNQUFNLEVBQUUsS0FBSztnQ0FDYixHQUFHLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHNCQUFpQixNQUFNLFVBQU87NkJBQ3hELENBQUMsRUFBQTtnQ0FIRixzQkFBTyxTQUdMLEVBQUM7Ozs7U0FDSjtRQUVEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0csOENBQWMsR0FBcEIsVUFBcUIsTUFBYzs7Ozs7Z0NBRzdCLHFCQUFNLCtCQUFrQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQ0FDbkUsRUFBRSxFQUFFLE1BQU07NkJBQ1gsQ0FBQyxFQUFBOzs0QkFIUSxXQUFXLEdBQ2pCLENBQUEsU0FFRixDQUFBLGlCQUhtQjs0QkFJckIsc0JBQU8sV0FBVyxFQUFDOzs7O1NBQ3BCO1FBRUQ7Ozs7O1dBS0c7UUFDVSx1REFBdUIsR0FBcEMsVUFDRSxNQUFjLEVBQ2QsU0FBaUIsRUFDakIsT0FFQzs7Ozs7OzRCQUVPLFlBQVksR0FBSyxDQUFBLE9BQU8sSUFBSSxFQUFFLENBQUEsYUFBbEIsQ0FBbUI7NEJBQ3RCLHFCQUFNLHdDQUEyQixDQUNoRCxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtvQ0FDRSxFQUFFLEVBQUUsTUFBTTtvQ0FDVixTQUFTLFdBQUE7b0NBQ1QsWUFBWSxjQUFBO2lDQUNiLENBQ0YsRUFBQTs7NEJBUk8sSUFBSSxHQUFLLENBQUEsU0FRaEIsQ0FBQSxLQVJXOzRCQVNaLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0NBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzs2QkFDMUI7NEJBRUMsS0FDRSxJQUFJLG9CQURtQyxFQUFsQixJQUFJLFVBQUEsRUFBRSxVQUFVLGdCQUFBLENBQ2hDOzRCQUNULElBQUksR0FBRyxpQ0FBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDdkMsc0JBQU87b0NBQ0wsSUFBSSxNQUFBO29DQUNKLFVBQVUsWUFBQTtpQ0FDWCxFQUFDOzs7O1NBQ0g7UUFFRDs7OztXQUlHO1FBQ1UsMkNBQVcsR0FBeEIsVUFBeUIsTUFBYzs7Ozs7Z0NBQ2YscUJBQU0sZ0JBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0NBQ3RFLFVBQVUsRUFBRSwwQkFBYSxDQUFDLElBQUk7Z0NBQzlCLFFBQVEsRUFBRSxNQUFNOzZCQUNqQixDQUFDLEVBQUE7OzRCQUhXLElBQUksR0FBSyxDQUFBLFNBR3BCLENBQUEsSUFIZTs0QkFJakIsc0JBQU8sZ0NBQXdCLENBQUMsSUFBSSxDQUFDLEVBQUM7Ozs7U0FDdkM7UUFFRDs7OztXQUlHO1FBQ1UsZ0RBQWdCLEdBQTdCLFVBQ0UsT0FBaUI7Ozs7Ozs0QkFFakIsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQ0FDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOzZCQUN2Qzs0QkFDaUMscUJBQU0sMEJBQWEsQ0FDbkQsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsVUFBVSxFQUFFLDBCQUFhLENBQUMsSUFBSTtvQ0FDOUIsU0FBUyxFQUFFLE9BQU87aUNBQ25CLENBQ0YsRUFBQTs7NEJBUHNCLE1BQU0sR0FBSyxDQUFBLFNBT2pDLENBQUEsY0FQNEI7NEJBUXpCLEdBQUcsR0FBa0MsRUFBRSxDQUFDOzRCQUM1QyxXQUF1QyxFQUFOLGlCQUFNLEVBQU4sb0JBQU0sRUFBTixJQUFNLEVBQUU7Z0NBQTlCLGlCQUFrQixFQUFoQixRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQUE7Z0NBQ3pCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxnQ0FBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDaEQ7NEJBQ0Qsc0JBQU8sR0FBRyxFQUFDOzs7O1NBQ1o7UUFFRDs7Ozs7V0FLRztRQUNVLDJDQUFXLEdBQXhCLFVBQXlCLE1BQWMsRUFBRSxJQUFrQjs7Ozs7OzRCQUN6RCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQ0FDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDOzZCQUN6Qzs0QkFDK0IscUJBQU0sd0JBQVcsQ0FDL0MsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsVUFBVSxFQUFFLDBCQUFhLENBQUMsSUFBSTtvQ0FDOUIsUUFBUSxFQUFFLE1BQU07b0NBQ2hCLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLENBQUM7d0NBQ3JDLEdBQUcsS0FBQTt3Q0FDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7cUNBQ2pDLENBQUMsRUFIb0MsQ0FHcEMsQ0FBQztpQ0FDSixDQUNGLEVBQUE7OzRCQVhvQixNQUFNLEdBQUssQ0FBQSxTQVcvQixDQUFBLFlBWDBCOzRCQVkzQixzQkFBTyxNQUFNLEVBQUM7Ozs7U0FDZjtRQUVEOzs7V0FHRztRQUNVLGdEQUFnQixHQUE3QixVQUNFLEtBQStDOzs7Ozs7NEJBRS9DLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0NBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs2QkFDckM7NEJBQ0ssTUFBTSxHQUE0QixFQUFFLENBQUM7NEJBQzNDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFnQjtvQ0FBZCxNQUFNLFlBQUEsRUFBRSxJQUFJLFVBQUE7Z0NBQzNCLEtBQWtCLFVBQWlCLEVBQWpCLEtBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBakIsY0FBaUIsRUFBakIsSUFBaUIsRUFBRTtvQ0FBaEMsSUFBTSxHQUFHLFNBQUE7b0NBQ1osTUFBTSxDQUFDLElBQUksQ0FBQzt3Q0FDVixRQUFRLEVBQUUsTUFBTTt3Q0FDaEIsR0FBRyxLQUFBO3dDQUNILEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQ0FDakMsQ0FBQyxDQUFDO2lDQUNKOzRCQUNILENBQUMsQ0FBQyxDQUFDOzRCQUNILHFCQUFNLDZCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtvQ0FDN0QsVUFBVSxFQUFFLDBCQUFhLENBQUMsSUFBSTtvQ0FDOUIsS0FBSyxFQUFFLE1BQU07aUNBQ2QsQ0FBQyxFQUFBOzs0QkFIRixTQUdFLENBQUM7Ozs7O1NBQ0o7UUFFRDs7O1dBR0c7UUFDVSw4Q0FBYyxHQUEzQixVQUE0QixNQUFjLEVBQUUsR0FBVzs7OztnQ0FDckQscUJBQU0sc0JBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0NBQ3RELFVBQVUsRUFBRSwwQkFBYSxDQUFDLElBQUk7Z0NBQzlCLFFBQVEsRUFBRSxNQUFNO2dDQUNoQixHQUFHLEtBQUE7NkJBQ0osQ0FBQyxFQUFBOzs0QkFKRixTQUlFLENBQUM7Ozs7O1NBQ0o7UUFFRDs7Ozs7V0FLRztRQUNVLHVDQUFPLEdBQXBCLFVBQ0UsTUFBYyxFQUNkLFFBQWdCLEVBQ2hCLFNBQWtCOzs7OztnQ0FFRCxxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFBQTs7NEJBQWxELFFBQVEsR0FBRyxTQUF1Qzs0QkFFeEQsSUFBSSxRQUFRLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRTtnQ0FDM0Isc0JBQU8sS0FBSyxFQUFDOzZCQUNkOzRCQUVHLE9BQU8sR0FBWSxLQUFLLENBQUM7NEJBRTdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQ0FDeEIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQ0FDMUIsT0FBTyxHQUFHLElBQUksQ0FBQztpQ0FDaEI7NEJBQ0gsQ0FBQyxDQUFDLENBQUM7NEJBRUgsc0JBQU8sT0FBTyxFQUFDOzs7O1NBQ2hCO1FBQ0Q7O1dBRUc7UUFDRyxvQ0FBSSxHQUFWLFVBQVcsT0FBaUI7Ozs7Z0NBQzFCLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUM1QixHQUFHLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHVCQUFvQjtnQ0FDN0MsTUFBTSxFQUFFLE1BQU07Z0NBQ2QsSUFBSSxFQUFFO29DQUNKLE9BQU8sU0FBQTtpQ0FDUjs2QkFDRixDQUFDLEVBQUE7OzRCQU5GLFNBTUUsQ0FBQzs0QkFDSCxzQkFBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFDOzs7O1NBQ3pDO1FBRUssc0NBQU0sR0FBWixVQUFhLE9BQTJDOzs7Ozs0QkFDdEQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0NBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs2QkFDcEQ7NEJBQ0QscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7b0NBQzVCLEdBQUcsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksWUFBUztvQ0FDbEMsTUFBTSxFQUFFLEtBQUs7b0NBQ2IsTUFBTSxFQUFFO3dDQUNOLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSzt3Q0FDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO3FDQUN2QjtpQ0FDRixDQUFDLEVBQUE7OzRCQVBGLFNBT0UsQ0FBQzs0QkFDSCxzQkFBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFDOzs7O1NBQ3pDO1FBRUQ7O1dBRUc7UUFDRyxnREFBZ0IsR0FBdEIsVUFDRSxNQUFjLEVBQ2QsS0FBYyxFQUNkLFFBQWlCOzs7OztnQ0FNRixxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQ0FDM0MsTUFBTSxFQUFFLEtBQUs7Z0NBQ2IsR0FBRyxFQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSwrQkFBNEI7Z0NBQ3JELE1BQU0sRUFBRTtvQ0FDTixNQUFNLFFBQUE7b0NBQ04sS0FBSyxPQUFBO29DQUNMLFFBQVEsVUFBQTtpQ0FDVDs2QkFDRixDQUFDLEVBQUE7OzRCQVJJLE1BQU0sR0FBRyxTQVFiOzRCQUNGLHNCQUFPLE1BQU0sRUFBQzs7OztTQUNmO1FBQ0Q7Ozs7Ozs7O1dBUUc7UUFDVSwrQ0FBZSxHQUE1QixVQUNFLE9BYUM7O1lBYkQsd0JBQUEsRUFBQTtnQkFXRSxJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsRUFBRTthQUNWOzs7Ozs7OzRCQUVHLFlBQVksR0FBUSxFQUFFLENBQUM7NEJBQzNCLElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVEsRUFBRTtnQ0FDckIsWUFBWSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDOzZCQUMxQzs0QkFDRCxJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxjQUFjLEVBQUU7Z0NBQzNCLFlBQVksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQzs2QkFDdEQ7NEJBQ0QsSUFBSSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxPQUFPLDBDQUFFLE1BQU0sRUFBRTtnQ0FDNUIsWUFBWSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07b0NBQ3BELE9BQU8sb0JBQWtCLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxjQUFTLE1BQVEsQ0FBQztnQ0FDcEUsQ0FBQyxDQUFDLENBQUM7NkJBQ0o7NEJBQ0QsSUFBSSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxFQUFFO2dDQUNqQixZQUFZLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7NkJBQ2xDOzRCQUNELElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEtBQUssRUFBRTtnQ0FDbEIsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDOzZCQUNwQzs0QkFDRCxJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxvQkFBb0IsRUFBRTtnQ0FDakMsWUFBWSxDQUFDLHVCQUF1QixHQUFHLEdBQUcsQ0FBQzs2QkFDNUM7NEJBQ0QsSUFBSSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsTUFBTSxFQUFFO2dDQUNuQixZQUFZLENBQUMsTUFBTSxHQUFHLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxNQUFNLENBQUM7NkJBQ3ZDOzRCQUNELElBQUksQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsS0FBSyxNQUFLLFNBQVMsRUFBRTtnQ0FDaEMsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsS0FBSyxDQUFDOzZCQUNyQzs0QkFDRCxJQUFJLENBQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsTUFBSyxTQUFTLEVBQUU7Z0NBQzlCLFlBQVksQ0FBQyxHQUFHLEdBQUcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsQ0FBQzs2QkFDakM7NEJBQ21CLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO29DQUNoRCxNQUFNLEVBQUUsS0FBSztvQ0FDYixHQUFHLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGlDQUE4QjtvQ0FDdkQsTUFBTSxlQUFPLFlBQVksQ0FBRTtpQ0FDNUIsQ0FBQyxFQUFBOzs0QkFKSSxNQUFNLEdBQVEsU0FJbEI7NEJBQ00sSUFBSSxHQUFpQixNQUFNLEtBQXZCLEVBQUUsVUFBVSxHQUFLLE1BQU0sV0FBWCxDQUFZOzRCQUNwQyxzQkFBTztvQ0FDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQVE7O3dDQUN0QixPQUFPOzRDQUNMLFVBQVUsRUFBRSxHQUFHLENBQUMsV0FBVzs0Q0FDM0IsTUFBTSxFQUFFLE1BQUEsR0FBRyxDQUFDLElBQUksMENBQUUsRUFBRTs0Q0FDcEIsUUFBUSxFQUFFLE1BQUEsR0FBRyxDQUFDLElBQUksMENBQUUsV0FBVzs0Q0FDL0IsUUFBUSxFQUFFLE1BQUEsR0FBRyxDQUFDLEtBQUssMENBQUUsU0FBUzs0Q0FDOUIsVUFBVSxFQUFFLE1BQUEsR0FBRyxDQUFDLEtBQUssMENBQUUsV0FBVzs0Q0FDbEMsUUFBUSxFQUFFLE1BQUEsR0FBRyxDQUFDLEtBQUssMENBQUUsRUFBRTs0Q0FDdkIsYUFBYSxFQUFFLEdBQUcsQ0FBQyxjQUFjOzRDQUNqQyxhQUFhLEVBQUUsR0FBRyxDQUFDLGNBQWM7NENBQ2pDLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUzs0Q0FDeEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNOzRDQUNqQixPQUFPLEVBQUUsTUFBQSxHQUFHLENBQUMsR0FBRywwQ0FBRSxJQUFJO3lDQUN2QixDQUFDO29DQUNKLENBQUMsQ0FBQztvQ0FDRixVQUFVLFlBQUE7aUNBQ1gsRUFBQzs7OztTQUNIO1FBRUQ7OztXQUdHO1FBQ1UseURBQXlCLEdBQXRDLFVBQXVDLE9BR3RDOzs7O2dDQUNDLHFCQUFNLHNDQUF5QixDQUM3QixJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQixPQUFPLENBQ1IsRUFBQTs7NEJBSkQsU0FJQyxDQUFDOzRCQUNGLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7OztXQUdHO1FBQ1UsOENBQWMsR0FBM0IsVUFBNEIsTUFBYTs7Ozs7Z0NBQ3ZCLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUM1QyxNQUFNLEVBQUUsS0FBSztnQ0FDYixHQUFHLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHNCQUFpQixNQUFNLGFBQVU7NkJBQzNELENBQUMsRUFBQTs7NEJBSEksTUFBTSxHQUFJLFNBR2Q7NEJBQ0Ysc0JBQU8sTUFBTSxFQUFDOzs7O1NBQ2Y7UUFFRDs7O1dBR0c7UUFDVyw0Q0FBWSxHQUF6QixVQUEwQixPQU0xQjs7Ozs7Z0NBQ2lCLHFCQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO2dDQUNoRCxNQUFNLEVBQUUsTUFBTTtnQ0FDZCxHQUFHLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdDQUE2QjtnQ0FDdEQsSUFBSSxlQUFLLE9BQU8sQ0FBQzs2QkFDbEIsQ0FBQyxFQUFBOzs0QkFKSSxNQUFNLEdBQUksU0FJZDs0QkFDRixzQkFBTyxNQUFNLEVBQUM7Ozs7U0FDZjtRQUVEOzs7V0FHRztRQUNXLDhDQUFjLEdBQTNCLFVBQTRCLE9BSzVCOzs7OztnQ0FDaUIscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7Z0NBQ2hELE1BQU0sRUFBRSxNQUFNO2dDQUNkLEdBQUcsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksa0NBQStCO2dDQUN4RCxJQUFJLGVBQUssT0FBTyxDQUFDOzZCQUNsQixDQUFDLEVBQUE7OzRCQUpJLE1BQU0sR0FBSSxTQUlkOzRCQUNGLHNCQUFPLE1BQU0sRUFBQzs7OztTQUNmO1FBR0Q7Ozs7Ozs7Ozs7V0FVRztRQUNJLDBEQUEwQixHQUFoQyxVQUNDLE9BRUM7Ozs7O2dDQUVZLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUN6QyxNQUFNLEVBQUUsS0FBSztnQ0FDYixHQUFHLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHVDQUFvQztnQ0FDN0QsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUU7NkJBQ2pDLENBQUMsRUFBQTs7NEJBSkksSUFBSSxHQUFHLFNBSVg7NEJBQ0Ysc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNJLGtEQUFrQixHQUF4QixVQUNDLE9BR0M7Ozs7O2dDQUVZLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUN6QyxNQUFNLEVBQUUsS0FBSztnQ0FDYixHQUFHLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLCtDQUE0QztnQ0FDckUsTUFBTSxFQUFFO29DQUNOLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZTtvQ0FDeEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2lDQUNyQjs2QkFDRixDQUFDLEVBQUE7OzRCQVBJLElBQUksR0FBRyxTQU9YOzRCQUNGLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBQ0gsNEJBQUM7SUFBRCxDQUFDLEFBeHlDRCxJQXd5Q0M7SUF4eUNZLHNEQUFxQiJ9