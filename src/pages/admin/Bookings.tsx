import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/ui/data-table";
import { store } from "@/store/store";
import { fetchBookings } from "@/store/slices/bookingSlice";

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

interface Booking {
  bookingId: string;
  userName: string;
  vehicle: string;
  rentalPlan: string;
  startDate: string;
  endDate: string;
  includeDriver: string;
  price: number;
  status: string;
  pickupLocation: string;
  dropLocation: string;
}

const BookingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    bookings = [],
    loading,
    error,
  } = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const columns = [
    {
      header: "Booking ID",
      accessorKey: "bookingId",
    },
    {
      header: "Customer",
      accessorKey: "userName",
    },
    {
      header: "Vehicle",
      accessorKey: "vehicle",
    },
    {
      header: "Pickup Date",
      accessorKey: "startDate",
    },
    {
      header: "Return Date",
      accessorKey: "endDate",
    },
    {
      header: "Driver",
      accessorKey: "includeDriver",
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ getValue }: { getValue: () => number }) =>
        `PKR ${getValue().toLocaleString()}`,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }: { getValue: () => string }) => {
        const status = getValue();
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
              status === "confirmed"
                ? "bg-green-100 text-green-800"
                : status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : status === "cancelled"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Pickup Location",
      accessorKey: "pickupLocation",
    },
    {
      header: "Drop Location",
      accessorKey: "dropLocation",
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[calc(100vh-4rem)] text-red-500">
          Error: {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Manage Bookings</h1>
          <p className="text-gray-600">View and manage all vehicle bookings</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <DataTable columns={columns} data={bookings} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookingsPage;
