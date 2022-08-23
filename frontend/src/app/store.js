import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import taskReducer from '../features/tasks/taskSlice';
import fileReducer from '../features/files/fileSlice';
import detailsReducer from '../features/details/detailsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    files: fileReducer,
    details: detailsReducer,
  },
});
