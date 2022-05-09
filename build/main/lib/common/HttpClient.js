"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.NaiveHttpClient = exports.FastHttpClient = exports.HttpClient = void 0;
var version_1 = require("../version");
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("../utils");
var HttpClient = /** @class */ (function () {
    function HttpClient(options, tokenProvider) {
        this.options = options;
        this.tokenProvider = tokenProvider;
        this.axios = axios_1.default.create({
            withCredentials: true
        });
    }
    HttpClient.prototype.request = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, token, data, code, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {};
                        headers[this.options.headers['app-id']] = this.options.appId || '';
                        headers[this.options.headers['tenant-id']] = this.options.tenantId;
                        headers[this.options.headers['userpool-id']] =
                            this.options.userPoolId || '';
                        headers[this.options.headers['request-from']] =
                            this.options.requestFrom || 'sdk';
                        headers[this.options.headers['sdk-version']] = "js:" + version_1.SDK_VERSION;
                        headers[this.options.headers.lang] = this.options.lang || '';
                        if (!!(config && config.headers && config.headers.authorization)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.tokenProvider.getToken()];
                    case 1:
                        token = _a.sent();
                        token && (headers.Authorization = "Bearer " + token);
                        return [3 /*break*/, 3];
                    case 2:
                        headers.authorization = config.headers.authorization;
                        _a.label = 3;
                    case 3:
                        config.headers = headers;
                        config.timeout = this.options.timeout;
                        return [4 /*yield*/, this.axios.request(__assign(__assign({}, config), { headers: __assign({}, utils_1.pickBy(config.headers, function (i) { return !!i; })) }))];
                    case 4:
                        data = (_a.sent()).data;
                        code = data.code, message = data.message;
                        if (code !== 200) {
                            this.options.onError(code, message, data.data);
                            throw new Error(JSON.stringify({ code: code, message: message, data: data.data }));
                        }
                        return [2 /*return*/, data.data];
                }
            });
        });
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
// FastHttpClient 会返回 code 和 message
var FastHttpClient = /** @class */ (function (_super) {
    __extends(FastHttpClient, _super);
    function FastHttpClient(options, tokenProvider) {
        return _super.call(this, options, tokenProvider) || this;
    }
    FastHttpClient.prototype.request = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, token, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {};
                        headers[this.options.headers['app-id']] = this.options.appId || '';
                        headers[this.options.headers['tenant-id']] = this.options.tenantId;
                        headers[this.options.headers['userpool-id']] =
                            this.options.userPoolId || '';
                        headers[this.options.headers['request-from']] =
                            this.options.requestFrom || 'sdk';
                        headers[this.options.headers['sdk-version']] = "js:" + version_1.SDK_VERSION;
                        headers[this.options.headers.lang] = this.options.lang || '';
                        if (!!(config && config.headers && config.headers.authorization)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.tokenProvider.getToken()];
                    case 1:
                        token = _a.sent();
                        token && (headers.Authorization = "Bearer " + token);
                        return [3 /*break*/, 3];
                    case 2:
                        headers.authorization = config.headers.authorization;
                        _a.label = 3;
                    case 3:
                        config.headers = headers;
                        config.timeout = this.options.timeout;
                        return [4 /*yield*/, this.axios.request(__assign(__assign({}, config), { headers: __assign({}, utils_1.pickBy(config.headers, function (i) { return !!i; })) }))];
                    case 4:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return FastHttpClient;
}(HttpClient));
exports.FastHttpClient = FastHttpClient;
var NaiveHttpClient = /** @class */ (function (_super) {
    __extends(NaiveHttpClient, _super);
    function NaiveHttpClient(options, tokenProvider) {
        return _super.call(this, options, tokenProvider) || this;
    }
    NaiveHttpClient.prototype.request = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {};
                        headers[this.options.headers['app-id']] = this.options.appId || '';
                        headers[this.options.headers['userpool-id']] = headers[this.options.headers['tenant-id']] = this.options.tenantId;
                        this.options.userPoolId || '';
                        headers[this.options.headers['request-from']] =
                            this.options.requestFrom || 'sdk';
                        headers[this.options.headers['sdk-version']] = "js:" + version_1.SDK_VERSION;
                        headers[this.options.headers.lang] = this.options.lang || '';
                        config.headers = __assign(__assign({}, headers), config.headers);
                        config.timeout = this.options.timeout;
                        return [4 /*yield*/, this.axios.request(__assign(__assign({}, config), { headers: __assign({}, utils_1.pickBy(config.headers, function (i) { return !!i; })) }))];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return NaiveHttpClient;
}(HttpClient));
exports.NaiveHttpClient = NaiveHttpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHR0cENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29tbW9uL0h0dHBDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFLekMsZ0RBQWlFO0FBQ2pFLGtDQUFrQztBQUVsQztJQUtFLG9CQUNFLE9BQThELEVBQzlELGFBQW9FO1FBRXBFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQztZQUN4QixlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUssNEJBQU8sR0FBYixVQUFjLE1BQTBCOzs7Ozs7d0JBQ2hDLE9BQU8sR0FBUSxFQUFFLENBQUM7d0JBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzt3QkFDbkUsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ25FLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzs0QkFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO3dCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7NEJBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FB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