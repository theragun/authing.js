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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhcGhxbENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29tbW9uL0dyYXBocWxDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFHekMsZ0RBQTZDO0FBQzdDLGtDQUFrQztBQUVsQztJQUtFLHVCQUNFLFFBQWdCLEVBQ2hCLE9BQThEO1FBRTlELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQztZQUN4QixlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUssK0JBQU8sR0FBYixVQUFjLE9BQTJEOzs7Ozs7Ozt3QkFDL0QsS0FBSyxHQUF1QixPQUFPLE1BQTlCLEVBQUUsS0FBSyxHQUFnQixPQUFPLE1BQXZCLEVBQUUsU0FBUyxHQUFLLE9BQU8sVUFBWixDQUFhO3dCQUN4QyxPQUFPLEdBQVE7NEJBQ2pCLGNBQWMsRUFBRSxrQkFBa0I7eUJBQ25DLENBQUM7d0JBRUYsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO3dCQUNuRSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbkUsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUMxQyxhQUFhOzRCQUNiLElBQUksQ0FBQyxPQUFPLENB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