import { createSlice } from '@reduxjs/toolkit';
// Define the initial state
const initialState = {
  workSpaceList: [],
  dashboardList: [],
  powerBiCredentials: {},
};

export const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    fetchWorkSpaceListSuccess: (state, action) => {
      state.workSpaceList = action.payload;
    },
    fetchDashboardListSuccess: (state, action) => {
      state.dashboardList = action.payload;
    },
    fetchPowerBiCredentialSuccess: (state, action) => {
      state.powerBiCredentials = action.payload;
    },
  },
});

export const {
  fetchWorkSpaceListSuccess,
  fetchDashboardListSuccess,
  fetchPowerBiCredentialSuccess,
} = previewSlice.actions;

// Export reducer
export default previewSlice.reducer;
