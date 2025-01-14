import { GraphqlClient } from './../common/GraphqlClient';
import { ManagementTokenProvider } from './ManagementTokenProvider';
import { ExtendedOrg, ManagementClientOptions } from './types';
import { CommonMessage, PaginatedAuthorizedResources, ResourceType } from '../../types/graphql.v2';
import { HttpClient } from '../common/HttpClient';
import { PaginatedUsers } from '../../types/index';
/**
 * @class OrgManagementClient 管理组织机构
 * @description 一个 Authing 用户池可以创建多个组织机构。此模块用于管理 Authing 组织机构，可以进行组织机构的增删改查、添加删除移动节点、导入组织机构等操作。
 *
 * @example
 *
 * 请使用以下方式使用该模块：
 * \`\`\`javascript
 * import { ManagementClient } from "authing-js-sdk"
 * const managementClient = new ManagementClient({
 *    userPoolId: "YOUR_USERPOOL_ID",
 *    secret: "YOUR_USERPOOL_SECRET",
 * })
 * managementClient.org.list // 获取用户池组织机构列表
 * managementClient.org.moveNode // 获取组织机构详情
 * managementClient.org.listMembers // 获取节点用户列表
 * \`\`\`
 *
 * @name OrgManagementClient
 */
export declare class OrgManagementClient {
    options: ManagementClientOptions;
    graphqlClient: GraphqlClient;
    tokenProvider: ManagementTokenProvider;
    httpClient: HttpClient;
    constructor(options: ManagementClientOptions, graphqlClient: GraphqlClient, httpClient: HttpClient, tokenProvider: ManagementTokenProvider);
    private buildTree;
    /**
     * @name create
     * @name_zh 创建组织机构
     * @description 创建组织机构，会创建一个只有一个节点的组织机构。
     * 如果你想将一个完整的组织树导入进来，请使用 importByJson 方法。
     *
     * @param {string} name 组织机构名称，该名称会作为该组织机构根节点的名称。
     * @param {string} [description] 根节点描述
     * @param {string} [code] 根节点唯一标志，必须为合法的英文字符。
     *
     * @example
     *
     * const org = await managementClient.org.create('北京非凡科技', '北京非凡科技有限公司', 'feifan');
     *
     * @memberof OrgManagementClient
     */
    create(name: string, description?: string, code?: string): Promise<{
        id: string;
        rootNode: {
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
            createdAt?: string;
            updatedAt?: string;
            children?: string[];
        };
        nodes: {
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
            createdAt?: string;
            updatedAt?: string;
            children?: string[];
        }[];
    }>;
    /**
     * @name deleteById
     * @name_zh 删除组织机构
     * @description 删除组织机构树
     * @param {string} id 组织机构 ID
     *
     * @returns {Promise<CommonMessage>}
     * @memberof OrgManagementClient
     */
    deleteById(id: string): Promise<CommonMessage>;
    /**
     * @name list
     * @name_zh 获取用户池组织机构列表
     * @description 获取用户池组织机构列表
     *
     * @param {number} [page=1]
     * @param {number} [limit=10]
     *
     * @example
     *
     * const { totalCount, list } = await managementClient.org.list()
     *
     * @returns
     * @memberof OrgManagementClient
     */
    list(page?: number, limit?: number): Promise<{
        totalCount: number;
        list: ExtendedOrg[];
    }>;
    /**
     * @name addNode
     * @name_zh 添加节点
     * @description 在组织机构中添加一个节点
     *
     * @param {string} orgId 组织机构 ID
     * @param {string} parentNodeId 父节点 ID
     * @param {Object} data 节点数据
     * @param {string} data.name 节点名称
     * @param {string} [data.code] 节点唯一标志
     * @param {string} [data.description] 节点描述信息
     *
     * @example
     *
     * const org = await managementClient.org.create('北京非凡科技', '北京非凡科技有限公司', 'feifan');
     * const { id: orgId, rootNode } = org
     * const newOrg = await managementClient.org.addNode(orgId, rootNode.id, { name: '运营部门' })
     *
     * // newOrg.nodes.length 现在为 2
     *
     * @returns {Promise<Node>}
     * @memberof OrgManagementClient
     */
    addNode(orgId: string, parentNodeId: string, data: {
        name: string;
        code?: string;
        order?: number;
        nameI18n?: string;
        description?: string;
        descriptionI18n?: string;
    }): Promise<{
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
        createdAt?: string;
        updatedAt?: string;
        children?: string[];
    }>;
    /**
     * @name getNodeById
     * @name_zh 获取某个节点详情
     * @description 获取某个节点详情
     *
     * @param {string} nodeId 节点 ID
     *
     * @example
     *
     * const node = await managementClient.org.getNodeById('NODE_ID');
     *
     * // newOrg.nodes.length 现在为 2
     *
     * @returns {Promise<Node>}
     * @memberof OrgManagementClient
     */
    getNodeById(nodeId: string): Promise<{
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
        createdAt?: string;
        updatedAt?: string;
        children?: string[];
    }>;
    /**
     * @name updateNode
     * @name_zh 修改节点
     * @description 修改节点数据
     *
     * @param {string} id 节点 ID
     * @param {Object} updates 修改数据
     * @param {string} [updates.name] 节点名称
     * @param {string} [updates.code] 节点唯一标志
     * @param {string} [updates.description] 节点描述信息
     *
     * @example
     *
     * await managementClient.org.updateNode("NDOEID", {
     *    name: '新的节点名称'
     * })
     *
     * @returns {Promise<Org>}
     * @memberof OrgManagementClient
     */
    updateNode(id: string, updates: {
        name?: string;
        code?: string;
        order?: number;
        nameI18n?: string;
        description?: string;
        descriptionI18n?: string;
    }): Promise<{
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
        createdAt?: string;
        updatedAt?: string;
        children?: string[];
        users: {
            totalCount: number;
        };
    }>;
    /**
     * @name findById
     * @name_zh 获取组织机构详情
     * @description 通过组织机构 ID 获取组织机构详情
     *
     * @param {string} id 组织机构 ID
     *
     * @returns {Promise<Org>}
     * @memberof OrgManagementClient
     */
    findById(id: string): Promise<ExtendedOrg>;
    /**
     * @name deleteNode
     * @name_zh 删除节点
     * @description 删除组织机构树中的某一个节点
     *
     * @param {string} orgId 组织机构 ID
     * @param {string} nodeId 节点 ID
     *
     * @returns {Promise<CommonMessage>}
     * @memberof OrgManagementClient
     */
    deleteNode(orgId: string, nodeId: string): Promise<{
        message?: string;
        code?: number;
    }>;
    /**
     * @name moveNode 移动节点
     * @name_zh 移动节点
     * @description 移动组织机构节点，移动某节点时需要指定该节点新的父节点。注意不能将一个节点移动到自己的子节点下面。
     *
     * @param {string} orgId 组织机构 ID
     * @param {string} nodeId 需要移动的节点 ID
     * @param {string} targetParentId 目标父节点 ID
     *
     * @example
     *
     * await managementClient.org.moveNode("ORGID", "NODEID", "TRAGET_NODE_ID")
     *
     * @returns {Promise<Org>} 最新的树结构
     * @memberof OrgManagementClient
     *
     */
    moveNode(orgId: string, nodeId: string, targetParentId: string): Promise<ExtendedOrg>;
    /**
     * @name isRootNode
     * @name_zh 判断是否为根节点
     * @description 判断一个节点是不是组织树的根节点
     *
     * @param {string} orgId 组织机构 ID
     * @param {string} nodeId 组织机构 ID
     *
     *
     * @returns {Promise<boolean>}
     * @memberof OrgManagementClient
     */
    isRootNode(orgId: string, nodeId: string): Promise<boolean>;
    /**
     * @name listChildren
     * @name_zh 获取子节点列表
     * @description 查询一个节点的子节点列表
     *
     * @param {string} orgId 组织机构 ID
     * @param {string} nodeId 组织机构 ID
     *
     * @example
     *
     * // 子节点列表
     * cosnt children = await managementClient.org.moveNode("ORGID", "NODEID")
     *
     *
     * @returns {Promise<Node[]>}
     * @memberof OrgManagementClient
     */
    listChildren(nodeId: string): Promise<{
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
        createdAt?: string;
        updatedAt?: string;
        children?: string[];
    }[]>;
    /**
     * @name rootNode
     * @name_zh 获取根节点
     * @description 获取一个组织的根节点
     *
     * @param {string} orgId 组织机构 ID
     *
     * @example
     *
     * const rootNode = await managementClient.org.rootNode("ORGID")
     *
     * @returns {Promise<Node[]>}
     * @memberof OrgManagementClient
     */
    rootNode(orgId: string): Promise<{
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
    }>;
    /**
     * @name importByJson
     * @name_zh 通过 JSON 导入
     * @description 通过一个 JSON 树结构导入组织机构
     *
     * @param {Object} json JSON 格式的树结构，详细格式请见示例代码。
     *
     * @example
     *
     * const tree = {
     *   name: '北京非凡科技有限公司',
     *   code: 'feifan',
     *   children: [
     *      {
     *          code: 'operation',
     *          name: '运营',
     *          description: '商业化部门'
     *       },
     *       {
     *         code: 'dev',
     *         name: '研发',
     *         description: '研发部门',
     *         children: [
     *           {
     *             code: 'backend',
     *             name: '后端',
     *             description: '后端研发部门'
     *           }
     *         ]
     *       }
     *     ]
     *   };
     * const org = await managementClient.org.importByJson(tree);
     *
     * @returns {Promise<Node[]>}
     * @memberof OrgManagementClient
     */
    importByJson(json: {
        [x: string]: any;
    }): Promise<any>;
    /**
     * @name addMembers
     * @name_zh 添加成功
     * @description 节点添加成员
     *
     * @param {string} nodeId 节点 ID
     * @param {string[]} userIds 用户 ID 列表
     *
     * @returns {Promise<PaginatedUsers>}
     * @memberof OrgManagementClient
     *
     */
    addMembers(nodeId: string, userIds: string[]): Promise<PaginatedUsers>;
    moveMembers(options: {
        userIds: string[];
        targetNodeId: string;
        sourceNodeId: string;
    }): Promise<boolean>;
    /**
     * @name listMembers
     * @name_zh 获取节点成员
     * @description 获取节点成员，可以获取直接添加到该节点中的用户，也可以获取到该节点子节点的用户。
     *
     * @param {string} nodeId 节点 ID
     * @param {Object} options 查询参数
     * @param {number} [options.page=1]
     * @param {number} [options.limit=10]
     * @param {boolean} [options.includeChildrenNodes=false] 是否获取所有子节点的成员
     *
     *
     * @returns {Promise<PaginatedUsers>}
     * @memberof OrgManagementClient
     *
     */
    listMembers(nodeId: string, options?: {
        page?: number;
        limit?: number;
        includeChildrenNodes?: boolean;
    }): Promise<PaginatedUsers>;
    /**
     * @name removeMembers
     * @name_zh 删除成功
     * @description 删除节点成员
     *
     * @param {string} nodeId 节点 ID
     * @param {string[]} userIds 用户 ID 列表
     *
     * @returns {Promise<PaginatedUsers>}
     * @memberof OrgManagementClient
     *
     */
    removeMembers(nodeId: string, userIds: string[]): Promise<PaginatedUsers>;
    /**
     * @name setMainDepartment
     * @name_zh 设置用户主部门
     * @description 设置用户主部门
     *
     * @param {string} userId 用户 ID
     * @param {string} departmentId 部门 ID
     *
     * @returns {Promise<PaginatedUsers>}
     * @memberof OrgManagementClient
     *
     */
    setMainDepartment(userId: string, departmentId: string): Promise<CommonMessage>;
    /**
     * @description 导出所有组织机构
     */
    exportAll(): Promise<any>;
    /**
     * @description 导出某个组织机构
     */
    exportByOrgId(orgId: string): Promise<any>;
    /**
     * @description 获取组织机构节点被授权的所有资源
     *
     * @param nodeId: 分组 ID
     * @param namespace: 权限组 namespace code
     * @param options.resourceType 资源类型
     */
    listAuthorizedResourcesByNodeId(nodeId: string, namespace: string, options?: {
        resourceType?: ResourceType;
    }): Promise<PaginatedAuthorizedResources>;
    /**
     * @description 获取组织机构节点被授权的所有资源
     *
     * @param orgId: 组织机构 ID；
     * @param code: 节点 code
     * @param namespace: 权限组 namespace code
     * @param options.resourceType 资源类型
     */
    listAuthorizedResourcesByNodeCode(orgId: string, code: string, namespace: string, options?: {
        resourceType?: ResourceType;
    }): Promise<PaginatedAuthorizedResources>;
    startSync(options: {
        providerType: 'dingtalk' | 'wechatwork' | 'ad';
        adConnectorId?: string;
    }): Promise<boolean>;
    /**
     * @description 搜索组织机构节点
     *
     * @param keyword 查询关键词
     * @returns
     */
    searchNodes(keyword: string): Promise<{
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
    }[]>;
}
