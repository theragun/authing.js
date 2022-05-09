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
import { generateRandomEmail, generateRandomString, getOptionsFromEnv } from '../testing-helper';
import test from 'ava';
import { AuthenticationClient } from './AuthenticationClient';
import { authenticator } from 'otplib';
var options = getOptionsFromEnv();
var authenticationClient = new AuthenticationClient(options);
test('获取用户 MFA 认证器列表', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var password, email, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = generateRandomString(14);
                email = generateRandomEmail().toLocaleLowerCase();
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
test('用户请求绑定 MFA 认证器', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var password, email, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = generateRandomString(14);
                email = generateRandomEmail().toLocaleLowerCase();
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
test('用户解绑 MFA 认证器', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var password, email, result, deleteResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = generateRandomString(14);
                email = generateRandomEmail().toLocaleLowerCase();
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
test('用户确认绑定 MFA 认证器', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var password, email, result, code, confirmResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = generateRandomString(14);
                email = generateRandomEmail().toLocaleLowerCase();
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
                code = authenticator.generate(result.secret);
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
test('MFA 口令二次认证', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var password, email, result, code, confirmResult, err_1, code_1, verifyResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = generateRandomString(14);
                email = generateRandomEmail().toLocaleLowerCase();
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
                code = authenticator.generate(result.secret);
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
                code_1 = authenticator.generate(result.secret);
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
test('MFA 恢复代码二次认证', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var password, email, result, code, confirmResult, err_2, verifyResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = generateRandomString(14);
                email = generateRandomEmail().toLocaleLowerCase();
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
                code = authenticator.generate(result.secret);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWZhQXV0aGVudGljYXRpb25DbGllbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYXV0aGVudGljYXRpb24vTWZhQXV0aGVudGljYXRpb25DbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLG9CQUFvQixFQUNwQixpQkFBaUIsRUFDbEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFDdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUN2QyxJQUFNLE9BQU8sR0FBRyxpQkFBaUIsRUFBRSxDQUFDO0FBQ3BDLElBQU0sb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUvRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDdEIsUUFBUSxHQUFHLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxLQUFLLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN4RCxxQkFBTSxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFBOztnQkFBM0QsU0FBMkQsQ0FBQztnQkFDNUQscUJBQU0sb0JBQW9CLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBQTs7Z0JBQXhELFNBQXdELENBQUM7Z0JBQzFDLHFCQUFNLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzt3QkFDakUsSUFBSSxFQUFFLE1BQU07cUJBQ2IsQ0FBQyxFQUFBOztnQkFGSSxNQUFNLEdBQUcsU0FFYjtnQkFDRixD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