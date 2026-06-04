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
    return NextResponse.json({ error: "登録に失敗しました", detail: errBody, status: res.status }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data, { status: 201 });
}

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

  if (!res.ok) {
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}