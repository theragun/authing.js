import { KeyValuePair, Encryption } from '../types';
import { UdfDataType } from '../types/graphql.v2';
export declare const encrypt: (plainText: string, publicKey: string, encryption?: Encryption) => Promise<string>;
export default function buildTree(nodes: any[]): any;
export declare const deepEqual: (x: any, y: any) => boolean;
export declare const popupCenter: (url: string, { w, h }?: {
    w: number;
    h: number;
}) => void;
export declare const createCssClassStyleSheet: (className: string, styleSheet: any) => void;
export declare const serialize: (obj: any) => string;
export declare const convertUdv: (data: Array<{
    key: string;
    dataType: UdfDataType;
    value: any;
}>) => Array<{
    key: string;
    dataType: UdfDataType;
    value: any;
}>;
export declare const convertUdvToKeyValuePair: (data: Array<{
    key: string;
    dataType: UdfDataType;
    value?: any;
}>) => KeyValuePair;
export declare const isWechatBrowser: () => boolean;
export declare const isLarkBrowser: () => boolean;
export declare const isMobileBrowser: () => boolean;
export declare const formatAuthorizedResources: (resources: any[]) => any[];
export declare function generateUidKey(number: number): string;
interface UploadRes {
    key: string;
    url: string;
}
export declare const xhrUpload: (file: File | Blob, url: string) => Promise<UploadRes>;
export declare function uploadFile<T extends boolean = false>(opts: {
    accept: string;
    multiple?: T;
    url: string;
}): Promise<T extends true ? UploadRes[] : UploadRes>;
export declare const convertKeyValueListToObject: (data: Array<{
    key: string;
    value: any;
}>) => any;
export declare const convertObjectToKeyValueList: (data: {
    [x: string]: any;
}) => {
    key: string;
    value: any;
}[];
export declare function generateRandomString(length?: number): string;
export declare const pickBy: (obj: any, predicate: (value: any, key: string) => boolean) => any;
export {};
