'use client';

// import withPermission from '@/hoc/withPermission';
// import { useEffect, useState } from 'react';
// import axios from '@/lib/axios';

const RoleList = () => {
//   const [roles, setRoles] = useState([]);

//   useEffect(() => {
//     axios.get('/role').then((res) => setRoles(res.data));
//   }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800">Roles</h2>
      {/* <ul>
        {roles.map((role: any) => (
          <li key={role.id}>{role.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

// export default withPermission(RoleList, ['role.view']);
