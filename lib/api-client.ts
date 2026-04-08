import { User } from '@/schemas/auth';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

interface AuthResponse {
  user: User;
  message: string;
}

export async function apiCall<T>(
  url: string,
  options?: RequestInit
): Promise<{ data?: T; error?: string; status: number }> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include', // Include cookies
    });

    const body = await response.json();

    if (!response.ok) {
      return {
        error: body.error || 'An error occurred',
        status: response.status,
      };
    }

    return {
      data: body,
      status: response.status,
    };
  } catch (error) {
    console.error('[v0] API call error:', error);
    return {
      error: 'Network error',
      status: 0,
    };
  }
}

export async function login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
  const { data, error, status } = await apiCall<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (status === 401) {
    return { error: 'Invalid email or password' };
  }

  return data ? { data } : { error };
}

export async function register(
  username: string,
  email: string,
  password: string,
  role: 'STUDENT' | 'TEACHER'
): Promise<ApiResponse<AuthResponse>> {
  const { data, error, status } = await apiCall<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
      confirmPassword: password,
      role,
    }),
  });

  if (status === 400) {
    return { error: 'Invalid input. Please check your details.' };
  }

  return data ? { data } : { error };
}

export async function logout(): Promise<void> {
  await apiCall('/api/auth/logout', {
    method: 'POST',
  });
}
