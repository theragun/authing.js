import { AuthenticationTokenProvider } from './AuthenticationTokenProvider';
import { AuthenticationClientOptions, IMfaAssociation, IMfaAuthenticators, IMfaConfirmAssociation, IMfaDeleteAssociation, TotpSource } from './types';
import { HttpClient } from '../common/HttpClient';
import { User } from '../..';
import { BaseAuthenticationClient } from './BaseAuthenticationClient';
/**
 * @class MfaAuthenticationClient 多因素认证模块
 * @description 此模块用于进行绑定 TOTP MFA 认证器、解绑 TOTP MFA 认证器、绑定用户人脸、解绑人脸、用户二次认证。
 *
 * 请求绑定 TOTP MFA 认证器：
 *
 * \`\`\`javascript
 * import { AuthenticationClient } from "authing-js-sdk"
 * const authenticationClient = new AuthenticationClient({
 *    appId: "YOUR_APP_ID",
 * })
 * await authenticationClient.mfa.assosicateMfaAuthenticator({authenticatorType: 'totp'})
 * \`\`\`
 *
 * 验证 MFA 二次口令：
 *
 * \`\`\`javascript
 * import { AuthenticationClient } from "authing-js-sdk"
 * const authenticationClient = new AuthenticationClient({
 *    appId: "YOUR_APP_ID",
 * })
 * await authenticationClient.mfa.verifyTotpMfa({totp: '112233', mfaToken: 'xxx'})
 * \`\`\`
 *
 * @name MfaAuthenticationClient
 */
export declare class MfaAuthenticationClient {
    options: AuthenticationClientOptions;
    tokenProvider: AuthenticationTokenProvider;
    httpClient: HttpClient;
    baseClient: BaseAuthenticationClient;
    constructor(options: AuthenticationClientOptions, tokenProvider: AuthenticationTokenProvider, httpClient: HttpClient);
    /**
     * @name getMfaAuthenticators
     * @name_zh 获取 MFA 认证器
     * @description 获取 MFA 认证器
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.getMfaAuthenticators({ type: 'totp' })
     *
     * @returns {Promise<IMfaAuthenticators>}
     * @memberof MfaAuthenticationClient
     */
    getMfaAuthenticators(options?: {
        type: string;
        mfaToken?: string;
        source?: TotpSource;
    }): Promise<IMfaAuthenticators>;
    /**
     * @name assosicateMfaAuthenticator
     * @name_zh 请求 MFA 二维码和密钥信息
     * @description 请求 MFA 二维码和密钥信息
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.assosicateMfaAuthenticator({ authenticatorType: 'totp' })
     *
     * @returns {Promise<IMfaAssociation>}
     * @memberof MfaAuthenticationClient
     */
    assosicateMfaAuthenticator(options?: {
        authenticatorType: string;
        mfaToken?: string;
        source?: TotpSource;
    }): Promise<IMfaAssociation>;
    /**
     * @name deleteMfaAuthenticator
     * @name_zh 解绑 MFA
     * @description 解绑 MFA
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.deleteMfaAuthenticator()
     *
     * @returns {Promise<IMfaDeleteAssociation>}
     * @memberof MfaAuthenticationClient
     */
    deleteMfaAuthenticator(): Promise<IMfaDeleteAssociation>;
    /**
     * @name confirmAssosicateMfaAuthenticator
     * @name_zh 确认绑定 MFA
     * @description 确认绑定 MFA
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.confirmAssosicateMfaAuthenticator({ authenticatorType: 'totp', totp: '112233' })
     *
     * @returns {Promise<IMfaConfirmAssociation>}
     * @memberof MfaAuthenticationClient
     */
    confirmAssosicateMfaAuthenticator(options?: {
        authenticatorType: string;
        totp?: string;
        source?: TotpSource;
        mfaToken?: string;
    }): Promise<IMfaConfirmAssociation>;
    /**
     * @name verifyTotpMfa
     * @name_zh 检验二次验证 MFA 口令
     * @description 检验二次验证 MFA 口令
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.verifyTotpMfa({ authenticatorType: 'totp', totp: '112233' })
     *
     * @returns {Promise<User>}
     * @memberof MfaAuthenticationClient
     */
    verifyTotpMfa(options: {
        totp: string;
        mfaToken: string;
    }): Promise<User>;
    /**
     * @name verifyAppSmsMfa
     * @name_zh 检验二次验证 MFA 短信验证码
     * @description 检验二次验证 MFA 短信验证码
     *
     * @param {object} options
     * @param {string} options.phone 用户手机号
     * @param {string} options.code 手机验证码
     * @param {string} options.token 登录接口返回的 mfaToken
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.verifySmsMfa({ mfaToken: 'xxxxxx', phone: '173xxxxxxxx' })
     *
     * @returns {Promise<User>}
     * @memberof MfaAuthenticationClient
     */
    verifyAppSmsMfa(options: {
        phone: string;
        code: string;
        mfaToken: string;
    }): Promise<User>;
    /**
     * @name verifyAppEmailMfa
     * @name_zh 检验二次验证 MFA 邮箱验证码
     * @description 检验二次验证 MFA 邮箱验证码
     *
     * @param {object} options
     * @param {string} options.email 用户邮箱
     * @param {string} options.code 邮箱验证码
     * @param {string} options.token 登录接口返回的 mfaToken
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.verifyAppEmailMfa({ mfaToken: 'xxxx', email: 'example@authing.com' })
     *
     * @returns {Promise<User>}
     * @memberof MfaAuthenticationClient
     */
    verifyAppEmailMfa(options: {
        email: string;
        mfaToken: string;
        code: string;
    }): Promise<User>;
    /**
     * @name phoneOrEmailBindable
     * @name_zh 检测手机号或邮箱是否已被绑定
     * @description 当需要手机或邮箱 MFA 登录，而用户未绑定手机或邮箱时，可先让用户输入手机号或邮箱，用此接口先检测手机或邮箱是否可绑定，再进行 MFA 验证
     *
     * @param {object} options
     * @param {string} [options.mfaToken] 后端返回的 mfaToken
     * @param {string} [options.phone] 需要检测的手机号
     * @param {string} [options.email] 需要检测的邮箱
     *
     * @example
     *
     * authenticationClient.phoneOrEmailBindable({
     *  phone: '173xxxxxxxx',
     *  mfaToken: 'xxxxx'
     * })
     *
     * @returns {Promise<boolean>}
     * @memberof MfaAuthenticationClient
     */
    phoneOrEmailBindable({ phone, email, mfaToken }: {
        phone?: string;
        email?: string;
        mfaToken: string;
    }): Promise<boolean>;
    /**
     * @name verifyTotpRecoveryCode
     * @name_zh 检验二次验证 MFA 恢复代码
     * @description 检验二次验证 MFA 恢复代码
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.mfa.verifyTotpRecoveryCode({ authenticatorType: 'totp', totp: '112233' })
     *
     * @returns {Promise<User>}
     * @memberof MfaAuthenticationClient
     */
    verifyTotpRecoveryCode(options: {
        recoveryCode: string;
        mfaToken: string;
    }): Promise<User>;
    /**
     * @name associateFaceByUrl
     * @name_zh 通过图片 URL 方式绑定人脸
     * @description 通过图片 URL 方式绑定人脸
     *
     * @param {object} options
     * @param {string} options.baseFace 基础人脸照片
     * @param {string} options.compareFace 用于对比的人脸照片地址
     * @param {string} [options.mfaToken] 若是在二次认证时绑定人脸，需要传入 mfaToken
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const user = await authenticationClient.mfa.associateFace({ photoA: 'http://example.com/photo/imgA.jpg', photoB: 'http://example.com/photo/imgB.jpg', mfaToken: 'xxxxxxxxxxxx' })
     *
     * @returns {Promise<User>}
     * @memberof MfaAuthenticationClient
     */
    associateFaceByUrl(options: {
        baseFace: string;
        compareFace: string;
        mfaToken?: string;
    }): Promise<User>;
    /**
     * @name associateFaceByLocalFile
     * @name_zh 通过上传本地文件的方式绑定人脸
     * @description 通过上传本地文件的方式绑定人脸
     *
     * @param {string} [mfaToken] 若是在二次认证时绑定人脸，需要传入 mfaToken
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const user = await authenticationClient.mfa.associateFaceByLocalFile('xxxxxxxxxxx')
     *
     * @returns {Promise<User>}
     * @memberof MfaAuthenticationClient
     */
    associateFaceByLocalFile(mfaToken?: string): Promise<User>;
    /**
     * @name associateFaceByBlob
     * @name_zh 通过传入 Blob 对象绑定人脸
     * @description 通过传入 Blob 对象绑定人脸
     *
     * @param {object} options
     * @param {string} options.baseFace 基础人脸数据 Blob 对象
     * @param {string} options.compareFace 用于对比的人脸数据 Blob 对象
     * @param {string} [options.mfaToken] 若是在二次认证时绑定人脸，需要传入 mfaToken
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const user = await authenticationClient.mfa.associateFaceByBlob({blobA: Blob, blobB: Blob, mfaToken: 'xxx'})
     *
     * @returns {Promise<User>}
     * @memberof MfaAuthenticationClient
     */
    associateFaceByBlob(opts: {
        mfaToken?: string;
        baseFace: Blob;
        compareFace: Blob;
    }): Promise<User>;
    /**
     * @name verifyFaceMfa
     * @name_zh 检测二次登录人脸验证
     * @description 检测二次登录人脸验证
     *
     * @param {string} photo 人脸照片地址
     * @param {string} mfaToken 二次校验时 Authing 返回的 mfaToken
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const user = await authenticationClient.mfa.verifyFaceMfa('http://example.com/photo/photo.jpg')
     *
     * @returns {Promise<User>}
     * @memberof MfaAuthenticationClient
     */
    verifyFaceMfa(photo: string, mfaToken: string): Promise<User>;
}
