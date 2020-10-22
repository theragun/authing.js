```python
data = management_client.users.add_roles(
   userId='USERID',
   roles=['ROLE1', 'ROLE2']
)
totalCount = data['totalCount'] # 最新的总数
users = data['list'] # 最新的角色列表
```

```csharp
var message = await managementClient.Users.AddRoles("userId", new string[] { "roleId" });
```