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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBd0pBOztPQUVHO0lBQ0gsSUFBWSx1QkFxQ1g7SUFyQ0QsV0FBWSx1QkFBdUI7UUFDakM7O1dBRUc7UUFDSCwwQ0FBZSxDQUFBO1FBQ2Y7O1dBRUc7UUFDSCxnREFBcUIsQ0FBQTtRQUNyQjs7V0FFRztRQUNILDJEQUFnQyxDQUFBO1FBQ2hDOztXQUVHO1FBQ0gsOERBQW1DLENBQUE7UUFDbkM7O1dBRUc7UUFDSCx5REFBOEIsQ0FBQTtRQUM5Qjs7V0FFRztRQUNILHVEQUE0QixDQUFBO1FBQzVCOztXQUVHO1FBQ0gsdURBQTRCLENBQUE7UUFDNUI7O1dBRUc7UUFDSCw2REFBa0MsQ0FBQTtRQUNsQzs7V0FFRztRQUNILG1EQUF3QixDQUFBO0lBQzFCLENBQUMsRUFyQ1csdUJBQXVCLEdBQXZCLCtCQUF1QixLQUF2QiwrQkFBdUIsUUFxQ2xDO0lBRUQ7O09BRUc7SUFDSCxJQUFZLHdCQTZDWDtJQTdDRCxXQUFZLHdCQUF3QjtRQUNsQzs7V0FFRztRQUNILHNEQUEwQixDQUFBO1FBQzFCOztXQUVHO1FBQ0gsd0RBQTRCLENBQUE7UUFDNUI7O1dBRUc7UUFDSCxzREFBMEIsQ0FBQTtRQUMxQjs7V0FFRztRQUNILDBEQUE4QixDQUFBO1FBQzlCOztXQUVHO1FBQ0gsc0RBQTBCLENBQUE7UUFDMUI7O1dBRUc7UUFDSCxzREFBMEIsQ0FBQTtRQUMxQjs7V0FFRztRQUNILDREQUFnQyxDQUFBO1FBQ2hDOztXQUVHO1FBQ0gsOERBQWtDLENBQUE7UUFDbEM7O1dBRUc7UUFDSCw4REFBa0MsQ0FBQTtRQUNsQzs7V0FFRztRQUNILDRFQUFnRCxDQUFBO1FBQ2hEOztXQUVHO1FBQ0gsNkVBQWlELENBQUE7SUFDbkQsQ0FBQyxFQTdDVyx3QkFBd0IsR0FBeEIsZ0NBQXdCLEtBQXhCLGdDQUF3QixRQTZDbkM7SUFtekJELElBQVksZUFhWDtJQWJELFdBQVksZUFBZTtRQUN6Qjs7V0FFRztRQUNILDRDQUF3QixDQUFBO1FBQ3hCOztXQUVHO1FBQ0osb0NBQWlCLENBQUE7UUFDaEI7O1dBRUc7UUFDSCxnQ0FBWSxDQUFBO0lBQ2QsQ0FBQyxFQWJXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBYTFCIn0=