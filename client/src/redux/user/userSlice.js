import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      toast.success("Logged in Successfully!");
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      console.log("Payload received:", action.payload); // Debugging line
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      toast.success("User updated successfully!");
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      toast.error("User updation failed!");
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
