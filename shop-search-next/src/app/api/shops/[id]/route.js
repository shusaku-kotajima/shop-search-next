import { client } from "../../../../lib/microcms";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  const data = await client.get({
    endpoint: "shops",
    contentId: id,
  });

  return NextResponse.json(data);
}