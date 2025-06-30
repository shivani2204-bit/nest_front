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
