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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./AuthenticationClient", "../testing-helper", "ava", "../../types/graphql.v2", "../management/ManagementClient"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25DbGllbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYXV0aGVudGljYXRpb24vQXV0aGVudGljYXRpb25DbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsK0RBQThEO0lBQzlELG9EQUsyQjtJQUMzQiw0Q0FBdUI7SUFDdkIscURBQWdGO0lBQ2hGLG1FQUFrRTtJQUdsRSxJQUFNLGdCQUFnQixHQUFHLElBQUksbUNBQWdCLENBQUMsa0NBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBRW5FLGFBQUksQ0FBQyxNQUFNLEVBQUUsVUFBTSxDQUFDOzs7OztvQkFDWixPQUFPLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxrQ0FBaUIsRUFBRSxDQUFDLENBQUM7b0JBQ3hELEtBQUssR0FBRyxxQ0FBb0IsRUFBRSxHQUFHLFdBQVcsQ0FBQztvQkFDN0MsUUFBUSxHQUFHLHFDQUFvQixFQUFFLENBQUM7b0JBQzNCLHFCQUFNLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFBOztvQkFBckQsSUFBSSxHQUFHLFNBQThDO29CQUMzRCxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O1NBQ2hCLENBQUMsQ0FBQztJQUVILGFBQUksQ0FBQyxtQkFBbUIsRUFBRSxVQUFNLENBQUM7Ozs7O29CQUN6QixPQUFPLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxrQ0FBaUIsRUFBRSxDQUFDLENBQUM7b0JBQ3hELEtBQUssR0FBRyxxQ0FBb0IsRUFBRSxHQUFHLFdBQVcsQ0FBQztvQkFDN0MsUUFBUSxHQUFHLHFDQUFvQixFQUFFLENBQUM7b0JBQ2xDLFFBQVEsR0FBRyxxQ0FBb0IsRUFBRSxDQUFDO29CQUMzQixxQkFBTSxPQUFPLENB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