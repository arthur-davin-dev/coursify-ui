import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: {
    id: string;
    username: string;
    email: string;
    role: 'STUDENT' | 'TEACHER';
  } | null;
  token: string | null; // ✅ ADD
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  // ✅ rehydrate from localStorage on page refresh — use "user_token" to match login
  token: typeof window !== 'undefined' ? localStorage.getItem('user_token') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('user_token') : false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => { // ✅ ADD
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user_token', action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null; // ✅ ADD
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('user_token'); // ✅ ADD
    },
  },
});

export const { setUser, setToken, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;