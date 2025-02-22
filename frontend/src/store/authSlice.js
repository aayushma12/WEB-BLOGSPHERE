import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  userData: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      localStorage.removeItem('blogData');
      localStorage.removeItem('userData');
    },
    deleteProfile: (state) => {
      state.status = false;
      state.userData = null;
      localStorage.removeItem('blogData');
      localStorage.removeItem('userData');
    },
    updateProfile: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
      localStorage.setItem('userData', JSON.stringify(state.userData));
    }
  }
});

export const { login, logout, deleteProfile, updateProfile } = authSlice.actions;
export default authSlice.reducer;