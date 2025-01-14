import { ManagementClientOptions } from '../management/types';
import { AuthenticationClientOptions } from '../authentication/types';
import { AuthenticationTokenProvider } from '../authentication/AuthenticationTokenProvider';
import { ManagementTokenProvider } from '../management/ManagementTokenProvider';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
export declare class HttpClient {
    options: ManagementClientOptions;
    tokenProvider: ManagementTokenProvider | AuthenticationTokenProvider;
    axios: AxiosInstance;
    constructor(options: ManagementClientOptions | AuthenticationClientOptions, tokenProvider: ManagementTokenProvider | AuthenticationTokenProvider);
    request(config: AxiosRequestConfig): Promise<any>;
}
export declare class FastHttpClient extends HttpClient {
    options: ManagementClientOptions;
    tokenProvider: ManagementTokenProvider | AuthenticationTokenProvider;
    axios: AxiosInstance;
    constructor(options: ManagementClientOptions | AuthenticationClientOptions, tokenProvider: ManagementTokenProvider | AuthenticationTokenProvider);
    request(config: AxiosRequestConfig): Promise<any>;
}
export declare class NaiveHttpClient extends HttpClient {
    options: ManagementClientOptions;
    tokenProvider: ManagementTokenProvider | AuthenticationTokenProvider;
    axios: AxiosInstance;
    constructor(options: ManagementClientOptions | AuthenticationClientOptions, tokenProvider: ManagementTokenProvider | AuthenticationTokenProvider);
    request(config: AxiosRequestConfig): Promise<any>;
}
