// export default function UsersPage() {
//   return <div className="p-4 text-xl font-bold text-gray-800">User Management</div>;
// }

// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import axios from '@/lib/axios';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: { name: string };
// }

// export default function UserListPage() {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     axios.get('/users').then((res) => {
//       setUsers(res.data);
//       console.log(res.data,"res24")
//     });
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
//         <Link
//           href="/dashboard/users/add"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add User
//         </Link>
//       </div>

//       <table className="w-full table-auto border-collapse bg-white shadow rounded">
//         <thead>
//           <tr className="bg-gray-100 text-left text-sm text-gray-600">
//             <th className="px-4 py-2">Name</th>
//             <th className="px-4 py-2">Email</th>
//             <th className="px-4 py-2">Role</th>
//             <th className="px-4 py-2 text-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} className="border-t text-sm text-gray-500">
//               <td className="px-4 py-2">{user.name}</td>
//               <td className="px-4 py-2">{user.email}</td>
//               <td className="px-4 py-2">{user.role?.name}</td>
//               <td className="px-4 py-2 text-right">
//                 {/* <Link
//                   href={`/dashboard/users/edit/${user.id}`}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Edit
//                 </Link> */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

interface Permission {
  id: number;
  name: string;
}

interface Role {
  name: string;
  permissions: { permission: Permission }[];
}

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filterRole, setFilterRole] = useState('');
  const filteredUsers = filterRole
    ? users.filter((user) => user.role?.name === filterRole)
    : users;

  useEffect(() => {
    axios.get('/users').then((res) => {
      setUsers(res.data);
      console.log(res.data, 'Fetched Users');
    });
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        {/* <Link
          href="/dashboard/users/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </Link> */}
        <select
          className="bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Subadmin">Subadmin</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Permissions</th>
              <th className="px-4 py-2">Created At</th>
              {/* <th className="px-4 py-2 text-right">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t text-sm text-gray-700">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-xs font-medium">
                    {user.role?.name}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-wrap gap-1">
                    {user.role?.permissions?.map((p) => (
                      <span
                        key={p.permission.id}
                        className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
                      >
                        {p.permission.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                {/* <td className="px-4 py-2 text-right">
                  <Link
                    href={`/dashboard/users/edit/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
