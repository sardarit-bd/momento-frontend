import domtoimage from "dom-to-image-more";

const CaptureScreenshort = async (nodeRef, state, seterState, options = {}) => {
    const {
        fileName = `card-${Date.now()}.png`,
        shouldDownload = false,
        outputWidth,
        outputHeight,
        borderInset = 0,
    } = options;

    try {
        const node = nodeRef?.current;
        if (!node) return null;

        const sourceWidth = node.offsetWidth;
        const sourceHeight = node.offsetHeight;
        const targetWidth = outputWidth || sourceWidth;
        const targetHeight = outputHeight || sourceHeight;
        const scaleX = targetWidth / sourceWidth;
        const scaleY = targetHeight / sourceHeight;

        const dataUrl = await domtoimage.toPng(node, {
            bgcolor: "transparent",
            cacheBust: true,
            width: targetWidth,
            height: targetHeight,
            style: {
                transform: `scale(${scaleX}, ${scaleY})`,
                transformOrigin: "top left",
                width: `${sourceWidth}px`,
                height: `${sourceHeight}px`,
                backgroundColor: "transparent",
            },
        });
        let finalDataUrl = dataUrl;

        if (borderInset > 0) {
            const img = new Image();
            img.src = dataUrl;
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            const w = img.width;
            const h = img.height;
            const inset = Math.min(borderInset, Math.floor(Math.min(w, h) / 8));
            const cropW = Math.max(1, w - inset * 2);
            const cropH = Math.max(1, h - inset * 2);

            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                // Crop edge area, then scale back to full output size.
                ctx.drawImage(img, inset, inset, cropW, cropH, 0, 0, w, h);
                finalDataUrl = canvas.toDataURL("image/png");
            }
        }

        if (seterState) {
            if (Array.isArray(state)) seterState([...state, finalDataUrl]);
            else seterState((prev) => [...prev, finalDataUrl]);
        }

        const blob = await fetch(finalDataUrl).then((res) => res.blob());
        const pngFile = new File([blob], fileName, { type: "image/png" });

        if (shouldDownload) {
            const downloadUrl = URL.createObjectURL(pngFile);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(downloadUrl);
        }

        return { dataUrl: finalDataUrl, file: pngFile };
    } catch (err) {
        console.error("Screenshot failed:", err);
        return null;
    }
}

export default CaptureScreenshort;


