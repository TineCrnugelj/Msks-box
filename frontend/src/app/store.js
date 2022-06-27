import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import runReducer from '../features/runs/runSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    runs: runReducer
  },
});
