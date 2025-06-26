'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from '@/lib/axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';


export default function AddOrEditUsers({ mode }: { mode: 'add' | 'edit' }) {
  const router = useRouter();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    password: '',
    roleId: '',
  });
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get('/role').then((res) => setRoles(res.data));
  }, []);

  useEffect(() => {
    if (mode === 'edit' && id) {
      axios.get(`/users/${id}`).then((res) => {
        const user = res.data;
        setInitialValues({
          name: user.name,
          email: user.email,
          password: '',
          roleId: user.roleId,
        });
      });
    }
  }, [mode, id]);

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (mode === 'add') {
        await axios.post('/users', values);
        toast.success('User created');
      } else {
        await axios.put(`/users/${id}`, values);
        toast.success('User updated');
      }
      router.push('/dashboard/users');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {mode === 'add' ? 'Add User' : 'Edit User'}
      </h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string().email().required('Required'),
          password: mode === 'add' ? Yup.string().required('Required') : Yup.string(),
          roleId: Yup.string().required('Select a role'),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-600">Name</label>
              <Field name="name" className="w-full border p-2 rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-semibold text-gray-600">Email</label>
              <Field name="email" className="w-full border p-2 rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-semibold text-gray-600">Password</label>
              <Field name="password" type="password" className="w-full border p-2 rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-semibold text-gray-600">Assign Role</label>
              <Field
                as="select"
                name="roleId"
                className="w-full border p-2 rounded"
                onChange={(e: any) => setFieldValue('roleId', Number(e.target.value))}
              >
                <option value="">Select role</option>
                {roles.map((role: any) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="roleId" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {mode === 'add' ? 'Create' : 'Update'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
