import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchDashboardStats } from "@/store/slices/dashboardSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { LineChart } from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

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
  const statistics = [
    {
      title: "Total Bookings",
      value: stats?.totalBookings || "0",
    },
    {
      title: "Total Vehicles",
      value: stats?.totalVehicles || "0",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || "0",
    },
    {
      title: "Total Revenue",
      value: `$${(stats?.revenue?.total || 0).toLocaleString()}`,
    },
  ];

  // Format vehicle types for chart data
  const vehicleTypeData = Object.entries(stats.vehicleTypes || {}).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Admin</h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with Swift Ride today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statistics.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue and Vehicle Types Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Revenue Summary</CardTitle>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  ${(stats?.revenue?.total || 0).toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">
                  Average Revenue per Booking: $
                  {(stats?.revenue?.average || 0).toLocaleString()}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vehicleTypeData}>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                    />
                    <YAxis hide />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Vehicle Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Available Vehicles</p>
                  <p className="text-sm text-gray-600">Ready for booking</p>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {stats?.availableVehicles || 0}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">Unavailable Vehicles</p>
                  <p className="text-sm text-gray-600">
                    Under maintenance or booked
                  </p>
                </div>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats?.unavailableVehicles || 0}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Vehicle Types</p>
                  <p className="text-sm text-gray-600">
                    Total categories:{" "}
                    {Object.keys(stats?.vehicleTypes || {}).length}
                  </p>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {stats?.totalVehicles || 0}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
