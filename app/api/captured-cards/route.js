import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
    // Keep this endpoint as a no-op to support stale browser bundles
    // that might still call it while screenshot capture is disabled.
    return NextResponse.json(
        { success: true, disabled: true, message: "Screenshot capture is disabled." },
        { status: 200 }
    );
}
