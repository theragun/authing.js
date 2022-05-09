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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TenantManagementClient = void 0;
    /**
     * @name TenantManagementClient
     * @description 租户管理模块
     *
     */
    var TenantManagementClient = /** @class */ (function () {
        function TenantManagementClient(options, graphqlClient, httpClient, tokenProvider) {
            this.options = options;
            this.graphqlClient = graphqlClient;
            this.tokenProvider = tokenProvider;
            this.httpClient = httpClient;
        }
        /**
         * @name list
         * @name_zh  获取用户池下租户列表
         * @description 获取用户池下租户列表
         */
        TenantManagementClient.prototype.list = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, page, _c, limit, result;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = params || {}, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'GET',
                                    url: this.options.host + "/api/v2/tenants?page=" + page + "&limit=" + limit
                                })];
                        case 1:
                            result = _d.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name details
         * @name_zh  获取租户详情
         * @description 获取租户详情
         */
        TenantManagementClient.prototype.details = function (tenantId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/tenant/" + tenantId
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name create
         * @name_zh  创建租户
         * @description 创建租户
         */
        TenantManagementClient.prototype.create = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.options.host + "/api/v2/tenant",
                                data: __assign({}, options)
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name update
         * @name_zh  修改租户
         * @description 修改租户
         */
        TenantManagementClient.prototype.update = function (tenantId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.options.host + "/api/v2/tenant/" + tenantId,
                                data: __assign({}, options)
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name delete
         * @name_zh  删除租户
         * @description 删除租户
         */
        TenantManagementClient.prototype.delete = function (tenantId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'DELETE',
                                url: this.options.host + "/api/v2/tenant/" + tenantId,
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name config
         * @name_zh  配置租户品牌化
         * @description 配置租户品牌化
         */
        TenantManagementClient.prototype.config = function (tenantId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.options.host + "/api/v2/tenant/" + tenantId,
                                data: __assign({}, options)
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name members
         * @name_zh  获取租户成员列表
         * @description 获取租户成员列表
         */
        TenantManagementClient.prototype.members = function (tenantId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, limit, result;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = options.page, page = _a === void 0 ? 1 : _a, _b = options.limit, limit = _b === void 0 ? 10 : _b;
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'GET',
                                    url: this.options.host + "/api/v2/tenant/" + tenantId + "/users?page=" + page + "&limit=" + limit
                                })];
                        case 1:
                            result = _c.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name addMembers
         * @name_zh  添加租户成员
         * @description 添加租户成员
         */
        TenantManagementClient.prototype.addMembers = function (tenantId, userIds) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.options.host + "/api/v2/tenant/" + tenantId + "/user",
                                data: {
                                    userIds: userIds
                                }
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name removeMembers
         * @name_zh  移除租户成员
         * @description 移除租户成员
         */
        TenantManagementClient.prototype.removeMembers = function (tenantId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'DELETE',
                                url: this.options.host + "/api/v2/tenant/" + tenantId + "/user?userId=" + userId
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name listExtIdp
         * @name_zh  获取身份源列表
         * @description 获取身份源列表
         */
        TenantManagementClient.prototype.listExtIdp = function (tenantId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/extIdp?tenantId=" + tenantId
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name extIdpDetail
         * @name_zh  获取身份源详细信息
         * @description 获取身份源详细信息
         */
        TenantManagementClient.prototype.extIdpDetail = function (extIdpId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/extIdp/" + extIdpId
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name createExtIdp
         * @name_zh  创建身份源
         * @description 创建身份源
         */
        TenantManagementClient.prototype.createExtIdp = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.options.host + "/api/v2/extIdp",
                                data: __assign({}, options)
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name updateExtIdp
         * @name_zh  更新身份源配置
         * @description 更新身份源配置
         */
        TenantManagementClient.prototype.updateExtIdp = function (extIdpId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'PUT',
                                url: this.options.host + "/api/v2/extIdp/" + extIdpId,
                                data: __assign({}, options)
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name deleteExtIdp
         * @name_zh  删除身份源
         * @description 删除身份源
         */
        TenantManagementClient.prototype.deleteExtIdp = function (extIdpId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'DELETE',
                                url: this.options.host + "/api/v2/extIdp/" + extIdpId
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name createExtIdpConnection
         * @name_zh  创建身份源连接
         * @description 创建身份源连接
         */
        TenantManagementClient.prototype.createExtIdpConnection = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.options.host + "/api/v2/extIdpConn",
                                data: __assign({}, options)
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
          * @name updateExtIdpConnection
          * @name_zh  更新身份源连接
          * @description 更新身份源连接
          */
        TenantManagementClient.prototype.updateExtIdpConnection = function (extIdpConnectionId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'PUT',
                                url: this.options.host + "/api/v2/extIdpConn/" + extIdpConnectionId,
                                data: __assign({}, options)
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
          * @name deleteExtIdpConnection
          * @name_zh  删除身份源连接
          * @description 删除身份源连接
          */
        TenantManagementClient.prototype.deleteExtIdpConnection = function (extIdpConnectionId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'DELETE',
                                url: this.options.host + "/api/v2/extIdpConn/" + extIdpConnectionId,
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
          * @name checkExtIdpConnectionIdentifierUnique
          * @name_zh  检查连接唯一标识是否冲突
          * @description 检查连接唯一标识是否冲突
          */
        TenantManagementClient.prototype.checkExtIdpConnectionIdentifierUnique = function (identifier) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: this.options.host + "/api/v2/check/extIdpConn/identifier",
                                    data: {
                                        identifier: identifier,
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, false];
                        case 2:
                            error_1 = _a.sent();
                            return [2 /*return*/, true];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @name changeExtIdpConnectionState
         * @name_zh  开关身份源连接
         * @description 开关身份源连接
         */
        TenantManagementClient.prototype.changeExtIdpConnectionState = function (extIdpConnectionId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'PUT',
                                    url: this.options.host + "/api/v2/extIdpConn/" + extIdpConnectionId + "/state",
                                    data: __assign({}, options)
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 2:
                            error_2 = _a.sent();
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @name batchChangeExtIdpConnectionState
         * @name_zh  批量开关身份源连接
         * @description 批量开关身份源连接
         */
        TenantManagementClient.prototype.batchChangeExtIdpConnectionState = function (extIdpId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'PUT',
                                    url: this.options.host + "/api/v2/extIdp/" + extIdpId + "/connState",
                                    data: __assign({}, options)
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 2:
                            error_3 = _a.sent();
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return TenantManagementClient;
    }());
    exports.TenantManagementClient = TenantManagementClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVuYW50TWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9UZW5hbnRNYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBVUE7Ozs7T0FJRztJQUNIO1FBT0UsZ0NBQ0UsT0FBZ0MsRUFDaEMsYUFBNEIsRUFDNUIsVUFBc0IsRUFDdEIsYUFBc0M7WUFFdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDL0IsQ0FBQztRQUVEOzs7O1dBSUc7UUFDRyxxQ0FBSSxHQUFWLFVBQVcsTUFHVjs7Ozs7OzRCQUNPLEtBQTJCLE1BQU0sSUFBSSxFQUFFLEVBQXJDLFlBQVEsRUFBUixJQUFJLG1CQUFHLENBQUMsS0FBQSxFQUFFLGFBQVUsRUFBVixLQUFLLG1CQUFHLEVBQUUsS0FBQSxDQUFrQjs0QkFDOUIscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7b0NBQzVDLE1BQU0sRUFBRSxLQUFLO29DQUNiLEdBQUcsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksNkJBQXdCLElBQUksZUFBVSxLQUFPO2lDQUN2RSxDQUFDLEVBQUE7OzRCQUhJLE1BQU0sR0FBSSxTQUdkOzRCQUVGLHNCQUFPLE1BQU0sRUFBQzs7OztTQUNmO1FBR0Q7Ozs7V0FJRztRQUNHLHdDQUFPLEdBQWIsVUFBYyxRQUFnQjs7Ozs7Z0NBQ1oscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0NBQzVDLE1BQU0sRUFBRSxLQUFLO2dD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