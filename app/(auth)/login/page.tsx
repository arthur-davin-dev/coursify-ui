'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { setUser, setLoading, setError } from '@/store/slices/authSlice';
import { login } from '@/lib/api-client';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrorMsg] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    dispatch(setLoading(true));

    const result = await login(email, password);

    if (result.error) {
      setErrorMsg(result.error);
      dispatch(setError(result.error));
      setIsLoading(false);
      dispatch(setLoading(false));
      return;
    }

    if (result.data?.user) {
      dispatch(setUser(result.data.user));
      // Redirect based on role
      const dashboard = result.data.user.role === 'TEACHER' ? '/dashboard/teacher' : '/dashboard/student';
      router.push(dashboard);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Coursify</h1>
          <p className="text-slate-600">Learn, teach, grow together</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-2 pb-4">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your Coursify account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="border-slate-200"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-slate-600">Don&apos;t have an account? </span>
              <Link
                href="/auth/register"
                className="text-blue-600 hover:text-blue-700 font-medium underline"
              >
                Create one
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
