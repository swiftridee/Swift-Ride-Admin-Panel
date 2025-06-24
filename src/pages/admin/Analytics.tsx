import React, { useState } from "react";
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

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const bookingTrendsData = [
    { day: "Mon", bookings: 245 },
    { day: "Tue", bookings: 312 },
    { day: "Wed", bookings: 389 },
    { day: "Thu", bookings: 456 },
    { day: "Fri", bookings: 523 },
    { day: "Sat", bookings: 634 },
    { day: "Sun", bookings: 578 },
  ];

  const popularVehiclesData = [
    { vehicle: "Toyota", count: 89 },
    { vehicle: "Honda", count: 76 },
    { vehicle: "Yutong", count: 45 },
    { vehicle: "MAN", count: 32 },
    { vehicle: "Toyota Coaster", count: 23 },
  ];

  const revenueData = [
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

  // Update data based on selected period
  const getUpdatedStats = () => {
    const multipliers = {
      today: 1,
      "last-week": 7.2,
      "last-month": 28.5,
      "last-year": 365,
    };
    const multiplier =
      multipliers[selectedPeriod as keyof typeof multipliers] || 1;

    return {
      bookings: Math.round(1200 * multiplier),
      vehicles: Math.round(150 * (multiplier * 0.1 + 0.9)),
      revenue: Math.round(25000 * multiplier),
    };
  };

  const stats = getUpdatedStats();

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">
            Track key performance indicators and trends for Swift Ride.
          </p>
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
                <div className="text-2xl font-bold">{stats.bookings}</div>
                {/* <p className="text-sm text-gray-600">
                  Selected Period <span className="text-green-600">+15%</span>
                </p> */}
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
                <div className="text-2xl font-bold">{stats.vehicles}</div>
                {/* <p className="text-sm text-gray-600">
                  Selected Period <span className="text-green-600">+10%</span>
                </p> */}
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
                {/* <p className="text-sm text-gray-600">
                  Selected Period <span className="text-green-600">+20%</span>
                </p> */}
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
      </div>
    </AdminLayout>
  );
};

export default Analytics;
