import { GraphqlClient } from '../common/GraphqlClient';
import { HttpClient } from '../common/HttpClient';
import { AuthenticationTokenProvider } from './AuthenticationTokenProvider';
import { Lang, Encryption } from '../../types';
/**
 * 初始化 AuthenticationClientOptions 的参数
 */
export interface AuthenticationClientOptions {
    /** 应用 ID */
    appId: string;
    /** 租户 ID */
    tenantId?: string;
    /** 应用完整域名，如 https://sample-app.authing.cn，不带最后的斜线 '/'。 */
    appHost?: string;
    /** 应用密钥 */
    secret?: string;
    /** 应用身份协议 */
    protocol?: 'oauth' | 'oidc' | 'saml' | 'cas';
    /** 获取 token 端点认证方式 */
    tokenEndPointAuthMethod?: 'client_secret_post' | 'client_secret_basic' | 'none';
    /** 检查 token 端点认证方式 */
    introspectionEndPointAuthMethod?: 'client_secret_post' | 'client_secret_basic' | 'none';
    /** 撤回 token 端点认证方式 */
    revocationEndPointAuthMethod?: 'client_secret_post' | 'client_secret_basic' | 'none';
    /** 应用回调地址 */
    redirectUri?: string;
    /** 请求超时时间 **/
    timeout?: number;
    /** 错误回调函数, 默认为 (err: Error) => { throw err } 直接抛出报错 **/
    onError?: (code: number, message: string, data?: any) => void;
    /** Websocket 服务器域名 */
    websocketHost?: string;
    /** 请求来源 */
    requestFrom?: string;
    /** token */
    token?: string;
    /** 加密函数 */
    encryptFunction?: (plainText: string, publicKey: string, encryption?: Encryption) => Promise<string>;
    /** 密码传输加密公钥 */
    publicKey?: string;
    httpClient?: typeof HttpClient;
    graphqlClient?: typeof GraphqlClient;
    tokenProvider?: typeof AuthenticationTokenProvider;
    /** 用于解密 Token 的私钥 */
    privateKeys?: PrivateKey[];
    /**
     * 语言
     */
    lang?: Lang;
    /**
     * @deprecated 该参数已经废弃，请使用 appHost
     */
    host?: string;
    /**
     * @deprecated 该参数已经废弃，请使用 appHost
     */
    domain?: string;
    /**
     * 请求头 key，适用于去 Authing 品牌化场景
     */
    headers?: {
        'userpool-id': string;
        'app-id': string;
        'tenant-id'?: string;
        'sdk-version': string;
        'request-from': string;
        lang: string;
    };
    encryption?: Encryption;
}
export interface QRCodeUserInfo {
    nickname: string;
    photo: string;
    id?: string;
    email?: string;
    emailVerified?: boolean;
    unionid?: string;
    openid?: string;
    oauth?: string;
    registerMethod?: string;
    username?: string;
    company?: string;
    token?: string;
    phone?: string;
    tokenExpiredAt?: string;
    loginsCount?: number;
    lastIP?: string;
    signedUp?: string;
    blocked?: boolean;
    isDeleted?: boolean;
}
export interface QRCodeStatus {
    random: string;
    /** 二维码状态: 0 - 未使用, 1 - 已扫码, 2 - 已授权, 3 - 取消授权, -1 - 已过期 */
    status: number;
    ticket?: string;
    userInfo?: QRCodeUserInfo;
}
export interface QRCodeGenarateResult {
    random: string;
    url: string;
    customLogo: string;
}
export declare type IMfaAuthenticators = Array<{
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    enable: boolean;
    secret: string;
    authenticatorType: string;
    recoveryCode: string;
}>;
export declare type IMfaAssociation = {
    authenticator_type: string;
    secret: string;
    qrcode_uri: string;
    qrcode_data_url: string;
    recovery_code: string;
};
export declare type IMfaConfirmAssociation = {
    code: number;
    message: string;
};
export declare type IMfaDeleteAssociation = {
    code: number;
    message: string;
};
/**
 * 密码安全等级
 */
export declare enum PasswordSecurityLevel {
    LOW = 1,
    MIDDLE = 2,
    HIGH = 3
}
export interface SecurityLevel {
    email: boolean;
    mfa: boolean;
    password: boolean;
    phone: boolean;
    passwordSecurityLevel: PasswordSecurityLevel | null;
    score: number;
}
export declare enum SocialConnectionProvider {
    ALIPAY = "alipay",
    GOOGLE = "google",
    WECHATPC = "wechat:pc",
    WECHATMP = "wechat:webpage-authorization",
    WECHAT_MINIPROGRAM = "wechat:miniprogram:default",
    WECHAT_MINIPROGRAM_QRCODE = "wechat:miniprogram:qrconnect",
    WECHAT_MINIPROGRAM_APPLAUNCH = "wechat:miniprogram:app-launch",
    WECHATMOBILE = "wechat:mobile",
    GITHUB = "github",
    QQ = "qq",
    WECHATWORK_ADDRESS_BOOK = "wechatwork:addressbook",
    WECHATWORK_CORP_QRCONNECT = "wechatwork:corp:qrconnect",
    WECHATWORK_SERVICEPROVIDER_QRCONNECT = "wechatwork:service-provider:qrconnect",
    DINGTALK = "dingtalk",
    WEIBO = "weibo",
    APPLE = "apple",
    APPLE_WEB = "apple:web",
    OAUTH = "oauth",
    BAIDU = "baidu"
}
export declare enum Protocol {
    OIDC = "oidc",
    OAUTH = "oauth",
    SAML = "saml",
    CAS = "cas",
    AZURE_AD = "azure-ad"
}
export declare enum AppPasswordStrengthLimit {
    NoCheck = 0,
    Low = 1,
    Middle = 2,
    High = 3
}
export declare enum RegisterMethods {
    Email = "email",
    Phone = "phone"
}
export declare enum LoginMethods {
    LDAP = "ldap",
    AppQr = "app-qrcode",
    Password = "password",
    PhoneCode = "phone-code",
    WxMinQr = "wechat-miniprogram-qrcode",
    AD = "ad"
}
export interface IOAuthConnectionConfig {
    authEndPoint: string;
    tokenEndPoint: string;
    scope: string;
    clientId: string;
    clientSecret: string;
    authUrlTemplate: string;
    codeToTokenScript: string;
    tokenToUserInfoScript: string;
    tokenToUserInfoScriptFuncId: string;
    codeToTokenScriptFuncId: string;
    authUrl?: string;
}
export interface ISamlConnectionConfig {
    signInEndPoint: string;
    samlRequest?: string;
    samlIdpCert: string;
    samlSpCert: string;
    samlSpKey: string;
    signOutEndPoint: string;
    signSamlRequest: boolean;
    signatureAlgorithm: string;
    digestAlgorithm: string;
    protocolBinding: string;
}
export interface ICasConnectionConfig {
    casConnectionLoginUrl: string;
}
export declare enum OIDCConnectionMode {
    FRONT_CHANNEL = "FRONT_CHANNEL",
    BACK_CHANNEL = "BACK_CHANNEL"
}
export interface IAzureAdConnectionConfig {
    microsoftAzureAdDomain: string;
    clientId: string;
    syncUserProfileOnLogin: string;
    emailVerifiedDefault: boolean;
    authorizationUrl: string;
    callbackUrl: string;
}
export interface OIDCConnectionConfig {
    issuerUrl: string;
    authorizationEdpoint: string;
    responseType: string;
    mode: OIDCConnectionMode;
    clientId: string;
    clientSecret: string;
    scopes: string;
    redirectUri: string;
}
export interface ApplicationConfig {
    id: string;
    cdnBase: string;
    userPoolId: string;
    rootUserPoolId: string;
    publicKey: string;
    passwordStrength: AppPasswordStrengthLimit;
    css: string;
    name: string;
    logo: string;
    redirectUris: string[];
    registerDisabled: boolean;
    registerTabs: {
        list: RegisterMethods[];
        default: string;
        title: {
            [x: string]: string;
        };
    };
    loginTabs: {
        list: LoginMethods[];
        default: string;
        title: {
            [x: string]: string;
        };
    };
    socialConnections: {
        provider: string;
        name: string;
        authorizationUrl: string;
    }[];
    agreementEnabled: boolean;
    extendsFieldsEnabled: boolean;
    identityProviders: {
        identifier: string;
        protocol: Protocol;
        displayName: string;
        logo: string;
        config: ISamlConnectionConfig | OIDCConnectionConfig | ICasConnectionConfig | IAzureAdConnectionConfig | IOAuthConnectionConfig;
    }[];
    ssoPageComponentDisplay: {
        autoRegisterThenLoginHintInfo: boolean;
        forgetPasswordBtn: boolean;
        idpBtns: boolean;
        loginBtn: boolean;
        loginByPhoneCodeTab: boolean;
        loginByUserPasswordTab: boolean;
        loginMethodNav: boolean;
        phoneCodeInput: boolean;
        registerBtn: boolean;
        registerByEmailTab: boolean;
        registerByPhoneTab: boolean;
        registerMethodNav: boolean;
        socialLoginBtns: boolean;
        userPasswordInput: boolean;
        wxMpScanTab: boolean;
    };
    protocol: Protocol;
    oidcConfig: OidcClientMetadata;
    enableSubAccount: boolean;
    userPoolInWhitelist: boolean;
    userPortal: UserPortalConfig;
    /** websocket 域名*/
    websocket: string;
    verifyCodeLength: number;
}
export interface OidcClientMetadata {
    grant_types: string[];
    client_id: string;
    redirect_uris: string[];
    scope: string;
    response_types: ResponseType[];
}
export interface UserPortalConfig {
    cdnBase: string;
    assetsBase: string;
    assetsVersion: string;
    icpRecord: string;
    psbRecord: string;
}
export interface IOidcParams {
    appId?: string;
    redirectUri?: string;
    responseType?: 'code' | 'code id_token token' | 'code id_token' | 'code token' | 'id_token token' | 'id_token' | 'none';
    responseMode?: 'query' | 'fragment' | 'form_post';
    state?: string;
    nonce?: string;
    scope?: string;
    codeChallengeMethod?: 'plain' | 'S256';
    codeChallenge?: string;
    tenantId?: string;
}
export interface IOauthParams {
    appId?: string;
    redirectUri?: string;
    responseType?: 'code' | 'token';
    state?: string;
    scope?: string;
}
export interface ILogoutParams {
    expert?: boolean;
    redirectUri?: string;
    idToken?: string;
}
export interface ICasParams {
    service?: string;
}
export declare type TotpSource = 'APPLICATION' | 'SELF';
export declare type ProviderType = 'wechat:pc' | 'github' | 'google' | 'qq' | 'apple' | 'baidu' | 'alipay' | 'lark:app-store' | 'lark:custom-app' | 'weibo' | 'dingtalk' | 'wechat:webpage-authorization' | 'alipay' | 'wechat:miniprogram:default' | 'wechat:mobile' | 'wechatwork:service-provider:authorization' | 'wechatwork:service-provider:qrconnect' | 'wechatwork:corp:qrconnect' | 'wechat:miniprogram:app-launch' | 'wechat:miniprogram:qrconnect';
/**
 * 实体认证类型
 *
 * P：个人认证
 * E：企业认证
 */
export declare type PrincipalType = 'P' | 'E';
export interface PrincipalDetail {
    authenticationTime: string;
    createdAt: string;
    id: string;
    principalCode: string;
    principalName: string;
    principalType: PrincipalType;
    updatedAt: string;
    userId: string;
    userPoolId: string;
}
export declare type PrincipalInput = {
    /** 认证类型 */
    type: 'P';
    /** 姓名 */
    name: string;
    /** 身份证 */
    idCard: string;
    /** 银行卡号 */
    bankCard: string;
} | {
    /** 认证类型 */
    type: 'E';
    /** 企业名称 */
    enterpriseName: string;
    /** 统一社会信用代码/注册号/组织机构代码 */
    enterpriseCode: string;
    /** 企业法人名称 */
    legalPersonName: string;
};
export declare type Cas20ValidationSuccessResult = {
    serviceResponse: {
        authenticationSuccess: {
            user: string;
            attributes: {
                updated_at: string;
                address: {
                    country: string;
                    postal_code: string;
                    region: string;
                    formatted: string;
                };
                phone_number_verified: boolean;
                phone_number: string;
                locale: string;
                zoneinfo: string;
                birthdate: string;
                gender: string;
                email_verified: boolean;
                email: string;
                website: string;
                picture: string;
                profile: string;
                preferred_username: string;
                nickname: string;
                middle_name: string;
                family_name: string;
                given_name: string;
                name: string;
                sub: string;
                external_id: string;
                unionid: string;
            };
        };
    };
};
export declare type Cas20ValidationFailureResult = {
    authenticationFailure: {
        code: string;
        description: string;
    };
};
export interface SsoSession {
    _id: string;
    cookie: {
        originalMaxAge: number;
        expires: string;
        secure: boolean;
        httpOnly: boolean;
        path: string;
        sameSite: string;
        appId: string;
        type: string;
        userId: string;
    };
}
export interface PrivateKey {
    pkcs8Key: string;
    alg: 'RSA-OAEP' | 'ECDH-ES';
    kid?: string;
}
