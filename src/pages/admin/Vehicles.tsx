import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable, StatusBadge } from "@/components/ui/data-table";
import { store } from "@/store/store";
import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "@/store/slices/vehicleSlice";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Alert } from "@/components/ui/alert";

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const RENTAL_DURATIONS = ["12 Hour", "2 Day", "3 Day", "1 Week"] as const;
type RentalDuration = (typeof RENTAL_DURATIONS)[number];

interface RentalPlan {
  basePrice: number;
  driverFeeEnabled: boolean;
}

const VEHICLE_BRANDS = [
  "Toyota",
  "Honda",
  "Yutong",
  "MAN",
  "Hyundai",
  "Suzuki",
  "Nissan",
  "Mercedes-Benz",
  "Volkswagen",
  "BMW",
  "Audi",
  "Lexus",
  "Mitsubishi",
  "Isuzu",
  "Hino",
] as const;

const PUNJAB_CITIES = [
  "Lahore",
  "Faisalabad",
  "Rawalpindi",
  "Multan",
  "Gujranwala",
  "Sialkot",
  "Bahawalpur",
  "Sargodha",
  "Sahiwal",
  "Jhang",
  "Sheikhupura",
  "Kasur",
] as const;

const VEHICLE_FEATURES = [
  "Sunroof",
  "Leather Seats",
  "GPS Navigation",
  "Bluetooth",
  "Child Seat",
  "Heated Seats",
  "Reverse Camera",
  "Air Conditioning",
  "Cruise Control",
] as const;

const vehicleSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Vehicle name is required"),
  brand: z.string().min(1, "Brand is required"),
  vehicleType: z.enum(["Car", "Mini Bus", "Bus", "Coaster"]),
  location: z.enum(PUNJAB_CITIES),
  seats: z
    .number()
    .min(1, "Number of seats must be at least 1")
    .max(100, "Number of seats cannot exceed 100"),
  features: z.array(z.enum(VEHICLE_FEATURES)),
  image: z.string().min(1, "Vehicle image is required"),
  status: z.enum(["Available", "Unavailable"]),
  rentalPlan: z.object({
    basePrice: z.number().min(0, "Base price must be positive"),
    driverFeeEnabled: z.boolean(),
  }),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

const VehiclesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    vehicles = [],
    loading,
    error,
    pagination,
    filters,
  } = useSelector((state: RootState) => state.vehicles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VehicleFormData>({
    defaultValues: {
      name: "",
      brand: "",
      vehicleType: "Car",
      location: "Lahore",
      seats: 4,
      features: [],
      image: "",
      status: "Available",
      rentalPlan: {
        basePrice: 0,
        driverFeeEnabled: false,
      },
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        if (file.size > 5 * 1024 * 1024) {
          // 5MB limit
          alert("Image size should be less than 5MB");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setValue("image", base64String);
          setImagePreview(base64String);
        };
        reader.onerror = () => {
          console.error("Error reading file");
          alert("Error reading file. Please try again.");
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error processing image:", error);
        alert("Error processing image. Please try again.");
      }
    }
  };

  useEffect(() => {
    dispatch(
      getVehicles({
        page: pagination.page,
        limit: pagination.limit,
        filters: filters,
      })
    );
  }, [dispatch, pagination.page, pagination.limit, filters]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "features") {
        console.log("Features updated:", value.features);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Brand",
      accessorKey: "brand",
    },
    {
      header: "Type",
      accessorKey: "vehicleType",
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Seats",
      accessorKey: "seats",
    },
    {
      header: "Features",
      accessorKey: "features",
      cell: ({ getValue }) => {
        const features = getValue() as string[];
        return (
          <div className="flex flex-wrap gap-1">
            {features?.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
              >
                {feature}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ getValue }) => {
        const image = getValue() as string;
        return (
          <div className="w-16 h-16">
            <img
              src={image}
              alt="Vehicle"
              className="w-full h-full object-cover rounded"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
                target.alt = "Vehicle image not available";
              }}
            />
          </div>
        );
      },
    },
    {
      header: "Base Price (12h)",
      accessorKey: "rentalPlan",
      cell: ({ getValue }) => {
        const rentalPlan = getValue() as RentalPlan;
        if (!rentalPlan) return null;

        return (
          <div className="space-y-1 text-sm">
            <div>PKR {rentalPlan.basePrice?.toLocaleString() || 0}</div>
            <div className="text-xs text-gray-500">
              {rentalPlan.driverFeeEnabled
                ? "Driver Available (+2,000/12h)"
                : "No Driver Available"}
            </div>
            <div className="text-xs text-gray-500">
              24h: PKR {((rentalPlan.basePrice || 0) * 2).toLocaleString()}
              {rentalPlan.driverFeeEnabled &&
                ` (+${(2000 * 2).toLocaleString()})`}
            </div>
            <div className="text-xs text-gray-500">
              48h: PKR {((rentalPlan.basePrice || 0) * 4).toLocaleString()}
              {rentalPlan.driverFeeEnabled &&
                ` (+${(2000 * 4).toLocaleString()})`}
            </div>
          </div>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return <StatusBadge status={status} />;
      },
    },
  ];

  const onSubmit = async (data: VehicleFormData) => {
    try {
      const vehicleData = {
        name: data.name,
        brand: data.brand,
        vehicleType: data.vehicleType,
        location: data.location,
        seats: data.seats,
        features: data.features,
        image: data.image,
        status: data.status,
        rentalPlan: {
          basePrice: data?.rentalPlan?.basePrice || 0,
          driverFeeEnabled: data?.rentalPlan?.driverFeeEnabled || false,
        },
      };

      if (data._id) {
        await dispatch(
          updateVehicle({
            id: data._id,
            vehicleData,
          })
        );
      } else {
        await dispatch(createVehicle(vehicleData));
      }
      setIsDialogOpen(false);
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (vehicle: VehicleFormData & { _id: string }) => {
    reset(vehicle);
    setImagePreview(vehicle.image);
    setIsDialogOpen(true);
  };

  const handleDelete = async (vehicle: VehicleFormData & { _id: string }) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      await dispatch(deleteVehicle(vehicle._id!));
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(
      getVehicles({
        page,
        limit: pagination.limit,
        filters,
      })
    );
  };

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
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Vehicles Management</h1>
            <p className="text-gray-600">View and manage all vehicles</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  reset();
                  setImagePreview(null);
                }}
              >
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {watch("_id", "") ? "Edit Vehicle" : "Add New Vehicle"}
                </DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col min-w-0 space-y-6"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label>Name</label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <input
                            {...field}
                            className="w-full p-2 border rounded"
                            placeholder="e.g., Toyota Camry 2022"
                          />
                          {errors.name && (
                            <p className="text-sm text-red-500">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>Brand</label>
                    <Controller
                      name="brand"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                            <SelectContent>
                              {VEHICLE_BRANDS.map((brand) => (
                                <SelectItem key={brand} value={brand}>
                                  {brand}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.brand && (
                            <p className="text-sm text-red-500">
                              {errors.brand.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>Vehicle Type</label>
                    <Controller
                      name="vehicleType"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Car">Car</SelectItem>
                              <SelectItem value="Mini Bus">Mini Bus</SelectItem>
                              <SelectItem value="Bus">Bus</SelectItem>
                              <SelectItem value="Coaster">Coaster</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.vehicleType && (
                            <p className="text-sm text-red-500">
                              {errors.vehicleType.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>Location</label>
                    <Controller
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {PUNJAB_CITIES.map((city) => (
                                <SelectItem key={city} value={city}>
                                  {city}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.location && (
                            <p className="text-sm text-red-500">
                              {errors.location.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>Number of Seats</label>
                    <Controller
                      name="seats"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                            min="1"
                            className="w-full p-2 border rounded"
                          />
                          {errors.seats && (
                            <p className="text-sm text-red-500">
                              {errors.seats.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>Status</label>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Available">
                                Available
                              </SelectItem>
                              <SelectItem value="Unavailable">
                                Unavailable
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.status && (
                            <p className="text-sm text-red-500">
                              {errors.status.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label>Features</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Controller
                      name="features"
                      control={control}
                      render={({ field }) => (
                        <>
                          {VEHICLE_FEATURES.map((feature) => (
                            <label
                              key={feature}
                              className="flex items-center space-x-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={field.value.includes(feature)}
                                onChange={(e) => {
                                  const newFeatures = e.target.checked
                                    ? [...field.value, feature]
                                    : field.value.filter((f) => f !== feature);
                                  field.onChange(newFeatures);
                                }}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span>{feature}</span>
                            </label>
                          ))}
                          {errors.features && (
                            <p className="text-sm text-red-500 col-span-3">
                              {errors.features.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Rental Plan</h3>
                  <div className="space-y-4 p-4 border rounded">
                    <div className="space-y-2">
                      <label>Base Price (12 hours)</label>
                      <Controller
                        name="rentalPlan.basePrice"
                        control={control}
                        render={({ field }) => (
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">PKR</span>
                              <input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            {errors.rentalPlan?.basePrice && (
                              <p className="text-sm text-red-500">
                                {errors.rentalPlan?.basePrice?.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <Controller
                          name="rentalPlan.driverFeeEnabled"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="rounded border-gray-300"
                            />
                          )}
                        />
                        Enable Driver Option (+PKR 2,000 per 12 hours)
                      </label>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>Sample Rates:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          24 hours: PKR {watch("rentalPlan.basePrice") * 2 || 0}
                        </li>
                        <li>
                          48 hours: PKR {watch("rentalPlan.basePrice") * 4 || 0}
                        </li>
                        <li>
                          1 week: PKR {watch("rentalPlan.basePrice") * 14 || 0}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label>Vehicle Image</label>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full p-2 border rounded"
                        />
                        {imagePreview && (
                          <div className="mt-2">
                            <img
                              src={imagePreview}
                              alt="Vehicle preview"
                              className="max-w-[200px] h-auto rounded"
                            />
                          </div>
                        )}
                        {errors.image && (
                          <p className="text-sm text-red-500">
                            {errors.image.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit">
                    {watch("_id", "") ? "Update Vehicle" : "Add Vehicle"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}

        <div className="bg-white rounded-lg shadow">
          <DataTable
            columns={columns}
            data={vehicles}
            onEdit={handleEdit}
            onDelete={handleDelete}
            pagination={{
              page: pagination.page,
              pageSize: pagination.limit,
              totalPages: pagination.totalPages,
              total: pagination.total,
              onPageChange: handlePageChange,
            }}
            loading={loading}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default VehiclesPage;
