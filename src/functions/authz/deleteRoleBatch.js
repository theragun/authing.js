import mutations from "../../graphql/mutations"

export default function (idList) {

  if (!idList instanceof Array) {
    throw "idList must be an array!"
  }

  return this.fetchToken.then(() => {
    return this.UserServiceGql.request({
      operationName: "DeleteRBACRoleBatch",
      query: mutations.deleteRBACRoleBatch,
      variables: {
        idList
      }
    })
  })
}
