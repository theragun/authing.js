import { GraphqlClient } from './../common/GraphqlClient';
import { ManagementClientOptions } from './types';
export declare class ManagementTokenProvider {
    /** 内部变量，请不要直接引用 **/
    /** 该用户池对应的 accessToken **/
    private _accessToken;
    /** accessToken 过期时间，为 unix 时间戳 **/
    private _accessTokenExpriredAt;
    options: ManagementClientOptions;
    graphqlClient: GraphqlClient;
    constructor(options: ManagementClientOptions, graphqlClient: GraphqlClient);
    /**
     * 发送 GraphQL 接口请求获取 accessToken
     *
     * @returns
     * @memberof ManagementTokenProvider
     */
    private getClientWhenSdkInit;
    /**
     * 刷新 accessToken
     *
     * @memberof ManagementTokenProvider
     */
    private refreshToken;
    /**
     * 获取用户池 accessToken
     *
     * @returns {Promise<string>}
     * @memberof ManagementTokenProvider
     */
    getToken(): Promise<string>;
    /**
     * 刷新用户池 accessToken
     *
     * @returns
     * @memberof ManagementTokenProvider
     */
    private getAccessTokenFromServer;
}
