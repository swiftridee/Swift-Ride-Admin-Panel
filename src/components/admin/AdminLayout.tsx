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
import { LogOut, ChevronDown, User } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Bookings", href: "/admin/bookings" },
    { name: "Vehicles", href: "/admin/vehicles" },
    { name: "Users", href: "/admin/users" },
    { name: "Analytics", href: "/admin/analytics" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-center h-20 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/admin/dashboard" className="flex items-center">
                <span className="text-3xl font-bold">
                  <span style={{ color: "rgb(79, 158, 234)" }}>Swift</span>
                  <span style={{ color: "rgb(255, 114, 94)" }}>Ride</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-blue-700 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Admin Profile - Desktop */}
            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 h-12 px-4 hover:bg-gray-100"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback
                        style={{ backgroundColor: "rgb(79, 158, 234)" }}
                        className="text-white text-lg"
                      >
                        A
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
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

            {/* Mobile Profile Menu */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative shrink-0"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback
                        style={{ backgroundColor: "rgb(79, 158, 234)" }}
                        className="text-white text-lg"
                      >
                        A
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="px-6 py-6 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback
                            style={{ backgroundColor: "rgb(79, 158, 234)" }}
                            className="text-white text-xl"
                          >
                            A
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Admin</h3>
                          <p className="text-sm text-gray-500">Administrator</p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 px-4 py-4">
                      <nav className="space-y-2">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                              isActive(item.href)
                                ? "text-blue-700 bg-blue-50"
                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </nav>
                    </div>

                    {/* Logout Section */}
                    <div className="px-4 py-4 border-t border-gray-200">
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;
