/**
 * 用户支持的操作日志类型枚举
 */
export var SupportedUserActionEnum;
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
})(SupportedUserActionEnum || (SupportedUserActionEnum = {}));
/**
 * 管理员支持的操作日志类型枚举
 */
export var SupportedAdminActionEnum;
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
})(SupportedAdminActionEnum || (SupportedAdminActionEnum = {}));
export var ApplicationType;
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
})(ApplicationType || (ApplicationType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0pBOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksdUJBcUNYO0FBckNELFdBQVksdUJBQXVCO0lBQ2pDOztPQUVHO0lBQ0gsMENBQWUsQ0FBQTtJQUNmOztPQUVHO0lBQ0gsZ0RBQXFCLENBQUE7SUFDckI7O09BRUc7SUFDSCwyREFBZ0MsQ0FBQTtJQUNoQzs7T0FFRztJQUNILDhEQUFtQyxDQUFBO0lBQ25DOztPQUVHO0lBQ0gseURBQThCLENBQUE7SUFDOUI7O09BRUc7SUFDSCx1REFBNEIsQ0FBQTtJQUM1Qjs7T0FFRztJQUNILHVEQUE0QixDQUFBO0lBQzVCOztPQUVHO0lBQ0gsNkRBQWtDLENBQUE7SUFDbEM7O09BRUc7SUFDSCxtREFBd0IsQ0FBQTtBQUMxQixDQUFDLEVBckNXLHVCQUF1QixLQUF2Qix1QkFBdUIsUUFxQ2xDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSx3QkE2Q1g7QUE3Q0QsV0FBWSx3QkFBd0I7SUFDbEM7O09BRUc7SUFDSCxzREFBMEIsQ0FBQTtJQUMxQjs7T0FFRztJQUNILHdEQUE0QixDQUFBO0lBQzVCOztPQUVHO0lBQ0gsc0RBQTBCLENBQUE7SUFDMUI7O09BRUc7SUFDSCwwREFBOEIsQ0FBQTtJQUM5Qjs7T0FFRztJQUNILHNEQUEwQixDQUFBO0lBQzFCOztPQUVHO0lBQ0gsc0RBQTBCLENBQUE7SUFDMUI7O09BRUc7SUFDSCw0REFBZ0MsQ0FBQTtJQUNoQzs7T0FFRztJQUNILDhEQUFrQyxDQUFBO0lBQ2xDOztPQUVHO0lBQ0gsOERBQWtDLENBQUE7SUFDbEM7O09BRUc7SUFDSCw0RUFBZ0QsQ0FBQTtJQUNoRDs7T0FFRztJQUNILDZFQUFpRCxDQUFBO0FBQ25ELENBQUMsRUE3Q1csd0JBQXdCLEtBQXhCLHdCQUF3QixRQTZDbkM7QUFtekJELE1BQU0sQ0FBTixJQUFZLGVBYVg7QUFiRCxXQUFZLGVBQWU7SUFDekI7O09BRUc7SUFDSCw0Q0FBd0IsQ0FBQTtJQUN4Qjs7T0FFRztJQUNKLG9DQUFpQixDQUFBO0lBQ2hCOztPQUVHO0lBQ0gsZ0NBQVksQ0FBQTtBQUNkLENBQUMsRUFiVyxlQUFlLEtBQWYsZUFBZSxRQWExQiJ9