import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "homeSlice",
  initialState: {
    homes: [],
    selectedHomeDetails: {},
    loadingHomes: false,
    loadingSelectedHome: false
  },
  reducers: {
    initializeHomes: (state, data) => {
      state.homes = data.payload
    },
    updatedSelectedHome: (state, data) => {
      state.selectedHomeDetails = data.payload
    },
    setLoadingSelectedHome: (state, data) => {
      state.loadingSelectedHome = data.payload
    },
    setLoadingHomes: (state, data) => {
      state.loadingHomes = data.payload
    }
  }
});

export const { initializeHomes, updatedSelectedHome, setLoadingSelectedHome, setLoadingHomes } = homeSlice.actions;
export default homeSlice.reducer;
