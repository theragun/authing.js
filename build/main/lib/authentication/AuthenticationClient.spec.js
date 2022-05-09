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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AuthenticationClient_1 = require("./AuthenticationClient");
var testing_helper_1 = require("../testing-helper");
var ava_1 = __importDefault(require("ava"));
var graphql_v2_1 = require("../../types/graphql.v2");
var ManagementClient_1 = require("../management/ManagementClient");
var managementClient = new ManagementClient_1.ManagementClient(testing_helper_1.getOptionsFromEnv());
ava_1.default('邮箱注册', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, email, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                email = testing_helper_1.generateRandomString() + '@test.com';
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByEmail(email, password)];
            case 1:
                user = _a.sent();
                t.assert(user);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('邮箱注册 # 设置 profile', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, email, password, nickname, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                email = testing_helper_1.generateRandomString() + '@test.com';
                password = testing_helper_1.generateRandomString();
                nickname = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByEmail(email, password, {
                        nickname: nickname
                    })];
            case 1:
                user = _a.sent();
                t.assert(user);
                t.assert(user.nickname === nickname);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('用户名注册', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByUsername(username, password)];
            case 1:
                user = _a.sent();
                t.assert(user);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('发送短信验证码', function () { return __awaiter(void 0, void 0, void 0, function () {
    var authing, phone;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                phone = '17670416754';
                return [4 /*yield*/, authing.sendSmsCode(phone)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('发送重置密码邮件', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var email, authing, code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = 'cj@authing.cn';
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                return [4 /*yield*/, authing.sendEmail(email, graphql_v2_1.EmailScene.ResetPassword)];
            case 1:
                code = (_a.sent()).code;
                t.assert(code === 200);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('修改用户资料', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, nickname, updates;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByUsername(username, password, null, {
                        forceLogin: true
                    })];
            case 1:
                _a.sent();
                nickname = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.updateProfile({ nickname: nickname })];
            case 2:
                updates = _a.sent();
                t.assert(updates.nickname === nickname);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('修改用户资料 # 不能直接修改手机号', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, failed, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByUsername(username, password, null, {
                        forceLogin: true
                    })];
            case 1:
                _a.sent();
                failed = false;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, authing.updateProfile({ phone: testing_helper_1.generateRandomPhone() })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                failed = true;
                return [3 /*break*/, 5];
            case 5:
                t.assert(failed === true);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('修改用户资料 # 不能直接修改邮箱', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, failed, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByUsername(username, password, null, {
                        forceLogin: true
                    })];
            case 1:
                _a.sent();
                failed = false;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, authing.updateProfile({
                        email: testing_helper_1.generateRandomString() + '@test.com'
                    })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                failed = true;
                return [3 /*break*/, 5];
            case 5:
                t.assert(failed === true);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('修改用户资料 # 不能直接修改 unionid', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, failed, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByUsername(username, password, null, {
                        forceLogin: true
                    })];
            case 1:
                _a.sent();
                failed = false;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, authing.updateProfile({ unionid: testing_helper_1.generateRandomString() })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                failed = true;
                return [3 /*break*/, 5];
            case 5:
                t.assert(failed === true);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('修改用户资料 # 不能直接修改 openid', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, failed, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByUsername(username, password, null, {
                        forceLogin: true
                    })];
            case 1:
                _a.sent();
                failed = false;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, authing.updateProfile({ openid: testing_helper_1.generateRandomString() })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                failed = true;
                return [3 /*break*/, 5];
            case 5:
                t.assert(failed === true);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('刷新用户 token', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByUsername(username, password, null, {
                        forceLogin: true
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, authing.refreshToken()];
            case 2:
                data = _a.sent();
                t.assert(data);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('使用 LDAP 登录', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = 'admin';
                password = 'admin';
                return [4 /*yield*/, authing.loginByLdap(username, password)];
            case 1:
                user = _a.sent();
                t.assert(user);
                t.assert(user.username === username);
                t.assert(user.token);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('用户名注册 # autoRegister', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.loginByUsername(username, password, {
                        autoRegister: true
                    })];
            case 1:
                user = _a.sent();
                t.assert(user);
                t.assert(user.username === username);
                t.assert(user.token);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('邮箱 # autoRegister', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, email, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                email = testing_helper_1.generateRandomString(12) + '@qq.com';
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.loginByEmail(email, password, {
                        autoRegister: true
                    })];
            case 1:
                user = _a.sent();
                t.assert(user);
                t.assert(user.email === email.toLowerCase());
                t.assert(user.token);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('注册 # generateToken', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByUsername(username, password, null, {
                        generateToken: true
                    })];
            case 1:
                user = _a.sent();
                t.assert(user);
                t.assert(user.token !== '');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('添加自定义数据', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, key, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.loginByUsername(username, password, {
                        autoRegister: true
                    })];
            case 1:
                _a.sent();
                key = testing_helper_1.generateRandomString(10);
                return [4 /*yield*/, managementClient.udf.set(graphql_v2_1.UdfTargetType.User, key, graphql_v2_1.UdfDataType.String, testing_helper_1.generateRandomString(5))];
            case 2:
                _a.sent();
                return [4 /*yield*/, authing.setUdv(key, '123')];
            case 3:
                _a.sent();
                return [4 /*yield*/, authing.listUdv()];
            case 4:
                list = _a.sent();
                t.assert(list.length);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('添加自定义数据 # 不存在的 key', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, faild, key, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.loginByUsername(username, password, {
                        autoRegister: true
                    })];
            case 1:
                _b.sent();
                faild = false;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                key = testing_helper_1.generateRandomString(10);
                return [4 /*yield*/, authing.setUdv(key, '123')];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                _a = _b.sent();
                faild = true;
                return [3 /*break*/, 5];
            case 5:
                t.assert(faild === true);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('添加自定义数据 # 非法的数据类型', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, key, faild, key_1, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.loginByUsername(username, password, {
                        autoRegister: true
                    })];
            case 1:
                _a.sent();
                key = testing_helper_1.generateRandomString(10);
                return [4 /*yield*/, managementClient.udf.set(graphql_v2_1.UdfTargetType.User, key, graphql_v2_1.UdfDataType.String, testing_helper_1.generateRandomString(5))];
            case 2:
                _a.sent();
                faild = false;
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                key_1 = testing_helper_1.generateRandomString(10);
                return [4 /*yield*/, authing.setUdv(key_1, 123)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_5 = _a.sent();
                faild = true;
                return [3 /*break*/, 6];
            case 6:
                t.assert(faild === true);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('删除自定义数据', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, key, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.loginByUsername(username, password, {
                        autoRegister: true
                    })];
            case 1:
                _a.sent();
                key = testing_helper_1.generateRandomString(10);
                return [4 /*yield*/, managementClient.udf.set(graphql_v2_1.UdfTargetType.User, key, graphql_v2_1.UdfDataType.String, testing_helper_1.generateRandomString(5))];
            case 2:
                _a.sent();
                return [4 /*yield*/, authing.setUdv(key, '123')];
            case 3:
                _a.sent();
                return [4 /*yield*/, authing.removeUdv(key)];
            case 4:
                _a.sent();
                return [4 /*yield*/, authing.listUdv()];
            case 5:
                list = _a.sent();
                t.assert(list.length === 0);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('添加自定义数据 # 字符串', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, key, list, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.loginByUsername(username, password, {
                        autoRegister: true
                    })];
            case 1:
                _a.sent();
                key = testing_helper_1.generateRandomString(10);
                return [4 /*yield*/, managementClient.udf.set(graphql_v2_1.UdfTargetType.User, key, graphql_v2_1.UdfDataType.String, testing_helper_1.generateRandomString(5))];
            case 2:
                _a.sent();
                return [4 /*yield*/, authing.setUdv(key, '123')];
            case 3:
                _a.sent();
                return [4 /*yield*/, authing.listUdv()];
            case 4:
                list = _a.sent();
                t.assert(list.length === 1);
                value = list[0].value;
                t.assert(typeof value === 'string');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('添加自定义数据 # 数字', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, key, list, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.loginByUsername(username, password, {
                        autoRegister: true
                    })];
            case 1:
                _a.sent();
                key = testing_helper_1.generateRandomString(10);
                return [4 /*yield*/, managementClient.udf.set(graphql_v2_1.UdfTargetType.User, key, graphql_v2_1.UdfDataType.Number, testing_helper_1.generateRandomString(5))];
            case 2:
                _a.sent();
                return [4 /*yield*/, authing.setUdv(key, 123)];
            case 3:
                _a.sent();
                return [4 /*yield*/, authing.listUdv()];
            case 4:
                list = _a.sent();
                t.assert(list.length === 1);
                value = list[0].value;
                t.assert(typeof value === 'number');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('添加自定义数据 # boolean', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, key, list, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.loginByUsername(username, password, {
                        autoRegister: true
                    })];
            case 1:
                _a.sent();
                key = testing_helper_1.generateRandomString(10);
                return [4 /*yield*/, managementClient.udf.set(graphql_v2_1.UdfTargetType.User, key, graphql_v2_1.UdfDataType.Boolean, testing_helper_1.generateRandomString(5))];
            case 2:
                _a.sent();
                return [4 /*yield*/, authing.setUdv(key, true)];
            case 3:
                _a.sent();
                return [4 /*yield*/, authing.listUdv()];
            case 4:
                list = _a.sent();
                console.log(list);
                t.assert(list.length === 1);
                value = list[0].value;
                t.assert(typeof value === 'boolean');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('添加自定义数据 # DATETIME', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, key, list, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.loginByUsername(username, password, {
                        autoRegister: true
                    })];
            case 1:
                _a.sent();
                key = testing_helper_1.generateRandomString(10);
                return [4 /*yield*/, managementClient.udf.set(graphql_v2_1.UdfTargetType.User, key, graphql_v2_1.UdfDataType.Datetime, testing_helper_1.generateRandomString(5))];
            case 2:
                _a.sent();
                return [4 /*yield*/, authing.setUdv(key, Date.now())];
            case 3:
                _a.sent();
                return [4 /*yield*/, authing.listUdv()];
            case 4:
                list = _a.sent();
                t.assert(list.length === 1);
                value = list[0].value;
                // @ts-ignore
                t.assert(value instanceof Date);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('添加自定义数据 # OBJECT', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, key, list, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.loginByUsername(username, password, {
                        autoRegister: true
                    })];
            case 1:
                _a.sent();
                key = testing_helper_1.generateRandomString(10);
                return [4 /*yield*/, managementClient.udf.set(graphql_v2_1.UdfTargetType.User, key, graphql_v2_1.UdfDataType.Object, testing_helper_1.generateRandomString(5))];
            case 2:
                _a.sent();
                return [4 /*yield*/, authing.setUdv(key, { ok: 'good' })];
            case 3:
                _a.sent();
                return [4 /*yield*/, authing.listUdv()];
            case 4:
                list = _a.sent();
                t.assert(list.length === 1);
                value = list[0].value;
                t.assert(typeof value === 'object');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('通过 accessToken 初始化', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, data, authing, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: testing_helper_1.generateRandomString()
                })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, managementClient.users.refreshToken(user.id)];
            case 2:
                data = _a.sent();
                authing = new AuthenticationClient_1.AuthenticationClient(__assign(__assign({}, testing_helper_1.getOptionsFromEnv()), { token: data.token }));
                return [4 /*yield*/, authing.getCurrentUser()];
            case 3:
                newUser = _a.sent();
                t.assert(newUser);
                t.assert(newUser.id === user.id);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('通过 accessToken 初始化 2', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, data, authing;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: testing_helper_1.generateRandomString()
                })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, managementClient.users.refreshToken(user.id)];
            case 2:
                data = _a.sent();
                authing = new AuthenticationClient_1.AuthenticationClient(__assign(__assign({}, testing_helper_1.getOptionsFromEnv()), { token: data.token }));
                return [4 /*yield*/, authing.updateProfile({ nickname: 'nick' })];
            case 3:
                user = _a.sent();
                t.assert(user.nickname === 'nick');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('listOrgs', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign(__assign({}, testing_helper_1.getOptionsFromEnv()), { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJ1c2VyIiwidXNlclBvb2xJZCI6IjU5Zjg2YjQ4MzJlYjI4MDcxYmRkOTIxNCIsImFwcElkIjpudWxsLCJhcm4iOiJhcm46Y246YXV0aGluZzo1OWY4NmI0ODMyZWIyODA3MWJkZDkyMTQ6dXNlcjo1Zjk5NzZhNzM4OWI2ZGNjYjIzYTRjNTQiLCJpZCI6IjVmOTk3NmE3Mzg5YjZkY2NiMjNhNGM1NCIsInVzZXJJZCI6IjVmOTk3NmE3Mzg5YjZkY2NiMjNhNGM1NCIsIl9pZCI6IjVmOTk3NmE3Mzg5YjZkY2NiMjNhNGM1NCIsInBob25lIjpudWxsLCJlbWFpbCI6ImNqQGF1dGhpbmcuY24iLCJ1c2VybmFtZSI6bnVsbCwidW5pb25pZCI6bnVsbCwib3BlbmlkIjpudWxsLCJjbGllbnRJZCI6IjU5Zjg2YjQ4MzJlYjI4MDcxYmRkOTIxNCJ9LCJpYXQiOjE2MDM4OTI5MDgsImV4cCI6MTYwNTE4ODkwOH0.Qf3g_I8QLXpEjL3jgayzB6TgmVZ9lwjxTWtRCzn7JUg' }));
                return [4 /*yield*/, authing.listOrgs()];
            case 1:
                data = _a.sent();
                t.assert(data);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('checkPasswordStrength', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, valid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                return [4 /*yield*/, authing.checkPasswordStrength('Passw0rd!')];
            case 1:
                valid = (_a.sent()).valid;
                t.assert(valid);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('checkLoginStatus', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, data, authing, data2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: testing_helper_1.generateRandomString()
                })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, managementClient.users.refreshToken(user.id)];
            case 2:
                data = _a.sent();
                authing = new AuthenticationClient_1.AuthenticationClient(__assign(__assign({}, testing_helper_1.getOptionsFromEnv()), { token: data.token }));
                return [4 /*yield*/, authing.checkLoginStatus()];
            case 3:
                data2 = _a.sent();
                t.assert(data2.code === 200);
                t.assert(data2.status === true);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('getUdfValue', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, username, password, data, data2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                username = testing_helper_1.generateRandomString(12);
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.loginByUsername(username, password, {
                        autoRegister: true
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, authing.setUdfValue({
                        school: '华中科技大学'
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, authing.getUdfValue()];
            case 3:
                data = _a.sent();
                t.assert(data.school === '华中科技大学');
                return [4 /*yield*/, authing.removeUdfValue('school')];
            case 4:
                _a.sent();
                return [4 /*yield*/, authing.getUdfValue()];
            case 5:
                data2 = _a.sent();
                t.assert(data2.school === undefined);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('拼接 OIDC 授权码模式授权链接', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, url1, url1Data;
    return __generator(this, function (_a) {
        authing = new AuthenticationClient_1.AuthenticationClient({
            appId: '9072248490655972',
            appHost: 'https://oidc1.authing.cn',
            secret: '16657960936447935',
            redirectUri: 'https://baidu.com',
            tokenEndPointAuthMethod: 'client_secret_basic',
            protocol: 'oidc'
        });
        url1 = authing.buildAuthorizeUrl({
            responseType: 'code',
            responseMode: 'form_post'
        });
        url1Data = new URL(url1);
        t.assert(url1Data.hostname === 'oidc1.authing.cn');
        t.assert(url1Data.pathname === '/oidc/auth');
        t.assert(typeof parseInt(url1Data.searchParams.get('nonce')) === 'number');
        t.assert(typeof parseInt(url1Data.searchParams.get('state')) === 'number');
        t.assert(url1Data.searchParams.get('scope') === 'openid profile email phone address');
        t.assert(url1Data.searchParams.get('client_id') === '9072248490655972');
        t.assert(url1Data.searchParams.get('response_mode') === 'form_post');
        t.assert(url1Data.searchParams.get('redirect_uri') === 'https://baidu.com');
        t.assert(url1Data.searchParams.get('response_type') === 'code');
        return [2 /*return*/];
    });
}); });
ava_1.default('拼接 OIDC 授权码模式 + 多租户授权链接', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, url1, url1Data;
    return __generator(this, function (_a) {
        authing = new AuthenticationClient_1.AuthenticationClient({
            appId: '9072248490655972',
            appHost: 'https://oidc1.authing.cn',
            secret: '16657960936447935',
            redirectUri: 'https://baidu.com',
            tokenEndPointAuthMethod: 'client_secret_basic',
            protocol: 'oidc',
        });
        url1 = authing.buildAuthorizeUrl({
            responseType: 'code',
            responseMode: 'form_post',
            tenantId: '12'
        });
        url1Data = new URL(url1);
        t.assert(url1Data.hostname === 'oidc1.authing.cn');
        t.assert(url1Data.pathname === '/oidc/auth');
        t.assert(typeof parseInt(url1Data.searchParams.get('nonce')) === 'number');
        t.assert(typeof parseInt(url1Data.searchParams.get('state')) === 'number');
        t.assert(url1Data.searchParams.get('scope') === 'openid profile email phone address');
        t.assert(url1Data.searchParams.get('client_id') === '9072248490655972');
        t.assert(url1Data.searchParams.get('response_mode') === 'form_post');
        t.assert(url1Data.searchParams.get('redirect_uri') === 'https://baidu.com');
        t.assert(url1Data.searchParams.get('response_type') === 'code');
        t.assert(url1Data.searchParams.get('tenant_id') === '12');
        return [2 /*return*/];
    });
}); });
ava_1.default('拼接 OIDC 隐式模式授权链接', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, url1, url1Data;
    return __generator(this, function (_a) {
        authing = new AuthenticationClient_1.AuthenticationClient({
            appId: '9072248490655972',
            appHost: 'https://oidc1.authing.cn',
            secret: '16657960936447935',
            redirectUri: 'https://baidu.com',
            tokenEndPointAuthMethod: 'client_secret_basic',
            protocol: 'oidc'
        });
        url1 = authing.buildAuthorizeUrl({ responseType: 'id_token token' });
        url1Data = new URL(url1);
        t.assert(url1Data.hostname === 'oidc1.authing.cn');
        t.assert(url1Data.pathname === '/oidc/auth');
        t.assert(typeof parseInt(url1Data.searchParams.get('nonce')) === 'number');
        t.assert(typeof parseInt(url1Data.searchParams.get('state')) === 'number');
        t.assert(url1Data.searchParams.get('scope') === 'openid profile email phone address');
        t.assert(url1Data.searchParams.get('client_id') === '9072248490655972');
        t.falsy(url1Data.searchParams.get('response_mode'));
        t.assert(url1Data.searchParams.get('redirect_uri') === 'https://baidu.com');
        t.assert(url1Data.searchParams.get('response_type') === 'id_token token');
        return [2 /*return*/];
    });
}); });
ava_1.default('拼接 OIDC 带 refresh_token 能力的授权链接', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, url1, url1Data;
    return __generator(this, function (_a) {
        authing = new AuthenticationClient_1.AuthenticationClient({
            appId: '9072248490655972',
            appHost: 'https://oidc1.authing.cn',
            secret: '16657960936447935',
            redirectUri: 'https://baidu.com',
            tokenEndPointAuthMethod: 'client_secret_basic',
            protocol: 'oidc'
        });
        url1 = authing.buildAuthorizeUrl({
            scope: 'openid profile offline_access'
        });
        url1Data = new URL(url1);
        t.assert(url1Data.hostname === 'oidc1.authing.cn');
        t.assert(url1Data.pathname === '/oidc/auth');
        t.assert(typeof parseInt(url1Data.searchParams.get('nonce')) === 'number');
        t.assert(typeof parseInt(url1Data.searchParams.get('state')) === 'number');
        t.assert(url1Data.searchParams.get('scope') === 'openid profile offline_access');
        t.assert(url1Data.searchParams.get('client_id') === '9072248490655972');
        t.assert(url1Data.searchParams.get('redirect_uri') === 'https://baidu.com');
        t.assert(url1Data.searchParams.get('response_type') === 'code');
        t.assert(url1Data.searchParams.get('prompt') === 'consent');
        t.falsy(url1Data.searchParams.get('code_verifier'));
        return [2 /*return*/];
    });
}); });
ava_1.default('拼接 OIDC 授权码 + PKCE 带 refresh_token 能力的授权链接', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, codeChallenge, codeChallengeDigest, url, url1Data;
    return __generator(this, function (_a) {
        authing = new AuthenticationClient_1.AuthenticationClient({
            appId: '9072248490655972',
            appHost: 'https://oidc1.authing.cn',
            secret: '16657960936447935',
            redirectUri: 'https://baidu.com',
            tokenEndPointAuthMethod: 'client_secret_basic',
            protocol: 'oidc'
        });
        codeChallenge = authing.generateCodeChallenge();
        console.log(codeChallenge);
        codeChallengeDigest = authing.getCodeChallengeDigest({
            codeChallenge: codeChallenge,
            method: 'S256'
        });
        // 如果需要获取 Refresh token，请在 scope 中加入 offline_access 项
        console.log(codeChallengeDigest);
        url = authing.buildAuthorizeUrl({
            codeChallenge: codeChallengeDigest,
            codeChallengeMethod: 'S256',
            scope: 'openid profile offline_access'
        });
        console.log(url);
        url1Data = new URL(url);
        t.assert(url1Data.hostname === 'oidc1.authing.cn');
        t.assert(url1Data.pathname === '/oidc/auth');
        t.assert(typeof parseInt(url1Data.searchParams.get('nonce')) === 'number');
        t.assert(typeof parseInt(url1Data.searchParams.get('state')) === 'number');
        t.assert(url1Data.searchParams.get('scope') === 'openid profile offline_access');
        t.assert(url1Data.searchParams.get('client_id') === '9072248490655972');
        t.assert(url1Data.searchParams.get('redirect_uri') === 'https://baidu.com');
        t.assert(url1Data.searchParams.get('response_type') === 'code');
        t.assert(url1Data.searchParams.get('prompt') === 'consent');
        t.assert(url1Data.searchParams.get('code_challenge') === codeChallengeDigest);
        t.assert(url1Data.searchParams.get('code_challenge_method') === 'S256');
        return [2 /*return*/];
    });
}); });
ava_1.default('OIDC 授权码 + PKCE code 换 token', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient({
                    appId: '5f17a529f64fb009b794a2ff',
                    appHost: 'https://oidc1.authing.cn',
                    redirectUri: 'https://baidu.com',
                    tokenEndPointAuthMethod: 'none',
                    protocol: 'oidc'
                });
                return [4 /*yield*/, authing.getAccessTokenByCode('xoLxw18uPidrwNHWMFC8AwlBl5aciCP8Em_-NcvURZ-', {
                        codeVerifier: 'Bu6RP796BBiAwGwdUpHpKfhmQqahszBcGep8qT31XOy'
                    })];
            case 1:
                res = _a.sent();
                t.assert(res.access_token);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('拼接 OAuth 授权链接', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, url1, url1Data;
    return __generator(this, function (_a) {
        authing = new AuthenticationClient_1.AuthenticationClient({
            appId: '9072248490655972',
            appHost: 'https://oidc1.authing.cn',
            secret: '16657960936447935',
            redirectUri: 'https://baidu.com',
            tokenEndPointAuthMethod: 'client_secret_basic',
            protocol: 'oauth'
        });
        url1 = authing.buildAuthorizeUrl();
        url1Data = new URL(url1);
        t.assert(url1Data.hostname === 'oidc1.authing.cn');
        t.assert(url1Data.pathname === '/oauth/auth');
        t.assert(typeof parseInt(url1Data.searchParams.get('nonce')) === 'number');
        t.assert(typeof parseInt(url1Data.searchParams.get('state')) === 'number');
        t.assert(url1Data.searchParams.get('scope') === 'user');
        t.assert(url1Data.searchParams.get('client_id') === '9072248490655972');
        t.assert(url1Data.searchParams.get('redirect_uri') === 'https://baidu.com');
        t.assert(url1Data.searchParams.get('response_type') === 'code');
        return [2 /*return*/];
    });
}); });
ava_1.default('拼接 Saml 授权链接', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, url1, url1Data;
    return __generator(this, function (_a) {
        authing = new AuthenticationClient_1.AuthenticationClient({
            appId: '9072248490655972',
            protocol: 'saml',
            appHost: 'https://oidc1.authing.cn'
        });
        url1 = authing.buildAuthorizeUrl();
        url1Data = new URL(url1);
        t.assert(url1Data.hostname === 'oidc1.authing.cn');
        t.assert(url1Data.pathname === "/api/v2/saml-idp/9072248490655972");
        return [2 /*return*/];
    });
}); });
ava_1.default('拼接 CAS 授权链接', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, url1, url1Data;
    return __generator(this, function (_a) {
        authing = new AuthenticationClient_1.AuthenticationClient({
            appId: '9072248490655972',
            secret: '16657960936447935',
            redirectUri: 'https://baidu.com',
            tokenEndPointAuthMethod: 'client_secret_basic',
            protocol: 'cas',
            appHost: 'https://oidc1.authing.cn'
        });
        url1 = authing.buildAuthorizeUrl();
        url1Data = new URL(url1);
        t.assert(url1Data.hostname === 'oidc1.authing.cn');
        t.assert(url1Data.pathname === "/cas-idp/9072248490655972");
        return [2 /*return*/];
    });
}); });
ava_1.default('拼接 CAS 授权链接，带 service 参数', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, url1, url1Data;
    return __generator(this, function (_a) {
        authing = new AuthenticationClient_1.AuthenticationClient({
            appId: '9072248490655972',
            secret: '16657960936447935',
            redirectUri: 'https://baidu.com',
            tokenEndPointAuthMethod: 'client_secret_basic',
            protocol: 'cas',
            appHost: 'https://oidc1.authing.cn'
        });
        url1 = authing.buildAuthorizeUrl({ service: 'https://authing.cn' });
        url1Data = new URL(url1);
        t.assert(url1Data.hostname === 'oidc1.authing.cn');
        t.assert(url1Data.pathname === "/cas-idp/9072248490655972");
        t.assert(url1Data.searchParams.get('service') === 'https://authing.cn');
        return [2 /*return*/];
    });
}); });
ava_1.default('拼接 OIDC 傻瓜登出链接', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, url1, url1Data;
    return __generator(this, function (_a) {
        authing = new AuthenticationClient_1.AuthenticationClient({
            appId: '9072248490655972',
            secret: '16657960936447935',
            redirectUri: 'https://baidu.com',
            tokenEndPointAuthMethod: 'client_secret_basic',
            protocol: 'oidc',
            appHost: 'https://oidc1.authing.cn'
        });
        url1 = authing.buildLogoutUrl();
        url1Data = new URL(url1);
        t.assert(url1Data.hostname === 'oidc1.authing.cn');
        t.assert(url1Data.pathname === "/login/profile/logout");
        return [2 /*return*/];
    });
}); });
ava_1.default('拼接 OIDC 专家登出链接', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, url1, url1Data;
    return __generator(this, function (_a) {
        authing = new AuthenticationClient_1.AuthenticationClient({
            appId: '9072248490655972',
            secret: '16657960936447935',
            redirectUri: 'https://baidu.com',
            tokenEndPointAuthMethod: 'client_secret_basic',
            protocol: 'oidc',
            appHost: 'https://oidc1.authing.cn'
        });
        url1 = authing.buildLogoutUrl({
            expert: true,
            idToken: '123',
            redirectUri: 'https://authing.cn'
        });
        url1Data = new URL(url1);
        t.assert(url1Data.hostname === 'oidc1.authing.cn');
        t.assert(url1Data.pathname === "/oidc/session/end");
        t.assert(url1Data.searchParams.get('id_token_hint') === '123');
        t.assert(url1Data.searchParams.get('post_logout_redirect_uri') ===
            'https://authing.cn');
        return [2 /*return*/];
    });
}); });
ava_1.default('拼接 OAuth 傻瓜登出链接', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, url1, url1Data;
    return __generator(this, function (_a) {
        authing = new AuthenticationClient_1.AuthenticationClient({
            appId: '9072248490655972',
            secret: '16657960936447935',
            redirectUri: 'https://baidu.com',
            tokenEndPointAuthMethod: 'client_secret_basic',
            protocol: 'oauth',
            appHost: 'https://oidc1.authing.cn'
        });
        url1 = authing.buildLogoutUrl();
        url1Data = new URL(url1);
        t.assert(url1Data.hostname === 'oidc1.authing.cn');
        t.assert(url1Data.pathname === "/login/profile/logout");
        return [2 /*return*/];
    });
}); });
ava_1.default('拼接 Saml 傻瓜登出链接', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, url1, url1Data;
    return __generator(this, function (_a) {
        authing = new AuthenticationClient_1.AuthenticationClient({
            appId: '9072248490655972',
            secret: '16657960936447935',
            redirectUri: 'https://baidu.com',
            tokenEndPointAuthMethod: 'client_secret_basic',
            protocol: 'saml',
            appHost: 'https://oidc1.authing.cn'
        });
        url1 = authing.buildLogoutUrl();
        url1Data = new URL(url1);
        t.assert(url1Data.hostname === 'oidc1.authing.cn');
        t.assert(url1Data.pathname === "/login/profile/logout");
        return [2 /*return*/];
    });
}); });
ava_1.default('兼容老版本，使用 host 初始化', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, email, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient({
                    appId: process.env.AUTHING_APP_ID,
                    host: 'http://localhost:3000'
                });
                email = testing_helper_1.generateRandomString() + '@test.com';
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByEmail(email, password)];
            case 1:
                user = _a.sent();
                t.assert(user);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('注册时添加自定义参数 # customData', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, email, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                email = testing_helper_1.generateRandomEmail();
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByEmail(email, password, null, {
                        customData: {
                            source: 'google'
                        }
                    })];
            case 1:
                user = _a.sent();
                t.assert(user);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('注册时添加自定义参数 # params', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, email, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                email = testing_helper_1.generateRandomEmail();
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByEmail(email, password, null, {
                        params: [
                            {
                                key: 'source',
                                value: 'google'
                            }
                        ]
                    })];
            case 1:
                user = _a.sent();
                t.assert(user);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('登录添加自定义 context', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                return [4 /*yield*/, authing.loginByEmail('cj@authing.cn', 'cj@authing.cn', {
                        context: {
                            param: '1'
                        }
                    })];
            case 1:
                user = _a.sent();
                console.log(user);
                t.assert(true);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('注册添加自定义 context', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, email, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                email = testing_helper_1.generateRandomEmail();
                password = 'passw0rd';
                return [4 /*yield*/, authing.registerByEmail(email, password, null, {
                        context: {
                            fuck: true
                        }
                    })];
            case 1:
                user = _a.sent();
                console.log(user);
                t.assert(true);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('绑定社交账号', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                return [4 /*yield*/, authing.linkAccount({
                        primaryUserToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZnRXg4VXRGTVB3VGY0aHRmdnpnaEx0U3Ntci1wSm9GcXVzYVJNMjlRZmMifQ.eyJzdWIiOiI2MDY2YjkwNzA5NzhlMjg3M2IyYjQzMTgiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL2ZpbGVzLmF1dGhpbmcuY28vYXV0aGluZy1jb25zb2xlL2RlZmF1bHQtdXNlci1hdmF0YXIucG5nIiwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJwcm9maWxlIjpudWxsLCJ1cGRhdGVkX2F0IjoiMjAyMS0wNC0wMlQwNjoyNjoxNi4yMzFaIiwid2Vic2l0ZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImFkZHJlc3MiOnsiY291bnRyeSI6bnVsbCwicG9zdGFsX2NvZGUiOm51bGwsInJlZ2lvbiI6bnVsbCwiZm9ybWF0dGVkIjpudWxsfSwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJlbWFpbCI6InRlc3QxQDEyMy5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImRhdGEiOnsidHlwZSI6InVzZXIiLCJ1c2VyUG9vbElkIjoiNjAwYThmMjljZWFkOGZjMDEyN2Y5ZGE2IiwiYXBwSWQiOiI2MDBhOGY0ZTM3NzA4YjM2MzAyNGEzY2EiLCJpZCI6IjYwNjZiOTA3MDk3OGUyODczYjJiNDMxOCIsInVzZXJJZCI6IjYwNjZiOTA3MDk3OGUyODczYjJiNDMxOCIsIl9pZCI6IjYwNjZiOTA3MDk3OGUyODczYjJiNDMxOCIsInBob25lIjpudWxsLCJlbWFpbCI6InRlc3QxQDEyMy5jb20iLCJ1c2VybmFtZSI6bnVsbCwidW5pb25pZCI6bnVsbCwib3BlbmlkIjpudWxsLCJjbGllbnRJZCI6IjYwMGE4ZjI5Y2VhZDhmYzAxMjdmOWRhNiJ9LCJ1c2VycG9vbF9pZCI6IjYwMGE4ZjI5Y2VhZDhmYzAxMjdmOWRhNiIsImF1ZCI6IjYwMGE4ZjRlMzc3MDhiMzYzMDI0YTNjYSIsImV4cCI6MTYxODU1NDQyNSwiaWF0IjoxNjE3MzQ0ODI1LCJpc3MiOiJodHRwczovL2Jhem9va2ExLmF1dGhpbmcuY24vb2lkYyJ9.cGcJqm54tnBayVCqhdO56aeH4BGvU24RVo76rCUt9LnYIdaLrY7cJSNTN6qwgTSHJKlDAk3ZOdWVLFV7X48L8caNxB4R7mLlcnJFixqSe34KYlhuXkCQa75yKa4jU-2RoTgnWzEVpwiINIEHGoU0P2hCJfbsoEvvJUMTT4o5Fkr0CDB7R3XmWCW5VB4jiNQziwLxaL2JecI1YQG0xTIxcya9Lti36TmC3Jx9wOsF2W-jcWRRlMir9efd8ATbz1NdGkx-ghcvot7y0NH746u2spU2if5pgxAsJIspVttrELjTJkHb3WIiuStfORGsvXdQySO3vXmkQDVld9GyvQNFuA',
                        secondaryUserToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZnRXg4VXRGTVB3VGY0aHRmdnpnaEx0U3Ntci1wSm9GcXVzYVJNMjlRZmMifQ.eyJzdWIiOiI2MDY2YjkwZTYxYmYwOTZjNTMxNTE4YzUiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOiJZZSBMZXhpbiIsInBpY3R1cmUiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMjcxMjU0NDU_dj00IiwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJwcm9maWxlIjoiaHR0cHM6Ly9naXRodWIuY29tL3llbGV4aW4iLCJ1cGRhdGVkX2F0IjoiMjAyMS0wNC0wMlQwNjoyNjoyMi40MjBaIiwid2Vic2l0ZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImFkZHJlc3MiOnsiY291bnRyeSI6bnVsbCwicG9zdGFsX2NvZGUiOm51bGwsInJlZ2lvbiI6bnVsbCwiZm9ybWF0dGVkIjpudWxsfSwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJlbWFpbCI6InllbGV4aW5AaG90bWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImRhdGEiOnsidHlwZSI6InVzZXIiLCJ1c2VyUG9vbElkIjoiNjAwYThmMjljZWFkOGZjMDEyN2Y5ZGE2IiwiYXBwSWQiOiI2MDBhOGY0ZTM3NzA4YjM2MzAyNGEzY2EiLCJpZCI6IjYwNjZiOTBlNjFiZjA5NmM1MzE1MThjNSIsInVzZXJJZCI6IjYwNjZiOTBlNjFiZjA5NmM1MzE1MThjNSIsIl9pZCI6IjYwNjZiOTBlNjFiZjA5NmM1MzE1MThjNSIsInBob25lIjpudWxsLCJlbWFpbCI6InllbGV4aW5AaG90bWFpbC5jb20iLCJ1c2VybmFtZSI6InllbGV4aW4iLCJ1bmlvbmlkIjoiMjcxMjU0NDUiLCJvcGVuaWQiOiIyNzEyNTQ0NSIsImNsaWVudElkIjoiNjAwYThmMjljZWFkOGZjMDEyN2Y5ZGE2In0sInVzZXJwb29sX2lkIjoiNjAwYThmMjljZWFkOGZjMDEyN2Y5ZGE2IiwiYXVkIjoiNjAwYThmNGUzNzcwOGIzNjMwMjRhM2NhIiwiZXhwIjoxNjE4NTU0MzgzLCJpYXQiOjE2MTczNDQ3ODMsImlzcyI6Imh0dHBzOi8vYmF6b29rYTEuYXV0aGluZy5jbi9vaWRjIn0.NaeI0Io-Aap-v8bOlJgZcV2NVT-LZsE-dDo8tcvyV7DQdU3qoFRyDeL7pC_MKXw_UzSgJ1JeGB7re49ioVc0i2NZoPgWnaEUO-J7miNg9ApbpYAaP1QnM870BwQFrENpJ9nd7KdOuzNiUiIc93atV7wF7xcM9gfXbcO8gKzlU8RzlLT9Us2FC7rTF7MiHG_T4dpDwNHhUAqhEIjyv0uQcNxGN5KiL4H-xSLVSO3DG_wEbXh0cNu2xmsjSq1lNvC_tz1oQf9qhQ9uxjbXA339TRCpsQeVlI9W6NCvjf8FTKXJl6taLKQGH58R1H246uDY6PgmoCcRMGKlT26kk3iEeg'
                    })];
            case 1:
                res = _a.sent();
                t.assert(res.code === 200);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('解除社交账号绑定', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                return [4 /*yield*/, authing.unLinkAccount({
                        primaryUserToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZnRXg4VXRGTVB3VGY0aHRmdnpnaEx0U3Ntci1wSm9GcXVzYVJNMjlRZmMifQ.eyJzdWIiOiI2MDBhOTAwMDQ2MzIyMDkzNGQwODhkNTciLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOiJZZSBMZXhpbiIsInBpY3R1cmUiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMjcxMjU0NDU_dj00IiwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJwcm9maWxlIjoiaHR0cHM6Ly9naXRodWIuY29tL3llbGV4aW4iLCJ1cGRhdGVkX2F0IjoiMjAyMS0wNC0wMlQwNjoxNjowMS43MjZaIiwid2Vic2l0ZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImFkZHJlc3MiOnsiY291bnRyeSI6bnVsbCwicG9zdGFsX2NvZGUiOm51bGwsInJlZ2lvbiI6bnVsbCwiZm9ybWF0dGVkIjpudWxsfSwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJlbWFpbCI6InllbGV4aW5AaG90bWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImRhdGEiOnsidHlwZSI6InVzZXIiLCJ1c2VyUG9vbElkIjoiNjAwYThmMjljZWFkOGZjMDEyN2Y5ZGE2IiwiYXBwSWQiOiI2MDBhOGY0ZTM3NzA4YjM2MzAyNGEzY2EiLCJpZCI6IjYwMGE5MDAwNDYzMjIwOTM0ZDA4OGQ1NyIsInVzZXJJZCI6IjYwMGE5MDAwNDYzMjIwOTM0ZDA4OGQ1NyIsIl9pZCI6IjYwMGE5MDAwNDYzMjIwOTM0ZDA4OGQ1NyIsInBob25lIjpudWxsLCJlbWFpbCI6InllbGV4aW5AaG90bWFpbC5jb20iLCJ1c2VybmFtZSI6InllbGV4aW4iLCJ1bmlvbmlkIjoiMjcxMjU0NDUiLCJvcGVuaWQiOiIyNzEyNTQ0NSIsImNsaWVudElkIjoiNjAwYThmMjljZWFkOGZjMDEyN2Y5ZGE2In0sInVzZXJwb29sX2lkIjoiNjAwYThmMjljZWFkOGZjMDEyN2Y5ZGE2IiwiYXVkIjoiNjAwYThmNGUzNzcwOGIzNjMwMjRhM2NhIiwiZXhwIjoxNjE4NTUzNzYyLCJpYXQiOjE2MTczNDQxNjIsImlzcyI6Imh0dHBzOi8vYmF6b29rYTEuYXV0aGluZy5jbi9vaWRjIn0.cNabkd87WZm_AXx9CMQl8aKH-0kv-hQ2SbAgqYcRy_0eGlM3KNRYnhSgs5B3iDT1y8pTJV0UTFnmlW3kLZ8ji59qfdKlJnxqkiyfkOw6sPe1Y9kRLoPgzDPRUyg6lo8gk6i0e-viK9rGyhOGif7pHjq1BIhNqisqilqOpmt_jAQXsO_x6RzQ294QH0Oqr9Jj8zHvcJBPpmikkjbNtbBNROYB7DOUXL_obUEgeNupHdoWwg3czzEiMGHt2H-KsunvL32K_VdfNaXAOaG8f5gYLuE7Irha2u70OxqnuIyvY-fo9SdBMODOOxbU1MCYhYcvgK05o1sh8zcTq-Xdc4nCZQ',
                        provider: 'github'
                    })];
            case 1:
                res = _a.sent();
                t.assert(res.code === 200);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('获取当前用户能访问的应用', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, _a, list, totalCount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign(__assign({}, testing_helper_1.getOptionsFromEnv()), { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDY2YmI5MjYzZjFjYjNjZjhlNDBjYWYiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJkZWZhdWx0LXVzZXItYXZhdGFyLnBuZyIsInByZWZlcnJlZF91c2VybmFtZSI6bnVsbCwicHJvZmlsZSI6bnVsbCwidXBkYXRlZF9hdCI6IjIwMjEtMDQtMDJUMDY6Mzc6MDYuMzI4WiIsIndlYnNpdGUiOm51bGwsInpvbmVpbmZvIjpudWxsLCJhZGRyZXNzIjp7ImNvdW50cnkiOm51bGwsInBvc3RhbF9jb2RlIjpudWxsLCJyZWdpb24iOm51bGwsImZvcm1hdHRlZCI6bnVsbH0sInBob25lX251bWJlciI6bnVsbCwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiZW1haWwiOm51bGwsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZGF0YSI6eyJ0eXBlIjoidXNlciIsInVzZXJQb29sSWQiOiI2MDY1YTJjMzFmM2JhZjgxYTg5ODQwYzciLCJhcHBJZCI6IjYwNjVhMmMzZjMyYjNlYTY3OTIyNDk3ZCIsImlkIjoiNjA2NmJiOTI2M2YxY2IzY2Y4ZTQwY2FmIiwidXNlcklkIjoiNjA2NmJiOTI2M2YxY2IzY2Y4ZTQwY2FmIiwiX2lkIjoiNjA2NmJiOTI2M2YxY2IzY2Y4ZTQwY2FmIiwicGhvbmUiOm51bGwsImVtYWlsIjpudWxsLCJ1c2VybmFtZSI6IkVnS0Q5MkdtZ1BGbyIsInVuaW9uaWQiOm51bGwsIm9wZW5pZCI6bnVsbCwiY2xpZW50SWQiOiI2MDY1YTJjMzFmM2JhZjgxYTg5ODQwYzcifSwidXNlcnBvb2xfaWQiOiI2MDY1YTJjMzFmM2JhZjgxYTg5ODQwYzciLCJhdWQiOiI2MDY1YTJjM2YzMmIzZWE2NzkyMjQ5N2QiLCJleHAiOjE2MTg1NTUwMjYsImlhdCI6MTYxNzM0NTQyNiwiaXNzIjoiaHR0cHM6Ly9kZW1vdXNlcnBvb2wuYXV0aGluZy5sb2NhbC9vaWRjIn0.5DuCvJnR4M4CVjt25LJ2AgPxBk8M3lMaoxeBWXxhhWk' }));
                return [4 /*yield*/, authing.listApplications()];
            case 1:
                _a = _b.sent(), list = _a.list, totalCount = _a.totalCount;
                t.assert(list);
                t.assert(totalCount !== undefined);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('在线验证 idToken 或 accessToken', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, email, password, user2, res, res2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                email = testing_helper_1.generateRandomString() + '@test.com';
                password = testing_helper_1.generateRandomString();
                return [4 /*yield*/, authing.registerByEmail(email, password)];
            case 1:
                _a.sent();
                return [4 /*yield*/, authing.loginByEmail(email, password)];
            case 2:
                user2 = _a.sent();
                return [4 /*yield*/, authing.validateToken({ idToken: user2.token })];
            case 3:
                res = _a.sent();
                t.assert(res.sub === user2.id);
                return [4 /*yield*/, authing.validateToken({ idToken: '1' })];
            case 4:
                res2 = _a.sent();
                t.assert(res2.code === 400);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('使用 Access token 换用户信息，GET + query', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, userInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                return [4 /*yield*/, authing.getUserInfoByAccessToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJycEdYV0xBdDBVZDBPR3VtelZiM08iLCJzdWIiOiI1ZjcxOTk0NjUyNGVlMTA5OTIyOTQ5NmIiLCJpYXQiOjE2MTk1OTg0MjAsImV4cCI6MTYxOTYwMjAyMCwic2NvcGUiOiJwcm9maWxlIGVtYWlsIHBob25lIG9wZW5pZCBhZGRyZXNzIiwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYifQ.Pdfi8cVsGevMRm524kTMJq1v2hqZP2IP3IuFCTZuB9oObti_hpRd4xHGBfUhABnG1qY-oq2By99Ev3i10DhrArAiAh55bqJa7x0TbqihY3HVREHpNH0y5kLUaXKRRJf1KA31EvJm_x3v5qnil52tGgzDa1hqnIBXHSOH09-_co-XwyZS8Ai296tlAtnHBVrEXVJh1WFw81jJ4dQlw1Sgo0XBXkcMBazv-iYq9irspCl52ryDYcD8-ZDdJ1lrOjdmO5DaswGbYNGy75KdwAx4y8X5WqOXEhRe-HZqE7cPsBkNrqt5bUnc5A20mjbcZdR7kvF6bAH7UNqQh3qlI0CFUA', {
                        method: 'GET',
                        tokenPlace: 'query'
                    })];
            case 1:
                userInfo = _a.sent();
                t.truthy(userInfo.sub);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('使用 Access token 换用户信息，GET + body', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, userInfo, _1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, authing.getUserInfoByAccessToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJycEdYV0xBdDBVZDBPR3VtelZiM08iLCJzdWIiOiI1ZjcxOTk0NjUyNGVlMTA5OTIyOTQ5NmIiLCJpYXQiOjE2MTk1OTg0MjAsImV4cCI6MTYxOTYwMjAyMCwic2NvcGUiOiJwcm9maWxlIGVtYWlsIHBob25lIG9wZW5pZCBhZGRyZXNzIiwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYifQ.Pdfi8cVsGevMRm524kTMJq1v2hqZP2IP3IuFCTZuB9oObti_hpRd4xHGBfUhABnG1qY-oq2By99Ev3i10DhrArAiAh55bqJa7x0TbqihY3HVREHpNH0y5kLUaXKRRJf1KA31EvJm_x3v5qnil52tGgzDa1hqnIBXHSOH09-_co-XwyZS8Ai296tlAtnHBVrEXVJh1WFw81jJ4dQlw1Sgo0XBXkcMBazv-iYq9irspCl52ryDYcD8-ZDdJ1lrOjdmO5DaswGbYNGy75KdwAx4y8X5WqOXEhRe-HZqE7cPsBkNrqt5bUnc5A20mjbcZdR7kvF6bAH7UNqQh3qlI0CFUA', {
                        method: 'GET',
                        tokenPlace: 'body'
                    })];
            case 2:
                userInfo = _a.sent();
                t.truthy(userInfo.sub);
                return [3 /*break*/, 4];
            case 3:
                _1 = _a.sent();
                t.pass();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('使用 Access token 换用户信息，GET + header', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, userInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                return [4 /*yield*/, authing.getUserInfoByAccessToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJycEdYV0xBdDBVZDBPR3VtelZiM08iLCJzdWIiOiI1ZjcxOTk0NjUyNGVlMTA5OTIyOTQ5NmIiLCJpYXQiOjE2MTk1OTg0MjAsImV4cCI6MTYxOTYwMjAyMCwic2NvcGUiOiJwcm9maWxlIGVtYWlsIHBob25lIG9wZW5pZCBhZGRyZXNzIiwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYifQ.Pdfi8cVsGevMRm524kTMJq1v2hqZP2IP3IuFCTZuB9oObti_hpRd4xHGBfUhABnG1qY-oq2By99Ev3i10DhrArAiAh55bqJa7x0TbqihY3HVREHpNH0y5kLUaXKRRJf1KA31EvJm_x3v5qnil52tGgzDa1hqnIBXHSOH09-_co-XwyZS8Ai296tlAtnHBVrEXVJh1WFw81jJ4dQlw1Sgo0XBXkcMBazv-iYq9irspCl52ryDYcD8-ZDdJ1lrOjdmO5DaswGbYNGy75KdwAx4y8X5WqOXEhRe-HZqE7cPsBkNrqt5bUnc5A20mjbcZdR7kvF6bAH7UNqQh3qlI0CFUA', {
                        method: 'GET',
                        tokenPlace: 'header'
                    })];
            case 1:
                userInfo = _a.sent();
                t.truthy(userInfo.sub);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('使用 Access token 换用户信息，POST + header', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, userInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                return [4 /*yield*/, authing.getUserInfoByAccessToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJycEdYV0xBdDBVZDBPR3VtelZiM08iLCJzdWIiOiI1ZjcxOTk0NjUyNGVlMTA5OTIyOTQ5NmIiLCJpYXQiOjE2MTk1OTg0MjAsImV4cCI6MTYxOTYwMjAyMCwic2NvcGUiOiJwcm9maWxlIGVtYWlsIHBob25lIG9wZW5pZCBhZGRyZXNzIiwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYifQ.Pdfi8cVsGevMRm524kTMJq1v2hqZP2IP3IuFCTZuB9oObti_hpRd4xHGBfUhABnG1qY-oq2By99Ev3i10DhrArAiAh55bqJa7x0TbqihY3HVREHpNH0y5kLUaXKRRJf1KA31EvJm_x3v5qnil52tGgzDa1hqnIBXHSOH09-_co-XwyZS8Ai296tlAtnHBVrEXVJh1WFw81jJ4dQlw1Sgo0XBXkcMBazv-iYq9irspCl52ryDYcD8-ZDdJ1lrOjdmO5DaswGbYNGy75KdwAx4y8X5WqOXEhRe-HZqE7cPsBkNrqt5bUnc5A20mjbcZdR7kvF6bAH7UNqQh3qlI0CFUA', {
                        method: 'POST',
                        tokenPlace: 'header'
                    })];
            case 1:
                userInfo = _a.sent();
                t.truthy(userInfo.sub);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('使用 Access token 换用户信息，POST + query', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, userInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                return [4 /*yield*/, authing.getUserInfoByAccessToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJycEdYV0xBdDBVZDBPR3VtelZiM08iLCJzdWIiOiI1ZjcxOTk0NjUyNGVlMTA5OTIyOTQ5NmIiLCJpYXQiOjE2MTk1OTg0MjAsImV4cCI6MTYxOTYwMjAyMCwic2NvcGUiOiJwcm9maWxlIGVtYWlsIHBob25lIG9wZW5pZCBhZGRyZXNzIiwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYifQ.Pdfi8cVsGevMRm524kTMJq1v2hqZP2IP3IuFCTZuB9oObti_hpRd4xHGBfUhABnG1qY-oq2By99Ev3i10DhrArAiAh55bqJa7x0TbqihY3HVREHpNH0y5kLUaXKRRJf1KA31EvJm_x3v5qnil52tGgzDa1hqnIBXHSOH09-_co-XwyZS8Ai296tlAtnHBVrEXVJh1WFw81jJ4dQlw1Sgo0XBXkcMBazv-iYq9irspCl52ryDYcD8-ZDdJ1lrOjdmO5DaswGbYNGy75KdwAx4y8X5WqOXEhRe-HZqE7cPsBkNrqt5bUnc5A20mjbcZdR7kvF6bAH7UNqQh3qlI0CFUA', {
                        method: 'POST',
                        tokenPlace: 'query'
                    })];
            case 1:
                userInfo = _a.sent();
                t.truthy(userInfo.sub);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('使用 Access token 换用户信息，POST + body', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, userInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                return [4 /*yield*/, authing.getUserInfoByAccessToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJycEdYV0xBdDBVZDBPR3VtelZiM08iLCJzdWIiOiI1ZjcxOTk0NjUyNGVlMTA5OTIyOTQ5NmIiLCJpYXQiOjE2MTk1OTg0MjAsImV4cCI6MTYxOTYwMjAyMCwic2NvcGUiOiJwcm9maWxlIGVtYWlsIHBob25lIG9wZW5pZCBhZGRyZXNzIiwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYifQ.Pdfi8cVsGevMRm524kTMJq1v2hqZP2IP3IuFCTZuB9oObti_hpRd4xHGBfUhABnG1qY-oq2By99Ev3i10DhrArAiAh55bqJa7x0TbqihY3HVREHpNH0y5kLUaXKRRJf1KA31EvJm_x3v5qnil52tGgzDa1hqnIBXHSOH09-_co-XwyZS8Ai296tlAtnHBVrEXVJh1WFw81jJ4dQlw1Sgo0XBXkcMBazv-iYq9irspCl52ryDYcD8-ZDdJ1lrOjdmO5DaswGbYNGy75KdwAx4y8X5WqOXEhRe-HZqE7cPsBkNrqt5bUnc5A20mjbcZdR7kvF6bAH7UNqQh3qlI0CFUA', {
                        method: 'POST',
                        tokenPlace: 'body'
                    })];
            case 1:
                userInfo = _a.sent();
                t.truthy(userInfo.sub);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('CAS 1.0 验证 ticket，validateTicketV1', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, ticket, service, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                ticket = 'ST-8125e8b0-a6e3-4253-9890-c6b403ed4736';
                service = 'https://baidu.com';
                return [4 /*yield*/, authing.validateTicketV1(ticket, service)];
            case 1:
                result = _a.sent();
                t.assert(result.valid === true);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('CAS 2.0 验证 ticket，validateTicketV2，XML 返回', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, ticket, service, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                ticket = 'ST-e6556a88-58d9-4960-bf3a-f679fb6b54c5';
                service = 'https://baidu.com';
                return [4 /*yield*/, authing.validateTicketV2(ticket, service, 'XML')];
            case 1:
                result = _a.sent();
                t.assert(typeof result === 'string');
                t.assert(result[0] === '<');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.skip('CAS 2.0 验证 ticket，validateTicketV2，JSON 返回', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var authing, ticket, service, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authing = new AuthenticationClient_1.AuthenticationClient(__assign({}, testing_helper_1.getOptionsFromEnv()));
                ticket = 'ST-b6259050-392d-4096-a589-fb8c0a4e2c8d';
                service = 'https://baidu.com';
                return [4 /*yield*/, authing.validateTicketV2(ticket, service, 'JSON')];
            case 1:
                result = _a.sent();
                t.truthy(result.serviceResponse
                    .authenticationSuccess.attributes.email);
                return [2 /*return*/];
        }
    });
}); });
// test('解密 OIDC JWE（ECDH-ES 加密算法）', async (t) => {
//   const authing = new AuthenticationClient({
//     ...getAuthenticationClientOptionsFromEnv(),
//   });
//   const token = `eyJhbGciOiJFQ0RILUVTIiwiZW5jIjoiQTEyOENCQy1IUzI1NiIsImN0eSI6IkpXVCIsImtpZCI6IlZvRHk4ck54eDFGTl94WGxNWVVmaFVBWG82SjVoVEkzY2dwVVE4cUVCNXMiLCJlcGsiOnsia3R5IjoiRUMiLCJjcnYiOiJQLTI1NiIsIngiOiJuRFE5ZS1yVlA2N19xRWp4bkpBYmZESGtQRkwzczRpRkdicXJCejRDVWF3IiwieSI6IlBRLXhmeUMzd1dvRW5LX215Z01YcUVoalNiZ1FWUVgzV2Yzc3ctQ2RmTE0ifX0..LeosNcRDr7YuTXWMLX8vwQ.olwbXQIofYt5mHNmPjBLIJFwbcWBpwS9LoxmqZhseTIUWbKxA_0FFxEjNpgagune7Oe59f-pqajtmIOzZ6UzaNebsCrdu1k2V9xNN4jUkqAR-teM63Cd_RA16bKfbro_ITIKa5Rvq6V_P9fhgDT0NWxxW_c0r6iSHA5fmo4y2h5yYM3ojRQfRPnYeihOIi8wkR7Cr9QO21oPq5s2f3jq3baDbAIQPcVwi28zBMLUtqzyc-5U79VYyYdUSpX7l92-0kYkhgBwlk8kgPEV28B_jml4eKYL4mmRULYXdv2Pm6f6RFjAehAjVwnLOyc2zDpLEt5YTY6CJ1ednEf4zBXUuxRZz4ivX6a3ZwalyaWQsF4mnVJ3fArulVXTKNZ3vgFQHddTsZNijpp4ecH_XEDhAuJlqOMh09E7H79XoxraQTFDmC0Fuql89YAV17Inam89Hf1OH1b4j_1XGMmboJkucFPzDKpp8FXcFTeMoohVoDFBsmaEjTtPunL7-OHGS4LslGpn93N1fvaRDgzTfTDqUqUGpY4esl6AAJzPQt-KKecD3fhYDxn8zkq6uFYklIAIvH-Eqb7aOYbQynwNjbi9B6WH-2Jt-miq0XStnBXNYwSiE5z57folYRqcow2DEFUIcIyeZ4ibXruEloejYfjpdbEMFj3HwuRIk-1nEn5bJbxgxIsRbbFv8Uop-1GBkfiilnjHMjve5CDG1tIgHZtQIfE3r4ifbz8UcsW7DqbXQOPVJ3R-rBfkcmF3HjpAPlIxBSXK8_xPR-2DZAEjSd2mtPWsX00TKNFB-4rWrveroxok6HWKw0-U75m6OLSXi6K99b9su_njmD9fZZ8BvoWbKbU36pwdnqe01XbKuelW6JjBpyIxxAJaMRIw5zfT2fS4W0JEUnkh6HLXQKWcb-aasit66uxz9w0Iduj53sYwH-s3WOSGGID75sB25mj1kiLHt0yX5J-GWVH4hGywJSdxaA0x7BMML9f1HEqDOjJgu-U.cRbB9-I52GpIIfKwRh2yog`;
//   const res = await authing.decryptTokenLocally(token);
//   t.assert(res.sub === '60f010c7e52e8174658da62c');
// });
// test('解密 OIDC JWE（RSA-OAEP 加密算法）', async (t) => {
//   const authing = new AuthenticationClient({
//     ...getAuthenticationClientOptionsFromEnv(),
//   });
//   const token = `eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhDQkMtSFMyNTYiLCJjdHkiOiJKV1QiLCJraWQiOiItMU9mTWpJRVNKdlF5RWNPc2Fwbi1tMkl3dnU5RDZCM003Nl91VTlfM3dBIn0.LUv1JSotW3RAIjfG4aRPz2iIN2ipHvqRjuF1VgkAOuhVl-L3_LlKrO6xA6sTgkMUJfSAkMhq-IpIeByYawGYXWrAyUxWZpEBiPOeVB2ziPU5PQmflFn4sZCSrjoh4HUXrtIdE4_xjLXIPE9cMvhAGnCU_jPDuLFmEzSWvB4oSoaqJ-Vxnn5OMbW-dBLoMkguU_3Wiee7BJTusCYCzmrZvxpiXhpfeN7U9Xir3jofa_x7pEnECSRQQkx_p8Uu5kRl0SZ_YvsDRkH6S2DTUNv9PviaJdjnMWidawd0vxkl9xY76zo5XY3VjV974mZv8JjmfxTcYz7hU52_WhymqovToQ.0JWHFsKIK06PdiaSPBVBEw.05CxpF23HmMpoT7s-mUSTUxeICA9Q10HR8lsd0Vv10EVf_f1crPfiELCVemApNCw1qTMnPPQawEQ1P45q54K32_r6KOfyv_LOG1l83vlq_fjcj5gAjrnaXh6i4OJzrTUYxZGOZw_GoQvHmH785QDkTrP07IaSVr3RUWAHiOaUeXvEbUpP5F0XA7jI9eTcUNr9ari4ZvSJB8hD45TTERPxUOHeIqI18Oh_bsIKAhpRXFOVoVyYPAOn1Az5_CZ--RdqY-eGMJbUMFBUOI12xmyWaHLQetH9XELITqwHw-nQgL-XLE6CWWc8343seroDw2xQfVX1FXEvnxLRI5KIcSJEww8mEjzuMKWHYTDozQ8BI4gZKeh8y3snqDunjof2y_VaI_tWQ1NDrQYAVjDFt85TtsiXq3EAsNur-A8PfQKO57yfR0dOPFixFBnCeB68vsi_MzmvOv2CPqEqHid26ecljhtvjvtNnlroueBIzPjXPVpUvpBlnGRxU_YvTwa5Trh3aZQVb54CabHMPB_2aBWjz7FAb1BC6_l18bSmo4Sj8w5IePQOJ5VQbhle3qjlKz_NeiEKRJt3HOefnQWPEEm6wnI7vlN-wj5g8PUrcrJJUAGxD27KguNg-_4xILZSnXGo_NyZcvdyeNgzeFskq6jmbYvH-qX--uXjw705ZolxIVdprHoUABfBVT3HG3qXgUvi1qPrzVv2B0NDR6jU4k3Cg_fucX4t3k_9UKDO98UlET8FgJeCBeDViNQFv6j3FhCvqL34cB93F9M6niQBXnu3ZShNNmak_5Y_zp7JFPU20b4eg7MdrsCaeTHOOTmJOUUiBLeV33mZMMqlJNMg-rRNMubfne2KuMueDyb1tAtcpEJFVl-x2zOOTi5g6aNTgY-tNdnfYWunsnoDWKeX0OktSH5wqjd0uRM1F2b3zdKXdES_fV44kjpzuZScQr4720aho33_LZC6rmz4pr_5d7t5l538hM4ZVmIdH5jeYylmlk.SyY2NcBa2PFhiCsZUYNDVA`;
//   const res = await authing.decryptTokenLocally(token);
//   t.assert(res.sub === '60f010c7e52e8174658da62c');
// });
// test('验证 OIDC JWS（HS256 签名算法）', async (t) => {
//   const authing = new AuthenticationClient({
//     ...getAuthenticationClientOptionsFromEnv(),
//   });
//   const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGYwMTBjN2U1MmU4MTc0NjU4ZGE2MmMiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL2ZpbGVzLmF1dGhpbmcuY28vYXV0aGluZy1jb25zb2xlL2RlZmF1bHQtdXNlci1hdmF0YXIucG5nIiwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJwcm9maWxlIjpudWxsLCJ1cGRhdGVkX2F0IjoiMjAyMS0wNy0xNVQxMDo0MToxMS44ODZaIiwid2Vic2l0ZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImF0X2hhc2giOiJiaXNVTW1hQ1pVUU5IUFR3VEU4REtBIiwiYXVkIjoiNjBlZWIwYzVhZDkzMzQ0ZDk4ODMxZGYxIiwiZXhwIjoxNjI3ODk1Mzc3LCJpYXQiOjE2MjY2ODU3NzcsImlzcyI6Imh0dHA6Ly9tYXN0ZXIueHh4LmxvY2FsaG9zdDozMDAwL29pZGMifQ.dzQpvV4FiW_Hti4d0Bhc8IzDZ5TFe6y_sF3sKL4ddeg`;
//   const res = await authing.validateTokenLocally(token);
//   t.assert(res.sub === '60f010c7e52e8174658da62c');
// });
// test('验证 OIDC JWS（RS256 签名算法）', async (t) => {
//   const authing = new AuthenticationClient({
//     ...getAuthenticationClientOptionsFromEnv(),
//   });
//   const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1aVEc5cFNucnFTdFI5NkNLWnZKZVkzS0JwTmZ1dEFoTnVKNUwwTXduSEEifQ.eyJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL2ZpbGVzLmF1dGhpbmcuY28vYXV0aGluZy1jb25zb2xlL2RlZmF1bHQtdXNlci1hdmF0YXIucG5nIiwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJwcm9maWxlIjpudWxsLCJ1cGRhdGVkX2F0IjoiMjAyMS0wNy0xNVQxMDo0MToxMS44ODZaIiwid2Vic2l0ZSI6bnVsbCwiem9uZWluZm8iOm51bGwsInN1YiI6IjYwZjAxMGM3ZTUyZTgxNzQ2NThkYTYyYyIsImF0X2hhc2giOiJPRDdIbHcwQ0E5RHBGdHJjTW9wVnhnIiwiYXVkIjoiNjBlZWIwYzVhZDkzMzQ0ZDk4ODMxZGYxIiwiZXhwIjoxNjI3ODc3MzgyLCJpYXQiOjE2MjY2Njc3ODIsImlzcyI6Imh0dHA6Ly9tYXN0ZXIueHh4LmxvY2FsaG9zdDozMDAwL29pZGMifQ.F-9AApGhv8NbggpDNnRi-30cemk2Cq7njikfcM7nAirSs1iuVJhvjds-nZgpUutrNxa3yWOIIzfC8P_G2QafnzRE3jEB6VisrfoTmwmNnAH3cSzV3XaCukpnoMxjW5sfHzANjls-gTUzRpXBoUMdsDIBBJ0iDGI1GrQIjxI1qJtkqkdwqdsR8ooe8c0YUp5MCpasfwVANe1irloVwNxP967AoK2sJs33BexVm_k0VzhT226tezL-iANcpED52QBZU_PuCb5HwVtJ-RGKnO39S5nuo568ctrxcbp6oCObTrq7xh4xeySxlr5x3IK_EaRefFyCXN_PcNomPnO3PTevcA`;
//   const res = await authing.validateTokenLocally(token);
//   t.assert(res.sub === '60f010c7e52e8174658da62c');
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25DbGllbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYXV0aGVudGljYXRpb24vQXV0aGVudGljYXRpb25DbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQThEO0FBQzlELG9EQUsyQjtBQUMzQiw0Q0FBdUI7QUFDdkIscURBQWdGO0FBQ2hGLG1FQUFrRTtBQUdsRSxJQUFNLGdCQUFnQixHQUFHLElBQUksbUNBQWdCLENBQUMsa0NBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBRW5FLGFBQUksQ0FBQyxNQUFNLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDWixPQUFPLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxrQ0FBaUIsRUFBRSxDQUFDLENBQUM7Z0JBQ3hELEtBQUssR0FBRyxxQ0FBb0IsRUFBRSxHQUFHLFdBQVcsQ0FBQztnQkFDN0MsUUFBUSxHQUFHLHFDQUFvQixFQUFFLENBQUM7Z0JBQzNCLHFCQUFNLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFBOztnQkFBckQsSUFBSSxHQUFHLFNBQThDO2dCQUMzRCxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O0tBQ2hCLENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxtQkFBbUIsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUN6QixPQUFPLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxrQ0FBaUIsRUFBRSxDQUFDLENBQUM7Z0JBQ3hELEtBQUssR0FBRyxxQ0FBb0IsRUFBRSxHQUFHLFdBQVcsQ0FBQztnQkFDN0MsUUFBUSxHQUFHLHFDQUFvQixFQUFFLENBQUM7Z0JBQ2xDLFFBQVEsR0FBRyxxQ0FBb0IsRUFBRSxDQUFDO2dCQUMzQixxQkFBTSxPQUFPLENBQUMsZUFBZSxD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