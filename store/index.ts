import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { courseApi } from "./services/courseApi";
import { bookApi } from "./services/bookApi";
import { userSlice } from "./features/users/userSlice";
import { baseApi } from "./services/baseApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer, // Add baseApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(courseApi.middleware)
      .concat(bookApi.middleware)
      .concat(userSlice.middleware)
      .concat(baseApi.middleware), // Add baseApi middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;