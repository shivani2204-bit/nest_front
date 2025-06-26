// 'use client';

// import { useState } from 'react';

// const modules = [
//   { name: 'Role & Permission', key: 'role' },
//   { name: 'Sub Admin', key: 'subadmin' },
//   { name: 'User Management', key: 'user' },
//   ];

// const actions = ['View', 'Add', 'Edit', 'Delete'];

// export default function AddRolePermissionPage() {
//   const [roleName, setRoleName] = useState('');
//   const [permissions, setPermissions] = useState<{ [key: string]: string[] }>({});

//   const togglePermission = (module: string, action: string) => {
//     setPermissions((prev) => {
//       const current = prev[module] || [];
//       const updated = current.includes(action)
//         ? current.filter((a) => a !== action)
//         : [...current, action];
//       return { ...prev, [module]: updated };
//     });
//   };

//   const toggleAll = (module: string) => {
//     const allActions = [...actions];
//     const alreadySelected = permissions[module] || [];
//     const isAll = allActions.every((a) => alreadySelected.includes(a));
//     setPermissions((prev) => ({
//       ...prev,
//       [module]: isAll ? [] : allActions,
//     }));
//   };

//   const handleSubmit = () => {
//     console.log({ roleName, permissions });
//     // post to backend here
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-md">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Role & Permission</h1>

//       <div className="mb-6">
//         <label className="block text-gray-700 font-semibold mb-2">Role Name *</label>
//         <input
//           type="text"
//           value={roleName}
//           onChange={(e) => setRoleName(e.target.value)}
//           placeholder="Enter Role Name"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md"
//         />
//       </div>

//       <h2 className="text-xl font-semibold mb-4 text-gray-700">Permissions *</h2>

//       <div className="space-y-4">
//         {modules.map((module) => (
//           <div key={module.key} className="border border-gray-200 p-4 rounded">
//             <label className="font-medium text-gray-800 block mb-2">
//               {module.name}:
//             </label>
//             <div className="flex flex-wrap gap-4">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={
//                     permissions[module.key]?.length === actions.length
//                   }
//                   onChange={() => toggleAll(module.key)}
//                 />
//                 <span>All</span>
//               </label>
//               {actions.map((action) => (
//                 <label key={action} className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={permissions[module.key]?.includes(action) || false}
//                     onChange={() => togglePermission(module.key, action)}
//                   />
//                   <span>{action}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6">
//         <button
//           onClick={handleSubmit}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
//         >
//           Create Role
//         </button>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import axios from '@/lib/axios';
// import { toast } from 'react-toastify';

// // Type definitions
// interface Permission {
//     id: number;
//     name: string;
// }

// interface FormValues {
//     name: string;
//     permissionIds: number[];
// }

// const allPermissions: Permission[] = [
//     { id: 1, name: 'create_user' },
//     { id: 2, name: 'delete_user' },
//     { id: 3, name: 'update_user' },
//     { id: 4, name: 'view_user' },
//     { id: 9, name: 'role.view' },
//     { id: 10, name: 'role.create' },
//     { id: 11, name: 'role.update' },
//     { id: 12, name: 'role.delete' },
//     { id: 14, name: 'subadmin.view' },
//     { id: 15, name: 'subadmin.create' },
// ];

// export default function AddRolePage() {
//     const router = useRouter();

//     const handleSubmit = async (values: FormValues) => {
//         try {
//             await axios.post('/role', values);
//             toast.success('Role created successfully');
//             router.push('/dashboard/roles');
//         } catch (error: any) {
//             toast.error(error?.response?.data?.message || 'Error creating role');
//         }
//     };

//     return (
//         <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
//             <h2 className="text-xl font-bold mb-4 text-gray-800">Create Role</h2>

//             <Formik<FormValues>
//                 initialValues={{ name: '', permissionIds: [] }}
//                 validationSchema={Yup.object({
//                     name: Yup.string().required('Role name is required'),
//                     permissionIds: Yup.array()
//                         .of(Yup.number())
//                         .min(1, 'Select at least one permission'),
//                 })}
//                 onSubmit={handleSubmit}
//             >
//                 {({ values, setFieldValue }) => (
//                     <Form className="space-y-4">
//                         <div>
//                             <label className="font-semibold text-gray-400">
//                                 Role Name <span className="text-red-500">*</span>
//                             </label>
//                             <Field
//                                 name="name"
//                                 className="w-full mt-1 border p-2 rounded text-gray-400"
//                                 placeholder="Enter role name"
//                             />
//                             <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
//                         </div>

//                         <div>
//                             <label className="font-semibold text-gray-400">
//                                 Permissions <span className="text-red-500">*</span>
//                             </label>
//                             <div className="mt-2 grid grid-cols-2 gap-2 text-gray-400">
//                                 {allPermissions.map((perm) => (
//                                     <label key={perm.id} className="flex items-center gap-2 text-sm">
//                                         <input
//                                             type="checkbox"
//                                             checked={values.permissionIds.includes(perm.id)}
//                                             onChange={(e) => {
//                                                 const updated = e.target.checked
//                                                     ? [...values.permissionIds, perm.id]
//                                                     : values.permissionIds.filter((id) => id !== perm.id);
//                                                 setFieldValue('permissionIds', updated);
//                                             }}
//                                         />
//                                         {perm.name.replace(/_/g, ' ')}
//                                     </label>
//                                 ))}
//                             </div>
//                             <ErrorMessage
//                                 name="permissionIds"
//                                 component="div"
//                                 className="text-red-500 text-sm mt-1"
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                         >
//                             Create Role
//                         </button>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// }

// /dashboard/roles/add/page.tsx
import RoleForm from '@/components/RoleForm';
export default function AddRolePage() {
  return <RoleForm mode="add" />;
}
