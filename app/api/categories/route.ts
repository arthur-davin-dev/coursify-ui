import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/categories`, {
    cache: "force-cache",
  });

  const data = await res.json();

  if (!res.ok) return NextResponse.json(data, { status: res.status });
  return NextResponse.json(data);
}