# Swift-Ride-Admin-Panel

## Overview
Swift-Ride-Admin-Panel is a modern admin dashboard for managing the Swift Ride platform. It provides a comprehensive interface for administrators to manage users, vehicles, bookings, analytics, and more.

---

## Tech Stack

- **Frontend Framework:** React 18 (with TypeScript)
- **Build Tool:** Vite
- **UI Library:** shadcn-ui (built on top of Radix UI)
- **Styling:** Tailwind CSS, PostCSS, CSS Modules
- **State Management:** Redux Toolkit
- **Data Fetching:** React Query (TanStack Query)
- **Form Handling:** React Hook Form, Zod (validation)
- **Charts & Analytics:** Recharts
- **Routing:** React Router DOM v6
- **Other Libraries:**  
  - Axios (API requests)
  - Lucide React (icons)
  - Embla Carousel (carousels)
  - Date-fns (date utilities)
  - Sonner (notifications/toasts)
  - Radix UI Primitives (dialogs, popovers, etc.)

---

## Features & Pages

### Public Pages
- **Login (`/admin/login`):**  
  Secure login for admin users with form validation and error handling.
- **Signup (`/admin/signup`):**  
  Register new admin users (if enabled).
- **Forgot Password (`/admin/forgot-password`):**  
  Password reset workflow for admins.

### Protected Admin Pages
- **Dashboard (`/admin/dashboard`):**  
  Overview of platform statistics: total vehicles, available/unavailable vehicles, total users, total bookings, revenue, and vehicle types.  
  Visual charts and quick stats for at-a-glance management.

- **Bookings (`/admin/bookings`):**  
  View, filter, and manage all ride bookings.  
  Update booking status, see booking details, and manage user/vehicle assignments.

- **Vehicles (`/admin/vehicles`):**  
  Manage the entire vehicle fleet.  
  - Add, edit, or delete vehicles
  - Set vehicle status (available/unavailable)
  - Assign brands, types, locations, seats, features, images, and rental plans
  - Enable/disable driver options and set pricing for different durations

- **Users (`/admin/users`):**  
  Manage all users on the platform.  
  - View user details
  - Block/unblock users
  - See booking history and user status

- **Analytics (`/admin/analytics`):**  
  Visualize platform data with interactive charts.  
  - Booking trends (daily, weekly, monthly, yearly)
  - Popular vehicles
  - Revenue analytics

- **404 Not Found:**  
  Custom error page for undefined routes.

---

## UI Components

- **Reusable UI:**  
  Cards, tables, dialogs, popovers, tooltips, accordions, tabs, carousels, toasts, and more.
- **Sidebar Navigation:**  
  Responsive sidebar for easy navigation between admin sections.
- **Dark Mode:**  
  Fully supported via Tailwind and shadcn-ui.

---

## Getting Started

```sh
# Clone the repository
git clone https://github.com/swiftridee/Swift-Ride-Admin-Panel.git
cd Swift-Ride-Admin-Panel

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## Folder Structure

```
src/
  components/    # Reusable UI components
  hooks/         # Custom React hooks
  lib/           # Utility functions
  pages/         # Page components (admin and public)
  store/         # Redux slices and store
  types/         # TypeScript types
  utils/         # API utilities (e.g., axios)
  index.css      # Tailwind and global styles
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License.
