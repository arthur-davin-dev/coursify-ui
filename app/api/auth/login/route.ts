import { NextRequest, NextResponse } from 'next/server';
import { LoginSchema } from '@/schemas/auth';

const BACKEND_URL = process.env.BACKEND_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input with Zod
    const validatedData = LoginSchema.parse(body);

    // Forward to backend
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || 'Login failed' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Create response with tokens set as HTTP-only cookies
    const result = NextResponse.json(
      {
        user: data.user,
        message: 'Login successful',
      },
      { status: 200 }
    );

    // Set access token cookie
    if (data.accessToken) {
      result.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60, // 15 minutes
        path: '/',
      });
    }

    // Set refresh token cookie
    if (data.refreshToken) {
      result.cookies.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
      });
    }

    return result;
  } catch (error) {
    console.error('[v0] Login error:', error);

    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
