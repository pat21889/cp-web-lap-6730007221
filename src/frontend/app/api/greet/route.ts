import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") ?? "";
  const backendUrl = process.env.BACKEND_URL ?? "http://127.0.0.1:3000";

  const response = await fetch(
    `${backendUrl}/greet?name=${encodeURIComponent(name)}`,
  );
  const body = await response.json();

  return NextResponse.json(body, { status: response.status });
}
