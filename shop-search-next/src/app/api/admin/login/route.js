import { NextResponse } from "next/server";

export async function POST(request) {
  const { password } = await request.json();
  
  if (password === process.env.ADMIN_PASSWORD) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_token", process.env.ADMIN_PASSWORD, {
      httpOnly: true,
      path: "/",
    });
    return response;
  }
  
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}