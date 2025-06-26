// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// const withPermission = (Component: any, requiredPermissions: string[]) => {
//   return function WithPermissionWrapper(props: any) {
//     const router = useRouter();

//     useEffect(() => {
//       const user = JSON.parse(localStorage.getItem('token') || '{}');
//       const userPermissions = user?.permissions || [];

//       const hasPermission = requiredPermissions.every(p =>
//         userPermissions.includes(p)
//       );

//       if (!hasPermission) {
//         router.replace('/unauthorized');
//       }
//     }, []);

//     return <Component {...props} />;
//   };
// };

// export default withPermission;

// hoc/withPermission.tsx
// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuthStore } from '@/stores/useAuthStore';

// export default function withPermission<P>(
//   Component: React.ComponentType<P>,
//   requiredPermissions: string[]
// ) {
//   return function Wrapper(props: P) {
//     const router = useRouter();
//     const userPerms = useAuthStore((s) => s.permissions);

//     useEffect(() => {
//       const hasAccess = requiredPermissions.every(p => userPerms.includes(p));
//       if (!hasAccess) {
//         router.replace('/unauthorized');
//       }
//     }, [userPerms]);

//     return <Component {...props} />;
//   };
// }

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import React from 'react';

type WithPermissionProps = {
  [key: string]: any;
};

const withPermission = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredPermissions: string[]
) => {
  const WithPermissionWrapper = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('token') || '{}');
      const userPermissions = user?.permissions || [];

      const hasPermission = requiredPermissions.every((p) =>
        userPermissions.includes(p)
      );

      if (!hasPermission) {
        router.replace('/unauthorized');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithPermissionWrapper;
};

export default withPermission;
