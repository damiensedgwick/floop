import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();

  console.log(NextResponse.json({ res }));

  return NextResponse.json({ res });
}
