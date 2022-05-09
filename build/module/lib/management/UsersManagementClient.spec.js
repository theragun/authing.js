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
import { ManagementClient } from './ManagementClient';
import { generateRandomPhone, generateRandomString, getOptionsFromEnv } from '../testing-helper';
import test from 'ava';
import moment from 'moment';
import { ResourceType } from '../../types/graphql.v2';
import { AuthenticationClient } from '../authentication/AuthenticationClient';
var managementClient = new ManagementClient(getOptionsFromEnv());
var authenticationClient = new AuthenticationClient(getOptionsFromEnv());
test('创建用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var username, email, phone, unionid, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = generateRandomString(10);
                email = generateRandomString(10);
                phone = generateRandomPhone();
                unionid = generateRandomString(10);
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
test('创建用户 # 必须指定一种唯一标志', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var failed, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                failed = false;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, managementClient.users.create({
                        password: generateRandomString(10)
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
test('创建用户 # 时间格式1', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: generateRandomString(),
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
test('创建用户 # signedUp', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var signedUp, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                signedUp = '2017-06-07T14:34:08+04:00';
                return [4 /*yield*/, managementClient.users.create({
                        username: generateRandomString(),
                        signedUp: signedUp
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, managementClient.users.detail(user.id)];
            case 2:
                user = _a.sent();
                t.assert(moment(user.signedUp).unix() === moment(signedUp).unix());
                return [2 /*return*/];
        }
    });
}); });
test('创建用户 # 错误时间格式', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var failed, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                failed = false;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, managementClient.users.create({
                        username: generateRandomString(),
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
test.skip('创建用户 # 附带身份信息', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, result, token, result2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: generateRandomString()
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
test('检查用户是否存在', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var exists1, username, email, phone, _a, _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, managementClient.users.exists({
                    username: generateRandomString(10)
                })];
            case 1:
                exists1 = _g.sent();
                t.assert(exists1 === false);
                username = generateRandomString(10);
                email = generateRandomString(10) + '@qq.com';
                phone = generateRandomPhone();
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
test('查询用户详情', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, detail;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: generateRandomString(),
                    password: generateRandomString()
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
test('查询用户详情 # 不属于该用户池的用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test.skip('find withCustomData', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('管理员通过 username 查询用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = generateRandomString();
                password = generateRandomString();
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
test('管理员通过 emmail 查询用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = generateRandomString() + '@test.com';
                password = generateRandomString();
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
test('管理员通过 phone 查询用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var rand1, rand2, phone, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                rand1 = Math.floor(Math.random() * 8999) + 1000;
                rand2 = Math.floor(Math.random() * 8999) + 1000;
                phone = '131' + rand1.toString() + rand2.toString();
                password = generateRandomString();
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
test('管理员通过 externalId 查询用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, userCreated, externalId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = generateRandomString();
                password = generateRandomString();
                return [4 /*yield*/, managementClient.users.create({
                        username: username,
                        password: password
                    })];
            case 1:
                userCreated = _a.sent();
                externalId = generateRandomString();
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
test('list withCustomData', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('filter', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('批量查询用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
                        username: generateRandomString(10),
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
test('搜索用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('修改用户资料', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, nickname, updated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: generateRandomString(),
                    password: '123456!'
                })];
            case 1:
                user = _a.sent();
                nickname = generateRandomString(10);
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
test('修改用户资料 # 邮箱', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, email, updated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: generateRandomString(),
                    password: '123456!'
                })];
            case 1:
                user = _a.sent();
                email = generateRandomString() + '@test.com';
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
test('修改用户资料 # 手机号', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, phone, updated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: generateRandomString(),
                    password: '123456!'
                })];
            case 1:
                user = _a.sent();
                phone = generateRandomPhone();
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
test('获取用户角色列表', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, role, roles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: generateRandomString(),
                    password: '123456!'
                })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, managementClient.roles.create(generateRandomString())];
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
test.skip('获取用户角色列表 namespace', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('删除用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, user2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: generateRandomString(),
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
test('refreshToken', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: generateRandomString(),
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
test.skip('获取用户组织机构列表', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test.skip('listAuthorizedResources', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.users.listAuthorizedResources('603f2c49e91d695739d7206c', '6018bab016c246d458ef0ad2', {
                    resourceType: ResourceType.Menu
                })];
            case 1:
                data = _a.sent();
                console.log(JSON.stringify(data, null, 4));
                t.assert(data);
                return [2 /*return*/];
        }
    });
}); });
test('自定义数据', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('getUdfValueBatch', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('setUdfValueBatch', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('踢下线一批用户', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('用户池管理员根据用户 id 查询用户的登录状态', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('用户池管理员强制下线用户在某个应用的登录态', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
                        appId: getOptionsFromEnv().appId
                    })];
            case 3:
                res2 = _a.sent();
                t.assert(res2.code === 200);
                return [2 /*return*/];
        }
    });
}); });
test('用户池管理员强制下线用户在所有应用的登录态', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test.skip('statistics.listUserActions', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test.skip('users.listUserActions', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('detail withCustomData', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('batch withCustomData', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test.only('getUserTenants', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test.only('linkIdentity', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test.only('unlinkIdentity', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('getApplicationLoginUserNum', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('getUdfFieldUserNum', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnNNYW5hZ2VtZW50Q2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvVXNlcnNNYW5hZ2VtZW50Q2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ2xCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBQ3ZCLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFOUUsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztBQUNuRSxJQUFNLG9CQUFvQixHQUFHLElBQUksb0JBQW9CLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBRTNFLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDWixRQUFRLEdBQUcsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3BDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakMsS0FBSyxHQUFHLG1CQUFtQixFQUFFLENBQUM7Z0JBQzlCLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDNUIscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3QkFDL0MsUUFBUSxVQUFBO3dCQUNSLEtBQUssT0FBQTt3QkFDTCxLQUFLLE9BQUE7d0JBQ0wsT0FB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