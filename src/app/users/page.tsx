// export default function UsersPage() {
//   return <div className="p-4 text-xl font-bold">User Management</div>;
// }

import withPermission from '@/hoc/withPermission';

const UserManagementPage = () => {
  return <div>User Management</div>;
};

export default withPermission(UserManagementPage, ['create_user','role.view']);
