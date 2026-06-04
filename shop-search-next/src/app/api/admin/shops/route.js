import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  const res = await fetch(
    `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/shops`,
    {
      method: "POST",
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    console.error("microCMS POST failed:", res.status, JSON.stringify(errBody));
    return NextResponse.json(
      { error: "登録に失敗しました", detail: errBody, status: res.status },
      { status: 500 }
    );
  }
  console.log("microCMS POST success");

  const data = await res.json();
  return NextResponse.json(data, { status: 201 });
}
