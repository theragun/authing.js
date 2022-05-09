"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationType = exports.SupportedAdminActionEnum = exports.SupportedUserActionEnum = void 0;
/**
 * 用户支持的操作日志类型枚举
 */
var SupportedUserActionEnum;
(function (SupportedUserActionEnum) {
    /**
     * 登录
     */
    SupportedUserActionEnum["LOGIN"] = "login";
    /**
     * 注册
     */
    SupportedUserActionEnum["REGISTER"] = "register";
    /**
     * 删除账户
     */
    SupportedUserActionEnum["DELETE_ACCOUNT"] = "deleteAccount";
    /**
     * 修改账号信息
     */
    SupportedUserActionEnum["UPDATE_USER_INFO"] = "updateUserinfo";
    /**
     * 刷新 token
     */
    SupportedUserActionEnum["REFRESH_TOKEN"] = "refreshToken";
    /**
     * 修改邮箱
     */
    SupportedUserActionEnum["UPDATE_EMAIL"] = "updateEmail";
    /**
     * 修改手机号
     */
    SupportedUserActionEnum["UPDATE_PHONE"] = "updatePhone";
    /**
     * 修改密码
     */
    SupportedUserActionEnum["UPDATE_PASSWORD"] = "updatePassword";
    /**
     * 验证 MFA
     */
    SupportedUserActionEnum["VERIFY_MFA"] = "verifyMfa";
})(SupportedUserActionEnum = exports.SupportedUserActionEnum || (exports.SupportedUserActionEnum = {}));
/**
 * 管理员支持的操作日志类型枚举
 */
var SupportedAdminActionEnum;
(function (SupportedAdminActionEnum) {
    /**
     * 删除用户
     */
    SupportedAdminActionEnum["DELETE_USER"] = "deleteUser";
    /**
     * 批量删除用户
     */
    SupportedAdminActionEnum["DELETE_USERS"] = "deleteUsers";
    /**
     * 创建用户
     */
    SupportedAdminActionEnum["CREATE_USER"] = "createUser";
    /**
     * 刷新 Token
     */
    SupportedAdminActionEnum["REFRESH_TOKEN"] = "refreshToken";
    /**
     * 导入用户
     */
    SupportedAdminActionEnum["IMPORT_USER"] = "importUser";
    /**
     * 导出用户
     */
    SupportedAdminActionEnum["EXPORT_USER"] = "exportUser";
    /**
     * 刷新密码
     */
    SupportedAdminActionEnum["REFRESH_SECRET"] = "refreshSecret";
    /**
     * 删除用户池
     */
    SupportedAdminActionEnum["DELETE_USERPOOL"] = "deleteUserpool";
    /**
     * 创建用户池
     */
    SupportedAdminActionEnum["CREATE_USERPOOL"] = "createUserpool";
    /**
     * 修改用户池配置
     */
    SupportedAdminActionEnum["USERPOOL_UPDATE_CONFIG"] = "userpool:UpdateConfig";
    /**
     * 刷新用户池密钥
     */
    SupportedAdminActionEnum["REFRESH_USERPOOL_SECRET"] = "refreshUserpoolSecret";
})(SupportedAdminActionEnum = exports.SupportedAdminActionEnum || (exports.SupportedAdminActionEnum = {}));
var ApplicationType;
(function (ApplicationType) {
    /**
     * 个体型
     */
    ApplicationType["INDIVIDUAL"] = "INDIVIDUAL";
    /**
     * 租户型
     */
    ApplicationType["TENANT"] = "Tenant";
    /**
     * 兼容型
     */
    ApplicationType["BOTH"] = "BOTH";
})(ApplicationType = exports.ApplicationType || (exports.ApplicationType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBd0pBOztHQUVHO0FBQ0gsSUFBWSx1QkFxQ1g7QUFyQ0QsV0FBWSx1QkFBdUI7SUFDakM7O09BRUc7SUFDSCwwQ0FBZSxDQUFBO0lBQ2Y7O09BRUc7SUFDSCxnREFBcUIsQ0FBQTtJQUNyQjs7T0FFRztJQUNILDJEQUFnQyxDQUFBO0lBQ2hDOztPQUVHO0lBQ0gsOERBQW1DLENBQUE7SUFDbkM7O09BRUc7SUFDSCx5REFBOEIsQ0FBQTtJQUM5Qjs7T0FFRztJQUNILHVEQUE0QixDQUFBO0lBQzVCOztPQUVHO0lBQ0gsdURBQTRCLENBQUE7SUFDNUI7O09BRUc7SUFDSCw2REFBa0MsQ0FBQTtJQUNsQzs7T0FFRztJQUNILG1EQUF3QixDQUFBO0FBQzFCLENBQUMsRUFyQ1csdUJBQXVCLEdBQXZCLCtCQUF1QixLQUF2QiwrQkFBdUIsUUFxQ2xDO0FBRUQ7O0dBRUc7QUFDSCxJQUFZLHdCQTZDWDtBQTdDRCxXQUFZLHdCQUF3QjtJQUNsQzs7T0FFRztJQUNILHNEQUEwQixDQUFBO0lBQzFCOztPQUVHO0lBQ0gsd0RBQTRCLENBQUE7SUFDNUI7O09BRUc7SUFDSCxzREFBMEIsQ0FBQTtJQUMxQjs7T0FFRztJQUNILDBEQUE4QixDQUFBO0lBQzlCOztPQUVHO0lBQ0gsc0RBQTBCLENBQUE7SUFDMUI7O09BRUc7SUFDSCxzREFBMEIsQ0FBQTtJQUMxQjs7T0FFRztJQUNILDREQUFnQyxDQUFBO0lBQ2hDOztPQUVHO0lBQ0gsOERBQWtDLENBQUE7SUFDbEM7O09BRUc7SUFDSCw4REFBa0MsQ0FBQTtJQUNsQzs7T0FFRztJQUNILDRFQUFnRCxDQUFBO0lBQ2hEOztPQUVHO0lBQ0gsNkVBQWlELENBQUE7QUFDbkQsQ0FBQyxFQTdDVyx3QkFBd0IsR0FBeEIsZ0NBQXdCLEtBQXhCLGdDQUF3QixRQTZDbkM7QUFtekJELElBQVksZUFhWDtBQWJELFdBQVksZUFBZTtJQUN6Qjs7T0FFRztJQUNILDRDQUF3QixDQUFBO0lBQ3hCOztPQUVHO0lBQ0osb0NBQWlCLENBQUE7SUFDaEI7O09BRUc7SUFDSCxnQ0FBWSxDQUFBO0FBQ2QsQ0FBQyxFQWJXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBYTFCIn0=