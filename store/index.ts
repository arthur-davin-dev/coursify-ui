import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { courseApi } from './services/courseApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [courseApi.reducerPath]: courseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;