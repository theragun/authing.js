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
exports.StatisticsManagementClient = void 0;
/**
 * @class StatisticsManagementClient 管理日志统计信息
 * @name StatisticsManagementClient
 * @description 管理日志统计信息
 *
 * @example
 *
 * 请使用以下方式使用该模块：
 * \`\`\`javascript
 * import { StatisticsManagementClient } from "authing-js-sdk"
 * const managementClient = new ManagementClient({
 *    userPoolId: "YOUR_USERPOOL_ID",
 *    secret: "YOUR_USERPOOL_SECRET",
 * })
 * managementClient.statistics.listUserActions // 查看用户操作日志
 * managementClient.statistics.listAuditLogs // 查看审计日志
 * \`\`\`
 *
 */
var StatisticsManagementClient = /** @class */ (function () {
    function StatisticsManagementClient(options, httpClient, tokenProvider) {
        this.options = options;
        this.httpClient = httpClient;
        this.tokenProvider = tokenProvider;
    }
    /**
     * 查看用户操作日志
     * @param options.operationNames SupportedUserActionEnum
     */
    StatisticsManagementClient.prototype.listUserActions = function (options) {
        var _a;
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
     * 查看审计日志
     * @param options.operationNames  SupportedAdminActionEnum
     */
    StatisticsManagementClient.prototype.listAuditLogs = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var requestParam, operatorArns, result, list, totalCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestParam = {};
                        if (options === null || options === void 0 ? void 0 : options.clientIp) {
                            requestParam.clientip = options.clientIp;
                        }
                        if (options === null || options === void 0 ? void 0 : options.operationNames) {
                            requestParam.operation_name = options.operationNames;
                        }
                        if (options === null || options === void 0 ? void 0 : options.appIds) {
                            requestParam.app_id = options === null || options === void 0 ? void 0 : options.appIds;
                        }
                        if (options === null || options === void 0 ? void 0 : options.userIds) {
                            operatorArns = options.userIds.map(function (userId) { return "arn:cn:authing:user:" + userId; });
                            requestParam.operator_arn = operatorArns;
                        }
                        if (options === null || options === void 0 ? void 0 : options.page) {
                            requestParam.page = options.page;
                        }
                        if (options === null || options === void 0 ? void 0 : options.limit) {
                            requestParam.limit = options.limit;
                        }
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/analysis/audit",
                                params: __assign({}, requestParam)
                            })];
                    case 1:
                        result = _a.sent();
                        list = result.list, totalCount = result.totalCount;
                        return [2 /*return*/, {
                                list: list.map(function (log) {
                                    var _a, _b, _c, _d, _e;
                                    return {
                                        userpoolId: log.userpool_id,
                                        operatorType: log.operator_type,
                                        operatorId: (_a = log.operator_detail) === null || _a === void 0 ? void 0 : _a.id,
                                        operatorName: (_b = log.operator_detail) === null || _b === void 0 ? void 0 : _b.displayName,
                                        operationName: log.operation_name,
                                        cityName: (_c = log.geoip) === null || _c === void 0 ? void 0 : _c.city_name,
                                        regionName: (_d = log.geoip) === null || _d === void 0 ? void 0 : _d.region_name,
                                        clientIp: (_e = log.geoip) === null || _e === void 0 ? void 0 : _e.ip,
                                        resourceType: log.resource_type,
                                        resourceDesc: log.resource_desc,
                                        resource_arn: log.resource_arn,
                                        timestamp: log.timestamp
                                    };
                                }),
                                totalCount: totalCount
                            }];
                }
            });
        });
    };
    return StatisticsManagementClient;
}());
exports.StatisticsManagementClient = StatisticsManagementClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGlzdGljc01hbmFnZW1lbnRDbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvU3RhdGlzdGljc01hbmFnZW1lbnRDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0g7SUFLRSxvQ0FDRSxPQUFnQyxFQUNoQyxVQUFzQixFQUN0QixhQUFzQztRQUV0QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0csb0RBQWUsR0FBckIsVUFBc0IsT0FVckI7Ozs7Ozs7O3dCQUNLLFlBQVksR0FBUSxFQUFFLENBQUM7d0JBQzNCLElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVEsRUFBRTs0QkFDckIsWUFBWSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO3lCQUMxQzt3QkFDRCxJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxjQUFjLEVBQUU7NEJBQzNCLFlBQVksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQzt5QkFDdEQ7d0JBQ0QsSUFBSSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxPQUFPLDBDQUFFLE1BQU0sRUFBRTs0QkFDNUIsWUFBWSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU07Z0NBQ3BELE9BQU8sb0JBQWtCLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxjQUFTLE1BQVEsQ0FBQzs0QkFDcEUsQ0FB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