import withPermission from '@/hoc/withPermission';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const SubadminList = () => {
  const [subadmins, setSubadmins] = useState([]);

  useEffect(() => {
    axios.get('/user?role=subadmin')
      .then((res) => setSubadmins(res.data))
      .catch((err) => console.error('Error fetching subadmins:', err));
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Subadmins</h1>
        <Link href="/subadmins/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Subadmin</button>
        </Link>
      </div>
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {subadmins.map((user: any) => (
            <tr key={user.id}>
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// export default withPermission(SubadminList, ['subadmin.view']);
export default SubadminList;
