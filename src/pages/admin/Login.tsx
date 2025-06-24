import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const AdminLogin = () => {
  const { login, loading, error, handleClearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!loading) {
      await login({ email, password });
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <span
              className="text-2xl font-normal"
              style={{ fontSize: "24px", lineHeight: "32px" }}
            >
              <span style={{ color: "rgb(79, 158, 234)" }}>Swift</span>
              <span style={{ color: "rgb(255, 114, 94)" }}>Ride</span>
            </span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Admin Login
          </CardTitle>
          <p className="text-gray-600">Sign in to your admin account</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <div
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
                <button
                  type="button"
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={handleClearError}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="text-right">
              <Link
                to="/admin/forgot-password"
                className="text-sm hover:underline"
                style={{ color: "rgb(79, 158, 234)" }}
              >
                Forgot password?
              </Link>
            </div>
            <Button
              type="button"
              className="w-full text-white hover:opacity-90"
              style={{ backgroundColor: "rgb(79, 158, 234)" }}
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
          <div className="mt-6 text-center">
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Don't have an account?{" "}
              <Link
                to="/admin/signup"
                className="hover:underline"
                style={{ color: "rgb(79, 158, 234)" }}
              >
                Sign up here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
