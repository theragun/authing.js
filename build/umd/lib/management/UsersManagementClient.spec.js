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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ManagementClient", "../testing-helper", "ava", "moment", "../../types/graphql.v2", "../authentication/AuthenticationClient"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ManagementClient_1 = require("./ManagementClient");
    var testing_helper_1 = require("../testing-helper");
    var ava_1 = __importDefault(require("ava"));
    var moment_1 = __importDefault(require("moment"));
    var graphql_v2_1 = require("../../types/graphql.v2");
    var AuthenticationClient_1 = require("../authentication/AuthenticationClient");
    var managementClient = new ManagementClient_1.ManagementClient(testing_helper_1.getOptionsFromEnv());
    var authenticationClient = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
    ava_1.default('创建用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var username, email, phone, unionid, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = testing_helper_1.generateRandomString(10);
                    email = testing_helper_1.generateRandomString(10);
                    phone = testing_helper_1.generateRandomPhone();
                    unionid = testing_helper_1.generateRandomString(10);
                    return [4 /*yield*/, managementClient.users.create({
                            username: username,
                            email: email,
                            phone: phone,
                            unionid: unionid
                        })];
                case 1:
                    user = _a.sent();
                    t.assert(user);
                    t.assert(user.email === email.toLowerCase());
                    t.assert(user.username === username);
                    t.assert(user.phone === phone);
                    t.assert(user.unionid === unionid);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('创建用户 # 必须指定一种唯一标志', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var failed, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    failed = false;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, managementClient.users.create({
                            password: testing_helper_1.generateRandomString(10)
                        })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    failed = true;
                    return [3 /*break*/, 4];
                case 4:
                    t.assert(failed);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('创建用户 # 时间格式1', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString(),
                        lastLogin: '2017-06-07T14:34:08+04:00'
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, managementClient.users.detail(user.id)];
                case 2:
                    user = _a.sent();
                    t.assert(user);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('创建用户 # signedUp', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var signedUp, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signedUp = '2017-06-07T14:34:08+04:00';
                    return [4 /*yield*/, managementClient.users.create({
                            username: testing_helper_1.generateRandomString(),
                            signedUp: signedUp
                        })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, managementClient.users.detail(user.id)];
                case 2:
                    user = _a.sent();
                    t.assert(moment_1.default(user.signedUp).unix() === moment_1.default(signedUp).unix());
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('创建用户 # 错误时间格式', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var failed, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    failed = false;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, managementClient.users.create({
                            username: testing_helper_1.generateRandomString(),
                            lastLogin: '1602756997950'
                        })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    failed = true;
                    return [3 /*break*/, 4];
                case 4:
                    t.assert(failed);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default.skip('创建用户 # 附带身份信息', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user, result, token, result2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString()
                    }, {
                        identity: {
                            userIdInIdp: '1111',
                            provider: 'wechat'
                        }
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, managementClient.users.find({
                            identity: {
                                userIdInIdp: '1111',
                                provider: 'wechat'
                            }
                        })];
                case 2:
                    result = _a.sent();
                    t.assert(user.id === result.id);
                    return [4 /*yield*/, managementClient.users.refreshToken(user.id)];
                case 3:
                    token = _a.sent();
                    console.log(token);
                    return [4 /*yield*/, managementClient.users.find({
                            identity: {
                                userIdInIdp: '1111',
                                provider: 'wechat'
                            }
                        })];
                case 4:
                    result2 = _a.sent();
                    console.log(result2);
                    return [4 /*yield*/, managementClient.users.delete(user.id)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('检查用户是否存在', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var exists1, username, email, phone, _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, managementClient.users.exists({
                        username: testing_helper_1.generateRandomString(10)
                    })];
                case 1:
                    exists1 = _g.sent();
                    t.assert(exists1 === false);
                    username = testing_helper_1.generateRandomString(10);
                    email = testing_helper_1.generateRandomString(10) + '@qq.com';
                    phone = testing_helper_1.generateRandomPhone();
                    return [4 /*yield*/, managementClient.users.create({
                            username: username
                        })];
                case 2:
                    _g.sent();
                    _b = (_a = t).assert;
                    return [4 /*yield*/, managementClient.users.exists({ username: username })];
                case 3:
                    _b.apply(_a, [_g.sent()]);
                    return [4 /*yield*/, managementClient.users.create({ email: email })];
                case 4:
                    _g.sent();
                    _d = (_c = t).assert;
                    return [4 /*yield*/, managementClient.users.exists({ email: email })];
                case 5:
                    _d.apply(_c, [_g.sent()]);
                    return [4 /*yield*/, managementClient.users.create({ phone: phone })];
                case 6:
                    _g.sent();
                    _f = (_e = t).assert;
                    return [4 /*yield*/, managementClient.users.exists({ phone: phone })];
                case 7:
                    _f.apply(_e, [_g.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('查询用户详情', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user, detail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString(),
                        password: testing_helper_1.generateRandomString()
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, managementClient.users.detail(user.id)];
                case 2:
                    detail = _a.sent();
                    t.assert(user.id === detail.id);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('查询用户详情 # 不属于该用户池的用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var detail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.detail('xxx')];
                case 1:
                    detail = _a.sent();
                    t.assert(detail === null);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default.skip('find withCustomData', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.find({
                        withCustomData: true,
                        phone: '15210165828'
                    })];
                case 1:
                    user = _a.sent();
                    console.log(user);
                    t.assert(user);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('管理员通过 username 查询用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var username, password, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = testing_helper_1.generateRandomString();
                    password = testing_helper_1.generateRandomString();
                    return [4 /*yield*/, managementClient.users.create({
                            username: username,
                            password: password
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, managementClient.users.find({
                            username: username
                        })];
                case 2:
                    user = _a.sent();
                    t.assert(user.id);
                    return [4 /*yield*/, managementClient.users.delete(user.id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('管理员通过 emmail 查询用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = testing_helper_1.generateRandomString() + '@test.com';
                    password = testing_helper_1.generateRandomString();
                    return [4 /*yield*/, managementClient.users.create({
                            email: email,
                            password: password
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, managementClient.users.find({
                            email: email
                        })];
                case 2:
                    user = _a.sent();
                    t.assert(user.id);
                    return [4 /*yield*/, managementClient.users.delete(user.id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('管理员通过 phone 查询用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var rand1, rand2, phone, password, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rand1 = Math.floor(Math.random() * 8999) + 1000;
                    rand2 = Math.floor(Math.random() * 8999) + 1000;
                    phone = '131' + rand1.toString() + rand2.toString();
                    password = testing_helper_1.generateRandomString();
                    return [4 /*yield*/, managementClient.users.create({
                            phone: phone,
                            password: password
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, managementClient.users.find({
                            phone: phone
                        })];
                case 2:
                    user = _a.sent();
                    t.assert(user.id);
                    return [4 /*yield*/, managementClient.users.delete(user.id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('管理员通过 externalId 查询用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var username, password, userCreated, externalId, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = testing_helper_1.generateRandomString();
                    password = testing_helper_1.generateRandomString();
                    return [4 /*yield*/, managementClient.users.create({
                            username: username,
                            password: password
                        })];
                case 1:
                    userCreated = _a.sent();
                    externalId = testing_helper_1.generateRandomString();
                    return [4 /*yield*/, managementClient.users.update(userCreated.id, { externalId: externalId })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, managementClient.users.find({
                            externalId: externalId
                        })];
                case 3:
                    user = _a.sent();
                    t.assert(user.id);
                    return [4 /*yield*/, managementClient.users.delete(user.id)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('list withCustomData', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.list(1, 10, {
                        withCustomData: true
                    })];
                case 1:
                    user = _a.sent();
                    console.log(user);
                    t.assert(user);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('filter', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.filter({
                        filter: [
                            [
                                { type: "userDefinedFields", value: "isForbidden" },
                                "NEQ",
                                "forbidden"
                            ],
                            [
                                { type: "OtherFields", value: "app" },
                                "EQ",
                                { id: "60ab28843baf2e2c075dbeae", label: "新形态教材网" }
                            ]
                        ]
                    })];
                case 1:
                    users = _a.sent();
                    t.assert(users.list.length > 0);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('批量查询用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var list, i, user, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    list = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i <= 10)) return [3 /*break*/, 4];
                    return [4 /*yield*/, managementClient.users.create({
                            username: testing_helper_1.generateRandomString(10),
                            password: '123456!'
                        })];
                case 2:
                    user = _a.sent();
                    list.push(user.id);
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, managementClient.users.batch(list)];
                case 5:
                    data = _a.sent();
                    t.assert(data.length === list.length);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('搜索用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var query, _a, list, totalCount;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    query = 'c';
                    return [4 /*yield*/, managementClient.users.search(query)];
                case 1:
                    _a = _b.sent(), list = _a.list, totalCount = _a.totalCount;
                    t.assert(list !== undefined);
                    t.assert(totalCount !== undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('修改用户资料', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user, nickname, updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString(),
                        password: '123456!'
                    })];
                case 1:
                    user = _a.sent();
                    nickname = testing_helper_1.generateRandomString(10);
                    return [4 /*yield*/, managementClient.users.update(user.id, {
                            nickname: nickname
                        })];
                case 2:
                    updated = _a.sent();
                    t.assert(updated.nickname === nickname);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('修改用户资料 # 邮箱', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user, email, updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString(),
                        password: '123456!'
                    })];
                case 1:
                    user = _a.sent();
                    email = testing_helper_1.generateRandomString() + '@test.com';
                    return [4 /*yield*/, managementClient.users.update(user.id, {
                            email: email
                        })];
                case 2:
                    updated = _a.sent();
                    t.assert(updated.email === email.toLowerCase());
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('修改用户资料 # 手机号', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user, phone, updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString(),
                        password: '123456!'
                    })];
                case 1:
                    user = _a.sent();
                    phone = testing_helper_1.generateRandomPhone();
                    return [4 /*yield*/, managementClient.users.update(user.id, {
                            phone: phone
                        })];
                case 2:
                    updated = _a.sent();
                    t.assert(updated.phone === phone);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('获取用户角色列表', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user, role, roles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString(),
                        password: '123456!'
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, managementClient.roles.create(testing_helper_1.generateRandomString())];
                case 2:
                    role = _a.sent();
                    return [4 /*yield*/, managementClient.roles.addUsers(role.code, [user.id])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, managementClient.users.listRoles(user.id)];
                case 4:
                    roles = _a.sent();
                    t.assert(roles.totalCount === 1);
                    t.assert(roles.list[0].code === role.code);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default.skip('获取用户角色列表 namespace', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var roles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.listRoles('603f567865d782899ffb0b6e', '603f52f97cd214a8805c0cc8')];
                case 1:
                    roles = _a.sent();
                    console.log(roles);
                    t.assert(roles);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('删除用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user, user2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString(),
                        password: '123456!'
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, managementClient.users.delete(user.id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, managementClient.users.detail(user.id)];
                case 3:
                    user2 = _a.sent();
                    t.assert(user2 === null);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('refreshToken', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user, token, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString(),
                        password: '123456!'
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, managementClient.users.refreshToken(user.id)];
                case 2:
                    token = (_a.sent()).token;
                    t.assert(token);
                    return [4 /*yield*/, managementClient.checkLoginStatus(token, {
                            fetchUserDetail: true
                        })];
                case 3:
                    data = _a.sent();
                    t.assert(user.id === data.id);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default.skip('获取用户组织机构列表', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.listOrgs('5f9976a7389b6dccb23a4c54')];
                case 1:
                    data = _a.sent();
                    t.assert(data);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default.skip('listAuthorizedResources', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.listAuthorizedResources('603f2c49e91d695739d7206c', '6018bab016c246d458ef0ad2', {
                        resourceType: graphql_v2_1.ResourceType.Menu
                    })];
                case 1:
                    data = _a.sent();
                    console.log(JSON.stringify(data, null, 4));
                    t.assert(data);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('自定义数据', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, data, data2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = '603f2c49e91d695739d7206c';
                    return [4 /*yield*/, managementClient.users.setUdfValue(userId, {
                            school: '华中科技大学'
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, managementClient.users.getUdfValue(userId)];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    t.assert(data);
                    return [4 /*yield*/, managementClient.users.removeUdfValue(userId, 'school')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, managementClient.users.getUdfValue(userId)];
                case 4:
                    data2 = _a.sent();
                    console.log(data2);
                    t.assert(data);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('getUdfValueBatch', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = '603f2c49e91d695739d7206c';
                    return [4 /*yield*/, managementClient.users.setUdfValue(userId, {
                            school: '华中科技大学'
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, managementClient.users.getUdfValueBatch([userId])];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    t.assert(data);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('setUdfValueBatch', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t.assert(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, managementClient.users.setUdfValueBatch([
                            {
                                userId: '603f2c49e91d695739d7206c',
                                data: {
                                    school: '华中科技大学'
                                }
                            },
                            {
                                userId: '603f2c4910dfc09f1f3ecce5',
                                data: {
                                    school: '清华大学',
                                    age: 100
                                }
                            }
                        ])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, managementClient.users.getUdfValueBatch([
                            '603f2c49e91d695739d7206c',
                            '603f2c4910dfc09f1f3ecce5'
                        ])];
                case 3:
                    data = _a.sent();
                    console.log(data);
                    t.assert(data);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('踢下线一批用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var username, pwd, user, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = Math.random()
                        .toString(26)
                        .slice(2);
                    pwd = '123456';
                    return [4 /*yield*/, managementClient.users.create({ username: username, password: pwd })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, managementClient.users.kick([user.id])];
                case 2:
                    data = _a.sent();
                    t.assert(data.code === 200);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('用户池管理员根据用户 id 查询用户的登录状态', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var username, pwd, user, res2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = Math.random()
                        .toString(26)
                        .slice(2);
                    pwd = '123456';
                    return [4 /*yield*/, managementClient.users.create({ username: username, password: pwd })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, authenticationClient.loginByUsername(username, pwd)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, managementClient.users.checkLoginStatus(user.id)];
                case 3:
                    res2 = _a.sent();
                    t.assert(res2.isLogin === true);
                    t.assert(res2.user);
                    t.assert(res2.application.length > 0);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('用户池管理员强制下线用户在某个应用的登录态', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var username, pwd, user, res2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = Math.random()
                        .toString(26)
                        .slice(2);
                    pwd = '123456';
                    return [4 /*yield*/, managementClient.users.create({ username: username, password: pwd })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, authenticationClient.loginByUsername(username, pwd)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, managementClient.users.logout({
                            userId: user.id,
                            appId: testing_helper_1.getOptionsFromEnv().appId
                        })];
                case 3:
                    res2 = _a.sent();
                    t.assert(res2.code === 200);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('用户池管理员强制下线用户在所有应用的登录态', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var username, pwd, user, res2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = Math.random()
                        .toString(26)
                        .slice(2);
                    pwd = '123456';
                    return [4 /*yield*/, managementClient.users.create({ username: username, password: pwd })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, authenticationClient.loginByUsername(username, pwd)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, managementClient.users.logout({
                            userId: user.id
                        })];
                case 3:
                    res2 = _a.sent();
                    t.assert(res2.code === 200);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default.skip('statistics.listUserActions', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.statistics.listUserActions({
                        operationNames: ['login'],
                        excludeNonAppRecords: true,
                        appIds: ['60af0ed56d13799e4cf384f5'],
                        start: 1622362098786
                    })];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    t.assert(data);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default.skip('users.listUserActions', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.statistics.listUserActions({
                        operationNames: ['login'],
                        excludeNonAppRecords: true,
                        appIds: ['60af0ed56d13799e4cf384f5']
                    })];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    t.assert(data);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('detail withCustomData', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.detail('60e31b9b94b5795362256698', {
                        withCustomData: true
                    })];
                case 1:
                    user = _a.sent();
                    console.log(JSON.stringify(user, null, 4));
                    t.assert(user.customData);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('batch withCustomData', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.batch(['60e31b9b94b5795362256698', '60e320959d6c08c325a3510f'], {
                        queryField: 'id',
                        withCustomData: true
                    })];
                case 1:
                    users = _a.sent();
                    console.log(JSON.stringify(users, null, 4));
                    t.assert(users);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default.only('getUserTenants', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var tenants;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.getUserTenants('6194bb53a6c4dca57363182c')];
                case 1:
                    tenants = _a.sent();
                    console.log(tenants);
                    t.assert(tenants);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default.only('linkIdentity', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.linkIdentity({
                        userId: '619b07826feaa09f07b598de',
                        userIdInIdp: 'zy001',
                        isSocial: true,
                        type: 'openid',
                        identifier: 'wechat',
                    })];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    t.assert(result);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default.only('unlinkIdentity', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.unlinkIdentity({
                        userId: '619b07826feaa09f07b598de',
                        isSocial: true,
                        type: 'openid',
                        identifier: 'wechat',
                    })];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    t.assert(result);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('getApplicationLoginUserNum', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.getApplicationLoginUserNum({
                        appId: '60ab28843baf2e2c075dbeae'
                    })];
                case 1:
                    res = _a.sent();
                    t.assert(res);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('getUdfFieldUserNum', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.users.getUdfFieldUserNum({
                        definedFieldKey: 'hep_isTeacher',
                        appId: '60ab28843baf2e2c075dbeae'
                    })];
                case 1:
                    res = _a.sent();
                    t.assert(res);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnNNYW5hZ2VtZW50Q2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvVXNlcnNNYW5hZ2VtZW50Q2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx1REFBc0Q7SUFDdEQsb0RBSTJCO0lBQzNCLDRDQUF1QjtJQUN2QixrREFBNEI7SUFDNUIscURBQXNEO0lBQ3RELCtFQUE4RTtJQUU5RSxJQUFNLGdCQUFnQixHQUFHLElBQUksbUNBQWdCLENBQUMsa0NBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLElBQU0sb0JBQW9CLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxrQ0FBaUIsRUFBRSxDQUFDLENBQUM7SUFFM0UsYUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFNLENBQUM7Ozs7O29CQUNaLFFBQVEsR0FBRyxxQ0FBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDcEMsS0FBSyxHQUFHLHFDQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNqQyxLQUFLLEdBQUcsb0NBQW1CLEVBQUUsQ0FBQztvQkFDOUIsT0FBTyxHQUFHLHFDQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM1QixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzRCQUMvQyxRQUFRLFVBQUE7NEJBQ1IsS0FBSyxPQUFBOzRCQUNMLEtBQUssT0FBQTs0QkFDTCxPQUFPLFNBQUE7eUJBQ1IsQ0FBQyxFQUFBOztvQkFMSSxJQUFJLEdBQUcsU0FLWDtvQkFDRixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNmLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztvQkFDN0MsQ0FBQyxD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