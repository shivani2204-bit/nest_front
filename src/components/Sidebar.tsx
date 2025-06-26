// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const menuItems = [
//   { name: 'Dashboard', href: '/dashboard' },
//   { name: 'Users', href: '/dashboard/users' },
//   { name: 'Roles', href: '/dashboard/roles' },
//   { name: 'Subadmin', href: '/dashboard/subadmin' },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="w-64 bg-white p-4 shadow-md">
//       <h2 className="mb-6 text-xl font-semibold text-gray-700">Admin Panel</h2>
//       <ul className="space-y-2">
//         {menuItems.map((item) => (
//           <li key={item.href}>
//             <Link
//               href={item.href}
//               className={`block rounded px-3 py-2 text-sm font-medium ${
//                 pathname === item.href
//                 // pathname.startsWith(item.href)
//                   ? 'bg-blue-500 text-white'
//                   : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// }


'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', requiredPermissions: [] },
  { name: 'Users', href: '/dashboard/users', requiredPermissions: ['view_user'] },
  { name: 'Roles', href: '/dashboard/roles', requiredPermissions: ['role.view'] },
  { name: 'Subadmin', href: '/dashboard/subadmin', requiredPermissions: ['subadmin.view'] },
];

export default function Sidebar() {
  const pathname = usePathname();
  const userPermissions = useAuthStore((state) => state.permissions);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  console.log(userPermissions, 5555)

  // Filter items user has access to
  const visibleItems = menuItems.filter((item) =>
    item.requiredPermissions.length === 0 ||
    item.requiredPermissions.every((perm) => userPermissions.includes(perm))
  );

  return (
    <aside className="flex h-screen w-64 flex-col justify-between bg-white p-4 shadow-md">
      <div>
        <h2 className="mb-6 text-xl font-semibold text-gray-700">Admin Panel</h2>
        <ul className="space-y-2">
          {visibleItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded px-3 py-2 text-sm font-medium ${pathname === item.href
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <button
          onClick={() => {
            logout();
            localStorage.removeItem('auth-storage');
            router.push('/login');
          }}
          className="w-full mt-6 rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
