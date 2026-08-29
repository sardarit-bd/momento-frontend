import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  return NextResponse.json(
    {
      success: true,
      disabled: true,
      message: "Screenshot capture is disabled.",
    },
    { status: 200 },
  );
}
