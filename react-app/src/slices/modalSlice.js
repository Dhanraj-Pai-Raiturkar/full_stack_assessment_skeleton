import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    show: false
  },
  reducers: {
    showModal: (state, data) => {
      state.show = data.payload
    } 
  }
});

export const { showModal } = modalSlice.actions;
export default modalSlice.reducer;
