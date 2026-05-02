// import { PDFDocument } from "pdf-lib";

// export async function pdfGanarator(base64Images, download = true) {
//     if (!Array.isArray(base64Images) || base64Images.length === 0) {
//         throw new Error("Please provide an array of base64 image data.");
//     }

//     const pdfDoc = await PDFDocument.create();
//     const pageWidth = 595;  // A4 width in points
//     const pageHeight = 842; // A4 height in points

//     // Layout configuration
//     const cols = 2;
//     const rows = 2;
//     const sideMargin = 20;
//     const topMargin = 20;
//     const bottomMargin = 60; // 👈 Added bottom gap here
//     const cellWidth = (pageWidth - sideMargin * (cols + 1)) / cols;
//     const cellHeight = (pageHeight - topMargin - bottomMargin - (rows - 1) * sideMargin) / rows;

//     let page, imageCount = 0;

//     for (let i = 0; i < base64Images.length; i++) {
//         // Start new page every 4 images
//         if (i % (cols * rows) === 0) {
//             page = pdfDoc.addPage([pageWidth, pageHeight]);
//             imageCount = 0;
//         }

//         const base64 = base64Images[i];
//         const imageBytes = Uint8Array.from(atob(base64.split(",")[1]), (c) => c.charCodeAt(0));

//         let image;
//         if (base64.startsWith("data:image/png")) {
//             image = await pdfDoc.embedPng(imageBytes);
//         } else {
//             image = await pdfDoc.embedJpg(imageBytes);
//         }

//         // Determine position (row and column)
//         const row = Math.floor(imageCount / cols);
//         const col = imageCount % cols;

//         const x = sideMargin + col * (cellWidth + sideMargin);
//         const y =
//             pageHeight -
//             topMargin -
//             (row + 1) * cellHeight -
//             row * sideMargin -
//             bottomMargin / 4; // slight adjustment for visual balance

//         // Maintain aspect ratio
//         const { width, height } = image.scale(1);
//         const scale = Math.min(cellWidth / width, cellHeight / height);
//         const drawWidth = width * scale;
//         const drawHeight = height * scale;

//         // Center image in its cell
//         const offsetX = x + (cellWidth - drawWidth) / 2;
//         const offsetY = y + (cellHeight - drawHeight) / 2;

//         page.drawImage(image, {
//             x: offsetX,
//             y: offsetY,
//             width: drawWidth,
//             height: drawHeight,
//         });

//         imageCount++;
//     }

//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });
//     return blob;
// }















import { PDFDocument } from "pdf-lib";

export async function pdfGanarator(base64Images, download = true) {
    if (!Array.isArray(base64Images) || base64Images.length === 0) {
        throw new Error("Please provide an array of base64 image data.");
    }

    const pdfDoc = await PDFDocument.create();
    const pageWidth = 595;
    const pageHeight = 842;

    // Grid layout
    const cols = 2;
    const rows = 2;
    const sideMargin = 20;
    const topMargin = 20;
    const bottomMargin = 60;

    const cellWidth = (pageWidth - sideMargin * (cols + 1)) / cols;
    const cellHeight =
        (pageHeight - topMargin - bottomMargin - (rows - 1) * sideMargin) / rows;

    let page;
    let imageCount = 0;

    for (let i = 0; i < base64Images.length; i++) {
        const isLastImage = i === base64Images.length - 1;
        const base64 = base64Images[i];

        const imageBytes = Uint8Array.from(
            atob(base64.split(",")[1]),
            (c) => c.charCodeAt(0)
        );

        let image;
        if (base64.startsWith("data:image/png")) {
            image = await pdfDoc.embedPng(imageBytes);
        } else {
            image = await pdfDoc.embedJpg(imageBytes);
        }

        /* ===============================
           LAST IMAGE → BIG PRINT
        =============================== */
        if (isLastImage) {
            const bigPage = pdfDoc.addPage([pageWidth, pageHeight]);

            const maxWidth = pageWidth - 40;
            const maxHeight = pageHeight - 80;

            const { width, height } = image.scale(1);
            const scale = Math.min(maxWidth / width, maxHeight / height);

            const drawWidth = width * scale;
            const drawHeight = height * scale;

            bigPage.drawImage(image, {
                x: (pageWidth - drawWidth) / 2,
                y: (pageHeight - drawHeight) / 2,
                width: drawWidth,
                height: drawHeight,
            });

            break; // 👈 stop normal loop rendering
        }

        /* ===============================
           NORMAL GRID LOGIC (UNCHANGED)
        =============================== */
        if (imageCount % (cols * rows) === 0) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            imageCount = 0;
        }

        const row = Math.floor(imageCount / cols);
        const col = imageCount % cols;

        const x = sideMargin + col * (cellWidth + sideMargin);
        const y =
            pageHeight -
            topMargin -
            (row + 1) * cellHeight -
            row * sideMargin -
            bottomMargin / 4;

        const { width, height } = image.scale(1);
        const scale = Math.min(cellWidth / width, cellHeight / height);

        const drawWidth = width * scale;
        const drawHeight = height * scale;

        page.drawImage(image, {
            x: x + (cellWidth - drawWidth) / 2,
            y: y + (cellHeight - drawHeight) / 2,
            width: drawWidth,
            height: drawHeight,
        });

        imageCount++;
    }

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: "application/pdf" });
}
