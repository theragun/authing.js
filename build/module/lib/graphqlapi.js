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
import { CreateUserDocument, SearchUserDocument, UserpoolDocument, UpdateUserpoolDocument, ResetPasswordDocument, CheckPasswordStrengthDocument, RegisterByEmailDocument, RegisterByUsernameDocument, AssignRoleDocument, IsActionAllowedDocument, IsActionDeniedDocument, CreateRoleDocument, LoginByEmailDocument, LoginByUsernameDocument, LoginByPhoneCodeDocument, LoginByPhonePasswordDocument, OrgDocument, AddMemberDocument, SendEmailDocument, UsersDocument, UserDocument, RolesDocument, GroupsDocument, UpdateUserDocument, DeleteUserDocument, DeleteUsersDocument, RoleDocument, RoleWithUsersDocument, UpdateRoleDocument, OrgsDocument, CreateOrgDocument, UpdateNodeDocument, DeleteNodeDocument, MoveNodeDocument, NodeByIdWithMembersDocument, NodeByCodeWithMembersDocument, RemoveMemberDocument, RevokeRoleDocument, ChildrenNodesDocument, RefreshTokenDocument, AddUserToGroupDocument, RegisterByPhoneCodeDocument, UpdatePasswordDocument, UpdatePhoneDocument, UpdateEmailDocument, BindPhoneDocument, UnbindPhoneDocument, UserBatchDocument, GetUserRolesDocument, AllowDocument, WhitelistDocument, RemoveWhitelistDocument, AddWhitelistDocument, UdfDocument, UdvDocument, SetUdvDocument, RemoveUdvDocument, SetUdfDocument, RemoveUdfDocument, DeleteRoleDocument, DeleteRolesDocument, PoliciesDocument, CreatePolicyDocument, PolicyDocument, UpdatePolicyDocument, DeletePolicyDocument, DeletePoliciesDocument, PolicyAssignmentsDocument, AddPolicyAssignmentsDocument, RemovePolicyAssignmentsDocument, DeleteOrgDocument, RootNodeDocument, IsRootNodeDocument, IsUserExistsDocument, CheckLoginStatusDocument, GroupDocument, CreateGroupDocument, UpdateGroupDocument, DeleteGroupsDocument, RemoveUserFromGroupDocument, GroupWithUsersDocument, GetUserGroupsDocument, UnbindEmailDocument, AccessTokenDocument, EnablePolicyAssignmentDocument, DisbalePolicyAssignmentDocument, NodeByIdDocument, SetUdvBatchDocument, LoginBySubAccountDocument, ArchivedUsersDocument, AddNodeV2Document, FindUserDocument, GetUserDepartmentsDocument, SetMainDepartmentDocument, BindEmailDocument, ListUserAuthorizedResourcesDocument, UdfValueBatchDocument, SetUdfValueBatchDocument, ListRoleAuthorizedResourcesDocument, ListGroupAuthorizedResourcesDocument, ListNodeByIdAuthorizedResourcesDocument, ListNodeByCodeAuthorizedResourcesDocument, AuthorizedResourcesDocument, AuthorizeResourceDocument, AuthorizedTargetsDocument, UsersWithCustomDataDocument, UserWithCustomDataDocument, UserBatchWithCustomDataDocument, FindUserWithCustomDataDocument, SearchUserWithCustomDataDocument, RoleWithUsersWithCustomDataDocument, GroupWithUsersWithCustomDataDocument, MoveMembersDocument, SearchNodesDocument, ResetPasswordByFirstLoginTokenDocument, SendFirstLoginVerifyEmailDocument, ResetPasswordByForceResetTokenDocument } from '../types/graphql.v2';
export var isAllowed = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = IsActionAllowedDocument;
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
export var getChildrenNodes = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = ChildrenNodesDocument;
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
export var org = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = OrgDocument;
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
export var isRootNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = IsRootNodeDocument;
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
export var rootNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RootNodeDocument;
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
export var orgs = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = OrgsDocument;
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
export var getUserPoolDetail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UserpoolDocument;
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
export var user = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UserDocument;
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
export var userWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UserWithCustomDataDocument;
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
export var createOrg = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = CreateOrgDocument;
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
export var deleteOrg = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = DeleteOrgDocument;
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
export var isDenied = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = IsActionDeniedDocument;
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
export var checkPasswordStrength = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = CheckPasswordStrengthDocument;
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
export var registerByEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RegisterByEmailDocument;
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
export var loginByEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        query = LoginByEmailDocument;
        token = tokenProvider.getToken();
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                token: token,
                variables: variables
            })];
    });
}); };
export var loginByUsername = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        query = LoginByUsernameDocument;
        token = tokenProvider.getToken();
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                token: token,
                variables: variables
            })];
    });
}); };
export var loginByPhoneCode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        query = LoginByPhoneCodeDocument;
        token = tokenProvider.getToken();
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                token: token,
                variables: variables
            })];
    });
}); };
export var loginByPhonePassword = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        query = LoginByPhonePasswordDocument;
        token = tokenProvider.getToken();
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                token: token,
                variables: variables
            })];
    });
}); };
export var loginBySubAccount = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        query = LoginBySubAccountDocument;
        token = tokenProvider.getToken();
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                token: token,
                variables: variables
            })];
    });
}); };
export var registerByUsername = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        query = RegisterByUsernameDocument;
        token = tokenProvider.getToken();
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                token: token,
                variables: variables
            })];
    });
}); };
export var registerByPhoneCode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        query = RegisterByPhoneCodeDocument;
        token = tokenProvider.getToken();
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                token: token,
                variables: variables
            })];
    });
}); };
export var addRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = CreateRoleDocument;
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
export var assignRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = AssignRoleDocument;
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
export var revokeRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RevokeRoleDocument;
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
export var addMember = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = AddMemberDocument;
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
export var moveMembers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = MoveMembersDocument;
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
export var getMembersById = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = NodeByIdWithMembersDocument;
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
export var getMembersByCode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = NodeByCodeWithMembersDocument;
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
export var sendEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = SendEmailDocument;
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
export var sendFirstLoginVerifyEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = SendFirstLoginVerifyEmailDocument;
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
export var resetPassword = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = ResetPasswordDocument;
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
export var resetPasswordByFirstLoginToken = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = ResetPasswordByFirstLoginTokenDocument;
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
export var resetPasswordByForceResetToken = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = ResetPasswordByForceResetTokenDocument;
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
export var users = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UsersDocument;
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
export var usersWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UsersWithCustomDataDocument;
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
export var archivedUsers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = ArchivedUsersDocument;
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
export var updateUserpool = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UpdateUserpoolDocument;
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
export var updateUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UpdateUserDocument;
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
export var searchUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = SearchUserDocument;
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
export var searchUserWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = SearchUserWithCustomDataDocument;
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
export var findUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = FindUserDocument;
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
export var findUserWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = FindUserWithCustomDataDocument;
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
export var createUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = CreateUserDocument;
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
export var deleteUser = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = DeleteUserDocument;
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
export var deleteUsers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = DeleteUsersDocument;
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
export var roles = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RolesDocument;
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
export var role = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RoleDocument;
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
export var roleWithUsers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RoleWithUsersDocument;
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
export var roleWithUsersWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RoleWithUsersWithCustomDataDocument;
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
export var updateRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UpdateRoleDocument;
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
export var addNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = AddNodeV2Document;
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
export var updateNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UpdateNodeDocument;
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
export var deleteNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = DeleteNodeDocument;
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
export var nodeById = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = NodeByIdDocument;
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
export var moveNode = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = MoveNodeDocument;
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
export var removeMembers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RemoveMemberDocument;
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
export var refreshToken = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RefreshTokenDocument;
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
export var isUserExists = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = IsUserExistsDocument;
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
export var updatePassword = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UpdatePasswordDocument;
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
export var updatePhone = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UpdatePhoneDocument;
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
export var updateEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UpdateEmailDocument;
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
export var bindPhone = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = BindPhoneDocument;
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
export var bindEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = BindEmailDocument;
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
export var unbindPhone = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UnbindPhoneDocument;
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
export var userBatch = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UserBatchDocument;
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
export var userBatchWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UserBatchWithCustomDataDocument;
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
export var getUserRoles = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = GetUserRolesDocument;
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
export var getUserDepartments = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = GetUserDepartmentsDocument;
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
export var setMainDepartment = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = SetMainDepartmentDocument;
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
export var allow = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = AllowDocument;
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
export var getWhiteList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = WhitelistDocument;
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
export var removeWhiteList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RemoveWhitelistDocument;
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
export var addWhiteList = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = AddWhitelistDocument;
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
export var udv = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UdvDocument;
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
export var udfValueBatch = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UdfValueBatchDocument;
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
export var setUdv = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = SetUdvDocument;
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
export var setUdvBatch = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = SetUdvBatchDocument;
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
export var setUdfValueBatch = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = SetUdfValueBatchDocument;
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
export var removeUdv = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RemoveUdvDocument;
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
export var setUdf = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = SetUdfDocument;
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
export var removeUdf = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RemoveUdfDocument;
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
export var udf = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UdfDocument;
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
export var deleteRole = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = DeleteRoleDocument;
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
export var deleteRoles = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = DeleteRolesDocument;
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
export var policies = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = PoliciesDocument;
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
export var createPolicy = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = CreatePolicyDocument;
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
export var policy = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = PolicyDocument;
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
export var updatePolicy = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UpdatePolicyDocument;
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
export var deletePolicy = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = DeletePolicyDocument;
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
export var deletePolicies = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = DeletePoliciesDocument;
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
export var policyAssignments = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = PolicyAssignmentsDocument;
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
export var addPolicyAssignments = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = AddPolicyAssignmentsDocument;
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
export var removePolicyAssignments = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RemovePolicyAssignmentsDocument;
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
export var enablePolicyAssignment = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = EnablePolicyAssignmentDocument;
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
export var disablePolicyAssignment = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = DisbalePolicyAssignmentDocument;
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
export var checkLoginStatus = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = CheckLoginStatusDocument;
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
export var getGroups = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = GroupsDocument;
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
export var group = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = GroupDocument;
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
export var groupWithUsers = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = GroupWithUsersDocument;
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
export var groupWithUsersWithCustomData = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = GroupWithUsersWithCustomDataDocument;
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
export var createGroup = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = CreateGroupDocument;
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
export var updateGroup = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UpdateGroupDocument;
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
export var deleteGroups = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = DeleteGroupsDocument;
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
export var addUserToGroup = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = AddUserToGroupDocument;
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
export var removeUserFromGroup = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = RemoveUserFromGroupDocument;
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
export var getUserGroups = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = GetUserGroupsDocument;
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
export var unbindEmail = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = UnbindEmailDocument;
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
export var getAccessToken = function (garpqhlClient, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        query = AccessTokenDocument;
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                variables: variables
            })];
    });
}); };
export var refreshAccessToken = function (garpqhlClient, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        query = RefreshTokenDocument;
        return [2 /*return*/, garpqhlClient.request({
                query: query,
                variables: variables
            })];
    });
}); };
export var listUserAuthorizedResources = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = ListUserAuthorizedResourcesDocument;
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
export var listRoleAuthorizedResources = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = ListRoleAuthorizedResourcesDocument;
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
export var listGroupAuthorizedResources = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = ListGroupAuthorizedResourcesDocument;
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
export var listNodeByIdAuthorizedResources = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = ListNodeByIdAuthorizedResourcesDocument;
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
export var listNodeByCodeAuthorizedResources = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = ListNodeByCodeAuthorizedResourcesDocument;
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
export var listAuthorizedResources = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = AuthorizedResourcesDocument;
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
export var authorizeResource = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = AuthorizeResourceDocument;
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
export var authorizedTargets = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = AuthorizedTargetsDocument;
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
export var searchNodes = function (garpqhlClient, tokenProvider, variables) { return __awaiter(void 0, void 0, void 0, function () {
    var query, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = SearchNodesDocument;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbGFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZ3JhcGhxbGFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEVBRUwsa0JBQWtCLEVBR2xCLGtCQUFrQixFQUVsQixnQkFBZ0IsRUFLaEIsc0JBQXNCLEVBRXRCLHFCQUFxQixFQUtyQiw2QkFBNkIsRUFDN0IsdUJBQXVCLEVBR3ZCLDBCQUEwQixFQUkxQixrQkFBa0IsRUFHbEIsdUJBQXVCLEVBR3ZCLHNCQUFzQixFQUl0QixrQkFBa0IsRUFFbEIsb0JBQW9CLEVBSXBCLHVCQUF1QixFQUd2Qix3QkFBd0IsRUFHeEIsNEJBQTRCLEVBQzVCLFdBQVcsRUFJWCxpQkFBaUIsRUFJakIsaUJBQWlCLEVBQ2pCLGFBQWEsRUFHYixZQUFZLEVBRVosYUFBYSxFQUdiLGNBQWMsRUFHZCxrQkFBa0IsRUFLbEIsa0JBQWtCLEVBQ2xCLG1CQUFtQixFQUluQixZQUFZLEVBRVoscUJBQXFCLEVBSXJCLGtCQUFrQixFQUVsQixZQUFZLEVBSVosaUJBQWlCLEVBSWpCLGtCQUFrQixFQUdsQixrQkFBa0IsRUFHbEIsZ0JBQWdCLEVBR2hCLDJCQUEyQixFQUczQiw2QkFBNkIsRUFHN0Isb0JBQW9CLEVBR3BCLGtCQUFrQixFQUdsQixxQkFBcUIsRUFFckIsb0JBQW9CLEVBRXBCLHNCQUFzQixFQUl0QiwyQkFBMkIsRUFJM0Isc0JBQXNCLEVBR3RCLG1CQUFtQixFQUduQixtQkFBbUIsRUFHbkIsaUJBQWlCLEVBR2pCLG1CQUFtQixFQUduQixpQkFBaUIsRUFDakIsb0JBQW9CLEVBS3BCLGFBQWEsRUFFYixpQkFBaUIsRUFJakIsdUJBQXVCLEVBR3ZCLG9CQUFvQixFQUdwQixXQUFXLEVBRVgsV0FBVyxFQUlYLGNBQWMsRUFHZCxpQkFBaUIsRUFHakIsY0FBYyxFQUdkLGlCQUFpQixFQUdq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