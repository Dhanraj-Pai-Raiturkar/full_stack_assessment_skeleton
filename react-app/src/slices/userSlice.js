import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    selectedUser: "",
    users: [],
    loadingUsers: false,
    homeUsers: []
  },
  reducers: {
    initializeUsers: (state, data) => {
        state.users = data.payload
    },
    updateSelectedUser: (state, data) => {
        state.selectedUser = data.payload
    },
    updateHomeUsers: (state, data) => {
        state.homeUsers = data.payload
    }
  },
});

export const { initializeUsers, updateSelectedUser, updateHomeUsers } = userSlice.actions;
export default userSlice.reducer;
