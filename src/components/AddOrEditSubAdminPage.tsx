'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';


export default function AddOrEditSubAdminPage({ mode }: { mode: 'add' | 'edit' }) {
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
                setInitialValues({
                    name: res.data.name,
                    email: res.data.email,
                    password: '',
                    roleId: res.data.roleId,
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
            router.push('/dashboard/subadmin');
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Error');
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
                {mode === 'add' ? 'Add Subadmin' : 'Edit Subadmin'}
            </h2>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={Yup.object({
                    name: Yup.string().required('Required'),
                    email: Yup.string().email().required('Required'),
                    password: mode === 'add' ? Yup.string().required('Required') : Yup.string(),
                    roleId: Yup.number().required('Select a role'),
                })}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, setFieldValue }) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="block font-semibold text-gray-600">Name</label>
                            <Field name="name" className="w-full border p-2 rounded" />
                            <ErrorMessage name="name" className="text-red-500 text-sm" component="div" />
                        </div>

                        <div>
                            <label className="block font-semibold text-gray-600">Email</label>
                            <Field name="email" type="email" className="w-full border p-2 rounded" />
                            <ErrorMessage name="email" className="text-red-500 text-sm" component="div" />
                        </div>

                        <div>
                            <label className="block font-semibold text-gray-600">Password</label>
                            <Field name="password" type="password" className="w-full border p-2 rounded" />
                            <ErrorMessage name="password" className="text-red-500 text-sm" component="div" />
                        </div>

                        <div>
                            <label className="block font-semibold text-gray-600">Assign Role</label>
                            <Field
                                as="select"
                                name="roleId"
                                className="w-full border p-2 rounded"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                    setFieldValue('roleId', Number(e.target.value))
                                }
                            >
                                <option value="">Select role</option>
                                {roles.map((role: any) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="roleId" className="text-red-500 text-sm" component="div" />
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
