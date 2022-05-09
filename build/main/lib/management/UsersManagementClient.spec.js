"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnNNYW5hZ2VtZW50Q2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvVXNlcnNNYW5hZ2VtZW50Q2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBc0Q7QUFDdEQsb0RBSTJCO0FBQzNCLDRDQUF1QjtBQUN2QixrREFBNEI7QUFDNUIscURBQXNEO0FBQ3RELCtFQUE4RTtBQUU5RSxJQUFNLGdCQUFnQixHQUFHLElBQUksbUNBQWdCLENBQUMsa0NBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBQ25FLElBQU0sb0JBQW9CLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxrQ0FBaUIsRUFBRSxDQUFDLENBQUM7QUFFM0UsYUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUNaLFFBQVEsR0FBRyxxQ0FBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEMsS0FBSyxHQUFHLHFDQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQyxLQUFLLEdBQUcsb0NBQW1CLEVBQUUsQ0FBQztnQkFDOUIsT0FBTyxHQUFHLHFDQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUMvQyxRQUFRLFVBQUE7d0JBQ1IsS0FBSyxPQUFBO3dCQUNMLEtBQUssT0FBQTt3QkFDTCxPQUFPLFNBQUE7cUJBQ1IsQ0FBQyxFQUFBOztnQkFMSSxJQUFJLEdBQUcsU0FLWDtnQkFDRixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNmLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDN0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsQ0FBQzs7OztLQUNwQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsbUJBQW1CLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDM0IsTUFBTSxHQUFHLEtBQUssQ0FBQzs7OztnQkFFakIscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3QkFDbEMsUUFBUSxFQUFFLHFDQUFvQixDQUFDLEVBQUUsQ0FBQztxQkFDbkMsQ0FBQyxFQUFBOztnQkFGRixTQUVFLENBQUM7Ozs7Z0JBRUgsTUFBTSxHQUFHLElBQUksQ0FBQzs7O2dCQUVoQixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O0tBQ2xCLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxjQUFjLEVBQUUsVUFBTSxDQUFDOzs7O29CQUNmLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQzdDLFFBQVEsRUFBRSxxQ0FBb0IsRUFBRTtvQkFDaEMsU0FBUyxFQUFFLDJCQUEyQjtpQkFDdkMsQ0FBQyxFQUFBOztnQkFIRSxJQUFJLEdBQUcsU0FHVDtnQkFDSyxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBQTs7Z0JBQW5ELElBQUksR0FBRyxTQUE0QyxDQUFDO2dCQUNwRCxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O0tBQ2hCLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUN2QixRQUFRLEdBQUcsMkJBQTJCLENBQUM7Z0JBQ2xDLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7d0JBQzdDLFFBQVEsRUFBRSxxQ0FBb0IsRUFBRTt3QkFDaEMsUUFBUSxVQUFBO3FCQUNULENBQUMsRUFBQTs7Z0JBSEUsSUFBSSxHQUFHLFNBR1Q7Z0JBQ0sscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUE7O2dCQUFuRCxJQUFJLEdBQUcsU0FBNEMsQ0FBQztnQkFDcEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Ozs7S0FDcEUsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLGVBQWUsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUN2QixNQUFNLEdBQUcsS0FBSyxDQUFDOzs7O2dCQUVqQixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUNsQyxRQUFRLEVBQUUscUNBQW9CLEVBQUU7d0JBQ2hDLFNBQVMsRUFBRSxlQUFlO3FCQUMzQixDQUFDLEVBQUE7O2dCQUhGLFNBR0UsQ0FBQzs7OztnQkFFSCxNQUFNLEdBQUcsSUFBSSxDQUFDOzs7Z0JBRWhCLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7S0FDbEIsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBTSxDQUFDOzs7O29CQUNuQixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUM5QztvQkFDRSxRQUFRLEVBQUUscUNBQW9CLEVBQUU7aUJBQ2pDLEVBQ0Q7b0JBQ0UsUUFBUSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxNQUFNO3dCQUNuQixRQUFRLEVBQUUsUUFBUTtxQkFDbkI7aUJBQ0YsQ0FDRixFQUFBOztnQkFWSyxJQUFJLEdBQUcsU0FVWjtnQkFDYyxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUMvQyxRQUFRLEVBQUU7NEJBQ1IsV0FBVyxFQUFFLE1BQU07NEJBQ25CLFFBQVEsRUFBRSxRQUFRO3lCQUNuQjtxQkFDRixDQUFDLEVBQUE7O2dCQUxJLE1BQU0sR0FBRyxTQUtiO2dCQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xCLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFBOztnQkFBMUQsS0FBSyxHQUFHLFNBQWtEO2dCQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNILHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7d0JBQ2hELFFBQVEsRUFBRTs0QkFDUixXQUFXLEVBQUUsTUFBTTs0QkFDbkIsUUFBUSxFQUFFLFFBQVE7eUJBQ25CO3FCQUNGLENBQUMsRUFBQTs7Z0JBTEksT0FBTyxHQUFHLFNBS2Q7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDckIscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUE7O2dCQUE1QyxTQUE0QyxDQUFDOzs7O0tBQzlDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxVQUFVLEVBQUUsVUFBTSxDQUFDOzs7O29CQUNOLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQ2xELFFBQVEsRUFBRSxxQ0FBb0IsQ0FBQyxFQUFFLENBQUM7aUJBQ25DLENBQUMsRUFBQTs7Z0JBRkksT0FBTyxHQUFHLFNBRWQ7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUM7Z0JBRXRCLFFBQVEsR0FBRyxxQ0FBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEMsS0FBSyxHQUFHLHFDQUFvQixDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDN0MsS0FBSyxHQUFHLG9DQUFtQixFQUFFLENBQUM7Z0JBQ3BDLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7d0JBQ2xDLFFBQVEsVUFBQTtxQkFDVCxDQUFDLEVBQUE7O2dCQUZGLFNBRUUsQ0FBQztnQkFDSCxLQUFBLENBQUEsS0FBQSxDQUFDLENBQUEsQ0FBQyxNQUFNLENBQUE7Z0JBQUMscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsVUFBQSxFQUFFLENBQUMsRUFBQTs7Z0JBQTFELGNBQVMsU0FBaUQsRUFBQyxDQUFDO2dCQUM1RCxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxFQUFBOztnQkFBOUMsU0FBOEMsQ0FBQztnQkFDL0MsS0FBQSxDQUFBLEtBQUEsQ0FBQyxDQUFBLENBQUMsTUFBTSxDQUFBO2dCQUFDLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLEVBQUE7O2dCQUF2RCxjQUFTLFNBQThDLEVBQUMsQ0FBQztnQkFDekQscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsRUFBQTs7Z0JBQTlDLFNBQThDLENBQUM7Z0JBQy9DLEtBQUEsQ0FBQSxLQUFBLENBQUMsQ0FBQSxDQUFDLE1BQU0sQ0FBQTtnQkFBQyxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxFQUFBOztnQkFBdkQsY0FBUyxTQUE4QyxFQUFDLENBQUM7Ozs7S0FDMUQsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ1AscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDL0MsUUFBUSxFQUFFLHFDQUFvQixFQUFFO29CQUNoQyxRQUFRLEVBQUUscUNBQW9CLEVBQUU7aUJBQ2pDLENBQUMsRUFBQTs7Z0JBSEksSUFBSSxHQUFHLFNBR1g7Z0JBQ2EscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUE7O2dCQUFyRCxNQUFNLEdBQUcsU0FBNEM7Z0JBQzNELENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7S0FDakMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLHFCQUFxQixFQUFFLFVBQU0sQ0FBQzs7OztvQkFDbEIscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBQTs7Z0JBQW5ELE1BQU0sR0FBRyxTQUEwQztnQkFDekQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUM7Ozs7S0FDM0IsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ3pCLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQzdDLGNBQWMsRUFBRSxJQUFJO29CQUNwQixLQUFLLEVBQUUsYUFBYTtpQkFDckIsQ0FBQyxFQUFBOztnQkFISSxJQUFJLEdBQUcsU0FHWDtnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O0tBQ2hCLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxxQkFBcUIsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUMzQixRQUFRLEdBQUcscUNBQW9CLEVBQUUsQ0FBQztnQkFDbEMsUUFBUSxHQUFHLHFDQUFvQixFQUFFLENBQUM7Z0JBQ3hDLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7d0JBQ2xDLFFBQVEsVUFBQTt3QkFDUixRQUFRLFVBQUE7cUJBQ1QsQ0FBQyxFQUFBOztnQkFIRixTQUdFLENBQUM7Z0JBQ1UscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDN0MsUUFBUSxVQUFBO3FCQUNULENBQUMsRUFBQTs7Z0JBRkksSUFBSSxHQUFHLFNBRVg7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xCLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFBOztnQkFBNUMsU0FBNEMsQ0FBQzs7OztLQUM5QyxDQUFDLENBQUM7QUFDSCxhQUFJLENBQUMsbUJBQW1CLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDekIsS0FBSyxHQUFHLHFDQUFvQixFQUFFLEdBQUcsV0FBVyxDQUFDO2dCQUM3QyxRQUFRLEdBQUcscUNBQW9CLEVBQUUsQ0FBQztnQkFDeEMscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3QkFDbEMsS0FBSyxPQUFBO3dCQUNMLFFBQVEsVUFBQTtxQkFDVCxDQUFDLEVBQUE7O2dCQUhGLFNBR0UsQ0FBQztnQkFDVSxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUM3QyxLQUFLLE9BQUE7cUJBQ04sQ0FBQyxFQUFBOztnQkFGSSxJQUFJLEdBQUcsU0FFWDtnQkFDRixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEIscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUE7O2dCQUE1QyxTQUE0QyxDQUFDOzs7O0tBQzlDLENBQUMsQ0FBQztBQUNILGFBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUMxQixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNoRCxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUM5QyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3BELFFBQVEsR0FBRyxxQ0FBb0IsRUFBRSxDQUFDO2dCQUN4QyxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUNsQyxLQUFLLE9BQUE7d0JBQ0wsUUFBUSxVQUFBO3FCQUNULENBQUMsRUFBQTs7Z0JBSEYsU0FHRSxDQUFDO2dCQUNVLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7d0JBQzdDLEtBQUssT0FBQTtxQkFDTixDQUFDLEVBQUE7O2dCQUZJLElBQUksR0FBRyxTQUVYO2dCQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBQTs7Z0JBQTVDLFNBQTRDLENBQUM7Ozs7S0FDOUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLHVCQUF1QixFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQzdCLFFBQVEsR0FBRyxxQ0FBb0IsRUFBRSxDQUFDO2dCQUNsQyxRQUFRLEdBQUcscUNBQW9CLEVBQUUsQ0FBQztnQkFDcEIscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3QkFDdEQsUUFBUSxVQUFBO3dCQUNSLFFBQVEsVUFBQTtxQkFDVCxDQUFDLEVBQUE7O2dCQUhJLFdBQVcsR0FBRyxTQUdsQjtnQkFDRSxVQUFVLEdBQUcscUNBQW9CLEVBQUUsQ0FBQztnQkFDeEMscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxZQUFBLEVBQUUsQ0FBQyxFQUFBOztnQkFBbkUsU0FBbUUsQ0FBQztnQkFDdkQscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDN0MsVUFBVSxZQUFBO3FCQUNYLENBQUMsRUFBQTs7Z0JBRkksSUFBSSxHQUFHLFNBRVg7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xCLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFBOztnQkFBNUMsU0FBNEMsQ0FBQzs7OztLQUM5QyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMscUJBQXFCLEVBQUUsVUFBTSxDQUFDOzs7O29CQUNwQixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7b0JBQ3BELGNBQWMsRUFBRSxJQUFJO2lCQUNyQixDQUFDLEVBQUE7O2dCQUZJLElBQUksR0FBRyxTQUVYO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7S0FDaEIsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ1IscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDOUMsTUFBTSxFQUFFO3dCQUNOOzRCQUNFLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUU7NEJBQ25ELEtBQUs7NEJBQ0wsV0FBVzt5QkFDWjt3QkFDRDs0QkFDRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTs0QkFDckMsSUFBSTs0QkFDSixFQUFFLEVBQUUsRUFBRSwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO3lCQUNwRDtxQkFDRjtpQkFDRixDQUFDLEVBQUE7O2dCQWJFLEtBQUssR0FBRyxTQWFWO2dCQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Ozs7S0FDakMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUNkLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ1AsQ0FBQyxHQUFHLENBQUM7OztxQkFBRSxDQUFBLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ1IscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3QkFDL0MsUUFBUSxFQUFFLHFDQUFvQixDQUFDLEVBQUUsQ0FBQzt3QkFDbEMsUUFBUSxFQUFFLFNBQVM7cUJBQ3BCLENBQUMsRUFBQTs7Z0JBSEksSUFBSSxHQUFHLFNBR1g7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7OztnQkFMSSxDQUFDLEVBQUUsQ0FBQTs7b0JBT2YscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQTs7Z0JBQS9DLElBQUksR0FBRyxTQUF3QztnQkFDckQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7OztLQUN2QyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsTUFBTSxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQ1osS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDVyxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFBOztnQkFBakUsS0FBdUIsU0FBMEMsRUFBL0QsSUFBSSxVQUFBLEVBQUUsVUFBVSxnQkFBQTtnQkFDeEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFDOzs7O0tBQ3BDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxRQUFRLEVBQUUsVUFBTSxDQUFDOzs7O29CQUNQLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQy9DLFFBQVEsRUFBRSxxQ0FBb0IsRUFBRTtvQkFDaEMsUUFBUSxFQUFFLFNBQVM7aUJBQ3BCLENBQUMsRUFBQTs7Z0JBSEksSUFBSSxHQUFHLFNBR1g7Z0JBRUksUUFBUSxHQUFHLHFDQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7d0JBQzNELFFBQVEsVUFBQTtxQkFDVCxDQUFDLEVBQUE7O2dCQUZJLE9BQU8sR0FBRyxTQUVkO2dCQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQzs7OztLQUN6QyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsYUFBYSxFQUFFLFVBQU0sQ0FBQzs7OztvQkFDWixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUMvQyxRQUFRLEVBQUUscUNBQW9CLEVBQUU7b0JBQ2hDLFFBQVEsRUFBRSxTQUFTO2lCQUNwQixDQUFDLEVBQUE7O2dCQUhJLElBQUksR0FBRyxTQUdYO2dCQUVJLEtBQUssR0FBRyxxQ0FBb0IsRUFBRSxHQUFHLFdBQVcsQ0FBQztnQkFDbkMscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO3dCQUMzRCxLQUFLLE9BQUE7cUJBQ04sQ0FBQyxFQUFBOztnQkFGSSxPQUFPLEdBQUcsU0FFZDtnQkFDRixDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Ozs7S0FDakQsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ2IscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDL0MsUUFBUSxFQUFFLHFDQUFvQixFQUFFO29CQUNoQyxRQUFRLEVBQUUsU0FBUztpQkFDcEIsQ0FBQyxFQUFBOztnQkFISSxJQUFJLEdBQUcsU0FHWDtnQkFFSSxLQUFLLEdBQUcsb0NBQW1CLEVBQUUsQ0FBQztnQkFDcEIscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO3dCQUMzRCxLQUFLLE9BQUE7cUJBQ04sQ0FBQyxFQUFBOztnQkFGSSxPQUFPLEdBQUcsU0FFZDtnQkFDRixDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUM7Ozs7S0FDbkMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ1QscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDL0MsUUFBUSxFQUFFLHFDQUFvQixFQUFFO29CQUNoQyxRQUFRLEVBQUUsU0FBUztpQkFDcEIsQ0FBQyxFQUFBOztnQkFISSxJQUFJLEdBQUcsU0FHWDtnQkFFVyxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLHFDQUFvQixFQUFFLENBQUMsRUFBQTs7Z0JBQWxFLElBQUksR0FBRyxTQUEyRDtnQkFDeEUscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUE7O2dCQUEzRCxTQUEyRCxDQUFDO2dCQUU5QyxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBQTs7Z0JBQXZELEtBQUssR0FBRyxTQUErQztnQkFDN0QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztLQUM1QyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFVBQU0sQ0FBQzs7OztvQkFDdkIscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FDbEQsMEJBQTBCLEVBQzFCLDBCQUEwQixDQUMzQixFQUFBOztnQkFISyxLQUFLLEdBQUcsU0FHYjtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O0tBQ2pCLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxNQUFNLEVBQUUsVUFBTSxDQUFDOzs7O29CQUNMLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQy9DLFFBQVEsRUFBRSxxQ0FBb0IsRUFBRTtvQkFDaEMsUUFBUSxFQUFFLFNBQVM7aUJBQ3BCLENBQUMsRUFBQTs7Z0JBSEksSUFBSSxHQUFHLFNBR1g7Z0JBQ0YscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUE7O2dCQUE1QyxTQUE0QyxDQUFDO2dCQUMvQixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBQTs7Z0JBQXBELEtBQUssR0FBRyxTQUE0QztnQkFDMUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUM7Ozs7S0FDMUIsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ2IscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDL0MsUUFBUSxFQUFFLHFDQUFvQixFQUFFO29CQUNoQyxRQUFRLEVBQUUsU0FBUztpQkFDcEIsQ0FBQyxFQUFBOztnQkFISSxJQUFJLEdBQUcsU0FHWDtnQkFDZ0IscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUE7O2dCQUE1RCxLQUFLLEdBQUssQ0FBQSxTQUFrRCxDQUFBLE1BQXZEO2dCQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ0gscUJBQU0sZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFO3dCQUMxRCxlQUFlLEVBQUUsSUFBSTtxQkFDdEIsQ0FBQyxFQUFBOztnQkFGSSxJQUFJLEdBQUcsU0FFWDtnQkFDRixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7O0tBQy9CLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQU0sQ0FBQzs7OztvQkFDaEIscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDaEQsMEJBQTBCLENBQzNCLEVBQUE7O2dCQUZLLElBQUksR0FBRyxTQUVaO2dCQUNELENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7S0FDaEIsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQzdCLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FDL0QsMEJBQTBCLEVBQzFCLDBCQUEwQixFQUMxQjtvQkFDRSxZQUFZLEVBQUUseUJBQVksQ0FBQyxJQUFJO2lCQUNoQyxDQUNGLEVBQUE7O2dCQU5LLElBQUksR0FBRyxTQU1aO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7S0FDaEIsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUNiLE1BQU0sR0FBRywwQkFBMEIsQ0FBQztnQkFDMUMscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7d0JBQy9DLE1BQU0sRUFBRSxRQUFRO3FCQUNqQixDQUFDLEVBQUE7O2dCQUZGLFNBRUUsQ0FBQztnQkFDVSxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFBOztnQkFBdkQsSUFBSSxHQUFHLFNBQWdEO2dCQUM3RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVmLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUFBOztnQkFBN0QsU0FBNkQsQ0FBQztnQkFDaEQscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBQTs7Z0JBQXhELEtBQUssR0FBRyxTQUFnRDtnQkFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztLQUNoQixDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsa0JBQWtCLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDeEIsTUFBTSxHQUFHLDBCQUEwQixDQUFDO2dCQUMxQyxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTt3QkFDL0MsTUFBTSxFQUFFLFFBQVE7cUJBQ2pCLENBQUMsRUFBQTs7Z0JBRkYsU0FFRSxDQUFDO2dCQUVVLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUE7O2dCQUE5RCxJQUFJLEdBQUcsU0FBdUQ7Z0JBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7S0FDaEIsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLGtCQUFrQixFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQzlCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Z0JBRWIscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO3dCQUM1Qzs0QkFDRSxNQUFNLEVBQUUsMEJBQTBCOzRCQUNsQyxJQUFJLEVBQUU7Z0NBQ0osTUFBTSxFQUFFLFFBQVE7NkJBQ2pCO3lCQUNGO3dCQUNEOzRCQUNFLE1BQU0sRUFBRSwwQkFBMEI7NEJBQ2xDLElBQUksRUFBRTtnQ0FDSixNQUFNLEVBQUUsTUFBTTtnQ0FDZCxHQUFHLEVBQUUsR0FBRzs2QkFDVDt5QkFDRjtxQkFDRixDQUFDLEVBQUE7O2dCQWRGLFNBY0UsQ0FBQztnQkFDVSxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7d0JBQ3pELDBCQUEwQjt3QkFDMUIsMEJBQTBCO3FCQUMzQixDQUFDLEVBQUE7O2dCQUhJLElBQUksR0FBRyxTQUdYO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Z0JBRWYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFLLENBQUMsQ0FBQzs7Ozs7S0FFdEIsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUNqQixRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtxQkFDekIsUUFBUSxDQUFDLEVBQUUsQ0FBQztxQkFDWixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsR0FBRyxHQUFHLFFBQVEsQ0FBQztnQkFDUixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxVQUFBLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUE7O2dCQUF2RSxJQUFJLEdBQUcsU0FBZ0U7Z0JBQ2hFLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQTs7Z0JBQW5ELElBQUksR0FBRyxTQUE0QztnQkFDdkQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDOzs7O0tBQzdCLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyx5QkFBeUIsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUNqQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtxQkFDekIsUUFBUSxDQUFDLEVBQUUsQ0FBQztxQkFDWixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsR0FBRyxHQUFHLFFBQVEsQ0FBQztnQkFDUixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxVQUFBLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUE7O2dCQUF2RSxJQUFJLEdBQUcsU0FBZ0U7Z0JBQzNFLHFCQUFNLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUE7O2dCQUF6RCxTQUF5RCxDQUFDO2dCQUMvQyxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFBOztnQkFBN0QsSUFBSSxHQUFHLFNBQXNEO2dCQUNqRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7O0tBQ3ZDLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyx1QkFBdUIsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUMvQixRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtxQkFDekIsUUFBUSxDQUFDLEVBQUUsQ0FBQztxQkFDWixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsR0FBRyxHQUFHLFFBQVEsQ0FBQztnQkFDUixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxVQUFBLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUE7O2dCQUF2RSxJQUFJLEdBQUcsU0FBZ0U7Z0JBQzNFLHFCQUFNLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUE7O2dCQUF6RCxTQUF5RCxDQUFDO2dCQUMvQyxxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUM3QyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7d0JBQ2YsS0FBSyxFQUFFLGtDQUFpQixFQUFFLENBQUMsS0FBSztxQkFDakMsQ0FBQyxFQUFBOztnQkFIRSxJQUFJLEdBQUcsU0FHVDtnQkFDRixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Ozs7S0FDN0IsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLHVCQUF1QixFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQy9CLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO3FCQUN6QixRQUFRLENBQUMsRUFBRSxDQUFDO3FCQUNaLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDUixHQUFHLEdBQUcsUUFBUSxDQUFDO2dCQUNSLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLFVBQUEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBQTs7Z0JBQXZFLElBQUksR0FBRyxTQUFnRTtnQkFDM0UscUJBQU0sb0JBQW9CLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBQTs7Z0JBQXpELFNBQXlELENBQUM7Z0JBQy9DLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7d0JBQzdDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtxQkFDaEIsQ0FBQyxFQUFBOztnQkFGRSxJQUFJLEdBQUcsU0FFVDtnQkFDRixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Ozs7S0FDN0IsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ2hDLHFCQUFNLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7b0JBQzdELGNBQWMsRUFBRSxDQUFDLE9BQU8sQ0FBQztvQkFDekIsb0JBQW9CLEVBQUUsSUFBSTtvQkFDMUIsTUFBTSxFQUFFLENBQUMsMEJBQTBCLENBQUM7b0JBQ3BDLEtBQUssRUFBRSxhQUFhO2lCQUNyQixDQUFDLEVBQUE7O2dCQUxJLElBQUksR0FBRyxTQUtYO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7S0FDaEIsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQzNCLHFCQUFNLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7b0JBQzdELGNBQWMsRUFBRSxDQUFDLE9BQU8sQ0FBQztvQkFDekIsb0JBQW9CLEVBQUUsSUFBSTtvQkFDMUIsTUFBTSxFQUFFLENBQUMsMEJBQTBCLENBQUM7aUJBQ3JDLENBQUMsRUFBQTs7Z0JBSkksSUFBSSxHQUFHLFNBSVg7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztLQUNoQixDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsdUJBQXVCLEVBQUUsVUFBTSxDQUFDOzs7O29CQUN0QixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLDBCQUEwQixFQUFFO29CQUMzRSxjQUFjLEVBQUUsSUFBSTtpQkFDckIsQ0FBQyxFQUFBOztnQkFGSSxJQUFJLEdBQUcsU0FFWDtnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7OztLQUMzQixDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsc0JBQXNCLEVBQUUsVUFBTSxDQUFDOzs7O29CQUNwQixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUM5QyxDQUFDLDBCQUEwQixFQUFFLDBCQUEwQixDQUFDLEVBQ3hEO29CQUNFLFVBQVUsRUFBRSxJQUFJO29CQUNoQixjQUFjLEVBQUUsSUFBSTtpQkFDckIsQ0FDRixFQUFBOztnQkFOSyxLQUFLLEdBQUcsU0FNYjtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O0tBQ2pCLENBQUMsQ0FBQztBQUdILGFBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBTSxDQUFDOzs7O29CQUNqQixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLDBCQUEwQixDQUFDLEVBQUE7O2dCQUFqRixPQUFPLEdBQUcsU0FBdUU7Z0JBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7S0FDbkIsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsVUFBTSxDQUFDOzs7O29CQUNoQixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO29CQUN2RCxNQUFNLEVBQUUsMEJBQTBCO29CQUNsQyxXQUFXLEVBQUUsT0FBTztvQkFDcEIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFLFFBQVE7aUJBQ3JCLENBQUMsRUFBQTs7Z0JBTkksTUFBTSxHQUFHLFNBTWI7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7OztLQUdsQixDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFVBQU0sQ0FBQzs7OztvQkFDbEIscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztvQkFDekQsTUFBTSxFQUFFLDBCQUEwQjtvQkFDbEMsUUFBUSxFQUFFLElBQUk7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFLFFBQVE7aUJBQ3JCLENBQUMsRUFBQTs7Z0JBTEksTUFBTSxHQUFHLFNBS2I7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7OztLQUNsQixDQUFDLENBQUM7QUFHSCxhQUFJLENBQUMsNEJBQTRCLEVBQUUsVUFBTSxDQUFDOzs7O29CQUM1QixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUM7b0JBQ2xFLEtBQUssRUFBRSwwQkFBMEI7aUJBQ2xDLENBQUMsRUFBQTs7Z0JBRkksR0FBRyxHQUFHLFNBRVY7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7OztLQUNmLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxvQkFBb0IsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ3BCLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztvQkFDMUQsZUFBZSxFQUFFLGVBQWU7b0JBQ2hDLEtBQUssRUFBRSwwQkFBMEI7aUJBQ2xDLENBQUMsRUFBQTs7Z0JBSEksR0FBRyxHQUFHLFNBR1Y7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7OztLQUNmLENBQUMsQ0FBQyJ9