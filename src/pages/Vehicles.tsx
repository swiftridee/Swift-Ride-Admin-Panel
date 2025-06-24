import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Vehicles = () => {
  const [selectedBrand, setSelectedBrand] = useState("all");

  const vehicles = [
    {
      brand: "Toyota",
      vehicleType: "Car",
      rentalPlans: (
        <div className="space-y-1">
          <div>12 Hour: PKR 5,000-6,500</div>
          <div>2 Day: PKR 9,500-12,500</div>
          <div>3 Day: PKR 14,000-18,000</div>
          <div>1 Week: PKR 28,000-36,000</div>
        </div>
      ),
      status: "Available",
    },
    {
      brand: "Honda",
      vehicleType: "Car",
      rentalPlans: (
        <div className="space-y-1">
          <div>12 Hour: PKR 5,000-6,500</div>
          <div>2 Day: PKR 9,500-12,500</div>
        </div>
      ),
      status: "Unavailable",
    },
    {
      brand: "Yutong",
      vehicleType: "Mini Bus",
      rentalPlans: (
        <div className="space-y-1">
          <div>12 Hour: PKR 17,000-19,500</div>
          <div>2 Day: PKR 32,000-36,000</div>
          <div>3 Day: PKR 46,000-51,000</div>
          <div>1 Week: PKR 90,000-99,000</div>
        </div>
      ),
      status: "Available",
    },
    {
      brand: "MAN",
      vehicleType: "Bus",
      rentalPlans: (
        <div className="space-y-1">
          <div>12 Hour: PKR 25,000-29,000</div>
          <div>2 Day: PKR 48,000-56,000</div>
          <div>3 Day: PKR 70,000-81,000</div>
          <div>1 Week: PKR 130,000-144,000</div>
        </div>
      ),
      status: "Available",
    },
    {
      brand: "Toyota Coaster",
      vehicleType: "Coaster",
      rentalPlans: (
        <div className="space-y-1">
          <div>12 Hour: PKR 12,000-14,500</div>
          <div>2 Day: PKR 22,500-26,500</div>
        </div>
      ),
      status: "Unavailable",
    },
    {
      brand: "Hyundai",
      vehicleType: "Car",
      rentalPlans: (
        <div className="space-y-1">
          <div>12 Hour: PKR 5,000-6,500</div>
          <div>3 Day: PKR 14,000-18,000</div>
        </div>
      ),
      status: "Available",
    },
  ];

  const filteredVehicles =
    selectedBrand === "all"
      ? vehicles
      : vehicles.filter((vehicle) =>
          vehicle.brand.toLowerCase().includes(selectedBrand.toLowerCase())
        );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Available
          </Badge>
        );
      case "Unavailable":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Unavailable
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Vehicle</h1>
          <p className="text-gray-600 mt-2">
            View and manage all vehicles in the fleet
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="hyundai">Hyundai</SelectItem>
              <SelectItem value="man">MAN</SelectItem>
              <SelectItem value="yutong">Yutong</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>All Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>Vehicle Type</TableHead>
                  <TableHead>Rental Plans</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {vehicle.brand}
                    </TableCell>
                    <TableCell className="text-blue-600">
                      {vehicle.vehicleType}
                    </TableCell>
                    <TableCell className="text-blue-600 text-sm">
                      {vehicle.rentalPlans}
                    </TableCell>
                    <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Vehicles;
