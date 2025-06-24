import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardStats,
  clearDashboardError,
} from "../store/slices/dashboardSlice";
import { RootState } from "../store/store";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const handleClearError = () => {
    dispatch(clearDashboardError());
  };

  return {
    stats,
    loading,
    error,
    handleClearError,
  };
};
