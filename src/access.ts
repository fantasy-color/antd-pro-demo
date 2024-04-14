/**
 * @see https://umijs.org/docs/max/access#access
 * */

const checkPermission = (currentUser: API.CurrentUser, name: string) => {
  return (
    currentUser &&
    currentUser.roles?.some(
      (role: any) => !!role.permissions?.find((permission: any) => permission.name === name),
    )
  );
};

export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.isAdmin,
    canUpdateRole: currentUser && (currentUser.isAdmin || checkPermission(currentUser, '修改角色')),
  };
}
