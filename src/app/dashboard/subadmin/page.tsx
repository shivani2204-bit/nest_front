'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from '@/lib/axios';
import Image from 'next/image';
import icons from '@/assets/svg';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import toast from 'react-hot-toast';

export default function SubAdminListPage() {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const userPermissions = useAuthStore((state) => state.permissions);

  const canEdit = userPermissions.includes('update_user');
  const canDelete = userPermissions.includes('delete_user');


  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users');
      setUsers(res.data);
    } catch {
      toast.error('Failed to load roles');
    }
  };
  console.log(users, 2222)

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this sub admin?')) return;
    try {
      await axios.delete(`/users/${id}`);
      toast.success('Sub admin deleted');
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  useEffect(() => {
    fetchUsers()
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sub-admin Management</h1>
        <Link href="/dashboard/subadmin/add"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Add Sub Admin
        </Link>
      </div>

      <div className="overflow-auto rounded shadow">
        <table className="min-w-full bg-white text-gray-700">
          <thead className="bg-gray-100 text-sm font-semibold">
            <tr>
              <th className="px-4 py-2 text-left">S.No.</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role?.name}</td>
                <td className="px-4 py-2 space-x-2 flex items-center">
                  <button
                    title="View"
                    onClick={() => alert(`View Role ID: ${user.id}`)}
                    className="hover:scale-110 transition"
                  >
                    <Image src={icons.yelloweye} alt="view" className="w-5 h-5 inline" />
                  </button>
                  {canEdit && (
                    <button
                      title="Edit"
                      onClick={() => router.push(`/dashboard/subadmin/edit/${user.id}`)}
                      className="hover:scale-110 transition"
                    >
                      <Image src={icons.editIcon} alt="edit" className="w-5 h-5 inline" />
                    </button>
                  )}
                  <button
                    title="Delete"
                    onClick={() => handleDelete(user.id)}
                    className="hover:scale-110 transition"
                  >
                    <Image src={icons.trashIcon} alt="delete" className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
