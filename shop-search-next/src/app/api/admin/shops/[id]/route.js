import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = await params;

  const res = await fetch(
    `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/shops/${id}`,
    {
      method: "DELETE",
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  const res = await fetch(
    `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/shops/${id}`,
    {
      method: "PATCH",
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  console.log("microCMS response:", res.status, JSON.stringify(data));

  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: 500 });
  }

  return NextResponse.json(data);
}