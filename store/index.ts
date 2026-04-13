import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { baseApi } from "./services/baseApi";

// ✅ All injected into baseApi — token auto-sent
import "./services/courseApi";
import "./services/bookApi";
import "./services/lessonsApi";  // ← ADD THIS
import "./features/categories/categoriesApi";
import "./features/users/userSlice";
import "./services/dashboardApi"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (gDM) => gDM().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import { baseApi } from "./services/baseApi";

// // ✅ No need to import courseApi, bookApi, etc.
// // injectEndpoints registers them automatically when the file is imported
// import "./services/courseApi";
// import "./services/bookApi";
// import "./features/categories/categoriesApi";
// import "./features/users/userSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     [baseApi.reducerPath]: baseApi.reducer, // ✅ one reducer for everything
//   },
//   middleware: (gDM) =>
//     gDM().concat(baseApi.middleware), // ✅ one middleware for everything
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;