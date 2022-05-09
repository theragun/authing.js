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
/**
 * @class AgreementManagementClient 管理多因素认证
 * @description 用于管理注册协议
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
 * managementClient.applications.listAgreement("APP_ID") // 获取某个应用的注册协议列表
 * \`\`\`
 *
 * @name AgreementManagementClient
 */
var AgreementManagementClient = /** @class */ (function () {
    function AgreementManagementClient(options, graphqlClient, httpClient, tokenProvider) {
        this.options = options;
        this.httpClient = httpClient;
        this.graphqlClient = graphqlClient;
        this.tokenProvider = tokenProvider;
    }
    /**
     * @description 在某个应用下创建注册协议
     * @param {object} appId 应用 ID
     * @param {object} agreement
     * @param {string} agreement.title 协议标题，可以包含 HTML A 标签
     * @param {boolean} [agreement.required] 是否必须才允许注册，默认为 true
     * @param {lang} [agreement.lang] 协议标题语言，可选 zh-CN, en-US，默认为 zh-CN，在托管登录页面中会根据界面语言展示协议
     */
    AgreementManagementClient.prototype.create = function (appId, agreement) {
        return __awaiter(this, void 0, void 0, function () {
            var mergedData, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mergedData = __assign({ lang: 'zh-CN', required: true }, agreement);
                        return [4 /*yield*/, this.httpClient.request({
                                url: this.options.host + "/api/v2/applications/" + appId + "/agreements",
                                method: 'POST',
                                data: mergedData
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @description 获取应用注册协议列表
     * @param {string} appId 应用 ID
     */
    AgreementManagementClient.prototype.list = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            url: this.options.host + "/api/v2/applications/" + appId + "/agreements",
                            method: 'GET'
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @description 删除应用下某个注册协议
     * @param {string} appId 应用 ID
     * @param {number} agreementId 协议 ID
     */
    AgreementManagementClient.prototype.delete = function (appId, agreementId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            url: this.options.host + "/api/v2/applications/" + appId + "/agreements/" + agreementId,
                            method: 'DELETE'
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * @description 修改应用下某个注册协议
     * @param {string} appId 应用 ID
     * @param {number} agreementId 协议 ID
     * @param {object} updates 更新内容
     * @param {string} [updates.title] 协议标题，可以包含 HTML A 标签
     * @param {boolean} [updates.required] 是否必须才允许注册，默认为 true
     * @param {lang} [updates.lang] 协议标题语言，可选 zh-CN, en-US，默认为 zh-CN，在托管登录页面中会根据界面语言展示协议
     */
    AgreementManagementClient.prototype.modify = function (appId, agreementId, updates) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            url: this.options.host + "/api/v2/applications/" + appId + "/agreements/" + agreementId,
                            method: 'PUT',
                            data: updates
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @description 对某个应用下的注册协议进行排序
     * @param {string} appId 应用 ID
     * @param {number[]} order 应用下所有协议的 ID 列表，按需要的顺序排列
     */
    AgreementManagementClient.prototype.sort = function (appId, order) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            url: this.options.host + "/api/v2/applications/" + appId + "/agreements/sort",
                            method: 'POST',
                            data: {
                                ids: order
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return AgreementManagementClient;
}());
export { AgreementManagementClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdyZWVtZW50TWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9BZ3JlZW1lbnRNYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0g7SUFNRSxtQ0FDRSxPQUFnQyxFQUNoQyxhQUE0QixFQUM1QixVQUFzQixFQUN0QixhQUFzQztRQUV0QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNVLDBDQUFNLEdBQW5CLFVBQ0UsS0FBYSxFQUNiLFNBQXlCOzs7Ozs7d0JBRW5CLFVBQVUsY0FDZCxJQUFJLEVBQUUsT0FBTyxFQUNiLFFBQVEsRUFBRSxJQUFJLElBQ1gsU0FBUyxDQUNiLENBQUM7d0JBRVcscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0NBQ3pDLEdBQUcsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksNkJBQXdCLEtBQUssZ0JBQWE7Z0NBQ25FLE1BQU0sRUFBRSxNQUFNO2dDQUNkLElBQUksRUFBRSxVQUFVOzZCQUNqQixDQUFDLEVBQUE7O3dCQUpJLElBQUksR0FBRyxTQUlYO3dCQUVGLHNCQUFPLElBQUksRUFBQzs7OztLQUNiO0lBRUQ7OztPQUdHO0lBQ1Usd0NBQUksR0FBakIsVUFBa0IsS0FBYTs7Ozs7NEJBQ2hCLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDOzRCQUN6QyxHQUFHLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLDZCQUF3QixLQUFLLGdCQUFhOzRCQUNuRSxNQUFNLEVBQUUsS0FBSzt5QkFDZCxDQUFDLEVBQUE7O3dCQUhJLElBQUksR0FBRyxTQUdYO3dCQUVGLHNCQUFPLElBQUksRUFBQzs7OztLQUNiO0lBRUQ7Ozs7T0FJRztJQUNVLDBDQUFNLEdBQW5CLFVBQW9CLEtBQWEsRUFBRSxXQUFtQjs7Ozs0QkFDcEQscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7NEJBQzVCLEdBQUcsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksNkJBQXdCLEtBQUssb0JBQWUsV0FBYTs0QkFDbEYsTUFBTSxFQUFFLFFBQVE7eUJBQ2pCLENBQUMsRUFBQTs7d0JBSEYsU0FHRSxDQUFDO3dCQUVILHNCQUFPLElBQUksRUFBQzs7OztLQUNiO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDVSwwQ0FBTSxHQUFuQixVQUNFLEtBQWEsRUFDYixXQUFtQixFQUNuQixPQUF1Qjs7Ozs7NEJBRVYscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7NEJBQ3pDLEdBQUcsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksNkJBQXdCLEtBQUssb0JBQWUsV0FBYTs0QkFDbEYsTUFBTSxFQUFFLEtBQUs7NEJBQ2IsSUFBSSxFQUFFLE9BQU87eUJBQ2QsQ0FBQyxFQUFBOzt3QkFKSSxJQUFJLEdBQUcsU0FJWDt3QkFFRixzQkFBTyxJQUFJLEVBQUM7Ozs7S0FDYjtJQUVEOzs7O09BSUc7SUFDVSx3Q0FBSSxHQUFqQixVQUFrQixLQUFhLEVBQUUsS0FBZTs7Ozs0QkFDOUMscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7NEJBQzVCLEdBQUcsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksNkJBQXdCLEtBQUsscUJBQWtCOzRCQUN4RSxNQUFNLEVBQUUsTUFBTTs0QkFDZCxJQUFJLEVBQUU7Z0NBQ0osR0FBRyxFQUFFLEtBQUs7NkJBQ1g7eUJBQ0YsQ0FBQyxFQUFBOzt3QkFORixTQU1FLENBQUM7d0JBRUgsc0JBQU8sSUFBSSxFQUFDOzs7O0tBQ2I7SUFDSCxnQ0FBQztBQUFELENBQUMsQUEvR0QsSUErR0MifQ==