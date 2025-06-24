import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, ChevronDown } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Bookings", href: "/admin/bookings" },
    { name: "Vehicles", href: "/admin/vehicles" },
    { name: "Users", href: "/admin/users" },
    // { name: "Analytics", href: "/admin/analytics" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden relative shrink-0"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <div className="flex flex-col py-4">
                    <div className="px-6 py-2 mb-4">
                      <Link to="/admin/dashboard" className="flex items-center">
                        <span className="text-xl font-normal">
                          <span style={{ color: "rgb(79, 158, 234)" }}>
                            Swift
                          </span>
                          <span style={{ color: "rgb(255, 114, 94)" }}>
                            Ride
                          </span>
                        </span>
                      </Link>
                    </div>
                    <div className="px-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                            isActive(item.href)
                              ? "text-blue-700 bg-blue-50"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Link to="/admin/dashboard" className="flex items-center">
                <span className="text-xl font-normal">
                  <span style={{ color: "rgb(79, 158, 234)" }}>Swift</span>
                  <span style={{ color: "rgb(255, 114, 94)" }}>Ride</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-blue-700 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Admin Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-9 px-2 hover:bg-gray-100"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback
                      style={{ backgroundColor: "rgb(79, 158, 234)" }}
                      className="text-white text-sm"
                    >
                      A
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 mt-2 p-1.5 bg-white border border-gray-200"
                align="end"
              >
                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center px-3 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md cursor-pointer transition-colors"
                >
                  <LogOut className="mr-2.5 h-4 w-4" />
                  <span className="font-medium">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;
