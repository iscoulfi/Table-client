import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import tableSlice from './slices/tableSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    table: tableSlice,
  },
});
