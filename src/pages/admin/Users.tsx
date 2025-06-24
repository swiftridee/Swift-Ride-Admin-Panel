import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/ui/data-table";
import { store } from "@/store/store";
import { fetchUsers } from "@/store/slices/userSlice";

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const UsersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    users = [],
    loading,
    error,
  } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "City",
      accessorKey: "city",
    },
    {
      header: "Gender",
      accessorKey: "gender",
      cell: ({ getValue }) => {
        const value = getValue() as string | null;
        return value ? value.charAt(0).toUpperCase() + value.slice(1) : "N/A";
      },
    },
    {
      header: "CNIC",
      accessorKey: "cnic",
      cell: ({ getValue }) => {
        const value = getValue() as string | null;
        return value || "N/A";
      },
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return <span className="capitalize">{value}</span>;
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              value === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return new Date(value).toLocaleDateString();
      },
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-screen">
          Loading users...
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-screen text-red-500">
          Error: {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Users Management</h1>
          <p className="text-gray-600">View and manage all users</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <DataTable
            columns={columns}
            data={users}
            pagination={{
              page: 1,
              pageSize: 10,
              totalPages: Math.ceil(users.length / 10),
              total: users.length,
              onPageChange: () => {},
            }}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
