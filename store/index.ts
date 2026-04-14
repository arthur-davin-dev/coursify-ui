import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { baseApi } from "./services/baseApi";

// ✅ All injected into baseApi — token auto-sent
import "./services/courseApi";
import "./services/bookApi";
import "./services/lessonsApi";  // ← ADD THIS
import "./services/categoryApi";
import "./features/users/userSlice";
import "./services/enrollmentApi";
import "./services/bookmarkApi";
import "./services/progressApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (gDM) => gDM().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;