"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRole = exports.roleWithUsersWithCustomData = exports.roleWithUsers = exports.role = exports.roles = exports.deleteUsers = exports.deleteUser = exports.createUser = exports.findUserWithCustomData = exports.findUser = exports.searchUserWithCustomData = exports.searchUser = exports.updateUser = exports.updateUserpool = exports.archivedUsers = exports.usersWithCustomData = exports.users = exports.resetPasswordByForceResetToken = exports.resetPasswordByFirstLoginToken = exports.resetPassword = exports.sendFirstLoginVerifyEmail = exports.sendEmail = exports.getMembersByCode = exports.getMembersById = exports.moveMembers = exports.addMember = exports.revokeRole = exports.assignRole = exports.addRole = exports.registerByPhoneCode = exports.registerByUsername = exports.loginBySubAccount = exports.loginByPhonePassword = exports.loginByPhoneCode = exports.loginByUsername = exports.loginByEmail = exports.registerByEmail = exports.checkPasswordStrength = exports.isDenied = exports.deleteOrg = exports.createOrg = exports.userWithCustomData = exports.user = exports.getUserPoolDetail = exports.orgs = exports.rootNode = exports.isRootNode = exports.org = exports.getChildrenNodes = exports.isAllowed = void 0;
exports.groupWithUsersWithCustomData = exports.groupWithUsers = exports.group = exports.getGroups = exports.checkLoginStatus = exports.disablePolicyAssignment = exports.enablePolicyAssignment = exports.removePolicyAssignments = exports.addPolicyAssignments = exports.policyAssignments = exports.deletePolicies = exports.deletePolicy = exports.updatePolicy = exports.policy = exports.createPolicy = exports.policies = exports.deleteRoles = exports.deleteRole = exports.udf = exports.removeUdf = exports.setUdf = exports.removeUdv = exports.setUdfValueBatch = exports.setUdvBatch = exports.setUdv = exports.udfValueBatch = exports.udv = exports.addWhiteList = exports.removeWhiteList = exports.getWhiteList = exports.allow = exports.setMainDepartment = exports.getUserDepartments = exports.getUserRoles = exports.userBatchWithCustomData = exports.userBatch = exports.unbindPhone = exports.bindEmail = exports.bindPhone = exports.updateEmail = exports.updatePhone = exports.updatePassword = exports.isUserExists = exports.refreshToken = exports.removeMembers = exports.moveNode = exports.nodeById = exports.deleteNode = exports.updateNode = exports.addNode = void 0;
exports.searchNodes = exports.authorizedTargets = exports.authorizeResource = exports.listAuthorizedResources = exports.listNodeByCodeAuthorizedResources = exports.listNodeByIdAuthorizedResources = exports.listGroupAuthorizedResources = exports.listRoleAuthorizedResources = exports.listUserAuthorizedResources = exports.refreshAccessToken = exports.getAccessToken = exports.unbindEmail = exports.getUserGroups = exports.removeUserFromGroup = exports.addUserToGroup = exports.deleteGroups = exports.updateGroup = exports.createGroup = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbGFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZ3JhcGhxbGFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtEQWtXNkI7QUFFdEIsSUFBTSxTQUFTLEdBQUcsVUFDdkIsYUFBNEIsRUFDNUIsYUFBc0MsRUFDdEMsU0FBbUM7Ozs7O2dCQUU3QixLQUFLLEdBQUcsb0NBQXVCLENBQUM7Z0JBQ3hCLHFCQUFNLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBQTs7Z0JBQXRDLEtBQUssR0FBRyxTQUE4QjtnQkFDckMscUJBQU0sYUFBYSxDQUFDLE9BQU8sQ0FBQzt3QkFDakMsS0FBSyxPQUFBO3dCQUNMLEtBQUssT0FBQTt3QkFDTCxTQUFTLFdBQUE7cUJBQ1YsQ0FBQyxFQUFBO29CQUpGLHNCQUFPLFNBSUwsRUFBQzs7O0tBQ0osQ0FBQztBQVpXLFFBQUEsU0FBUyxhQVlwQjtBQUVLLElBQU0sZ0JBQWdCLEdBQUcsVUFDOUIsYUFBNEIsRUFDNUIsYUFBc0MsRUFDdEMsU0FBaUM7Ozs7O2dCQUUzQixLQUFLLEdBQUcsa0NBQXFCLENBQUM7Z0JBQ3RCLHFCQUFNLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBQTs7Z0JBQXRDLEtBQUssR0FBRyxTQUE4QjtnQkFDckMscUJBQU0sYUFBYSxDQUFDLE9BQU8sQ0FBQzt3QkFDakMsS0FBSyxPQUFBO3dCQUNMLEtBQUssT0FBQTt3QkFDTCxTQUFTLFdBQUE7cUJBQ1YsQ0FBQyxFQUFBO29CQUpGLHNCQUFPLFNBSUwsRUFBQzs7O0tBQ0osQ0FBQztBQVpXLFFBQUEsZ0JBQWdCLG9CQVkzQjtBQUVLLElBQU0sR0FBRyxHQUFHLFVBQ2pCLGFBQTRCLEVBQzVCLGFBQXNDLEVBQ3RDLFNBQXVCOzs7OztnQkFFakIsS0FBSyxHQUFHLHdCQUFXLENBQUM7Z0JBQ1oscUJBQU0sYUFBYSxDQUFDLFFB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