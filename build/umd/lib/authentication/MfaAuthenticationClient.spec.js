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
        define(["require", "exports", "../testing-helper", "ava", "./AuthenticationClient", "otplib"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var testing_helper_1 = require("../testing-helper");
    var ava_1 = __importDefault(require("ava"));
    var AuthenticationClient_1 = require("./AuthenticationClient");
    var otplib_1 = require("otplib");
    var options = testing_helper_1.getOptionsFromEnv();
    var authenticationClient = new AuthenticationClient_1.AuthenticationClient(options);
    ava_1.default('获取用户 MFA 认证器列表', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var password, email, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = testing_helper_1.generateRandomString(14);
                    email = testing_helper_1.generateRandomEmail().toLocaleLowerCase();
                    return [4 /*yield*/, authenticationClient.registerByEmail(email, password)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authenticationClient.loginByEmail(email, password)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, authenticationClient.mfa.getMfaAuthenticators({
                            type: 'totp'
                        })];
                case 3:
                    result = _a.sent();
                    t.assert(Array.isArray(result));
                    t.assert(result.length === 0);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('用户请求绑定 MFA 认证器', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var password, email, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = testing_helper_1.generateRandomString(14);
                    email = testing_helper_1.generateRandomEmail().toLocaleLowerCase();
                    return [4 /*yield*/, authenticationClient.registerByEmail(email, password)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authenticationClient.loginByEmail(email, password)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, authenticationClient.mfa.assosicateMfaAuthenticator({
                            authenticatorType: 'totp'
                        })];
                case 3:
                    result = _a.sent();
                    t.assert(result.authenticator_type === 'totp');
                    t.assert(typeof result.secret === 'string');
                    t.assert(typeof result.qrcode_uri === 'string');
                    t.assert(typeof result.qrcode_data_url === 'string');
                    t.assert(typeof result.recovery_code === 'string');
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('用户解绑 MFA 认证器', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var password, email, result, deleteResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = testing_helper_1.generateRandomString(14);
                    email = testing_helper_1.generateRandomEmail().toLocaleLowerCase();
                    return [4 /*yield*/, authenticationClient.registerByEmail(email, password)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authenticationClient.loginByEmail(email, password)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, authenticationClient.mfa.assosicateMfaAuthenticator({
                            authenticatorType: 'totp'
                        })];
                case 3:
                    result = _a.sent();
                    t.assert(result.authenticator_type === 'totp');
                    t.assert(typeof result.secret === 'string');
                    t.assert(typeof result.qrcode_uri === 'string');
                    t.assert(typeof result.qrcode_data_url === 'string');
                    t.assert(typeof result.recovery_code === 'string');
                    return [4 /*yield*/, authenticationClient.mfa.deleteMfaAuthenticator()];
                case 4:
                    deleteResult = _a.sent();
                    t.assert(deleteResult.code === 200);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('用户确认绑定 MFA 认证器', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var password, email, result, code, confirmResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = testing_helper_1.generateRandomString(14);
                    email = testing_helper_1.generateRandomEmail().toLocaleLowerCase();
                    return [4 /*yield*/, authenticationClient.registerByEmail(email, password)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authenticationClient.loginByEmail(email, password)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, authenticationClient.mfa.assosicateMfaAuthenticator({
                            authenticatorType: 'totp'
                        })];
                case 3:
                    result = _a.sent();
                    t.assert(result.authenticator_type === 'totp');
                    t.assert(typeof result.secret === 'string');
                    t.assert(typeof result.qrcode_uri === 'string');
                    t.assert(typeof result.qrcode_data_url === 'string');
                    t.assert(typeof result.recovery_code === 'string');
                    code = otplib_1.authenticator.generate(result.secret);
                    return [4 /*yield*/, authenticationClient.mfa.confirmAssosicateMfaAuthenticator({
                            authenticatorType: 'totp',
                            totp: code
                        })];
                case 4:
                    confirmResult = _a.sent();
                    t.assert(confirmResult.code === 200);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('MFA 口令二次认证', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var password, email, result, code, confirmResult, err_1, code_1, verifyResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = testing_helper_1.generateRandomString(14);
                    email = testing_helper_1.generateRandomEmail().toLocaleLowerCase();
                    return [4 /*yield*/, authenticationClient.registerByEmail(email, password)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authenticationClient.loginByEmail(email, password)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, authenticationClient.mfa.assosicateMfaAuthenticator({
                            authenticatorType: 'totp'
                        })];
                case 3:
                    result = _a.sent();
                    t.assert(result.authenticator_type === 'totp');
                    t.assert(typeof result.secret === 'string');
                    t.assert(typeof result.qrcode_uri === 'string');
                    t.assert(typeof result.qrcode_data_url === 'string');
                    t.assert(typeof result.recovery_code === 'string');
                    code = otplib_1.authenticator.generate(result.secret);
                    return [4 /*yield*/, authenticationClient.mfa.confirmAssosicateMfaAuthenticator({
                            authenticatorType: 'totp',
                            totp: code
                        })];
                case 4:
                    confirmResult = _a.sent();
                    t.assert(confirmResult.code === 200);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 9]);
                    return [4 /*yield*/, authenticationClient.loginByEmail(email, password)];
                case 6:
                    _a.sent();
                    t.fail('开启 MFA 失败');
                    return [3 /*break*/, 9];
                case 7:
                    err_1 = _a.sent();
                    t.assert(err_1.code === 1635);
                    code_1 = otplib_1.authenticator.generate(result.secret);
                    return [4 /*yield*/, authenticationClient.mfa.verifyTotpMfa({
                            totp: code_1,
                            mfaToken: err_1.data.mfaToken
                        })];
                case 8:
                    verifyResult = _a.sent();
                    t.assert(verifyResult.id);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('MFA 恢复代码二次认证', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var password, email, result, code, confirmResult, err_2, verifyResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    password = testing_helper_1.generateRandomString(14);
                    email = testing_helper_1.generateRandomEmail().toLocaleLowerCase();
                    return [4 /*yield*/, authenticationClient.registerByEmail(email, password)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authenticationClient.loginByEmail(email, password)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, authenticationClient.mfa.assosicateMfaAuthenticator({
                            authenticatorType: 'totp'
                        })];
                case 3:
                    result = _a.sent();
                    t.assert(result.authenticator_type === 'totp');
                    t.assert(typeof result.secret === 'string');
                    t.assert(typeof result.qrcode_uri === 'string');
                    t.assert(typeof result.qrcode_data_url === 'string');
                    t.assert(typeof result.recovery_code === 'string');
                    code = otplib_1.authenticator.generate(result.secret);
                    return [4 /*yield*/, authenticationClient.mfa.confirmAssosicateMfaAuthenticator({
                            authenticatorType: 'totp',
                            totp: code
                        })];
                case 4:
                    confirmResult = _a.sent();
                    t.assert(confirmResult.code === 200);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 9]);
                    return [4 /*yield*/, authenticationClient.loginByEmail(email, password)];
                case 6:
                    _a.sent();
                    t.fail('开启 MFA 失败');
                    return [3 /*break*/, 9];
                case 7:
                    err_2 = _a.sent();
                    t.assert(err_2.code === 1635);
                    return [4 /*yield*/, authenticationClient.mfa.verifyTotpRecoveryCode({
                            recoveryCode: result.recovery_code,
                            mfaToken: err_2.data.mfaToken
                        })];
                case 8:
                    verifyResult = _a.sent();
                    t.assert(verifyResult.id);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWZhQXV0aGVudGljYXRpb25DbGllbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYXV0aGVudGljYXRpb24vTWZhQXV0aGVudGljYXRpb25DbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLG9EQUkyQjtJQUMzQiw0Q0FBdUI7SUFDdkIsK0RBQThEO0lBQzlELGlDQUF1QztJQUN2QyxJQUFNLE9BQU8sR0FBRyxrQ0FBaUIsRUFBRSxDQUFDO0lBQ3BDLElBQU0sb0JBQW9CLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUvRCxhQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBTSxDQUFDOzs7OztvQkFDdEIsUUFBUSxHQUFHLHFDQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNwQyxLQUFLLEdBQUcsb0NBQW1CLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUN4RCxxQkFBTSxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFBOztvQkFBM0QsU0FBMkQsQ0FBQztvQkFDNUQscUJBQU0sb0JBQW9CLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBQTs7b0JBQXhELFNBQXdELENBQUM7b0JBQzFDLHFCQUFNLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzs0QkFDakUsSUFBSSxFQUFFLE1BQU07eUJBQ2IsQ0FBQyxFQUFBOztvQkFGSSxNQUFNLEdBQUcsU0FFYjtvQkFDRixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDaEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7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