import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const { data, loading, error, handleClearError } = useAnalytics();

  // Default static data as fallback
  const defaultBookingTrendsData = [
    { day: "Mon", bookings: 245 },
    { day: "Tue", bookings: 312 },
    { day: "Wed", bookings: 389 },
    { day: "Thu", bookings: 456 },
    { day: "Fri", bookings: 523 },
    { day: "Sat", bookings: 634 },
    { day: "Sun", bookings: 578 },
  ];

  const defaultPopularVehiclesData = [
    { vehicle: "Toyota", count: 89 },
    { vehicle: "Honda", count: 76 },
    { vehicle: "Yutong", count: 45 },
    { vehicle: "MAN", count: 32 },
    { vehicle: "Toyota Coaster", count: 23 },
  ];

  const defaultRevenueData = [
    { month: "Jan", revenue: 15000 },
    { month: "Feb", revenue: 18200 },
    { month: "Mar", revenue: 16800 },
    { month: "Apr", revenue: 22500 },
    { month: "May", revenue: 21800 },
    { month: "Jun", revenue: 25000 },
    { month: "Jul", revenue: 23200 },
    { month: "Aug", revenue: 27800 },
    { month: "Sep", revenue: 26500 },
    { month: "Oct", revenue: 29200 },
    { month: "Nov", revenue: 31500 },
    { month: "Dec", revenue: 34000 },
  ];

  // Use API data or fallback to static data
  const bookingTrendsData = data?.bookingTrends || defaultBookingTrendsData;
  const popularVehiclesData = data?.popularVehicles || defaultPopularVehiclesData;
  const revenueData = data?.revenueGrowth || defaultRevenueData;

  // Calculate stats based on selected period and available data
  const getUpdatedStats = () => {
    const multipliers = {
      today: 1,
      "last-week": 7.2,
      "last-month": 28.5,
      "last-year": 365,
    };
    const multiplier =
      multipliers[selectedPeriod as keyof typeof multipliers] || 1;

    // Use real data if available, otherwise use calculated values
    const totalBookings = data?.totalBookings || Math.round(1200 * multiplier);
    const totalVehicles = data?.totalVehicles || Math.round(150 * (multiplier * 0.1 + 0.9));
    const totalRevenue = data?.totalRevenue || Math.round(25000 * multiplier);

    return {
      bookings: totalBookings,
      vehicles: totalVehicles,
      revenue: totalRevenue,
    };
  };

  const stats = getUpdatedStats();

  // Loading state
  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">
              Track key performance indicators and trends for Swift Ride.
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Loading analytics data...</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">
              Track key performance indicators and trends for Swift Ride.
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center space-y-4 text-center">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Failed to load analytics data
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={handleClearError} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-2">
                Track key performance indicators and trends for Swift Ride.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {data && (
                <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  Live Data
                </span>
              )}
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Filter by Period */}
        <div className="mb-8">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="last-month">Last 1 Month</SelectItem>
              <SelectItem value="last-year">Last 1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Trends */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Booking Trends</CardTitle>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{stats.bookings.toLocaleString()}</div>
                <p className="text-sm text-gray-600">
                  {data ? "Real-time data" : "Sample data"} • {selectedPeriod}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookingTrendsData}>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                    />
                    <YAxis hide />
                    <Bar
                      dataKey="bookings"
                      fill="#E5E7EB"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Popular Vehicles */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Popular Vehicles</CardTitle>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{stats.vehicles.toLocaleString()}</div>
                <p className="text-sm text-gray-600">
                  {data ? "Real-time data" : "Sample data"} • {selectedPeriod}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularVehiclesData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">
                      {item.vehicle}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(item.count / 100) * 100}%`,
                            backgroundColor: "rgb(79, 158, 234)",
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Growth */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  PKR {stats.revenue.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">
                  {data ? "Real-time data" : "Sample data"} • {selectedPeriod}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#6B7280" }}
                    />
                    <YAxis hide />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="rgb(79, 158, 234)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Source Info */}
        {!data && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> Currently showing sample data. Connect to backend API to see real-time analytics.
              </p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Analytics;
