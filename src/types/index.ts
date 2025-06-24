export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "blocked";
  createdAt: string;
}

export interface Booking {
  bookingId: string;
  userName: string;
  vehicle: string;
  rentalPlan: string;
  startDate: string;
  endDate: string;
  includeDriver: string;
  price: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  pickupLocation: string;
  dropLocation: string;
}

export interface DashboardStats {
  bookings: {
    today: number;
    percentageChange: string;
  };
  vehicles: {
    total: number;
    newThisWeek: number;
  };
  users: {
    total: number;
    growthThisMonth: string;
  };
  revenue: {
    today: number;
    monthly: number;
    overall: number;
  };
}

export interface Analytics {
  bookingTrends: {
    date: string;
    count: number;
  }[];
  popularVehicles: {
    vehicleId: string;
    name: string;
    count: number;
  }[];
  revenueGrowth: {
    month: string;
    revenue: number;
  }[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface DashboardState {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

export interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface AnalyticsState {
  data: any;
  loading: boolean;
  error: string | null;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export interface Vehicle {
  _id: string;
  name: string;
  brand: string;
  vehicleType: "Car" | "Bus" | "Mini Bus" | "Coaster";
  seats: number;
  features: string[];
  image: string;
  status: "Available" | "Booked" | "Maintenance";
  rentalPlan: {
    basePrice: number;
    driverPrice?: number;
  };
  location: string;
  createdAt: string;
}

export interface VehicleState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
}
