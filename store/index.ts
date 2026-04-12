// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import { courseApi } from "./services/courseApi";
// import { bookApi } from "./services/bookApi";
// import { userSlice } from "./features/users/userSlice";
// import { baseApi } from "./services/baseApi";
// import { categoriesApi } from "./features/categories/categoriesApi";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     [courseApi.reducerPath]: courseApi.reducer,
//     [bookApi.reducerPath]: bookApi.reducer,
//     [userSlice.reducerPath]: userSlice.reducer,
//     [baseApi.reducerPath]: baseApi.reducer, // Add baseApi reducer
//     [categoriesApi.reducerPath]: categoriesApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(courseApi.middleware)
//       .concat(bookApi.middleware)
//       .concat(userSlice.middleware)
//       .concat(baseApi.middleware)
//       .concat(categoriesApi.middleware), 
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;



import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { baseApi } from "./services/baseApi";

// ✅ No need to import courseApi, bookApi, etc.
// injectEndpoints registers them automatically when the file is imported
import "./services/courseApi";
import "./services/bookApi";
import "./features/categories/categoriesApi";
import "./features/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer, // ✅ one reducer for everything
  },
  middleware: (gDM) =>
    gDM().concat(baseApi.middleware), // ✅ one middleware for everything
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;