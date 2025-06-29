import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { UserState } from "../../types";

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  try {
    const response = await axiosInstance.get("/api/admin/users");
    return response.data.data || []; // Extract data array from response
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
});

export const updateUserStatus = createAsyncThunk(
  "users/updateStatus",
  async ({ id, status, name, cnic, gender }: { id: string; status: string; name?: string; cnic?: string; gender?: string }) => {
    try {
      const response = await axiosInstance.put(`/api/admin/users/${id}/details`, {
        status,
        name,
        cnic,
        gender,
      });
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    try {
      await axiosInstance.delete(`/api/admin/users/${id}`);
      return id;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any[]>) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      });
  },
});

export const { setUsers, clearError: clearUserError } = userSlice.actions;
export default userSlice.reducer;
