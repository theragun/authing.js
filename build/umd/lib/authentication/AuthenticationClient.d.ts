import { AuthenticationTokenProvider } from './AuthenticationTokenProvider';
import { Cas20ValidationSuccessResult, Cas20ValidationFailureResult, SsoSession } from './types';
import { GraphqlClient } from '../common/GraphqlClient';
import { AuthenticationClientOptions, ICasParams, ILogoutParams, IOauthParams, IOidcParams, PasswordSecurityLevel, ProviderType, SecurityLevel } from './types';
import { CheckPasswordStrengthResult, CommonMessage, EmailScene, JwtTokenStatus, PaginatedAuthorizedResources, RefreshToken, RegisterProfile, ResourceType, UpdateUserInput, UserDefinedData } from '../../types/graphql.v2';
import { User } from '../../types/index';
import { QrCodeAuthenticationClient } from './QrCodeAuthenticationClient';
import { MfaAuthenticationClient } from './MfaAuthenticationClient';
import { HttpClient, NaiveHttpClient } from '../common/HttpClient';
import { SocialAuthenticationClient } from './SocialAuthenticationClient';
import { KeyValuePair, Lang } from '../../types';
import { EnterpriseAuthenticationClient } from './EnterpriseAuthenticationClient';
import { BaseAuthenticationClient } from './BaseAuthenticationClient';
import { ApplicationPublicDetail } from '../management/types';
import { PrincipalAuthenticationClient } from './PrincipalAuthentication';
/**
 * @class AuthenticationClient 认证核心模块
 * @description 此模块包含注册登录、重置手机号邮箱、修改账号信息等方法，是以你的终端用户（End User）的身份进行请求，适合在需要验证用户身份的情况下使用。
 *
 * @example
 *
 * 使用方法：
 *
 * \`\`\`javascript
 * import { AuthenticationClient } from "authing-js-sdk"
 * const authenticationClient = new AuthenticationClient({
 *    appId: "YOUR_APP_ID",
 * })
 * authenticationClient.registerByEmail // 使用邮箱注册
 * authenticationClient.loginByEmail // 使用邮箱登录
 * \`\`\`
 *
 *
 * @name AuthenticationClient
 */
export declare class AuthenticationClient {
    options: AuthenticationClientOptions;
    baseClient: BaseAuthenticationClient;
    graphqlClient: GraphqlClient;
    httpClient: HttpClient;
    naiveHttpClient: NaiveHttpClient;
    tokenProvider: AuthenticationTokenProvider;
    wxqrcode: QrCodeAuthenticationClient;
    qrcode: QrCodeAuthenticationClient;
    wechatmpqrcode: QrCodeAuthenticationClient;
    mfa: MfaAuthenticationClient;
    social: SocialAuthenticationClient;
    enterprise: EnterpriseAuthenticationClient;
    principal: PrincipalAuthenticationClient;
    private publicKeyManager;
    constructor(options: AuthenticationClientOptions);
    checkLoggedIn(): string;
    setCurrentUser(user: User): void;
    setToken(token: string): void;
    /**
     * @name registerByEmail
     * @name_zh 使用邮箱注册
     * @description 使用邮箱注册，此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。如果你希望邮箱未验证的用户不能进行登录，可以使用 pipeline 对此类请求进行拦截。
     *
     * @param {string} email 邮箱
     * @param {string} password 密码
     * @param {RegisterProfile} [profile] 用户资料
     * @param {Object} [options]
     * @param {boolean} [options.forceLogin] 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
     * @param {boolean} [options.generateToken] 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     * @example
     *
     * authenticationClient.registerByEmail(
     *  'test@example.com',
     *  'passw0rd',
     *  {
     *    nickname: 'Nick'
     *  },
     *  {
     *    generateToken: true
     *  }
     * )
     *
     * @example
     * authenticationClient.registerByEmail('test@example.com', 'passw0rd')
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    registerByEmail(email: string, password: string, profile?: RegisterProfile, options?: {
        forceLogin?: boolean;
        generateToken?: boolean;
        clientIp?: string;
        /**
         * @deprecated use customData instead
         */
        params?: Array<{
            key: string;
            value: any;
        }>;
        /**
         * @description 将会写入配置的用户自定义字段
         */
        customData?: {
            [x: string]: any;
        };
        /**
         * @description 请求上下文，将会传递到 Pipeline 中
         */
        context?: {
            [x: string]: any;
        };
        /**
         * 如果注册的同时补全手机号信息，需要传此参数
         */
        phoneToken?: string;
    }): Promise<User>;
    /**
     * @name registerByUsername
     * @name_zh 使用用户名注册
     * @description 使用用户名注册
     *
     * @param {string} username 用户名
     * @param {string} password 密码
     * @param {RegisterProfile} [profile] 用户资料
     * @param {Object} [options]
     * @param {boolean} [options.forceLogin] 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
     * @param {boolean} [options.generateToken] 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     *
     * @example
     *
     * authenticationClient.registerByUsername(
     *  'bob',
     *  'passw0rd',
     *  {
     *    nickname: 'Nick'
     *  },
     *  {
     *    generateToken: true
     *  }
     * )
     *
     * @example
     * authenticationClient.registerByUsername('bob', 'passw0rd')
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    registerByUsername(username: string, password: string, profile?: RegisterProfile, options?: {
        forceLogin?: boolean;
        generateToken?: boolean;
        clientIp?: string;
        /**
         * @deprecated use customData instead
         */
        params?: Array<{
            key: string;
            value: any;
        }>;
        /**
         * @description 将会写入配置的用户自定义字段
         */
        customData?: {
            [x: string]: any;
        };
        /**
         * @description 请求上下文，将会传递到 Pipeline 中
         */
        context?: {
            [x: string]: any;
        };
        /**
         * 如果注册的同时补全手机号信息，需要传此参数
         */
        phoneToken?: string;
        /**
         * 如果注册的同时补全邮箱信息，需要传此参数
         */
        emailToken?: string;
    }): Promise<User>;
    /**
     * @name registerByPhoneCode
     * @name_zh 使用手机号注册
     * @description 使用手机号注册，你可以同时设置该账号的初始密码。发送短信的接口请见 sendSmsCode
     *
     * @param {string} phone 手机号
     * @param {string} code 短信验证码
     * @param {string} password 初始密码
     * @param {RegisterProfile} [profile] 用户资料
     * @param {Object} [options]
     * @param {boolean} [options.forceLogin] 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
     * @param {boolean} [options.generateToken] 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     * @example
     *
     * authenticationClient.registerByPhoneCode(
     *  '176xxxx7041',
     *  '1234',
     *  'passw0rd',
     *  {
     *    nickname: 'Nick'
     *  },
     *  {
     *    generateToken: true
     *  }
     * )
     *
     * @example
     * authenticationClient.registerByPhoneCode('176xxxx7041', '1234')
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    registerByPhoneCode(phone: string, code: string, password?: string, profile?: RegisterProfile, options?: {
        forceLogin?: boolean;
        generateToken?: boolean;
        clientIp?: string;
        /**
         * @deprecated use customData instead
         */
        params?: Array<{
            key: string;
            value: any;
        }>;
        /**
         * @description 将会写入配置的用户自定义字段
         */
        customData?: {
            [x: string]: any;
        };
        /**
         * @description 请求上下文，将会传递到 Pipeline 中
         */
        context?: {
            [x: string]: any;
        };
        phoneCountryCode?: string;
        /**
         * 如果注册的同时补全邮箱信息，需要传此参数
         */
        emailToken?: string;
    }): Promise<User>;
    /**
     * @name checkPasswordStrength
     * @name_zh 检查密码强度
     * @description 检查密码强度，详情请见: https://docs.authing.co/v2/guides/security/config-password.html
     *
     * @param {string} password
     * @example
     * authenticationClient.checkPasswordStrength('weak')
     *
     * @example
     * authenticationClient.checkPasswordStrength('strongPassw0rd!')
     *
     * @returns {Promise<CheckPasswordStrengthResult>}
     * @memberof AuthenticationClient
     */
    checkPasswordStrength(password: string): Promise<CheckPasswordStrengthResult>;
    /**
     * @name sendSmsCode
     * @name_zh 发送短信验证码
     * @description 发送短信验证码, 短信验证码的有效时间为 60 s。
     *
     * @param {string} phone
     * @example
     * authenticationClient.sendSmsCode('176xxxx6754')
     *
     * @returns {Promise<CommonMessage>}
     * @memberof AuthenticationClient
     */
    sendSmsCode(phone: string, phoneCountryCode?: string): Promise<CommonMessage>;
    /**
     * @name loginByEmail
     * @name_zh 使用邮箱登录
     * @description 使用邮箱登录，该接口默认不会限制未验证的邮箱进行登录，如果你希望邮箱未验证的用户不能进行登录，可以使用 pipeline 对此类请求进行拦截。
     *
     * 如果你的用户池配置了登录失败检测，当同一  IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)。
     *
     * @param {string} email 邮箱
     * @param {string} password 密码
     * @param {Object} [options]
     * @param {boolean} [options.autoRegister] 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
     * @param {string} [options.captchaCode] 图形验证码
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     * @example
     *
     * authenticationClient.loginByEmail(
     *  'test@example.com',
     *  'passw0rd',
     *  {
     *    autoRegister: true，
     *    captchaCode: 'xj72'
     *  }
     * )
     *
     * @example
     * authenticationClient.loginByEmail('test@example.com', 'passw0rd')
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    loginByEmail(email: string, password: string, options?: {
        autoRegister?: boolean;
        captchaCode?: string;
        clientIp?: string;
        /**
         * @deprecated use customData instead
         */
        params?: Array<{
            key: string;
            value: any;
        }>;
        /**
         * @description 将会写入配置的用户自定义字段
         */
        customData?: {
            [x: string]: any;
        };
        /**
         * @description 请求上下文，将会传递到 Pipeline 中
         */
        context?: {
            [x: string]: any;
        };
    }): Promise<User>;
    /**
     * @name loginByUsername
     * @name_zh 使用用户名登录
     * @description 使用用户名登录。
     *
     * 如果你的用户池配置了登录失败检测，当同一  IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)。
     *
     * @param {string} username 用户名
     * @param {string} password 密码
     * @param {Object} [options]
     * @param {boolean} [options.autoRegister] 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
     * @param {string} [options.captchaCode] 图形验证码
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     *
     * @example
     *
     * authenticationClient.loginByEmail(
     *  'test@example.com',
     *  'passw0rd',
     *  {
     *    autoRegister: true，
     *    captchaCode: 'xj72'
     *  }
     * )
     *
     * @example
     * authenticationClient.loginByEmail('test@example.com', 'passw0rd')
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    loginByUsername(username: string, password: string, options?: {
        autoRegister?: boolean;
        captchaCode?: string;
        clientIp?: string;
        /**
         * @deprecated use customData instead
         */
        params?: Array<{
            key: string;
            value: any;
        }>;
        /**
         * @description 将会写入配置的用户自定义字段
         */
        customData?: {
            [x: string]: any;
        };
        /**
         * @description 请求上下文，将会传递到 Pipeline 中
         */
        context?: {
            [x: string]: any;
        };
    }): Promise<User>;
    /**
     * @name loginByPhoneCode
     * @name_zh 使用手机号验证码登录
     * @description 使用手机号验证码登录。
     *
     *
     * @param {string} phone 手机号
     * @param {string} code 短信验证码
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     * @example
     *
     * authenticationClient.loginByPhoneCode(
     *  '176xxxx7041',
     *  '1234',
     * )
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    loginByPhoneCode(phone: string, code: string, options?: {
        clientIp?: string;
        /**
         * @deprecated use customData instead
         */
        params?: Array<{
            key: string;
            value: any;
        }>;
        /**
         * @description 请求上下文，将会传递到 Pipeline 中
         */
        context?: {
            [x: string]: any;
        };
        /**
         * @description 将会写入配置的用户自定义字段
         */
        customData?: {
            [x: string]: any;
        };
        phoneCountryCode?: string;
    }): Promise<User>;
    /**
     * @name loginByPhonePassword
     * @name_zh 使用手机号密码登录
     * @description 使用手机号密码登录。
     *
     *
     * @param {string} phone 手机号
     * @param {string} password 密码
     * @param {Object} [options]
     * @param {string} [options.captchaCode] 图形验证码
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     * @example
     *
     * authenticationClient.loginByPhonePassword(
     *  '176xxxx7041',
     *  'passw0rd',
     *  {
     *    captchaCode: 'xj72'
     *  }
     * )
     *
     * @example
     * authenticationClient.loginByPhonePassword('176xxxx7041', 'passw0rd')
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    loginByPhonePassword(phone: string, password: string, options?: {
        captchaCode?: string;
        autoRegister?: boolean;
        clientIp?: string;
        /**
         * @deprecated use customData instead
         */
        params?: Array<{
            key: string;
            value: any;
        }>;
        /**
         * @description 将会写入配置的用户自定义字段
         */
        customData?: {
            [x: string]: any;
        };
        /**
         * @description 请求上下文，将会传递到 Pipeline 中
         */
        context?: {
            [x: string]: any;
        };
    }): Promise<User>;
    loginBySubAccount(account: string, password: string, options?: {
        captchaCode?: string;
        clientIp?: string;
    }): Promise<User>;
    /**
     * @name checkLoginStatus
     * @name_zh 检测 Token 登录状态
     * @description 检测 Token 登录状态
     *
     * @param {string} token 用户的登录凭证 token
     *
     * @example
     *
     * authenticationClient.checkLoginStatus('TOKEN')
     *
     * @returns {Promise<JwtTokenStatus>}
     * @memberof AuthenticationClient
     */
    checkLoginStatus(token?: string): Promise<JwtTokenStatus>;
    /**
     * @name sendEmail
     * @name_zh 发送邮件
     * @description 发送邮件
     *
     * @param {string} email 邮箱
     * @param {EmailScene} scene 发送场景，可选值为 RESET_PASSWORD（发送重置密码邮件，邮件中包含验证码）、VerifyEmail（发送验证邮箱的邮件）、ChangeEmail（发送修改邮箱邮件，邮件中包含验证码）
     *
     * @example
     *
     * import { EmailScene } from "authing-js-sdk"
     * authenticationClient.sendEmail('test@example.com', EmailScene.RESET_PASSWORD)
     *
     * @returns {Promise<CommonMessage>}
     * @memberof AuthenticationClient
     */
    sendEmail(email: string, scene: EmailScene): Promise<CommonMessage>;
    /**
     * @name resetPasswordByPhoneCode
     * @name_zh 通过短信验证码重置密码
     * @description 通过短信验证码重置密码，你需要先调用 sendSmsCode 接口发送重置密码邮件。
     *
     * @param {string} phone 手机号
     * @param {string} code 验证码
     * @param {string} newPassword 新的密码
     *
     * @example
     *
     * authenticationClient.resetPasswordByPhoneCode('176xxxx7041', '1234', 'passw0rd')
     *
     * @returns {Promise<CommonMessage>}
     * @memberof AuthenticationClient
     */
    resetPasswordByPhoneCode(phone: string, code: string, newPassword: string, phoneCountryCode?: string): Promise<CommonMessage>;
    /**
     * @name resetPasswordByEmailCode
     * @name_zh 通过邮件验证码重置密码
     * @description 通过邮件验证码重置密码，你需要先调用 sendEmail 接口发送重置密码邮件。
     *
     * @param {string} phone 手机号
     * @param {string} code 验证码
     * @param {string} newPassword 新的密码
     *
     * @example
     *
     * authenticationClient.resetPasswordByEmailCode('test@example.com', '1234', 'passw0rd')
     *
     * @returns {Promise<CommonMessage>}
     * @memberof AuthenticationClient
     */
    resetPasswordByEmailCode(email: string, code: string, newPassword: string): Promise<CommonMessage>;
    resetPasswordByFirstLoginToken(params: {
        token: string;
        password: string;
    }): Promise<{
        message?: string;
        code?: number;
    }>;
    resetPasswordByForceResetToken(params: {
        token: string;
        newPassword: string;
        oldPassword: string;
    }): Promise<{
        message?: string;
        code?: number;
    }>;
    /**
     * @name updateProfile
     * @name_zh 修改用户资料
     * @description 修改用户资料，此接口不能用于修改手机号、邮箱、密码，如果需要请调用 updatePhone、updateEmail、updatePassword 接口。
     *
     * @param {UpdateUserInput} updates 修改的用户资料
     * @param {string} updates.username 用户名
     * @param {string} updates.nickname 昵称
     * @param {string} updates.photo 头像
     * @param {string} updates.company 公司
     * @param {string} updates.browser 浏览器
     * @param {string} updates.device 设备
     * @param {string} updates.lastIP 最近登录的 IP
     * @param {string} updates.name Name
     * @param {string} updates.givenName Given Name
     * @param {string} updates.familyName Family Name
     * @param {string} updates.middleName Middle Name
     * @param {string} updates.profile Profile Url
     * @param {string} updates.preferredUsername Preferred Name
     * @param {string} updates.website 个人网站
     * @param {string} updates.gender 性别, F 表示男性、W 表示女性、未知表示 U
     * @param {string} updates.birthdate 生日
     * @param {string} updates.zoneinfo 时区
     * @param {string} updates.locale 语言
     * @param {string} updates.address 地址
     * @param {string} updates.streetAddress 街道地址
     * @param {string} updates.locality
     * @param {string} updates.region 地域
     * @param {string} updates.postalCode 邮编
     * @param {string} updates.city 城市
     * @param {string} updates.province 省份
     * @param {string} updates.country 国家
     *
     * @example
     *
     * authenticationClient.updateProfile({
     *  nickname: "Nick",
     *  lastIp: "111.111.111.111"
     * })
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    updateProfile(updates: UpdateUserInput, options?: {
        emailToken?: string;
        phoneToken?: string;
    }): Promise<User>;
    /**
     * @name updatePassword
     * @name_zh 更新用户密码
     * @description 更新用户密码
     *
     * @param {string} newPassword 新密码
     * @param {string} [oldPassword] 旧密码，如果用户没有设置密码，可以不填。
     *
     * @example
     *
     * authenticationClient.updatePassword('passw0rd') // 由手机号、社会化登录等其他方式注册的，首次没有设置密码，oldPassword 留空。
     *
     * @example
     *
     * authenticationClient.updatePassword('passw0rd', 'oldPassw0rd') // 用户之前设置了密码
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    updatePassword(newPassword: string, oldPassword?: string): Promise<User>;
    /**
     * @name updatePhone
     * @name_zh 更新用户手机号
     * @description 更新用户手机号。和修改邮箱一样，默认情况下，如果用户当前已经绑定了手机号，需要同时验证原有手机号（目前账号绑定的手机号）和当前邮箱（将要绑定的手机号）。
     * 也就是说，用户 A 当前绑定的手机号为 15888888888，想修改为 15899999999，那么就需要同时验证这两个手机号。
     * 开发者也可以选择不开启 “验证原有手机号“ ，可以在 Authing 控制台 的 设置目录下的安全信息模块进行关闭。
     * 用户首次绑定手机号请使用 bindPhone 接口。
     *
     * @param {string} phone 新手机号
     * @param {string} phoneCode 新手机号的验证码
     * @param {string} [oldPhone] 旧手机号
     * @param {string} [oldPhoneCode] 旧手机号的验证码
     *
     * @example
     *
     * authenticationClient.updatePhone('176xxxx7041', '1234') // 关闭了“验证原有手机号“选项
     *
     * @example
     *
     * authenticationClient.updatePhone('176xxxx7041', '1234', '156xxxx9876', '1234') // 开启了“验证原有手机号“选项
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    updatePhone(phone: string, phoneCode: string, oldPhone?: string, oldPhoneCode?: string, phoneCountryCode?: string, oldPhoneCountryCode?: string): Promise<User>;
    /**
     * @name updateEmail
     * @name_zh 更新用户邮箱
     * @description 如果用户已经绑定了邮箱，默认情况下，需要同时验证原有邮箱（目前账号绑定的邮箱）和当前邮箱（将要绑定的邮箱）。也就是说，用户 A 当前绑定的邮箱为 123456@qq.com，想修改为 1234567@qq.com，那么就需要同时验证这两个邮箱。
     * 开发者也可以选择不开启 “验证原有邮箱“ ，可以在 Authing 控制台 的 设置目录下的安全信息模块进行关闭。
     * 用户首次绑定手机号请使用 bindEmail 接口。
     *
     * @param {string} email 新邮箱
     * @param {string} emailCode 新邮箱的验证码
     * @param {string} [oldEmail] 旧邮箱
     * @param {string} [oldEmailCode] 旧邮箱的验证码
     *
     * @example
     *
     * authenticationClient.updateEmail('test@example.com', '1234') // 关闭了“验证原有邮箱“选项
     *
     * @example
     *
     * authenticationClient.updateEmail('test@example.com', '1234', 'test2@example.com', '1234') // 开启了“验证原有邮箱“选项
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    updateEmail(email: string, emailCode: string, oldEmail?: string, oldEmailCode?: string): Promise<User>;
    /**
     * @name refreshToken
     * @name_zh 刷新当前用户的 token
     * @description 刷新当前用户的 token，调用此接口要求先登录。
     *
     * @example
     *
     * authenticationClient.updateEmail()
     *
     * @returns {Promise<RefreshToken>}
     * @memberof AuthenticationClient
     */
    refreshToken(): Promise<RefreshToken>;
    /**
     * @name linkAccount
     * @name_zh 关联账号
     * @description 将社交账号绑定到主账号（手机号、邮箱账号）。
     *
     * @param {Object} options
     * @param {string} options.primaryUserToken 主账号 Token
     * @param {string} options.secondaryUserToken 社交账号 Token
     *
     * @example
     *
     * authenticationClient.linkAccount({ primaryUserToken: '', secondaryUserToken: '' })
     *
     * @returns {{code: 200, message: "绑定成功"}}
     * @memberof AuthenticationClient
     */
    linkAccount(options: {
        primaryUserToken: string;
        secondaryUserToken: string;
    }): Promise<{
        code: number;
        message: string;
    }>;
    /**
     * @name unLinkAccount
     * @name_zh 解除账号绑定
     * @description 将社交账号从主账号（手机号、邮箱账号）解绑。
     *
     * @param {Object} options
     * @param {string} options.primaryUserToken 主账号 Token
     * @param {string} options.provider 社交账号的提供商名称
     *
     * @example
     *
     * authenticationClient.unLinkAccount({ primaryUserToken: '', provider: 'wechat:pc' })
     *
     * @returns {{code: 200, message: "解绑成功"}}
     * @memberof AuthenticationClient
     */
    unLinkAccount(options: {
        primaryUserToken: string;
        provider: ProviderType;
    }): Promise<{
        code: number;
        message: string;
    }>;
    /**
     * @name bindPhone
     * @name_zh 绑定手机号
     * @description 用户初次绑定手机号，如果需要修改手机号请使用 updatePhone 接口。
     *
     * @param {string} phone
     * @param {string} phoneCode
     *
     * @example
     *
     * authenticationClient.bindPhone('176xxxx7041', '1234')
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    bindPhone(phone: string, phoneCode: string, phoneCountryCode?: string): Promise<User>;
    /**
     * @name unbindPhone
     * @name_zh 解绑手机号
     * @description 用户解绑手机号
     *
     * @example
     *
     * authenticationClient.unbindPhone()
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    unbindPhone(): Promise<User>;
    /**
     * @name bindEmail
     * @name_zh 绑定邮箱号
     * @description 用户邮箱号
     *
     * @param {string} email
     * @param {string} emailCode
     *
     * @example
     *
     * authenticationClient.bindEmail('test@example.com', '1234')
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    bindEmail(email: string, emailCode: string): Promise<User>;
    /**
     * @name unbindEmail
     * @name_zh 解绑邮箱号
     * @description 用户解绑邮箱号
     *
     * @example
     *
     * authenticationClient.unbindPhone()
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    unbindEmail(): Promise<User>;
    /**
     * @name getCurrentUser
     * @name_zh 获取当前登录的用户信息
     * @description 获取当前登录的用户信息
     *
     * @example
     *
     * authenticationClient.getCurrentUser()
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    getCurrentUser(): Promise<User | null>;
    /**
     * @name logout
     * @name_zh 退出登录
     * @description 退出登录，清空 localStorage 里的 user 和 token
     *
     * @example
     *
     * authenticationClient.logout()
     *
     * @returns {null}
     * @memberof AuthenticationClient
     */
    logout(): Promise<void>;
    /**
     * @name listUdv
     * @name_zh 获取当前用户的自定义数据列表
     * @description 获取当前用户的自定义数据列表
     * @deprecated use getUdfValue instead
     *
     * @example
     *
     * authenticationClient.listUdv()
     *
     * @returns {Promise<Array<UserDefinedData>>}
     * @memberof AuthenticationClient
     */
    listUdv(): Promise<Array<UserDefinedData>>;
    /**
     * @name setUdv
     * @name_zh 添加自定义数据
     * @description 添加自定义数据
     *
     * @param {string} key 自定义字段的 key
     * @param {any} value 自定义数据的值，值的类型必须要和用户池定义的自定义字段类型一致。
     *
     * @example
     *
     * authenticationClient.setUdv('school', '清华大学') // 要求用户必须定义了 school 这个字段。
     *
     * @returns {Promise<Array<UserDefinedData>>}
     * @memberof AuthenticationClient
     */
    setUdv(key: string, value: any): Promise<Array<UserDefinedData>>;
    /**
     * @name removeUdv
     * @name_zh 删除自定义数据
     * @description 删除自定义数据
     *
     * @param key 自定义字段的 key
     *
     * @example
     *
     * authenticationClient.removeUdv('school')
     *
     *
     * @returns {Promise<Array<UserDefinedData>>}
     * @memberof AuthenticationClient
     */
    removeUdv(key: string): Promise<Array<UserDefinedData>>;
    /**
     * @name listOrg
     * @name_zh 获取用户所在组织机构
     * @description 获取用户所在的组织机构立碑，以及他所属的节点在此组织机构内的完整路径。
     *
     * @example
     *
     * const data = await authenticationClient.listOrgs();
     *
     * @returns {Promise<UserOrgList>}
     *
     * @memberof AuthenticationClient
     */
    listOrgs(): Promise<any>;
    /**
     * @description 获取用户
     *
     */
    listDepartments(): Promise<{
        totalCount: number;
        list: {
            isMainDepartment: boolean;
            joinedAt?: string;
            department: {
                id: string;
                orgId?: string;
                name: string;
                nameI18n?: string;
                description?: string;
                descriptionI18n?: string;
                order?: number;
                code?: string;
                root?: boolean;
                depth?: number;
                path: string[];
                codePath: string[];
                namePath: string[];
                createdAt?: string;
                updatedAt?: string;
                children?: string[];
            };
        }[];
    }>;
    /**
     * @name loginByLdap
     * @name_zh 使用 LDAP 用户名登录
     * @description 使用 LDAP 用户名登录。
     *
     * 如果你的用户池配置了登录失败检测，当同一  IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)。
     *
     * @param {string} username 用户名
     * @param {string} password 密码
     * @param {Object} [options]
     * @param {boolean} [options.autoRegister] 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
     * @param {string} [options.captchaCode] 图形验证码
     * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
     *
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *   appId: '应用 ID'
     * })
     *
     * authenticationClient.loginByLdap(
     *  'admin',
     *  'admin',
     * )
     *
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    loginByLdap(username: string, password: string, options?: {
        clientIp?: string;
        withCustomData?: boolean;
    }): Promise<User>;
    /**
     * @name loginByAd
     * @name_zh 使用 AD 用户名登录
     * @description 使用 AD 用户名登录。
     *
     * @param {string} username 用户名
     * @param {string} password 密码
     *
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *   appId: '应用 ID'
     * })
     *
     * authenticationClient.loginByAd(
     *  'admin',
     *  'admin',
     * )
     *
     * @returns {Promise<User>}
     * @memberof AuthenticationClient
     */
    loginByAd(username: string, password: string, options?: {
        clientIp?: string;
        withCustomData?: boolean;
    }): Promise<User>;
    /**
     * @description 上传图片
     */
    private uploadPhoto;
    /**
     * @deprecated use uploadAvatar instead
     * @description 更新用户头像
     */
    updateAvatar(options?: {
        accept?: string;
    }): Promise<User>;
    /**
     * @description 一键上传图片并更新用户头像
     *
     * @param {Object} options
     * @param {string} options.accept 支持的图片格式，默认为 'image/*'
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *   appId: 'APP_ID',
     *   appHost: 'https://xxx.authing.cn'
     * })
     *
     * // 会自动打开浏览器文件上传框，并自动完成图片文件上传 CDN、修改用户头像操作。
     * authenticationClient.uploadAvatar()
     *
     * // 只支持 png 格式图片
     * authenticationClient.uploadAvatar({
     *   accept: '.png'
     * })
     *
     * @returns
     */
    uploadAvatar(options?: {
        accept?: string;
    }): Promise<User>;
    /**
     * @description 获取当前用户的所有自定义数据
     *
     */
    getUdfValue(): Promise<KeyValuePair>;
    /**
     * @description 设置自定义字段值
     *
     */
    setUdfValue(data: KeyValuePair): Promise<{
        key: string;
        dataType: import("../..").UdfDataType;
        value: string;
        label?: string;
    }[]>;
    /**
     * @description 删除用户自定义数据
     */
    removeUdfValue(key: string): Promise<void>;
    /**
     * @name getSecurityLevel
     * @name_zh 用户安全等级
     * @description 获取用户的安全等级评分
     *
     * @example
     *
     * const data = await authenticationClient.getSecurityLevel();
     *
     * @returns {Promise<SecurityLevel>}
     *
     * @memberof AuthenticationClient
     */
    getSecurityLevel(): Promise<SecurityLevel>;
    /**
     * @description 获取用户被授权的所有资源
     *
     * @param userId
     * @param namespace
     */
    listAuthorizedResources(namespace: string, options?: {
        resourceType?: ResourceType;
    }): Promise<PaginatedAuthorizedResources>;
    /**
     * @description 检查用户是否存在
     */
    isUserExists(options: {
        username?: string;
        email?: string;
        phone?: string;
        externalId?: string;
    }): Promise<boolean>;
    /**
     * @name computedPasswordSecurityLevel
     * @name_zh 计算密码安全等级
     * @description 计算密码安全等级
     *
     * @example
     *
     * const data = authenticationClient.computedPasswordSecurityLevel('xxxxxxxx');
     *
     * @returns {PasswordSecurityLevel}
     *
     * @memberof AuthenticationClient
     */
    computedPasswordSecurityLevel(password: string): PasswordSecurityLevel;
    _generateTokenRequest(params: {
        [x: string]: string;
    }): string;
    _generateBasicAuthToken(appId?: string, secret?: string): string;
    /**
     * @param {string} code 授权码 code
     * @param {string} codeVerifier 校验码 codeVerifier
     */
    _getAccessTokenByCodeWithClientSecretPost(code: string, codeVerifier?: string): Promise<any>;
    /**
     * @param {string} code 授权码 code
     * @param {string} codeVerifier 校验码 codeVerifier
     */
    _getAccessTokenByCodeWithClientSecretBasic(code: string, codeVerifier?: string): Promise<any>;
    /**
     * @param {string} code 授权码 code
     * @param {string} codeVerifier 校验码 codeVerifier
     */
    _getAccessTokenByCodeWithNone(code: string, codeVerifier?: string): Promise<any>;
    getAccessTokenByCode(code: string, options?: {
        codeVerifier?: string;
    }): Promise<any>;
    generateCodeChallenge(): string;
    getCodeChallengeDigest(options: {
        codeChallenge: string;
        method: 'S256' | 'plain';
    }): string;
    getAccessTokenByClientCredentials(scope: string, options?: {
        accessKey: string;
        accessSecret: string;
    }): Promise<any>;
    getUserInfoByAccessToken(accessToken: string, options?: {
        method?: 'POST' | 'GET';
        tokenPlace?: 'query' | 'header' | 'body';
    }): Promise<any>;
    buildAuthorizeUrl(options?: IOidcParams | IOauthParams | ICasParams): string;
    _buildOidcAuthorizeUrl(options: IOidcParams): string;
    _buildOauthAuthorizeUrl(options: IOauthParams): string;
    _buildSamlAuthorizeUrl(): string;
    _buildCasAuthorizeUrl(options: ICasParams): string;
    _buildCasLogoutUrl(options: ILogoutParams): string;
    _buildOidcLogoutUrl(options: ILogoutParams): string;
    _buildEasyLogoutUrl(options?: ILogoutParams): string;
    buildLogoutUrl(options?: ILogoutParams): string;
    _getNewAccessTokenByRefreshTokenWithClientSecretPost(refreshToken: string): Promise<any>;
    _getNewAccessTokenByRefreshTokenWithClientSecretBasic(refreshToken: string): Promise<any>;
    _getNewAccessTokenByRefreshTokenWithNone(refreshToken: string): Promise<any>;
    getNewAccessTokenByRefreshToken(refreshToken: string): Promise<any>;
    _revokeTokenWithClientSecretPost(token: string): Promise<any>;
    _revokeTokenWithClientSecretBasic(token: string): Promise<any>;
    _revokeTokenWithNone(token: string): Promise<any>;
    revokeToken(token: string): Promise<boolean>;
    _introspectTokenWithClientSecretPost(token: string): Promise<any>;
    _introspectTokenWithClientSecretBasic(token: string): Promise<any>;
    _introspectTokenWithNone(token: string): Promise<any>;
    introspectToken(token: string): Promise<any>;
    validateTicketV1(ticket: string, service: string): Promise<{
        message: string;
        valid: boolean;
    }>;
    validateTicketV2(ticket: string, service: string, format?: 'XML' | 'JSON'): Promise<Cas20ValidationSuccessResult | Cas20ValidationFailureResult | string>;
    /**
     * 判断 "我" 是否有某个角色
     * @param roleCode 角色 Code
     * @param namespace 权限分组 ID
     */
    hasRole(roleCode: string, namespace?: string): Promise<boolean>;
    /**
     * @description 获取当前用户能够访问的应用
     */
    listApplications(params?: {
        page: number;
        limit: number;
    }): Promise<{
        totalCount: number;
        list: ApplicationPublicDetail[];
    }>;
    /**
     * @description 检验 idToken 或 accessToken
     */
    validateToken(options: {
        accessToken?: string;
        idToken?: string;
    }): Promise<any>;
    /**
     * @description sso 检测登录态
     */
    trackSession(): Promise<null | {
        session: SsoSession;
        userInfo: User;
    }>;
    /**
     * 在本地利用私钥解密 ID Token 或 Access Token ，检验其有效性并返回包含的内容。
     * 只在开启 Token 加密功能的情况下使用，反之请使用 validateTokenLocally。
     * 必须在初始化参数中传入 privateKeys。
     * @param token 待检验的 Token
     * @returns Token 的内容
     */
    /**
     * @description 设置语言
     */
    setLang(lang: Lang): void;
}
