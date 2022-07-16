import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import runReducer from '../features/runs/runSlice';
import fileReducer from '../features/files/fileSlice';
import detailsReducer from '../features/details/detailsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    runs: runReducer,
    files: fileReducer,
    details: detailsReducer,
  },
});
