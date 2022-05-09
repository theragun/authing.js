var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../types/graphql.v2"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.searchNodes = exports.authorizedTargets = exports.authorizeResource = exports.listAuthorizedResources = exports.listNodeByCodeAuthorizedResources = exports.listNodeByIdAuthorizedResources = exports.listGroupAuthorizedResources = exports.listRoleAuthorizedResources = exports.listUserAuthorizedResources = exports.refreshAccessToken = exports.getAccessToken = exports.unbindEmail = exports.getUserGroups = exports.removeUserFromGroup = exports.addUserToGroup = exports.deleteGroups = exports.updateGroup = exports.createGroup = exports.groupWithUsersWithCustomData = exports.groupWithUsers = exports.group = exports.getGroups = exports.checkLoginStatus = exports.disablePolicyAssignment = exports.enablePolicyAssignment = exports.removePolicyAssignments = exports.addPolicyAssignments = exports.policyAssignments = exports.deletePolicies = exports.deletePolicy = exports.updatePolicy = exports.policy = exports.createPolicy = exports.policies = exports.deleteRoles = exports.deleteRole = exports.udf = exports.removeUdf = exports.setUdf = exports.removeUdv = exports.setUdfValueBatch = exports.setUdvBatch = exports.setUdv = exports.udfValueBatch = exports.udv = exports.addWhiteList = exports.removeWhiteList = exports.getWhiteList = exports.allow = exports.setMainDepartment = exports.getUserDepartments = exports.getUserRoles = exports.userBatchWithCustomData = exports.userBatch = exports.unbindPhone = exports.bindEmail = exports.bindPhone = exports.updateEmail = exports.updatePhone = exports.updatePassword = exports.isUserExists = exports.refreshToken = exports.removeMembers = exports.moveNode = exports.nodeById = exports.deleteNode = exports.updateNode = exports.addNode = exports.updateRole = exports.roleWithUsersWithCustomData = exports.roleWithUsers = exports.role = exports.roles = exports.deleteUsers = exports.deleteUser = exports.createUser = exports.findUserWithCustomData = exports.findUser = exports.searchUserWithCustomData = exports.searchUser = exports.updateUser = exports.updateUserpool = exports.archivedUsers = exports.usersWithCustomData = exports.users = exports.resetPasswordByForceResetToken = exports.resetPasswordByFirstLoginToken = exports.resetPassword = exports.sendFirstLoginVerifyEmail = exports.sendEmail = exports.getMembersByCode = exports.getMembersById = exports.moveMembers = exports.addMember = exports.revokeRole = exports.assignRole = exports.addRole = exports.registerByPhoneCode = exports.registerByUsername = exports.loginBySubAccount = exports.loginByPhonePassword = exports.loginByPhoneCode = exports.loginByUsername = exports.loginByEmail = exports.registerByEmail = exports.checkPasswordStrength = exports.isDenied = exports.deleteOrg = exports.createOrg = exports.userWithCustomData = exports.user = exports.getUserPoolDetail = exports.orgs = exports.rootNode = exports.isRootNode = exports.org = exports.getChildrenNodes = exports.isAllowed = void 0;
    var graphql_v2_1 = require("../types/graphql.v2");
    var isAllowed = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.IsActionAllowedDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.isAllowed = isAllowed;
    var getChildrenNodes = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.ChildrenNodesDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.getChildrenNodes = getChildrenNodes;
    var org = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.OrgDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.org = org;
    var isRootNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.IsRootNodeDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.isRootNode = isRootNode;
    var rootNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RootNodeDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.rootNode = rootNode;
    var orgs = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.OrgsDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.orgs = orgs;
    var getUserPoolDetail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UserpoolDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.getUserPoolDetail = getUserPoolDetail;
    var user = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UserDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.user = user;
    var userWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UserWithCustomDataDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.userWithCustomData = userWithCustomData;
    var createOrg = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.CreateOrgDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.createOrg = createOrg;
    var deleteOrg = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.DeleteOrgDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.deleteOrg = deleteOrg;
    var isDenied = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.IsActionDeniedDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.isDenied = isDenied;
    var checkPasswordStrength = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.CheckPasswordStrengthDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.checkPasswordStrength = checkPasswordStrength;
    var registerByEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RegisterByEmailDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.registerByEmail = registerByEmail;
    var loginByEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            query = graphql_v2_1.LoginByEmailDocument;
            token = tokenProvider.getToken();
            return [2 /*return*/, garpqhlClient.request({
                    query: query,
                    token: token,
                    variables: variables
                })];
        });
    }); };
    exports.loginByEmail = loginByEmail;
    var loginByUsername = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            query = graphql_v2_1.LoginByUsernameDocument;
            token = tokenProvider.getToken();
            return [2 /*return*/, garpqhlClient.request({
                    query: query,
                    token: token,
                    variables: variables
                })];
        });
    }); };
    exports.loginByUsername = loginByUsername;
    var loginByPhoneCode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            query = graphql_v2_1.LoginByPhoneCodeDocument;
            token = tokenProvider.getToken();
            return [2 /*return*/, garpqhlClient.request({
                    query: query,
                    token: token,
                    variables: variables
                })];
        });
    }); };
    exports.loginByPhoneCode = loginByPhoneCode;
    var loginByPhonePassword = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            query = graphql_v2_1.LoginByPhonePasswordDocument;
            token = tokenProvider.getToken();
            return [2 /*return*/, garpqhlClient.request({
                    query: query,
                    token: token,
                    variables: variables
                })];
        });
    }); };
    exports.loginByPhonePassword = loginByPhonePassword;
    var loginBySubAccount = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            query = graphql_v2_1.LoginBySubAccountDocument;
            token = tokenProvider.getToken();
            return [2 /*return*/, garpqhlClient.request({
                    query: query,
                    token: token,
                    variables: variables
                })];
        });
    }); };
    exports.loginBySubAccount = loginBySubAccount;
    var registerByUsername = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            query = graphql_v2_1.RegisterByUsernameDocument;
            token = tokenProvider.getToken();
            return [2 /*return*/, garpqhlClient.request({
                    query: query,
                    token: token,
                    variables: variables
                })];
        });
    }); };
    exports.registerByUsername = registerByUsername;
    var registerByPhoneCode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            query = graphql_v2_1.RegisterByPhoneCodeDocument;
            token = tokenProvider.getToken();
            return [2 /*return*/, garpqhlClient.request({
                    query: query,
                    token: token,
                    variables: variables
                })];
        });
    }); };
    exports.registerByPhoneCode = registerByPhoneCode;
    var addRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.CreateRoleDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.addRole = addRole;
    var assignRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.AssignRoleDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.assignRole = assignRole;
    var revokeRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RevokeRoleDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.revokeRole = revokeRole;
    var addMember = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.AddMemberDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.addMember = addMember;
    var moveMembers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.MoveMembersDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.moveMembers = moveMembers;
    var getMembersById = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.NodeByIdWithMembersDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.getMembersById = getMembersById;
    var getMembersByCode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.NodeByCodeWithMembersDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.getMembersByCode = getMembersByCode;
    var sendEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.SendEmailDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.sendEmail = sendEmail;
    var sendFirstLoginVerifyEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.SendFirstLoginVerifyEmailDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    exports.sendFirstLoginVerifyEmail = sendFirstLoginVerifyEmail;
    var resetPassword = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.ResetPasswordDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.resetPassword = resetPassword;
    var resetPasswordByFirstLoginToken = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.ResetPasswordByFirstLoginTokenDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.resetPasswordByFirstLoginToken = resetPasswordByFirstLoginToken;
    var resetPasswordByForceResetToken = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.ResetPasswordByForceResetTokenDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.resetPasswordByForceResetToken = resetPasswordByForceResetToken;
    var users = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UsersDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.users = users;
    var usersWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UsersWithCustomDataDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.usersWithCustomData = usersWithCustomData;
    var archivedUsers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.ArchivedUsersDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.archivedUsers = archivedUsers;
    var updateUserpool = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UpdateUserpoolDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.updateUserpool = updateUserpool;
    var updateUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UpdateUserDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.updateUser = updateUser;
    var searchUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.SearchUserDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.searchUser = searchUser;
    var searchUserWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.SearchUserWithCustomDataDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.searchUserWithCustomData = searchUserWithCustomData;
    var findUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.FindUserDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.findUser = findUser;
    var findUserWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.FindUserWithCustomDataDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.findUserWithCustomData = findUserWithCustomData;
    var createUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.CreateUserDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.createUser = createUser;
    var deleteUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.DeleteUserDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.deleteUser = deleteUser;
    var deleteUsers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.DeleteUsersDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.deleteUsers = deleteUsers;
    var roles = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RolesDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.roles = roles;
    var role = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RoleDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.role = role;
    var roleWithUsers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RoleWithUsersDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.roleWithUsers = roleWithUsers;
    var roleWithUsersWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RoleWithUsersWithCustomDataDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.roleWithUsersWithCustomData = roleWithUsersWithCustomData;
    var updateRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UpdateRoleDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.updateRole = updateRole;
    var addNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.AddNodeV2Document;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.addNode = addNode;
    var updateNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UpdateNodeDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.updateNode = updateNode;
    var deleteNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.DeleteNodeDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.deleteNode = deleteNode;
    var nodeById = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.NodeByIdDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.nodeById = nodeById;
    var moveNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.MoveNodeDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.moveNode = moveNode;
    var removeMembers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RemoveMemberDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.removeMembers = removeMembers;
    var refreshToken = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RefreshTokenDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.refreshToken = refreshToken;
    var isUserExists = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.IsUserExistsDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.isUserExists = isUserExists;
    var updatePassword = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UpdatePasswordDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.updatePassword = updatePassword;
    var updatePhone = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UpdatePhoneDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.updatePhone = updatePhone;
    var updateEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UpdateEmailDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.updateEmail = updateEmail;
    var bindPhone = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.BindPhoneDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.bindPhone = bindPhone;
    var bindEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.BindEmailDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.bindEmail = bindEmail;
    var unbindPhone = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UnbindPhoneDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.unbindPhone = unbindPhone;
    var userBatch = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UserBatchDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.userBatch = userBatch;
    var userBatchWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UserBatchWithCustomDataDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.userBatchWithCustomData = userBatchWithCustomData;
    var getUserRoles = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.GetUserRolesDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.getUserRoles = getUserRoles;
    var getUserDepartments = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.GetUserDepartmentsDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.getUserDepartments = getUserDepartments;
    var setMainDepartment = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.SetMainDepartmentDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.setMainDepartment = setMainDepartment;
    var allow = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.AllowDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.allow = allow;
    var getWhiteList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.WhitelistDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.getWhiteList = getWhiteList;
    var removeWhiteList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RemoveWhitelistDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.removeWhiteList = removeWhiteList;
    var addWhiteList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.AddWhitelistDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.addWhiteList = addWhiteList;
    var udv = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UdvDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.udv = udv;
    var udfValueBatch = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UdfValueBatchDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.udfValueBatch = udfValueBatch;
    var setUdv = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.SetUdvDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.setUdv = setUdv;
    var setUdvBatch = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.SetUdvBatchDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.setUdvBatch = setUdvBatch;
    var setUdfValueBatch = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.SetUdfValueBatchDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.setUdfValueBatch = setUdfValueBatch;
    var removeUdv = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RemoveUdvDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.removeUdv = removeUdv;
    var setUdf = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.SetUdfDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.setUdf = setUdf;
    var removeUdf = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RemoveUdfDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.removeUdf = removeUdf;
    var udf = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UdfDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.udf = udf;
    var deleteRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.DeleteRoleDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.deleteRole = deleteRole;
    var deleteRoles = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.DeleteRolesDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.deleteRoles = deleteRoles;
    var policies = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.PoliciesDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.policies = policies;
    var createPolicy = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.CreatePolicyDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.createPolicy = createPolicy;
    var policy = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.PolicyDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.policy = policy;
    var updatePolicy = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UpdatePolicyDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.updatePolicy = updatePolicy;
    var deletePolicy = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.DeletePolicyDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.deletePolicy = deletePolicy;
    var deletePolicies = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.DeletePoliciesDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.deletePolicies = deletePolicies;
    var policyAssignments = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.PolicyAssignmentsDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.policyAssignments = policyAssignments;
    var addPolicyAssignments = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.AddPolicyAssignmentsDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.addPolicyAssignments = addPolicyAssignments;
    var removePolicyAssignments = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RemovePolicyAssignmentsDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.removePolicyAssignments = removePolicyAssignments;
    var enablePolicyAssignment = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.EnablePolicyAssignmentDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.enablePolicyAssignment = enablePolicyAssignment;
    var disablePolicyAssignment = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.DisbalePolicyAssignmentDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.disablePolicyAssignment = disablePolicyAssignment;
    var checkLoginStatus = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.CheckLoginStatusDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.checkLoginStatus = checkLoginStatus;
    var getGroups = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.GroupsDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.getGroups = getGroups;
    var group = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.GroupDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.group = group;
    var groupWithUsers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.GroupWithUsersDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.groupWithUsers = groupWithUsers;
    var groupWithUsersWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.GroupWithUsersWithCustomDataDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.groupWithUsersWithCustomData = groupWithUsersWithCustomData;
    var createGroup = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.CreateGroupDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.createGroup = createGroup;
    var updateGroup = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UpdateGroupDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.updateGroup = updateGroup;
    var deleteGroups = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.DeleteGroupsDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.deleteGroups = deleteGroups;
    var addUserToGroup = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.AddUserToGroupDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.addUserToGroup = addUserToGroup;
    var removeUserFromGroup = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.RemoveUserFromGroupDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.removeUserFromGroup = removeUserFromGroup;
    var getUserGroups = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.GetUserGroupsDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.getUserGroups = getUserGroups;
    var unbindEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.UnbindEmailDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.unbindEmail = unbindEmail;
    var getAccessToken = function (garpqhlClient, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = graphql_v2_1.AccessTokenDocument;
            return [2 /*return*/, garpqhlClient.request({
                    query: query,
                    variables: variables
                })];
        });
    }); };
    exports.getAccessToken = getAccessToken;
    var refreshAccessToken = function (garpqhlClient, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            query = graphql_v2_1.RefreshTokenDocument;
            return [2 /*return*/, garpqhlClient.request({
                    query: query,
                    variables: variables
                })];
        });
    }); };
    exports.refreshAccessToken = refreshAccessToken;
    var listUserAuthorizedResources = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.ListUserAuthorizedResourcesDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.listUserAuthorizedResources = listUserAuthorizedResources;
    var listRoleAuthorizedResources = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.ListRoleAuthorizedResourcesDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.listRoleAuthorizedResources = listRoleAuthorizedResources;
    var listGroupAuthorizedResources = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.ListGroupAuthorizedResourcesDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.listGroupAuthorizedResources = listGroupAuthorizedResources;
    var listNodeByIdAuthorizedResources = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.ListNodeByIdAuthorizedResourcesDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.listNodeByIdAuthorizedResources = listNodeByIdAuthorizedResources;
    var listNodeByCodeAuthorizedResources = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.ListNodeByCodeAuthorizedResourcesDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.listNodeByCodeAuthorizedResources = listNodeByCodeAuthorizedResources;
    var listAuthorizedResources = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.AuthorizedResourcesDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.listAuthorizedResources = listAuthorizedResources;
    var authorizeResource = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.AuthorizeResourceDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.authorizeResource = authorizeResource;
    var authorizedTargets = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.AuthorizedTargetsDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.authorizedTargets = authorizedTargets;
    var searchNodes = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
        var query, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = graphql_v2_1.SearchNodesDocument;
                    return [4 /*yield*/, tokenProvider.getToken()];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/, garpqhlClient.request({
                            query: query,
                            token: token,
                            variables: variables
                        })];
            }
        });
    }); };
    exports.searchNodes = searchNodes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbGFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZ3JhcGhxbGFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQSxrREFrVzZCO0lBRXRCLElBQU0sU0FBUyxHQUFHLFVBQ3ZCLGFBQTRCLEVBQzVCLGFBQXNDLEVBQ3RDLFNBQW1DOzs7OztvQkFFN0IsS0FBSyxHQUFHLG9DQUF1QixDQUFDO29CQUN4QixxQkFBTSxhQUFhLENBQUMsUUFBUSxFQUFFLEVBQUE7O29CQUF0QyxLQUFLLEdBQUcsU0FBOEI7b0JBQ3JDLHFCQUFNLGFBQWEsQ0FBQyxPQUFPLENBQUM7NEJBQ2pDLEtBQUssT0FBQTs0QkFDTCxLQUFLLE9BQUE7NEJBQ0wsU0FBUyxXQUFBO3lCQUNWLENBQUMsRUFBQTt3QkFKRixzQkFBTyxTQUlMLEVBQUM7OztTQUNKLENBQUM7SUFaVyxRQUFBLFNBQVMsYUFZcEI7SUFFSyxJQUFNLGdCQUFnQixHQUFHLFVBQzlCLGFBQTRCLEVBQzVCLGFBQXNDLEVBQ3RDLFNBQWlDOzs7OztvQkFFM0IsS0FBSyxHQUFHLGtDQUFxQixDQUFDO29CQUN0QixxQkFBTSxhQUFhLENBQUMsUUFBUSxFQUFFLEVBQUE7O29CQUF0QyxLQUFLLEdBQUcsU0FBOEI7b0JBQ3JDLHFCQUFNLGFBQWEsQ0FBQyxPQUFPLENBQUM7NEJBQ2pDLEtBQUssT0FBQTs0QkFDTCxLQUFLLE9BQUE7NEJBQ0wsU0FBUyxXQUFBO3lCQUNWLENBQUMsRUFBQTt3QkFKRixzQkFBTyxTQUlMLEVBQUM7OztTQUNKLENBQUM7SUFaVyxRQUFBLGdCQUFnQixvQkFZM0I7SUFFSyxJQUFNLEdBQUcsR0FBRyxVQUNqQixhQUE0QixFQUM1QixhQUFzQyxFQUN0QyxTQUF1Qjs7Ozs7b0JBRWpCLEtBQUssR0FBRyx3QkFBVyxDQUFDO29CQUNaLHFCQUFNLGFBQWEs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