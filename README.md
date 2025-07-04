# 🚗 Swift Ride Admin Panel

A comprehensive admin dashboard for managing vehicle rental services, bookings, users, and analytics. Built with modern web technologies for optimal performance and user experience.

![Swift Ride Admin Panel](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-orange)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Integration](#-api-integration)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 Authentication & Security
- **Secure Login/Logout** - JWT-based authentication
- **Password Recovery** - Forgot password functionality
- **Admin Registration** - Secure admin account creation
- **Protected Routes** - Role-based access control

### 📊 Dashboard & Analytics
- **Real-time Statistics** - Live booking, vehicle, and revenue data
- **Interactive Charts** - Booking trends, revenue growth, popular vehicles
- **Period Filtering** - Today, week, month, year views
- **Data Visualization** - Bar charts, line charts, progress indicators

### 🚗 Vehicle Management
- **Vehicle Catalog** - Complete vehicle inventory management
- **Vehicle Types** - Cars, Buses, Mini Buses, Coasters
- **Status Tracking** - Available, Booked, Maintenance
- **Rental Plans** - Flexible pricing for different durations
- **Location Management** - Pickup and drop-off locations

### 📅 Booking Management
- **Booking Overview** - All bookings in one place
- **Status Management** - Pending, Confirmed, Completed, Cancelled
- **Search & Filter** - Find bookings by customer, vehicle, or status
- **Driver Assignment** - Optional driver service management
- **Price Calculation** - Automatic pricing based on duration

### 👥 User Management
- **User Directory** - Complete user database
- **Role Management** - Admin and user roles
- **Status Control** - Active and blocked user states
- **User Analytics** - Growth and activity metrics

### 📱 Responsive Design
- **Mobile-First** - Optimized for all screen sizes
- **Modern UI** - Clean and intuitive interface
- **Dark/Light Mode** - Theme customization
- **Accessibility** - WCAG compliant design

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful component library

### State Management
- **Redux Toolkit** - Predictable state management
- **React Query** - Server state management
- **React Router** - Client-side routing

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Recharts** - Interactive charts and graphs
- **React Hook Form** - Form validation and handling

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Dashboard+View)

### Analytics
![Analytics](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Analytics+View)

### Vehicle Management
![Vehicles](https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Vehicle+Management)

### Booking Management
![Bookings](https://via.placeholder.com/800x400/EF4444/FFFFFF?text=Booking+Management)

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/swift-ride-admin-panel.git
   cd swift-ride-admin-panel
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   ```bash
   # Create .env file
   cp .env.example .env
   ```
   
   Add your environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_APP_NAME=Swift Ride Admin
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📖 Usage

### First Time Setup

1. **Access the application** at `http://localhost:5173`
2. **Register an admin account** using the signup form
3. **Login** with your credentials
4. **Start managing** your vehicle rental business

### Navigation

- **Dashboard** - Overview of key metrics and statistics
- **Analytics** - Detailed charts and performance insights
- **Vehicles** - Manage vehicle inventory and availability
- **Bookings** - Handle customer reservations and status
- **Users** - Manage customer accounts and admin users

### Key Features Usage

#### Analytics Dashboard
- Select different time periods (Today, Week, Month, Year)
- View real-time booking trends and revenue growth
- Analyze popular vehicles and customer preferences

#### Vehicle Management
- Add new vehicles with detailed specifications
- Set rental plans and pricing
- Track vehicle availability and maintenance status
- Manage pickup and drop-off locations

#### Booking Management
- View all bookings with search and filter options
- Update booking status (Pending → Confirmed → Completed)
- Handle driver assignments and special requests
- Process cancellations and refunds

## 🔌 API Integration

### Backend Requirements

The admin panel expects a RESTful API with the following endpoints:

#### Authentication
```
POST /api/admin/login
POST /api/admin/signup
POST /api/admin/forgot-password
POST /api/admin/logout
```

#### Dashboard & Analytics
```
GET /api/admin/stats
GET /api/admin/analytics
```

#### Vehicle Management
```
GET /api/admin/vehicles
POST /api/admin/vehicles
PUT /api/admin/vehicles/:id
DELETE /api/admin/vehicles/:id
```

#### Booking Management
```
GET /api/admin/bookings
PUT /api/admin/bookings/:id
DELETE /api/admin/bookings/:id
```

#### User Management
```
GET /api/admin/users
PUT /api/admin/users/:id
DELETE /api/admin/users/:id
```

### API Response Format

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   └── ui/             # Generic UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   └── admin/          # Admin pages
├── store/              # Redux store configuration
│   └── slices/         # Redux slices
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── lib/                # Library configurations
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy Options

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

#### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables

#### Traditional Hosting
1. Build the project: `npm run build`
2. Upload `dist` folder to your web server
3. Configure server to serve `index.html` for all routes

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- **Email**: support@swiftride.com
- **Documentation**: [docs.swiftride.com](https://docs.swiftride.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/swift-ride-admin-panel/issues)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Recharts](https://recharts.org/) for data visualization
- [Lucide](https://lucide.dev/) for icons

---

**Made with ❤️ for the Swift Ride team**
