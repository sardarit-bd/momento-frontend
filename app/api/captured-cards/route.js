import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const sanitizeName = (value) =>
    String(value || "")
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .replace(/_+/g, "_");

export async function POST(req) {
    try {
        const { dataUrl, fileName, folderName } = await req.json();

        if (!dataUrl || !dataUrl.startsWith("data:image/png;base64,")) {
            return NextResponse.json(
                { success: false, message: "Invalid PNG data url" },
                { status: 400 }
            );
        }

        const safeFolder = sanitizeName(folderName || "deck-cards");
        const safeFileBase = sanitizeName(fileName || `card-${Date.now()}.png`);
        const safeFile = safeFileBase.endsWith(".png") ? safeFileBase : `${safeFileBase}.png`;

        const outputDir = path.join(process.cwd(), "public", "captured-cards", safeFolder);
        await fs.mkdir(outputDir, { recursive: true });

        const base64Data = dataUrl.split(",")[1];
        const outputPath = path.join(outputDir, safeFile);
        await fs.writeFile(outputPath, Buffer.from(base64Data, "base64"));

        return NextResponse.json({
            success: true,
            url: `/captured-cards/${safeFolder}/${safeFile}`,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error?.message || "Failed to save image" },
            { status: 500 }
        );
    }
}
