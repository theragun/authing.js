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
    exports.OIDCConnectionMode = exports.LoginMethods = exports.RegisterMethods = exports.AppPasswordStrengthLimit = exports.Protocol = exports.SocialConnectionProvider = exports.PasswordSecurityLevel = void 0;
    /**
     * 密码安全等级
     */
    var PasswordSecurityLevel;
    (function (PasswordSecurityLevel) {
        PasswordSecurityLevel[PasswordSecurityLevel["LOW"] = 1] = "LOW";
        PasswordSecurityLevel[PasswordSecurityLevel["MIDDLE"] = 2] = "MIDDLE";
        PasswordSecurityLevel[PasswordSecurityLevel["HIGH"] = 3] = "HIGH";
    })(PasswordSecurityLevel = exports.PasswordSecurityLevel || (exports.PasswordSecurityLevel = {}));
    var SocialConnectionProvider;
    (function (SocialConnectionProvider) {
        SocialConnectionProvider["ALIPAY"] = "alipay";
        SocialConnectionProvider["GOOGLE"] = "google";
        SocialConnectionProvider["WECHATPC"] = "wechat:pc";
        SocialConnectionProvider["WECHATMP"] = "wechat:webpage-authorization";
        SocialConnectionProvider["WECHAT_MINIPROGRAM"] = "wechat:miniprogram:default";
        SocialConnectionProvider["WECHAT_MINIPROGRAM_QRCODE"] = "wechat:miniprogram:qrconnect";
        SocialConnectionProvider["WECHAT_MINIPROGRAM_APPLAUNCH"] = "wechat:miniprogram:app-launch";
        SocialConnectionProvider["WECHATMOBILE"] = "wechat:mobile";
        SocialConnectionProvider["GITHUB"] = "github";
        SocialConnectionProvider["QQ"] = "qq";
        SocialConnectionProvider["WECHATWORK_ADDRESS_BOOK"] = "wechatwork:addressbook";
        SocialConnectionProvider["WECHATWORK_CORP_QRCONNECT"] = "wechatwork:corp:qrconnect";
        SocialConnectionProvider["WECHATWORK_SERVICEPROVIDER_QRCONNECT"] = "wechatwork:service-provider:qrconnect";
        SocialConnectionProvider["DINGTALK"] = "dingtalk";
        SocialConnectionProvider["WEIBO"] = "weibo";
        SocialConnectionProvider["APPLE"] = "apple";
        SocialConnectionProvider["APPLE_WEB"] = "apple:web";
        SocialConnectionProvider["OAUTH"] = "oauth";
        SocialConnectionProvider["BAIDU"] = "baidu";
    })(SocialConnectionProvider = exports.SocialConnectionProvider || (exports.SocialConnectionProvider = {}));
    var Protocol;
    (function (Protocol) {
        Protocol["OIDC"] = "oidc";
        Protocol["OAUTH"] = "oauth";
        Protocol["SAML"] = "saml";
        Protocol["CAS"] = "cas";
        Protocol["AZURE_AD"] = "azure-ad";
    })(Protocol = exports.Protocol || (exports.Protocol = {}));
    var AppPasswordStrengthLimit;
    (function (AppPasswordStrengthLimit) {
        AppPasswordStrengthLimit[AppPasswordStrengthLimit["NoCheck"] = 0] = "NoCheck";
        AppPasswordStrengthLimit[AppPasswordStrengthLimit["Low"] = 1] = "Low";
        AppPasswordStrengthLimit[AppPasswordStrengthLimit["Middle"] = 2] = "Middle";
        AppPasswordStrengthLimit[AppPasswordStrengthLimit["High"] = 3] = "High";
    })(AppPasswordStrengthLimit = exports.AppPasswordStrengthLimit || (exports.AppPasswordStrengthLimit = {}));
    var RegisterMethods;
    (function (RegisterMethods) {
        RegisterMethods["Email"] = "email";
        RegisterMethods["Phone"] = "phone";
    })(RegisterMethods = exports.RegisterMethods || (exports.RegisterMethods = {}));
    var LoginMethods;
    (function (LoginMethods) {
        LoginMethods["LDAP"] = "ldap";
        LoginMethods["AppQr"] = "app-qrcode";
        LoginMethods["Password"] = "password";
        LoginMethods["PhoneCode"] = "phone-code";
        LoginMethods["WxMinQr"] = "wechat-miniprogram-qrcode";
        LoginMethods["AD"] = "ad"; // 对应企业身份源的 Windows AD 登录
    })(LoginMethods = exports.LoginMethods || (exports.LoginMethods = {}));
    var OIDCConnectionMode;
    (function (OIDCConnectionMode) {
        OIDCConnectionMode["FRONT_CHANNEL"] = "FRONT_CHANNEL";
        OIDCConnectionMode["BACK_CHANNEL"] = "BACK_CHANNEL";
    })(OIDCConnectionMode = exports.OIDCConnectionMode || (exports.OIDCConnectionMode = {}));
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQXNKQTs7T0FFRztJQUNILElBQVkscUJBSVg7SUFKRCxXQUFZLHFCQUFxQjtRQUMvQiwrREFBTyxDQUFBO1FBQ1AscUVBQVUsQ0FBQTtRQUNWLGlFQUFRLENBQUE7SUFDVixDQUFDLEVBSlcscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFJaEM7SUFnQkQsSUFBWSx3QkFvQlg7SUFwQkQsV0FBWSx3QkFBd0I7UUFDbEMsNkNBQWlCLENBQUE7UUFDakIsNkNBQWlCLENBQUE7UUFDakIsa0RBQXNCLENBQUE7UUFDdEIscUVBQXlDLENBQUE7UUFDekMsNkVBQWlELENBQUE7UUFDakQsc0ZBQTBELENBQUE7UUFDMUQsMEZBQThELENBQUE7UUFDOUQsMERBQThCLENBQUE7UUFDOUIsNkNBQWlCLENBQUE7UUFDakIscUNBQVMsQ0FBQTtRQUNULDhFQUFrRCxDQUFBO1FBQ2xELG1GQUF1RCxDQUFBO1FBQ3ZELDBHQUE4RSxDQUFBO1FBQzlFLGlEQUFxQixDQUFBO1FBQ3JCLDJDQUFlLENBQUE7UUFDZiwyQ0FBZSxDQUFBO1FBQ2YsbURBQXVCLENBQUE7UUFDdkIsMkNBQWUsQ0FBQTtRQUNmLDJDQUFlLENBQUE7SUFDakIsQ0FBQyxFQXBCVyx3QkFBd0IsR0FBeEIsZ0NBQXdCLEtBQXhCLGdDQUF3QixRQW9CbkM7SUFFRCxJQUFZLFFBTVg7SUFORCxXQUFZLFFBQVE7UUFDbEIseUJBQWEsQ0FBQTtRQUNiLDJCQUFlLENBQUE7UUFDZix5QkFBYSxDQUFBO1FBQ2IsdUJBQVcsQ0FBQTtRQUNYLGlDQUFxQixDQUFBO0lBQ3ZCLENBQUMsRUFOVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQU1uQjtJQUVELElBQVksd0JBS1g7SUFMRCxXQUFZLHdCQUF3QjtRQUNsQyw2RUFBTyxDQUFBO1FBQ1AscUVBQUcsQ0FBQTtRQUNILDJFQUFNLENBQUE7UUFDTix1RUFBSSxDQUFBO0lBQ04sQ0FBQyxFQUxXLHdCQUF3QixHQUF4QixnQ0FBd0IsS0FBeEIsZ0NBQXdCLFFBS25DO0lBRUQsSUFBWSxlQUdYO0lBSEQsV0FBWSxlQUFlO1FBQ3pCLGtDQUFlLENBQUE7UUFDZixrQ0FBZSxDQUFBO0lBQ2pCLENBQUMsRUFIVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQUcxQjtJQUVELElBQVksWUFPWDtJQVBELFdBQVksWUFBWTtRQUN0Qiw2QkFBYSxDQUFBO1FBQ2Isb0NBQW9CLENBQUE7UUFDcEIscUNBQXFCLENBQUE7UUFDckIsd0NBQXdCLENBQUE7UUFDeEIscURBQXFDLENBQUE7UUFDckMseUJBQVMsQ0FBQSxDQUFDLHlCQUF5QjtJQUNyQyxDQUFDLEVBUFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFPdkI7SUE4Q0QsSUFBWSxrQkFHWDtJQUhELFdBQVksa0JBQWtCO1FBQzVCLHFEQUErQixDQUFBO1FBQy9CLG1EQUE2QixDQUFBO0lBQy9CLENBQUMsRUFIVyxrQkFBa0IsR0FBbEIsMEJBQWtCLEtBQWxCLDBCQUFrQixRQUc3QjtJQW9SQSxDQUFDIn0=