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
        define(["require", "exports", "../version", "axios", "../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GraphqlClient = void 0;
    var version_1 = require("../version");
    var axios_1 = __importDefault(require("axios"));
    var utils_1 = require("../utils");
    var GraphqlClient = /** @class */ (function () {
        function GraphqlClient(endpoint, options) {
            this.endpoint = endpoint;
            this.options = options;
            this.axios = axios_1.default.create({
                withCredentials: true
            });
        }
        GraphqlClient.prototype.request = function (options) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var query, token, variables, headers, data, errors, responseData, error_1, statusCode, errorDetail, errmsg_1, errcode_1, data_1;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            query = options.query, token = options.token, variables = options.variables;
                            headers = {
                                'content-type': 'application/json'
                            };
                            headers[this.options.headers['app-id']] = this.options.appId || '';
                            headers[this.options.headers['tenant-id']] = this.options.tenantId;
                            headers[this.options.headers['userpool-id']] =
                                // @ts-ignore
                                this.options.userPoolId || '';
                            headers[this.options.headers['request-from']] =
                                this.options.requestFrom || 'sdk';
                            headers[this.options.headers['sdk-version']] = "js:" + version_1.SDK_VERSION;
                            headers[this.options.headers.lang] = this.options.lang || '';
                            token && (headers.Authorization = "Bearer " + token);
                            data = null;
                            errors = null;
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.axios({
                                    url: this.endpoint,
                                    data: {
                                        query: query,
                                        variables: variables
                                    },
                                    method: 'post',
                                    headers: __assign({}, utils_1.pickBy(headers, function (i) { return !!i; })),
                                    timeout: this.options.timeout
                                })];
                        case 2:
                            responseData = (_c.sent()).data;
                            data = responseData.data;
                            errors = responseData.errors;
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _c.sent();
                            statusCode = error_1.code || ((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _a === void 0 ? void 0 : _a.status);
                            errorDetail = error_1.message || ((_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.data);
                            this.options.onError(statusCode || 500, error_1.message, errorDetail);
                            throw {
                                code: statusCode || 500,
                                message: error_1.message,
                                data: errorDetail
                            };
                        case 4:
                            if ((errors === null || errors === void 0 ? void 0 : errors.length) > 0) {
                                errmsg_1 = null;
                                errcode_1 = null;
                                data_1 = null;
                                errors.map(function (err) {
                                    var msg = err.message;
                                    var code = msg.code, message = msg.message, _data = msg.data;
                                    errcode_1 = code;
                                    errmsg_1 = message;
                                    data_1 = _data;
                                    _this.options.onError(code, message, data_1);
                                });
                                throw { code: errcode_1, message: errmsg_1, data: data_1 };
                            }
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        return GraphqlClient;
    }());
    exports.GraphqlClient = GraphqlClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhcGhxbENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29tbW9uL0dyYXBocWxDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxzQ0FBeUM7SUFHekMsZ0RBQTZDO0lBQzdDLGtDQUFrQztJQUVsQztRQUtFLHVCQUNFLFFBQWdCLEVBQ2hCLE9BQThEO1lBRTlELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQztnQkFDeEIsZUFBZSxFQUFFLElBQUk7YUFDdEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVLLCtCQUFPLEdBQWIsVUFBYyxPQUEyRDs7Ozs7Ozs7NEJBQy9ELEtBQUssR0FBdUIsT0FBTyxNQUE5QixFQUFFLEtBQUssR0FBZ0IsT0FBTyxNQUF2QixFQUFFLFNBQVMsR0FBSyxPQUFPLFVBQVosQ0FBYTs0QkFDeEMsT0FBTyxHQUFRO2dDQUNqQixjQUFjLEVBQUUsa0JBQWtCOzZCQUNuQyxDQUFDOzRCQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzs0QkFDbkUsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7NEJBQ25FLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztnQ0FDMUMsYUFBYTtnQ0FDYixJQUFJLENB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