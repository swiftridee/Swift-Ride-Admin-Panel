import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  fetchUsers,
  updateUserStatus,
  clearUserError,
} from "../store/slices/userSlice";

export const useUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUpdateStatus = async (
    userId: string,
    status: "active" | "blocked"
  ) => {
    try {
      await dispatch(updateUserStatus({ userId, status }));
    } catch (err) {
      console.error("Update user status error:", err);
    }
  };

  const handleClearError = () => {
    dispatch(clearUserError());
  };

  return {
    users,
    loading,
    error,
    handleUpdateStatus,
    handleClearError,
  };
};
