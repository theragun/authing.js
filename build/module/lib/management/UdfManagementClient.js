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
import { setUdf, removeUdf, udf, udv, setUdvBatch } from '../graphqlapi';
import { convertUdv } from '../utils';
/**
 * @name UdfManagementClient
 * @description Udf 是 User Defined Field（用户自定义字段） 的简称。Authing 的数据实体（如用户、角色、分组、组织机构等）可以添加自定义字段，你可以配置 Authing 默认不自带的字段，比如你需要创建以一个学校相关的应用，就可以添加一个自定义 \`school\` 字段。
 * 同时你可以在用户注册完成之后要求用户补充此字段的信息，详细文档请见 https://docs.authing.co/extensibility/user/extend-register-fields.html 。
 *
 * 此模块可以用于对自定义字段元数据进行管理。
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
 * managementClient.udf.list // 获取自定义字段元数据列表
 * managementClient.udf.set // 设置自定义字段
 * managementClient.udf.remove // 删除自定义字段
 * \`\`\`
 *
 * @class UdfManagementClient 管理自定义字段元数据
 */
var UdfManagementClient = /** @class */ (function () {
    function UdfManagementClient(options, graphqlClient, tokenProvider) {
        this.options = options;
        this.graphqlClient = graphqlClient;
        this.tokenProvider = tokenProvider;
    }
    /**
     * @name set
     * @name_zh 设置自定义字段元数据
     * @description 设置自定义字段元数据，如果该字段不存在会自动创建。
     *
     * @param {UdfTargetType} targetType 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
     * @param {string} key 字段 key
     * @param {UdfDataType} dataType 数据类型，目前共支持五种数据类型。STRING 为字符串、NUMBER 为数字、DATETIME 为日期、BOOLEAN 为 boolean 值、OBJECT 为对象。
     * @param {string} label 字段 Label，一般是一个 Human Readable 字符串。
     *
     * @example
     *
     * import { ManagementClient, UdfTargetType, UdfDataType  } from "authing-js-sdk"
     * const udf = await managementClient.udf.set(
     *    UdfTargetType.User,
     *    'school',
     *    UdfDataType.String,
     *    '学校'
     * );
     *
     * @example
     *
     * // 如果 age 这个自定义字段不存在，第一次会创建
     *
     * import { ManagementClient, UdfTargetType, UdfDataType  } from "authing-js-sdk"
     * const udf = await managementClient.udf.set(
     *    UdfTargetType.User,
     *    'age',
     *    UdfDataType.Number,
     *    '年龄'
     * );
     *
     * // 如果 age 字段之前创建过，会修改该字段的配置
     *
     * const udf = await managementClient.udf.set(
     *    UdfTargetType.User,
     *    'age',
     *    UdfDataType.Number,
     *    '新的描述信息'
     * );
     *
     * @returns {Promise<UserDefinedField[]>}
     * @memberof UdfManagementClient
     */
    UdfManagementClient.prototype.set = function (targetType, key, dataType, label) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUdf(this.graphqlClient, this.tokenProvider, {
                            targetType: targetType,
                            dataType: dataType,
                            key: key,
                            label: label
                        })];
                    case 1:
                        data = (_a.sent()).setUdf;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name remove
     * @name_zh 删除自定义字段
     * @description 删除自定义字段
     *
     * @param {UdfTargetType} targetType 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
     * @param {string} key 字段 key
     *
     * @example
     *
     * await managementClient.udf.remove(UdfTargetType.User, 'school');
     *
     * @returns {Promise<UserDefinedField[]>}
     * @memberof UdfManagementClient
     */
    UdfManagementClient.prototype.remove = function (targetType, key) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, removeUdf(this.graphqlClient, this.tokenProvider, {
                            targetType: targetType,
                            key: key
                        })];
                    case 1:
                        list = (_a.sent()).removeUdf;
                        return [2 /*return*/, list];
                }
            });
        });
    };
    /**
     * @name list
     * @name_zh 获取自定义字段定义
     * @description 查询用户池定义的自定义字段
     *
     * @param {UdfTargetType} targetType 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
     * @example
     *
     * const list = await managementClient.udf.list(UdfTargetType.User);
     *
     * @returns {Promise<UserDefinedField[]>}
     * @memberof UdfManagementClient
     */
    UdfManagementClient.prototype.list = function (targetType) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, udf(this.graphqlClient, this.tokenProvider, {
                            targetType: targetType
                        })];
                    case 1:
                        list = (_a.sent()).udf;
                        return [2 /*return*/, list];
                }
            });
        });
    };
    /**
     * @name listUdv
     * @name_zh 获取某一实体的自定义字段数据列表
     * @description 获取某一实体的自定义字段数据列表
     *
     *
     * @param {UdfTargetType} targetType 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
     * @param {string} targetId 自定义字段目标 id，如用户 ID
     * @example
     *
     * udfManagementClient.listUdv('USER', 'userId')
     *
     * @returns {Promise<Array<UserDefinedData>>}
     * @memberof UdfManagementClient
     */
    UdfManagementClient.prototype.listUdv = function (targetType, targetId) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, udv(this.graphqlClient, this.tokenProvider, {
                            targetType: targetType,
                            targetId: targetId
                        })];
                    case 1:
                        list = (_a.sent()).udv;
                        return [2 /*return*/, convertUdv(list)];
                }
            });
        });
    };
    /**
     * @name setUdvBatch
     * @name_zh 批量添加自定义数据
     * @description 批量添加自定义数据
     *
     * @param {UdfTargetType} targetType 自定义字段目标类型， USER 表示用户、ROLE 表示角色。
     * @param {string} targetId 自定义字段目标 id，如用户 ID
     * @param {Object[]} [udvList]
     * @param {boolean} [udvList.key] 自定义字段的 key
     * @param {string} [udvList.value] 自定义字段的值
     *
     * @example
     *
     * udfManagementClient.setUdv('USER', 'userId', [{key: 'school', 'value': '清华大学'}])
     *
     * @returns {Promise<Array<UserDefinedData>>}
     * @memberof UdfManagementClient
     */
    UdfManagementClient.prototype.setUdvBatch = function (targetType, targetId, udvList) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUdvBatch(this.graphqlClient, this.tokenProvider, {
                            targetType: targetType,
                            targetId: targetId,
                            udvList: udvList.map(function (item) { return ({
                                key: item.key,
                                value: JSON.stringify(item.value)
                            }); })
                        })];
                    case 1:
                        list = (_a.sent()).setUdvBatch;
                        return [2 /*return*/, convertUdv(list)];
                }
            });
        });
    };
    return UdfManagementClient;
}());
export { UdfManagementClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVWRmTWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9VZGZNYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVVBLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSDtJQUtFLDZCQUNFLE9BQWdDLEVBQ2hDLGFBQTRCLEVBQzVCLGFBQXNDO1FBRXRDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJDRztJQUNHLGlDQUFHLEdBQVQsVUFDRSxVQUF5QixFQUN6QixHQUFXLEVBQ1gsUUFBcUIsRUFDckIsS0FBYTs7Ozs7NEJBRVkscUJBQU0sTUFBTSxDQUNuQyxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjs0QkFDRSxVQUFVLFlBQUE7NEJBQ1YsUUFBUSxVQUFBOzRCQUNSLEdBQUcsS0FBQTs0QkFDSCxLQUFLLE9BQUE7eUJBQ04sQ0FDRixFQUFBOzt3QkFUZSxJQUFJLEdBQUssQ0FBQSxTQVN4QixDQUFBLE9BVG1CO3dCQVVwQixzQkFBTyxJQUFJLEVBQUM7Ozs7S0FDYjtJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0csb0NBQU0sR0FBWixVQUFhLFVBQXlCLEVBQUUsR0FBVzs7Ozs7NEJBQ3JCLHFCQUFNLFNBQVMsQ0FDekMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7NEJBQ0UsVUFBVSxZQUFBOzRCQUNWLEdBQUcsS0FBQTt5QkFDSixDQUNGLEVBQUE7O3dCQVBrQixJQUFJLEdBQUssQ0FBQSxTQU8zQixDQUFBLFVBUHNCO3dCQVF2QixzQkFBTyxJQUFJLEVBQUM7Ozs7S0FDYjtJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNHLGtDQUFJLEdBQVYsVUFBVyxVQUF5Qjs7Ozs7NEJBQ1oscUJBQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTs0QkFDdEUsVUFBVSxZQUFBO3lCQUNYLENBQUMsRUFBQTs7d0JBRlcsSUFBSSxHQUFLLENBQUEsU0FFcEIsQ0FBQSxJQUZlO3dCQUdqQixzQkFBTyxJQUFJLEVBQUM7Ozs7S0FDYjtJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0cscUNBQU8sR0FBYixVQUNFLFVBQXlCLEVBQ3pCLFFBQWdCOzs7Ozs0QkFFTSxxQkFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFOzRCQUN0RSxVQUFVLFlBQUE7NEJBQ1YsUUFBUSxVQUFBO3lCQUNULENBQUMsRUFBQTs7d0JBSFcsSUFBSSxHQUFLLENBQUEsU0FHcEIsQ0FBQSxJQUhlO3dCQUlqQixzQkFBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUM7Ozs7S0FDekI7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDRyx5Q0FBVyxHQUFqQixVQUNFLFVBQXlCLEVBQ3pCLFFBQWdCLEVBQ2hCLE9BR0c7Ozs7OzRCQUUyQixxQkFBTSxXQUFXLENBQzdDLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCOzRCQUNFLFVBQVUsWUFBQTs0QkFDVixRQUFRLFVBQUE7NEJBQ1IsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDO2dDQUM1QixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7Z0NBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs2QkFDbEMsQ0FBQyxFQUgyQixDQUczQixDQUFDO3lCQUNKLENBQ0YsRUFBQTs7d0JBWG9CLElBQUksR0FBSyxDQUFBLFNBVzdCLENBQUEsWUFYd0I7d0JBWXpCLHNCQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQzs7OztLQUN6QjtJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQS9MRCxJQStMQyJ9