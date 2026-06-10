import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "ファイルがありません" }, { status: 400 });
  }

  const uploadForm = new FormData();
  uploadForm.append("file", file);

  const res = await fetch(
    `https://media.microcms.io/api/v1/${process.env.MICROCMS_SERVICE_DOMAIN}`,
    {
      method: "POST",
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
      },
      body: uploadForm,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: "画像のアップロードに失敗しました", detail: err }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
