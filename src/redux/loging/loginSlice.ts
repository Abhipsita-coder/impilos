import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  user: {
    id: '',
    username: '',
  }
};

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
      fetchDataSuccess: (state, action) => {
        state.user = action.payload;
      }
    },
  });

export const { fetchDataSuccess } = userSlice.actions;

// Export reducer
export default userSlice.reducer;

// Export GET_USERS action type for use in saga
export const GET_USERS = 'userData/getUsers';