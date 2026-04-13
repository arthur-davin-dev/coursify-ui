import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    console.log("POST /api/lessons/batch");
    console.log("auth header:", authHeader);

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { courseId, lessons } = await req.json();

    if (!courseId) {
      return NextResponse.json({ message: "courseId is required" }, { status: 400 });
    }

    console.log("courseId:", courseId);
    console.log("lessons:", lessons);

    // Build payload — each lesson must include course_id
    const payload = lessons.map((l: any) => ({
      title: l.title,
      description: l.description || "",
      video_url: l.video_url,
      course_id: Number(courseId),
    }));

    console.log("payload to Spring Boot:", JSON.stringify(payload));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/lessons/batch?courseId=${courseId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(payload),
      }
    );

    console.log("Spring Boot status:", res.status);

    const text = await res.text();
    console.log("Spring Boot body:", text);

    const data = text ? JSON.parse(text) : {};

    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("POST /api/lessons/batch error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", detail: String(error) },
      { status: 500 }
    );
  }
}