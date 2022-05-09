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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQXNKQTs7R0FFRztBQUNILElBQVkscUJBSVg7QUFKRCxXQUFZLHFCQUFxQjtJQUMvQiwrREFBTyxDQUFBO0lBQ1AscUVBQVUsQ0FBQTtJQUNWLGlFQUFRLENBQUE7QUFDVixDQUFDLEVBSlcscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFJaEM7QUFnQkQsSUFBWSx3QkFvQlg7QUFwQkQsV0FBWSx3QkFBd0I7SUFDbEMsNkNBQWlCLENBQUE7SUFDakIsNkNBQWlCLENBQUE7SUFDakIsa0RBQXNCLENBQUE7SUFDdEIscUVBQXlDLENBQUE7SUFDekMsNkVBQWlELENBQUE7SUFDakQsc0ZBQTBELENBQUE7SUFDMUQsMEZBQThELENBQUE7SUFDOUQsMERBQThCLENBQUE7SUFDOUIsNkNBQWlCLENBQUE7SUFDakIscUNBQVMsQ0FBQTtJQUNULDhFQUFrRCxDQUFBO0lBQ2xELG1GQUF1RCxDQUFBO0lBQ3ZELDBHQUE4RSxDQUFBO0lBQzlFLGlEQUFxQixDQUFBO0lBQ3JCLDJDQUFlLENBQUE7SUFDZiwyQ0FBZSxDQUFBO0lBQ2YsbURBQXVCLENBQUE7SUFDdkIsMkNBQWUsQ0FBQTtJQUNmLDJDQUFlLENBQUE7QUFDakIsQ0FBQyxFQXBCVyx3QkFBd0IsR0FBeEIsZ0NBQXdCLEtBQXhCLGdDQUF3QixRQW9CbkM7QUFFRCxJQUFZLFFBTVg7QUFORCxXQUFZLFFBQVE7SUFDbEIseUJBQWEsQ0FBQTtJQUNiLDJCQUFlLENBQUE7SUFDZix5QkFBYSxDQUFBO0lBQ2IsdUJBQVcsQ0FBQTtJQUNYLGlDQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFOVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQU1uQjtBQUVELElBQVksd0JBS1g7QUFMRCxXQUFZLHdCQUF3QjtJQUNsQyw2RUFBTyxDQUFBO0lBQ1AscUVBQUcsQ0FBQTtJQUNILDJFQUFNLENBQUE7SUFDTix1RUFBSSxDQUFBO0FBQ04sQ0FBQyxFQUxXLHdCQUF3QixHQUF4QixnQ0FBd0IsS0FBeEIsZ0NBQXdCLFFBS25DO0FBRUQsSUFBWSxlQUdYO0FBSEQsV0FBWSxlQUFlO0lBQ3pCLGtDQUFlLENBQUE7SUFDZixrQ0FBZSxDQUFBO0FBQ2pCLENBQUMsRUFIVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQUcxQjtBQUVELElBQVksWUFPWDtBQVBELFdBQVksWUFBWTtJQUN0Qiw2QkFBYSxDQUFBO0lBQ2Isb0NBQW9CLENBQUE7SUFDcEIscUNBQXFCLENBQUE7SUFDckIsd0NBQXdCLENBQUE7SUFDeEIscURBQXFDLENBQUE7SUFDckMseUJBQVMsQ0FBQSxDQUFDLHlCQUF5QjtBQUNyQyxDQUFDLEVBUFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFPdkI7QUE4Q0QsSUFBWSxrQkFHWDtBQUhELFdBQVksa0JBQWtCO0lBQzVCLHFEQUErQixDQUFBO0lBQy9CLG1EQUE2QixDQUFBO0FBQy9CLENBQUMsRUFIVyxrQkFBa0IsR0FBbEIsMEJBQWtCLEtBQWxCLDBCQUFrQixRQUc3QjtBQW9SQSxDQUFDIn0=