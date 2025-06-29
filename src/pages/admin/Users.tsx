import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/ui/data-table";
import { store } from "@/store/store";
import { fetchUsers, deleteUser, updateUserStatus } from "@/store/slices/userSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const UsersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    users = [],
    loading,
    error,
  } = useSelector((state: RootState) => state.users);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [form, setForm] = useState({ name: "", status: "", cnic: "", gender: "" });
  const [cnicError, setCnicError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (row: any) => {
    const id = row._id;
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteUser(id));
      dispatch(fetchUsers());
    }
  };

  const openUpdateModal = (user: any) => {
    setSelectedUser(user);
    setForm({
      name: user.name || "",
      status: user.status || "",
      cnic: user.cnic || "",
      gender: user.gender || "",
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    if (!/^[0-9]{13}$/.test(form.cnic)) {
      setCnicError("CNIC must be exactly 13 digits and numbers only.");
      return;
    } else {
      setCnicError("");
    }
    setIsUpdating(true);
    await dispatch(updateUserStatus({
      id: selectedUser._id,
      name: form.name,
      status: form.status,
      cnic: form.cnic,
      gender: form.gender,
    }));
    setIsUpdating(false);
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
    dispatch(fetchUsers());
  };

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
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
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
            onEdit={openUpdateModal}
            onDelete={handleDelete}
            pagination={{
              page: 1,
              pageSize: 10,
              totalPages: Math.ceil(users.length / 10),
              total: users.length,
              onPageChange: () => {},
            }}
          />
        </div>
        <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
          <DialogContent className="max-w-md w-full">
            <DialogHeader>
              <DialogTitle>Update User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CNIC</label>
                <input
                  type="text"
                  value={form.cnic}
                  onChange={e => {
                    // Only allow numbers
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setForm(f => ({ ...f, cnic: value }));
                  }}
                  maxLength={13}
                  className="w-full p-2 border rounded"
                  required
                />
                {cnicError && (
                  <p className="text-red-500 text-xs mt-1">{cnicError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  value={form.gender}
                  onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="flex items-center"><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>Updating...</span>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
