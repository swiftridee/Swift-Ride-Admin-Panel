import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../store/store";
import { loginAdmin, logout, clearAuthError } from "../store/slices/authSlice";
import { LoginCredentials } from "../types";
import { AppDispatch } from "../store/store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await dispatch(loginAdmin(credentials)).unwrap();
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  const handleClearError = () => {
    dispatch(clearAuthError());
  };

  // Only navigate on successful authentication
  useEffect(() => {
    if (isAuthenticated && !error && !loading) {
      // Only navigate if we're not already on the dashboard
      if (location.pathname === "/admin/login") {
        navigate("/admin/dashboard");
      }
    }
  }, [isAuthenticated, error, loading, navigate, location]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    handleClearError,
  };
};
