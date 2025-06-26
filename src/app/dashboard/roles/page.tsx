'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import Icons from '@/assets/svg'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RolesListPage() {
  const [roles, setRoles] = useState([]);
  const router = useRouter();

  const fetchRoles = async () => {
    try {
      const res = await axios.get('/role');
      setRoles(res.data);
    } catch {
      toast.error('Failed to load roles');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this role?')) return;
    try {
      await axios.delete(`/role/${id}`);
      toast.success('Role deleted');
      fetchRoles();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Role & Permission</h1>
        <Link
          href="/dashboard/roles/add"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Role & Permission
        </Link>
      </div>

      <div className="overflow-auto rounded shadow">
        <table className="min-w-full bg-white text-gray-700">
          <thead className="bg-gray-100 text-sm font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">S.No.</th>
              <th className="px-4 py-3 text-left">Role Name</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: any, index: number) => (
              <tr key={role.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{role.name}</td>
                <td className="px-4 py-3 space-x-3 flex items-center">
                  <button
                    title="View"
                    onClick={() => alert(`View Role ID: ${role.id}`)}
                    className="hover:scale-110 transition"
                  >
                    <Image src={Icons.yelloweye} alt="View" width={20} height={20} />
                  </button>
                  <button
                    title="Edit"
                    onClick={() => router.push(`/dashboard/roles/edit/${role.id}`)}
                    className="hover:scale-110 transition"
                  >
                    <Image src={Icons.editIcon} alt="Edit" width={20} height={20} />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleDelete(role.id)}
                    className="hover:scale-110 transition"
                  >
                    <Image src={Icons.trashIcon} alt="Delete" width={20} height={20} />
                  </button>
                </td>
              </tr>
            ))}
            {roles.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No roles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
