import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAnalytics,
  clearAnalyticsError,
} from "../store/slices/analyticsSlice";
import { RootState } from "../store/store";

export const useAnalytics = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const handleClearError = () => {
    dispatch(clearAnalyticsError());
  };

  return {
    data,
    loading,
    error,
    handleClearError,
  };
};
