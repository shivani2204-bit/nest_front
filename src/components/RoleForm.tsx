'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';


interface Permission {
  id: number;
  name: string;
}

interface FormValues {
  name: string;
  permissionIds: number[];
}

const allPermissions: Permission[] = [
  { id: 1, name: 'create_user' },
  { id: 2, name: 'delete_user' },
  { id: 3, name: 'update_user' },
  { id: 4, name: 'view_user' },
  { id: 9, name: 'role.view' },
  { id: 10, name: 'role.create' },
  { id: 11, name: 'role.update' },
  { id: 12, name: 'role.delete' },
  { id: 14, name: 'subadmin.view' },
  { id: 15, name: 'subadmin.create' },
];

export default function RoleForm({ mode = 'add' }: { mode?: 'add' | 'edit' }) {
  const router = useRouter();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<FormValues>({
    name: '',
    permissionIds: [],
  });

  const isEdit = mode === 'edit';

  useEffect(() => {
    if (isEdit && id) {
      axios.get(`/role/${id}`)
        .then((res) => {
          const role = res.data;
          const permissionIds = role.permissions.map((p: any) => p.permissionId);
          setInitialValues({ name: role.name, permissionIds });
        })
        .catch(() => toast.error('Failed to load role'));
    }
  }, [id, isEdit]);

  const handleSubmit = async (values: FormValues) => {
    try {
      if (isEdit && id) {
        await axios.put(`/role/${id}`, values);
        toast.success('Role updated successfully');
      } else {
        await axios.post('/role', values);
        toast.success('Role created successfully');
      }
      router.push('/dashboard/roles');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {isEdit ? 'Edit Role' : 'Create Role'}
      </h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required('Role name is required'),
          permissionIds: Yup.array()
            .of(Yup.number())
            .min(1, 'Select at least one permission'),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="font-semibold text-gray-600">
                Role Name <span className="text-red-500">*</span>
              </label>
              <Field
                name="name"
                className="w-full mt-1 border p-2 rounded text-gray-700"
                placeholder="Enter role name"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="font-semibold text-gray-600">
                Permissions <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 text-gray-700">
                {allPermissions.map((perm) => (
                  <label key={perm.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={values.permissionIds.includes(perm.id)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...values.permissionIds, perm.id]
                          : values.permissionIds.filter((id) => id !== perm.id);
                        setFieldValue('permissionIds', updated);
                      }}
                    />
                    {perm.name.replace(/_/g, ' ')}
                  </label>
                ))}
              </div>
              <ErrorMessage name="permissionIds" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isEdit ? 'Update Role' : 'Create Role'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
